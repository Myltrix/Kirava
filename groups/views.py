# groups/views.py
import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_POST, require_GET, require_http_methods
from django.db import transaction
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages
from django.db.models import Q, Count
from django.utils import timezone
import logging

from .models import Group, GroupMembership, GroupMessage
from .forms import GroupCreateForm, GroupMessageForm

logger = logging.getLogger(__name__)


def community(request):
    """
    Главная страница сообщества со списком всех групп
    """
    try:
        search_query = request.GET.get('search', '').strip()
        page_number = request.GET.get('page', 1)
        
        # Получаем ВСЕ группы с аннотациями
        groups_qs = Group.objects.all().annotate(
            members_count=Count('members', distinct=True),
            messages_count=Count('messages', distinct=True)
        ).order_by('-created_at')
        
        # Поиск
        if search_query:
            groups_qs = groups_qs.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query) |
                Q(creator__username__icontains=search_query)
            )
        
        # Логируем для отладки
        logger.info(f"Community page. Total groups in DB: {Group.objects.count()}, Query returned: {groups_qs.count()}")
        
        # Добавляем информацию о членстве пользователя
        for group in groups_qs:
            if request.user.is_authenticated:
                group.is_member = GroupMembership.objects.filter(
                    user=request.user, 
                    group=group
                ).exists()
                group.is_creator = (group.creator == request.user)
            else:
                group.is_member = False
                group.is_creator = False
        
        # Пагинация
        paginator = Paginator(groups_qs, 12)
        
        try:
            groups_page = paginator.page(page_number)
        except PageNotAnInteger:
            groups_page = paginator.page(1)
        except EmptyPage:
            groups_page = paginator.page(paginator.num_pages)
        
        context = {
            'groups': groups_page,
            'search_query': search_query,
            'page_obj': groups_page,
            'paginator': paginator,
            'title': 'Сообщество - Kirava',
        }
        
        return render(request, 'community.html', context)
        
    except Exception as e:
        logger.error(f"Error in community view: {str(e)}", exc_info=True)
        messages.error(request, f'Произошла ошибка при загрузке страницы: {str(e)}')
        return render(request, 'community.html', {
            'groups': [],
            'search_query': '',
            'error': str(e),
            'title': 'Ошибка - Kirava'
        })


@login_required
@require_POST
def create_group_ajax(request):
    """
    AJAX создание группы
    """
    try:
        logger.info(f"create_group_ajax called by user: {request.user.username}")
        
        # Получаем данные
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        
        # Валидация
        if not name:
            return JsonResponse({
                'success': False,
                'error': 'Название группы обязательно'
            }, status=400)
        
        if not description:
            return JsonResponse({
                'success': False,
                'error': 'Описание группы обязательно'
            }, status=400)
        
        if len(name) > 100:
            return JsonResponse({
                'success': False,
                'error': 'Название группы не должно превышать 100 символов'
            }, status=400)
        
        if len(description) > 150:
            return JsonResponse({
                'success': False,
                'error': 'Описание группы не должно превышать 150 символов'
            }, status=400)
        
        # Создаем группу в транзакции
        with transaction.atomic():
            # Создаем группу
            group = Group.objects.create(
                name=name,
                description=description,
                creator=request.user
            )
            
            logger.info(f"Group created: {group.id} - {group.name}")
            
            # Обрабатываем аватар
            if 'avatar' in request.FILES:
                avatar = request.FILES['avatar']
                
                # Проверка размера
                if avatar.size > 5 * 1024 * 1024:  # 5MB
                    return JsonResponse({
                        'success': False,
                        'error': 'Размер файла не должен превышать 5MB'
                    }, status=400)
                
                # Проверка типа
                if not avatar.content_type.startswith('image/'):
                    return JsonResponse({
                        'success': False,
                        'error': 'Файл должен быть изображением'
                    }, status=400)
                
                group.avatar = avatar
                group.save()
                logger.info(f"Avatar uploaded for group {group.id}")
            
            # Добавляем создателя в группу
            if not GroupMembership.objects.filter(user=request.user, group=group).exists():
                membership = GroupMembership.objects.create(
                    user=request.user,
                    group=group,
                    role='admin'
                )
                logger.info(f"Creator {request.user.username} added to group {group.id} as admin")
            else:
                logger.warning(f"Creator {request.user.username} already in group {group.id}")
            
            # Получаем URL аватара
            avatar_url = None
            if group.avatar:
                try:
                    avatar_url = request.build_absolute_uri(group.avatar.url)
                except Exception as e:
                    logger.error(f"Error getting absolute avatar URL: {str(e)}")
                    avatar_url = group.avatar.url
            
            logger.info(f"Group {group.id} fully created. Total groups now: {Group.objects.count()}")
            
            # Успешный ответ
            return JsonResponse({
                'success': True,
                'message': f'Группа "{group.name}" успешно создана!',
                'group': {
                    'id': group.id,
                    'name': group.name,
                    'description': group.description,
                    'privacy': 'public',  # Всегда публичная
                    'avatar_url': avatar_url,
                    'creator': request.user.username,
                    'created_at': group.created_at.strftime('%d.%m.%Y %H:%M'),
                    'members_count': 1,
                    'messages_count': 0,
                    'is_member': True,
                    'is_creator': True,
                }
            })
    
    except Exception as e:
        logger.error(f"Error in create_group_ajax: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка сервера: {str(e)}'
        }, status=500)


