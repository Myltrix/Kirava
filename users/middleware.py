# users/middleware.py
import json
import urllib.request
from urllib.error import URLError, HTTPError
import logging

logger = logging.getLogger(__name__)

def get_client_ip(request):
    """Получает реальный IP адрес клиента"""
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        # Берем первый IP из цепочки прокси
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")

def ip_to_country_code(ip: str) -> str:
    """
    Определяет код страны по IP адресу.
    Возвращает код страны (KZ/RU/US/...). Если не удалось — "".
    """
    if not ip or ip in ("127.0.0.1", "localhost", "::1"):
        return ""
    
    # Список провайдеров для определения страны
    providers = [
        f"https://ipwho.is/{ip}",
        f"https://ipapi.co/{ip}/json/",
        f"http://ip-api.com/json/{ip}",
    ]
    
    for url in providers:
        try:
            with urllib.request.urlopen(url, timeout=3) as r:
                data = json.loads(r.read().decode("utf-8"))
                
                # Проверяем разные форматы ответов
                if url.endswith("ipwho.is/"):
                    if data.get("success") is True:
                        country_code = (data.get("country_code") or "").upper()
                        if country_code:
                            logger.info(f"🌍 Определена страна {country_code} по IP {ip} через ipwho.is")
                            return country_code
                        
                elif "ipapi.co" in url:
                    country_code = data.get("country_code")
                    if country_code:
                        country_code = country_code.upper()
                        logger.info(f"🌍 Определена страна {country_code} по IP {ip} через ipapi.co")
                        return country_code
                        
                elif "ip-api.com" in url:
                    if data.get("status") == "success":
                        country_code = (data.get("countryCode") or "").upper()
                        if country_code:
                            logger.info(f"🌍 Определена страна {country_code} по IP {ip} через ip-api.com")
                            return country_code
                        
        except (URLError, HTTPError, json.JSONDecodeError, KeyError) as e:
            logger.debug(f"⚠️ Ошибка определения страны через {url}: {e}")
            continue
        except Exception as e:
            logger.debug(f"⚠️ Неизвестная ошибка определения страны: {e}")
            continue
    
    logger.warning(f"⚠️ Не удалось определить страну по IP {ip}")
    return ""

class GeoIPProfileMiddleware:
    """Middleware для определения геолокации и обновления профиля"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Получаем IP адрес
        ip = get_client_ip(request)
        request.ip_address = ip
        
        # Получаем ответ
        response = self.get_response(request)
        
        # Обновляем профиль после обработки запроса
        try:
            if request.user.is_authenticated:
                profile = request.user.profile
                changed = False
                
                # Сохраняем IP адрес
                if ip and profile.ip_address != ip:
                    profile.ip_address = ip
                    changed = True
                    logger.debug(f"📝 Обновлен IP адрес для {request.user.username}: {ip}")
                
                # Определяем страну автоматически, только если пользователь не выбрал ее вручную
                if ip and not profile.country:
                    cc = ip_to_country_code(ip)
                    if cc:
                        profile.country = cc
                        changed = True
                        logger.info(f"🌍 Автоматически определена страна {cc} для {request.user.username}")
                
                # Сохраняем изменения
                if changed:
                    profile.save(update_fields=["ip_address", "country", "updated_at"])
                    logger.debug(f"✅ Профиль обновлен для {request.user.username}")
                    
        except Exception as e:
            # Логируем ошибку, но не прерываем выполнение
            logger.error(f"❌ Ошибка в GeoIPProfileMiddleware: {e}")
        
        return response

class ProfileCompletionMiddleware:
    """Middleware для проверки заполненности профиля"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Показываем уведомление о необходимости заполнить профиль
        try:
            if (request.user.is_authenticated and 
                request.path not in ['/edit-profile/', '/logout/', '/profile/']):
                profile = request.user.profile
                
                # Проверяем, заполнены ли основные поля
                if not profile.avatar or not profile.bio or not profile.country:
                    # Можно добавить флаг в сессию для показа уведомления
                    if 'profile_incomplete_notice' not in request.session:
                        request.session['profile_incomplete_notice'] = True
                        logger.debug(f"⚠️ Профиль {request.user.username} не заполнен полностью")
                        
        except Exception as e:
            logger.debug(f"⚠️ Ошибка проверки заполненности профиля: {e}")
        
        return response

class ThemeMiddleware:
    """Middleware для применения темы"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Применяем тему из настроек пользователя
        if request.user.is_authenticated:
            try:
                theme = request.user.settings.dark_theme
                if theme:
                    request.theme = 'dark'
                else:
                    request.theme = 'light'
            except Exception as e:
                request.theme = 'light'
                logger.debug(f"⚠️ Ошибка определения темы: {e}")
        else:
            request.theme = 'light'
        
        response = self.get_response(request)
        return response