@login_required
def create_group(request):
    """
    Страница создания группы (не AJAX)
    """
    if request.method == 'POST':
        form = GroupCreateForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                group = form.save(commit=False)
                group.creator = request.user
                group.save()
                
                # Проверяем, не добавлен ли уже создатель в группу
                if not GroupMembership.objects.filter(user=request.user, group=group).exists():
                    GroupMembership.objects.create(
                        user=request.user,
                        group=group,
                        role='admin'
                    )
                
                messages.success(request, f'Группа "{group.name}" успешно создана!')
                return redirect('community')
                
            except Exception as e:
                messages.error(request, f'Ошибка при создании группы: {str(e)}')
        else:
            for error in form.errors.values():
                messages.error(request, error)
    else:
        form = GroupCreateForm()
    
    return render(request, 'groups/create_group.html', {
        'form': form,
        'title': 'Создание группы'
    })


def group_detail(request, group_id):
    """
    Страница детальной информации о группе с чатом
    """
    try:
        group = get_object_or_404(
            Group.objects.select_related('creator'),
            id=group_id
        )
        
        is_member = False
        is_creator = False
        
        if request.user.is_authenticated:
            is_member = group.is_member(request.user)
            is_creator = group.is_creator(request.user)
        
        # Получаем участников
        memberships = GroupMembership.objects.filter(
            group=group
        ).select_related('user').order_by('-role', 'joined_at')
        
        # Получаем сообщения
        messages_list = GroupMessage.objects.filter(
            group=group
        ).select_related('user').order_by('created_at')
        
        # Пагинация сообщений
        paginator = Paginator(messages_list, 50)
        page_number = request.GET.get('page', 1)
        
        try:
            page_obj = paginator.page(page_number)
        except (PageNotAnInteger, EmptyPage):
            page_obj = paginator.page(1)
        
        context = {
            'group': group,
            'memberships': memberships,
            'page_obj': page_obj,
            'is_member': is_member,
            'is_creator': is_creator,
            'total_messages': messages_list.count(),
            'title': f'{group.name} - Kirava',
        }
        
        return render(request, 'group_detail.html', context)
        
    except Exception as e:
        logger.error(f"Error in group_detail view: {str(e)}", exc_info=True)
        messages.error(request, f'Ошибка при загрузке группы: {str(e)}')
        return redirect('community')


@login_required
@require_POST
def join_group(request, group_id):
    """
    Вступление в группу
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        if group.is_member(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Вы уже состоите в этой группе'
            })
        
        # Все группы публичные - вступаем сразу как участник
        role = 'member'
        
        # Создаем запись о членстве
        membership = GroupMembership.objects.create(
            user=request.user,
            group=group,
            role=role
        )
        
        message = f'Вы успешно вступили в группу "{group.name}"!'
        
        logger.info(f"User {request.user.username} joined group {group.id} as {role}")
        
        return JsonResponse({
            'success': True,
            'message': message,
            'is_pending': False,
            'members_count': group.get_members_count()
        })
        
    except Exception as e:
        logger.error(f"Error joining group: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при вступлении в группу: {str(e)}'
        })


@login_required
@require_POST
def leave_group(request, group_id):
    """
    Выход из группы
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        if not group.is_member(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Вы не состоите в этой группе'
            })
        
        if group.is_creator(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Создатель группы не может выйти. Удалите группу или передайте права.'
            })
        
        # Удаляем членство
        membership = GroupMembership.objects.filter(
            user=request.user,
            group=group
        ).delete()
        
        logger.info(f"User {request.user.username} left group {group.id}")
        
        return JsonResponse({
            'success': True,
            'message': f'Вы вышли из группы "{group.name}"',
            'members_count': group.get_members_count()
        })
        
    except Exception as e:
        logger.error(f"Error leaving group: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при выходе из группы: {str(e)}'
        })


@login_required
@require_POST
def send_message(request, group_id):
    """
    Отправка сообщения в группу
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        # Проверяем, является ли пользователь участником
        if not group.is_member(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Вы не участник этой группы'
            })
        
        content = request.POST.get('content', '').strip()
        image = request.FILES.get('image')
        
        # Проверяем, что есть хотя бы текст или изображение
        if not content and not image:
            return JsonResponse({
                'success': False,
                'error': 'Сообщение не может быть пустым'
            })
        
        # Проверяем изображение
        if image:
            if image.size > 5 * 1024 * 1024:  # 5MB
                return JsonResponse({
                    'success': False,
                    'error': 'Размер изображения не должен превышать 5MB'
                })
            
            if not image.content_type.startswith('image/'):
                return JsonResponse({
                    'success': False,
                    'error': 'Файл должен быть изображением'
                })
        
        # Создаем сообщение
        message = GroupMessage.objects.create(
            group=group,
            user=request.user,
            content=content,
            image=image
        )
        
        # Получаем URL аватара пользователя
        avatar_url = None
        if hasattr(request.user, 'profile') and request.user.profile.avatar:
            avatar_url = request.user.profile.avatar.url
        
        logger.info(f"Message sent to group {group.id} by {request.user.username}")
        
        return JsonResponse({
            'success': True,
            'message': {
                'id': message.id,
                'content': message.content,
                'image_url': message.image.url if message.image else None,
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'avatar_url': avatar_url,
                },
                'created_at': message.created_at.strftime('%H:%M'),
                'date': message.created_at.strftime('%d.%m.%Y'),
            }
        })
        
    except Exception as e:
        logger.error(f"Error sending message: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при отправке сообщения: {str(e)}'
        })


@require_GET
def get_messages(request, group_id):
    """
    Получение сообщений группы
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        # Все группы публичные - все могут видеть сообщения
        # Неавторизованные пользователи могут только читать
        # Для отправки сообщений нужно быть участником
        
        last_id = request.GET.get('last_id', 0)
        try:
            last_id = int(last_id)
        except ValueError:
            last_id = 0
        
        # Получаем новые сообщения
        messages_qs = GroupMessage.objects.filter(group=group)
        
        if last_id > 0:
            messages_qs = messages_qs.filter(id__gt=last_id)
        
        messages_qs = messages_qs.select_related('user').order_by('created_at')[:100]
        
        messages_data = []
        for msg in messages_qs:
            # Получаем URL аватара пользователя
            avatar_url = None
            if hasattr(msg.user, 'profile') and msg.user.profile.avatar:
                avatar_url = msg.user.profile.avatar.url
            
            messages_data.append({
                'id': msg.id,
                'content': msg.content,
                'image_url': msg.image.url if msg.image else None,
                'user': {
                    'id': msg.user.id,
                    'username': msg.user.username,
                    'avatar_url': avatar_url,
                },
                'created_at': msg.created_at.strftime('%H:%M'),
                'date': msg.created_at.strftime('%d.%m.%Y'),
            })
        
        return JsonResponse({
            'success': True,
            'messages': messages_data,
            'total': len(messages_data),
            'last_id': messages_data[-1]['id'] if messages_data else last_id
        })
        
    except Exception as e:
        logger.error(f"Error getting messages: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при получении сообщений: {str(e)}'
        })


@login_required
@require_POST
def edit_group(request, group_id):
    """
    Редактирование информации о группе
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        # Проверяем права (только создатель может редактировать)
        if not group.is_creator(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Только создатель группы может редактировать информацию'
            }, status=403)
        
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        
        # Валидация
        if not name:
            return JsonResponse({
                'success': False,
                'error': 'Название группы обязательно'
            }, status=400)
        
        if not description:
            return JsonResponse({
                'success': False,
                'error': 'Описание группы обязательно'
            }, status=400)
        
        if len(name) > 100:
            return JsonResponse({
                'success': False,
                'error': 'Название группы не должно превышать 100 символов'
            }, status=400)
        
        if len(description) > 150:
            return JsonResponse({
                'success': False,
                'error': 'Описание группы не должно превышать 150 символов'
            }, status=400)
        
        # Обновляем данные
        group.name = name
        group.description = description
        
        # Обрабатываем аватар
        if 'avatar' in request.FILES:
            avatar = request.FILES['avatar']
            
            if avatar.size > 5 * 1024 * 1024:
                return JsonResponse({
                    'success': False,
                    'error': 'Размер файла не должен превышать 5MB'
                }, status=400)
            
            if not avatar.content_type.startswith('image/'):
                return JsonResponse({
                    'success': False,
                    'error': 'Файл должен быть изображением'
                }, status=400)
            
            # Удаляем старый аватар
            group.delete_avatar()
            group.avatar = avatar
        
        # Удаление аватара
        elif request.POST.get('remove_avatar') == 'true':
            group.delete_avatar()
            group.avatar = None
        
        group.save()
        
        logger.info(f"Group {group.id} edited by {request.user.username}")
        
        return JsonResponse({
            'success': True,
            'message': 'Изменения сохранены успешно!',
            'group': {
                'id': group.id,
                'name': group.name,
                'description': group.description,
                'privacy': 'public',
                'avatar_url': group.avatar.url if group.avatar else None,
                'members_count': group.get_members_count(),
                'messages_count': group.get_messages_count(),
            }
        })
        
    except Exception as e:
        logger.error(f"Error editing group: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при сохранении изменений: {str(e)}'
        })


@login_required
@require_POST
def delete_group(request, group_id):
    """
    Удаление группы
    """
    try:
        group = get_object_or_404(Group, id=group_id)
        
        # Проверяем права (только создатель может удалить)
        if not group.is_creator(request.user):
            return JsonResponse({
                'success': False,
                'error': 'Только создатель группы может удалить её'
            }, status=403)
        
        group_name = group.name
        
        # Удаляем группу (каскадное удаление настроено в моделях)
        group.delete()
        
        logger.info(f"Group {group_id} deleted by {request.user.username}")
        
        return JsonResponse({
            'success': True,
            'message': f'Группа "{group_name}" успешно удалена',
            'redirect_url': '/community/'
        })
        
    except Exception as e:
        logger.error(f"Error deleting group: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при удалении группы: {str(e)}'
        })


# Вспомогательная функция для AJAX обновления списка групп
@require_GET
def get_groups_ajax(request):
    """
    AJAX получение списка групп (для обновления без перезагрузки)
    """
    try:
        search_query = request.GET.get('search', '').strip()
        
        groups_qs = Group.objects.all().annotate(
            members_count=Count('members', distinct=True),
            messages_count=Count('messages', distinct=True)
        ).order_by('-created_at')
        
        if search_query:
            groups_qs = groups_qs.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query)
            )
        
        # Ограничиваем количество для AJAX
        groups_qs = groups_qs[:50]
        
        groups_data = []
        for group in groups_qs:
            is_member = False
            if request.user.is_authenticated:
                is_member = group.is_member(request.user)
            
            groups_data.append({
                'id': group.id,
                'name': group.name,
                'description': group.description,
                'privacy': 'public',
                'avatar_url': group.avatar.url if group.avatar else None,
                'members_count': group.members_count,
                'messages_count': group.messages_count,
                'is_member': is_member,
                'created_at': group.created_at.strftime('%d.%m.%Y'),
                'creator': group.creator.username,
            })
        
        return JsonResponse({
            'success': True,
            'groups': groups_data,
            'count': len(groups_data),
            'search_query': search_query,
        })
        
    except Exception as e:
        logger.error(f"Error in get_groups_ajax: {str(e)}", exc_info=True)
        return JsonResponse({
            'success': False,
            'error': f'Ошибка при получении списка групп: {str(e)}'
        })


@login_required
def create_group_simple(request):
    """
    Простая страница создания группы (для тестирования)
    """
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        description = request.POST.get('description', '').strip()
        
        if name and description:
            try:
                with transaction.atomic():
                    # Создаем группу
                    group = Group.objects.create(
                        name=name,
                        description=description,
                        creator=request.user
                    )
                    
                    # Добавляем создателя в группу
                    GroupMembership.objects.create(
                        user=request.user,
                        group=group,
                        role='admin'
                    )
                    
                    messages.success(request, f'Группа "{name}" создана успешно! ID: {group.id}')
                    return redirect('community')
                    
            except Exception as e:
                messages.error(request, f'Ошибка при создании группы: {str(e)}')
                logger.error(f"Error in create_group_simple: {str(e)}")
        else:
            messages.error(request, 'Заполните все обязательные поля')
    
    return render(request, 'groups/create_simple.html', {
        'title': 'Создать группу (тест)'
    })


def debug_groups(request):
    """
    Страница отладки для проверки групп в базе данных
    """
    groups = Group.objects.all().order_by('-created_at')
    groups_count = groups.count()
    
    groups_info = []
    for group in groups:
        members_count = group.members.count()
        messages_count = group.messages.count()
        creator_name = group.creator.username if group.creator else 'Неизвестно'
        
        groups_info.append({
            'id': group.id,
            'name': group.name,
            'description': group.description,
            'creator': creator_name,
            'members': members_count,
            'messages': messages_count,
            'created_at': group.created_at,
            'has_avatar': bool(group.avatar),
        })
    
    return render(request, 'groups/debug.html', {
        'groups': groups_info,
        'total_groups': groups_count,
        'title': 'Отладка групп'
    })