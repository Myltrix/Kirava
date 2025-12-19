# subjects/init_subjects.py
from .models import Subject, Topic, TopicQuestion, TopicAnswer


def create_complete_subjects():
    """Создание всех предметов, тем и вопросов для школьных предметов"""

    print("Создание школьных предметов и тем...")

    # Если уже есть темы с вопросами — не создаём заново
    if TopicQuestion.objects.exists():
        print("Вопросы для тем уже существуют. Если нужно обновить — сделайте функцию update_subjects().")
        return

    subjects_data = {
        "matematika": {
            "title": "Математика и Алгебра",
            "topics": {
                "teoriya-veroyatnostey": {
                    "title": "Теория вероятностей",
                    "description": "Основы комбинаторики и вероятностных распределений. Изучите случайные события и их закономерности.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Вероятность случайного события всегда находится в пределах:",
                            "answers": [
                                {"text": "от 0 до 1", "correct": True},
                                {"text": "от -1 до 1", "correct": False},
                                {"text": "от 0 до 100", "correct": False},
                                {"text": "может быть любой", "correct": False},
                            ],
                        },
                        {
                            "text": "Сумма вероятностей противоположных событий равна:",
                            "answers": [
                                {"text": "1", "correct": True},
                                {"text": "0", "correct": False},
                                {"text": "2", "correct": False},
                                {"text": "зависит от эксперимента", "correct": False},
                            ],
                        },
                        {
                            "text": "Если события A и B несовместимы, то P(A ∪ B) равно:",
                            "answers": [
                                {"text": "P(A) + P(B)", "correct": True},
                                {"text": "P(A) · P(B)", "correct": False},
                                {"text": "P(A) - P(B)", "correct": False},
                                {"text": "P(A) / P(B)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое комбинаторика?",
                            "answers": [
                                {"text": "Раздел математики о комбинациях объектов", "correct": True},
                                {"text": "Раздел физики о движении тел", "correct": False},
                                {"text": "Раздел химии о соединениях", "correct": False},
                                {"text": "Раздел биологии о генетике", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула Бернулли используется для:",
                            "answers": [
                                {"text": "Вычисления вероятности k успехов в n испытаниях", "correct": True},
                                {"text": "Решения квадратных уравнений", "correct": False},
                                {"text": "Вычисления интегралов", "correct": False},
                                {"text": "Определения площади фигур", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое условная вероятность?",
                            "answers": [
                                {"text": "Вероятность события A при условии, что событие B уже произошло", "correct": True},
                                {"text": "Вероятность двух независимых событий", "correct": False},
                                {"text": "Вероятность до проведения эксперимента", "correct": False},
                                {"text": "Вероятность противоположного события", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула полной вероятности:",
                            "answers": [
                                {"text": "P(A) = Σ P(Hᵢ) · P(A|Hᵢ)", "correct": True},
                                {"text": "P(A) = P(A) + P(B)", "correct": False},
                                {"text": "P(A) = P(A) · P(B)", "correct": False},
                                {"text": "P(A) = 1 - P(не A)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое математическое ожидание?",
                            "answers": [
                                {"text": "Среднее значение случайной величины", "correct": True},
                                {"text": "Максимальное значение", "correct": False},
                                {"text": "Вероятность успеха", "correct": False},
                                {"text": "Дисперсия", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула дисперсии D(X) =",
                            "answers": [
                                {"text": "M[X²] - (M[X])²", "correct": True},
                                {"text": "M[X]²", "correct": False},
                                {"text": "M[X²]", "correct": False},
                                {"text": "√M[X²]", "correct": False},
                            ],
                        },
                        {
                            "text": "Нормальное распределение также называется:",
                            "answers": [
                                {"text": "Распределение Гаусса", "correct": True},
                                {"text": "Распределение Пуассона", "correct": False},
                                {"text": "Биномиальное распределение", "correct": False},
                                {"text": "Равномерное распределение", "correct": False},
                            ],
                        },
                        {
                            "text": "Сколько элементарных исходов при подбрасывании двух монет?",
                            "answers": [
                                {"text": "4", "correct": True},
                                {"text": "2", "correct": False},
                                {"text": "3", "correct": False},
                                {"text": "8", "correct": False},
                            ],
                        },
                        {
                            "text": "Вероятность выпадения орла при одном броске монеты:",
                            "answers": [
                                {"text": "0.5", "correct": True},
                                {"text": "0.25", "correct": False},
                                {"text": "0.75", "correct": False},
                                {"text": "1", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гистограмма?",
                            "answers": [
                                {"text": "Графическое представление распределения данных", "correct": True},
                                {"text": "Таблица вероятностей", "correct": False},
                                {"text": "Формула расчета", "correct": False},
                                {"text": "Математическое ожидание", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон больших чисел утверждает, что:",
                            "answers": [
                                {"text": "Среднее арифметическое стремится к математическому ожиданию", "correct": True},
                                {"text": "Все события равновероятны", "correct": False},
                                {"text": "Вероятность всегда постоянна", "correct": False},
                                {"text": "Дисперсия уменьшается со временем", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое корреляция?",
                            "answers": [
                                {"text": "Статистическая взаимосвязь двух случайных величин", "correct": True},
                                {"text": "Причинно-следственная связь", "correct": False},
                                {"text": "Равенство величин", "correct": False},
                                {"text": "Разность величин", "correct": False},
                            ],
                        },
                    ],
                },

                "differentsialnye-uravneniya": {
                    "title": "Дифференциальные уравнения",
                    "description": "Решение уравнений первого и второго порядка. Освойте методы решения ДУ.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое дифференциальное уравнение?",
                            "answers": [
                                {"text": "Уравнение, содержащее производные функции", "correct": True},
                                {"text": "Уравнение с переменными", "correct": False},
                                {"text": "Уравнение с интегралами", "correct": False},
                                {"text": "Уравнение с матрицами", "correct": False},
                            ],
                        },
                        {
                            "text": "Порядок дифференциального уравнения определяется:",
                            "answers": [
                                {"text": "Наивысшим порядком производной", "correct": True},
                                {"text": "Количеством переменных", "correct": False},
                                {"text": "Степенью уравнения", "correct": False},
                                {"text": "Количеством решений", "correct": False},
                            ],
                        },
                        {
                            "text": "Метод разделения переменных применяется для:",
                            "answers": [
                                {"text": "Решение ДУ первого порядка", "correct": True},
                                {"text": "Решение систем уравнений", "correct": False},
                                {"text": "Решение интегральных уравнений", "correct": False},
                                {"text": "Решение алгебраических уравнений", "correct": False},
                            ],
                        },
                        {
                            "text": "Линейное дифференциальное уравнение имеет вид:",
                            "answers": [
                                {"text": "y' + P(x)y = Q(x)", "correct": True},
                                {"text": "y'' + y² = 0", "correct": False},
                                {"text": "y' · y = x", "correct": False},
                                {"text": "sin(y') = x", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое общее решение ДУ?",
                            "answers": [
                                {"text": "Решение, содержащее произвольную постоянную", "correct": True},
                                {"text": "Частное решение", "correct": False},
                                {"text": "Численное решение", "correct": False},
                                {"text": "Приближенное решение", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое уравнение Бернулли?",
                            "answers": [
                                {"text": "y' + P(x)y = Q(x)yⁿ", "correct": True},
                                {"text": "y'' + y = 0", "correct": False},
                                {"text": "y' = y", "correct": False},
                                {"text": "y' = x + y", "correct": False},
                            ],
                        },
                        {
                            "text": "Метод вариации постоянных применяется для:",
                            "answers": [
                                {"text": "Решение неоднородных линейных ДУ", "correct": True},
                                {"text": "Решение однородных ДУ", "correct": False},
                                {"text": "Решение уравнений с разделяющимися переменными", "correct": False},
                                {"text": "Решение уравнений в полных дифференциалах", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое характеристическое уравнение?",
                            "answers": [
                                {"text": "Алгебраическое уравнение для нахождения корней линейного ДУ", "correct": True},
                                {"text": "Уравнение для наизводной", "correct": False},
                                {"text": "Уравнение для интеграла", "correct": False},
                                {"text": "Уравнение для предела", "correct": False},
                            ],
                        },
                        {
                            "text": "Уравнение колебаний имеет вид:",
                            "answers": [
                                {"text": "y'' + ω²y = 0", "correct": True},
                                {"text": "y' + y = 0", "correct": False},
                                {"text": "y'' = 0", "correct": False},
                                {"text": "y' = y²", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое уравнение в полных дифференциалах?",
                            "answers": [
                                {"text": "M(x,y)dx + N(x,y)dy = 0, где ∂M/∂y = ∂N/∂x", "correct": True},
                                {"text": "y' = f(x)g(y)", "correct": False},
                                {"text": "y' + p(x)y = q(x)", "correct": False},
                                {"text": "y'' + p(x)y' + q(x)y = 0", "correct": False},
                            ],
                        },
                        {
                            "text": "Метод Эйлера используется для:",
                            "answers": [
                                {"text": "Численного решения ДУ", "correct": True},
                                {"text": "Аналитического решения", "correct": False},
                                {"text": "Построения графиков", "correct": False},
                                {"text": "Нахождения производных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фазовый портрет?",
                            "answers": [
                                {"text": "Графическое представление решений ДУ", "correct": True},
                                {"text": "Таблица значений", "correct": False},
                                {"text": "Матрица коэффициентов", "correct": False},
                                {"text": "Список решений", "correct": False},
                            ],
                        },
                        {
                            "text": "Уравнение Риккати имеет вид:",
                            "answers": [
                                {"text": "y' = P(x) + Q(x)y + R(x)y²", "correct": True},
                                {"text": "y' = y", "correct": False},
                                {"text": "y'' + y = 0", "correct": False},
                                {"text": "y' = sin(x)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое особое решение?",
                            "answers": [
                                {"text": "Решение, не получающееся из общего ни при каких значениях постоянной", "correct": True},
                                {"text": "Любое решение ДУ", "correct": False},
                                {"text": "Решение с нулевыми начальными условиями", "correct": False},
                                {"text": "Приближенное решение", "correct": False},
                            ],
                        },
                        {
                            "text": "Метод Лагранжа используется для:",
                            "answers": [
                                {"text": "Решение неоднородных линейных ДУ высших порядков", "correct": True},
                                {"text": "Решение однородных ДУ", "correct": False},
                                {"text": "Решение уравнений с разделяющимися переменными", "correct": False},
                                {"text": "Решение систем ДУ", "correct": False},
                            ],
                        },
                    ],
                },

                "stereometriya": {
                    "title": "Стереометрия",
                    "description": "Объемы и поверхности геометрических тел. Изучите трехмерную геометрию.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Формула объема куба со стороной a:",
                            "answers": [
                                {"text": "V = a³", "correct": True},
                                {"text": "V = a²", "correct": False},
                                {"text": "V = 6a²", "correct": False},
                                {"text": "V = 4/3πa³", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое параллелепипед?",
                            "answers": [
                                {"text": "Многогранник с шестью гранями-параллелограммами", "correct": True},
                                {"text": "Тело вращения", "correct": False},
                                {"text": "Пирамида с квадратным основанием", "correct": False},
                                {"text": "Шар", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула объема цилиндра:",
                            "answers": [
                                {"text": "V = πr²h", "correct": True},
                                {"text": "V = 4/3πr³", "correct": False},
                                {"text": "V = 1/3πr²h", "correct": False},
                                {"text": "V = πr²", "correct": False},
                            ],
                        },
                        {
                            "text": "Площадь поверхности сферы радиуса r:",
                            "answers": [
                                {"text": "S = 4πr²", "correct": True},
                                {"text": "S = πr²", "correct": False},
                                {"text": "S = 2πr²", "correct": False},
                                {"text": "S = 4/3πr²", "correct": False},
                            ],
                        },
                        {
                            "text": "Объем конуса вычисляется по формуле:",
                            "answers": [
                                {"text": "V = 1/3πr²h", "correct": True},
                                {"text": "V = πr²h", "correct": False},
                                {"text": "V = 4/3πr³", "correct": False},
                                {"text": "V = 2πr²h", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое правильный тетраэдр?",
                            "answers": [
                                {"text": "Правильная треугольная пирамида", "correct": True},
                                {"text": "Куб", "correct": False},
                                {"text": "Прямоугольный параллелепипед", "correct": False},
                                {"text": "Цилиндр", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула объема шара:",
                            "answers": [
                                {"text": "V = 4/3πr³", "correct": True},
                                {"text": "V = πr³", "correct": False},
                                {"text": "V = 2πr³", "correct": False},
                                {"text": "V = 1/3πr³", "correct": False},
                            ],
                        },
                        {
                            "text": "Площадь боковой поверхности конуса:",
                            "answers": [
                                {"text": "S = πrl", "correct": True},
                                {"text": "S = πr²", "correct": False},
                                {"text": "S = 2πrh", "correct": False},
                                {"text": "S = πr² + πrl", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое осевое сечение цилиндра?",
                            "answers": [
                                {"text": "Прямоугольник", "correct": True},
                                {"text": "Круг", "correct": False},
                                {"text": "Треугольник", "correct": False},
                                {"text": "Квадрат", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула объема пирамиды:",
                            "answers": [
                                {"text": "V = 1/3 S·h", "correct": True},
                                {"text": "V = S·h", "correct": False},
                                {"text": "V = 1/2 S·h", "correct": False},
                                {"text": "V = 2/3 S·h", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое двугранный угол?",
                            "answers": [
                                {"text": "Угол между двумя плоскостями", "correct": True},
                                {"text": "Угол между прямой и плоскостью", "correct": False},
                                {"text": "Угол между двумя прямыми", "correct": False},
                                {"text": "Угол в треугольнике", "correct": False},
                            ],
                        },
                        {
                            "text": "Объем призмы:",
                            "answers": [
                                {"text": "V = S·h", "correct": True},
                                {"text": "V = 1/3 S·h", "correct": False},
                                {"text": "V = 2S·h", "correct": False},
                                {"text": "V = πS·h", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое усеченный конус?",
                            "answers": [
                                {"text": "Конус с отсеченной верхней частью", "correct": True},
                                {"text": "Конус с квадратным основанием", "correct": False},
                                {"text": "Конус без вершины", "correct": False},
                                {"text": "Два конуса", "correct": False},
                            ],
                        },
                        {
                            "text": "Площадь поверхности куба со стороной a:",
                            "answers": [
                                {"text": "S = 6a²", "correct": True},
                                {"text": "S = a²", "correct": False},
                                {"text": "S = 4a²", "correct": False},
                                {"text": "S = 12a²", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое сфера?",
                            "answers": [
                                {"text": "Геометрическое место точек, равноудаленных от центра", "correct": True},
                                {"text": "Круг в пространстве", "correct": False},
                                {"text": "Поверхность цилиндра", "correct": False},
                                {"text": "Поверхность конуса", "correct": False},
                            ],
                        },
                    ],
                },

                "trigonometriya": {
                    "title": "Тригонометрия",
                    "description": "Синусы, косинусы и тригонометрические уравнения. Изучите соотношения в треугольниках.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Основное тригонометрическое тождество:",
                            "answers": [
                                {"text": "sin²x + cos²x = 1", "correct": True},
                                {"text": "sin x + cos x = 1", "correct": False},
                                {"text": "tan x + cot x = 1", "correct": False},
                                {"text": "sin x · cos x = 1", "correct": False},
                            ],
                        },
                        {
                            "text": "tan x равен:",
                            "answers": [
                                {"text": "sin x / cos x", "correct": True},
                                {"text": "cos x / sin x", "correct": False},
                                {"text": "sin x · cos x", "correct": False},
                                {"text": "sin²x + cos²x", "correct": False},
                            ],
                        },
                        {
                            "text": "Период функции sin x:",
                            "answers": [
                                {"text": "2π", "correct": True},
                                {"text": "π", "correct": False},
                                {"text": "π/2", "correct": False},
                                {"text": "1", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула приведения: sin(π - x) =",
                            "answers": [
                                {"text": "sin x", "correct": True},
                                {"text": "-sin x", "correct": False},
                                {"text": "cos x", "correct": False},
                                {"text": "-cos x", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое радиан?",
                            "answers": [
                                {"text": "Мера угла, равная длине дуги, деленной на радиус", "correct": True},
                                {"text": "Единица измерения температуры", "correct": False},
                                {"text": "Единица измерения времени", "correct": False},
                                {"text": "Мера длины", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула синуса двойного угла:",
                            "answers": [
                                {"text": "sin 2x = 2 sin x cos x", "correct": True},
                                {"text": "sin 2x = sin²x - cos²x", "correct": False},
                                {"text": "sin 2x = 2 cos²x - 1", "correct": False},
                                {"text": "sin 2x = 1 - 2 sin²x", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое arctan?",
                            "answers": [
                                {"text": "Функция, обратная тангенсу", "correct": True},
                                {"text": "Функция, обратная синусу", "correct": False},
                                {"text": "Функция, обратная косинусу", "correct": False},
                                {"text": "Производная тангенса", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула косинуса суммы:",
                            "answers": [
                                {"text": "cos(x+y) = cos x cos y - sin x sin y", "correct": True},
                                {"text": "cos(x+y) = cos x cos y + sin x sin y", "correct": False},
                                {"text": "cos(x+y) = sin x cos y + cos x sin y", "correct": False},
                                {"text": "cos(x+y) = sin x cos y - cos x sin y", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое единичная окружность?",
                            "answers": [
                                {"text": "Окружность радиуса 1 с центром в начале координат", "correct": True},
                                {"text": "Окружность диаметром 1", "correct": False},
                                {"text": "Окружность с длиной 2π", "correct": False},
                                {"text": "Окружность площадью π", "correct": False},
                            ],
                        },
                        {
                            "text": "Значение sin(π/2):",
                            "answers": [
                                {"text": "1", "correct": True},
                                {"text": "0", "correct": False},
                                {"text": "-1", "correct": False},
                                {"text": "0.5", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое тригонометрический круг?",
                            "answers": [
                                {"text": "Окружность для определения значений тригонометрических функций", "correct": True},
                                {"text": "Круг радиуса 2", "correct": False},
                                {"text": "Круг с тригонометрическими формулами", "correct": False},
                                {"text": "График функции", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула приведения: cos(π/2 - x) =",
                            "answers": [
                                {"text": "sin x", "correct": True},
                                {"text": "cos x", "correct": False},
                                {"text": "-sin x", "correct": False},
                                {"text": "-cos x", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое амплитуда колебаний?",
                            "answers": [
                                {"text": "Максимальное отклонение от положения равновесия", "correct": True},
                                {"text": "Период колебаний", "correct": False},
                                {"text": "Частота колебаний", "correct": False},
                                {"text": "Фаза колебаний", "correct": False},
                            ],
                        },
                        {
                            "text": "Значение cos π:",
                            "answers": [
                                {"text": "-1", "correct": True},
                                {"text": "0", "correct": False},
                                {"text": "1", "correct": False},
                                {"text": "0.5", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гармонические колебания?",
                            "answers": [
                                {"text": "Колебания, описываемые синусоидальной функцией", "correct": True},
                                {"text": "Случайные колебания", "correct": False},
                                {"text": "Постоянные колебания", "correct": False},
                                {"text": "Затухающие колебания", "correct": False},
                            ],
                        },
                    ],
                },

                "matematicheskiy-analiz": {
                    "title": "Математический анализ",
                    "description": "Пределы, производные и интегралы. Освойте основы высшей математики.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Производная функции f(x) = x² равна:",
                            "answers": [
                                {"text": "2x", "correct": True},
                                {"text": "x", "correct": False},
                                {"text": "x²", "correct": False},
                                {"text": "2", "correct": False},
                            ],
                        },
                        {
                            "text": "Интеграл ∫dx равен:",
                            "answers": [
                                {"text": "x + C", "correct": True},
                                {"text": "1 + C", "correct": False},
                                {"text": "0", "correct": False},
                                {"text": "x²/2 + C", "correct": False},
                            ],
                        },
                        {
                            "text": "Предел lim(x→∞) 1/x равен:",
                            "answers": [
                                {"text": "0", "correct": True},
                                {"text": "1", "correct": False},
                                {"text": "∞", "correct": False},
                                {"text": "-∞", "correct": False},
                            ],
                        },
                        {
                            "text": "Производная sin x:",
                            "answers": [
                                {"text": "cos x", "correct": True},
                                {"text": "-cos x", "correct": False},
                                {"text": "-sin x", "correct": False},
                                {"text": "tan x", "correct": False},
                            ],
                        },
                        {
                            "text": "Интеграл ∫x dx равен:",
                            "answers": [
                                {"text": "x²/2 + C", "correct": True},
                                {"text": "x + C", "correct": False},
                                {"text": "1 + C", "correct": False},
                                {"text": "2x + C", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое производная?",
                            "answers": [
                                {"text": "Скорость изменения функции", "correct": True},
                                {"text": "Площадь под кривой", "correct": False},
                                {"text": "Предел функции", "correct": False},
                                {"text": "Интеграл функции", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула производной произведения:",
                            "answers": [
                                {"text": "(uv)' = u'v + uv'", "correct": True},
                                {"text": "(uv)' = u'v'", "correct": False},
                                {"text": "(uv)' = u' + v'", "correct": False},
                                {"text": "(uv)' = u'v - uv'", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое определенный интеграл?",
                            "answers": [
                                {"text": "Интеграл с пределами интегрирования", "correct": True},
                                {"text": "Интеграл без постоянной", "correct": False},
                                {"text": "Первообразная функция", "correct": False},
                                {"text": "Производная интеграла", "correct": False},
                            ],
                        },
                        {
                            "text": "Правило Лопиталя используется для:",
                            "answers": [
                                {"text": "Раскрытия неопределенностей при вычислении пределов", "correct": True},
                                {"text": "Вычисления интегралов", "correct": False},
                                {"text": "Дифференцирования сложных функций", "correct": False},
                                {"text": "Решение уравнений", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое экстремум функции?",
                            "answers": [
                                {"text": "Максимум или минимум функции", "correct": True},
                                {"text": "Нули функции", "correct": False},
                                {"text": "Точки перегиба", "correct": False},
                                {"text": "Асимптоты", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула Ньютона-Лейбница:",
                            "answers": [
                                {"text": "∫[a,b] f(x)dx = F(b) - F(a)", "correct": True},
                                {"text": "f'(x) = lim (f(x+h)-f(x))/h", "correct": False},
                                {"text": "∫f(x)g(x)dx = ...", "correct": False},
                                {"text": "f''(x) = ...", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое асимптота?",
                            "answers": [
                                {"text": "Прямая, к которой неограниченно приближается график функции", "correct": True},
                                {"text": "Точка разрыва", "correct": False},
                                {"text": "Максимум функции", "correct": False},
                                {"text": "Корень уравнения", "correct": False},
                            ],
                        },
                        {
                            "text": "Производная e^x:",
                            "answers": [
                                {"text": "e^x", "correct": True},
                                {"text": "0", "correct": False},
                                {"text": "1", "correct": False},
                                {"text": "x·e^x", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое первообразная?",
                            "answers": [
                                {"text": "Функция, производная которой равна данной функции", "correct": True},
                                {"text": "Производная функции", "correct": False},
                                {"text": "Предел функции", "correct": False},
                                {"text": "Интеграл с пределами", "correct": False},
                            ],
                        },
                        {
                            "text": "Интеграл ∫e^x dx равен:",
                            "answers": [
                                {"text": "e^x + C", "correct": True},
                                {"text": "e^x", "correct": False},
                                {"text": "x·e^x + C", "correct": False},
                                {"text": "ln|x| + C", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "istoriya": {
            "title": "История Мира",
            "topics": {
                "drevniy-rim": {
                    "title": "Древний Рим",
                    "description": "От основания до падения Римской империи. Узнайте о великой цивилизации древности.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Как назывался главный орган власти в Римской республике?",
                            "answers": [
                                {"text": "Сенат", "correct": True},
                                {"text": "Дума", "correct": False},
                                {"text": "Парламент", "correct": False},
                                {"text": "Совет старейшин Спарты", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был первым императором Рима?",
                            "answers": [
                                {"text": "Октавиан Август", "correct": True},
                                {"text": "Юлий Цезарь", "correct": False},
                                {"text": "Нерон", "correct": False},
                                {"text": "Траян", "correct": False},
                            ],
                        },
                        {
                            "text": "В каком году произошло основание Рима (легендарная дата)?",
                            "answers": [
                                {"text": "753 г. до н.э.", "correct": True},
                                {"text": "476 г. н.э.", "correct": False},
                                {"text": "44 г. до н.э.", "correct": False},
                                {"text": "27 г. до н.э.", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто сказал: 'Пришел, увидел, победил'?",
                            "answers": [
                                {"text": "Юлий Цезарь", "correct": True},
                                {"text": "Александр Македонский", "correct": False},
                                {"text": "Ганнибал", "correct": False},
                                {"text": "Сципион Африканский", "correct": False},
                            ],
                        },
                        {
                            "text": "В каком году произошло падение Западной Римской империи?",
                            "answers": [
                                {"text": "476 г. н.э.", "correct": True},
                                {"text": "410 г. н.э.", "correct": False},
                                {"text": "1453 г. н.э.", "correct": False},
                                {"text": "313 г. н.э.", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был первым римским императором, принявшим христианство?",
                            "answers": [
                                {"text": "Константин Великий", "correct": True},
                                {"text": "Нерон", "correct": False},
                                {"text": "Траян", "correct": False},
                                {"text": "Диоклетиан", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Пунические войны?",
                            "answers": [
                                {"text": "Войны между Римом и Карфагеном", "correct": True},
                                {"text": "Войны между Римом и Грецией", "correct": False},
                                {"text": "Гражданские войны в Риме", "correct": False},
                                {"text": "Войны с галлами", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был знаменитым противником Рима из Карфагена?",
                            "answers": [
                                {"text": "Ганнибал", "correct": True},
                                {"text": "Александр Македонский", "correct": False},
                                {"text": "Аттила", "correct": False},
                                {"text": "Цезарь", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Колизей?",
                            "answers": [
                                {"text": "Амфитеатр для гладиаторских боев", "correct": True},
                                {"text": "Храм в Риме", "correct": False},
                                {"text": "Дворец императора", "correct": False},
                                {"text": "Бани", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто такие патриции и плебеи?",
                            "answers": [
                                {"text": "Высшее и низшее сословия в Древнем Риме", "correct": True},
                                {"text": "Военачальники и солдаты", "correct": False},
                                {"text": "Сенаторы и народные трибуны", "correct": False},
                                {"text": "Императоры и рабы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое 'Вечный город'?",
                            "answers": [
                                {"text": "Рим", "correct": True},
                                {"text": "Афины", "correct": False},
                                {"text": "Карфаген", "correct": False},
                                {"text": "Константинополь", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был последним римским императором?",
                            "answers": [
                                {"text": "Ромул Августул", "correct": True},
                                {"text": "Юлий Цезарь", "correct": False},
                                {"text": "Константин XI", "correct": False},
                                {"text": "Нерон", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое акведук?",
                            "answers": [
                                {"text": "Сооружение для подачи воды", "correct": True},
                                {"text": "Дорога", "correct": False},
                                {"text": "Мост", "correct": False},
                                {"text": "Крепостная стена", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто такие гладиаторы?",
                            "answers": [
                                {"text": "Рабы-воины, сражавшиеся на арене", "correct": True},
                                {"text": "Римские легионеры", "correct": False},
                                {"text": "Греческие философы", "correct": False},
                                {"text": "Египетские жрецы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое латынь?",
                            "answers": [
                                {"text": "Язык Древнего Рима", "correct": True},
                                {"text": "Язык Древней Греции", "correct": False},
                                {"text": "Язык Древнего Египта", "correct": False},
                                {"text": "Язык кельтов", "correct": False},
                            ],
                        },
                    ],
                },

                "srednevekove": {
                    "title": "Средневековье",
                    "description": "Феодализм, крестовые походы, культура. Изучите эпоху рыцарей и замков.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Как называлась система землевладения в Средние века?",
                            "answers": [
                                {"text": "Феодализм", "correct": True},
                                {"text": "Капитализм", "correct": False},
                                {"text": "Социализм", "correct": False},
                                {"text": "Коммунизм", "correct": False},
                            ],
                        },
                        {
                            "text": "Первый Крестовый поход начался в:",
                            "answers": [
                                {"text": "1096 году", "correct": True},
                                {"text": "1066 году", "correct": False},
                                {"text": "1212 году", "correct": False},
                                {"text": "1492 году", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое инквизиция?",
                            "answers": [
                                {"text": "Церковный суд над еретиками", "correct": True},
                                {"text": "Военный орден", "correct": False},
                                {"text": "Собрание феодалов", "correct": False},
                                {"text": "Торговый союз", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был королем франков, коронованным императором в 800 году?",
                            "answers": [
                                {"text": "Карл Великий", "correct": True},
                                {"text": "Ричард Львиное Сердце", "correct": False},
                                {"text": "Филипп IV Красивый", "correct": False},
                                {"text": "Вильгельм Завоеватель", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Великая хартия вольностей?",
                            "answers": [
                                {"text": "Документ, ограничивающий власть короля Англии", "correct": True},
                                {"text": "Законы Византии", "correct": False},
                                {"text": "Кодекс рыцарской чести", "correct": False},
                                {"text": "Торговый договор", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда произошла Нормандское завоевание Англии?",
                            "answers": [
                                {"text": "1066 год", "correct": True},
                                {"text": "1215 год", "correct": False},
                                {"text": "1337 год", "correct": False},
                                {"text": "1453 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кодекс рыцарской чести?",
                            "answers": [
                                {"text": "Правила поведения рыцаря", "correct": True},
                                {"text": "Закон о феодалах", "correct": False},
                                {"text": "Церковный устав", "correct": False},
                                {"text": "Торговое соглашение", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был предводителем монголов, завоевавших Русь?",
                            "answers": [
                                {"text": "Батый", "correct": True},
                                {"text": "Чингисхан", "correct": False},
                                {"text": "Тамерлан", "correct": False},
                                {"text": "Аттила", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гильдия?",
                            "answers": [
                                {"text": "Объединение ремесленников", "correct": True},
                                {"text": "Рыцарский орден", "correct": False},
                                {"text": "Монашеский орден", "correct": False},
                                {"text": "Феодальное владение", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда началась Столетняя война?",
                            "answers": [
                                {"text": "1337 год", "correct": True},
                                {"text": "1066 год", "correct": False},
                                {"text": "1215 год", "correct": False},
                                {"text": "1453 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто была Жанна д'Арк?",
                            "answers": [
                                {"text": "Национальная героиня Франции", "correct": True},
                                {"text": "Королева Англии", "correct": False},
                                {"text": "Императрица Византии", "correct": False},
                                {"text": "Германская принцесса", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Черная смерть?",
                            "answers": [
                                {"text": "Эпидемия чумы в XIV веке", "correct": True},
                                {"text": "Война между феодалами", "correct": False},
                                {"text": "Крестьянское восстание", "correct": False},
                                {"text": "Религиозное движение", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда пала Византийская империя?",
                            "answers": [
                                {"text": "1453 год", "correct": True},
                                {"text": "476 год", "correct": False},
                                {"text": "1204 год", "correct": False},
                                {"text": "1492 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рыцарский турнир?",
                            "answers": [
                                {"text": "Соревнование рыцарей", "correct": True},
                                {"text": "Военный поход", "correct": False},
                                {"text": "Суд над еретиками", "correct": False},
                                {"text": "Торжественная церемония", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто такие тамплиеры?",
                            "answers": [
                                {"text": "Рыцарский орден", "correct": True},
                                {"text": "Французские короли", "correct": False},
                                {"text": "Английские лорды", "correct": False},
                                {"text": "Византийские императоры", "correct": False},
                            ],
                        },
                    ],
                },

                "epoha-vozrozhdeniya": {
                    "title": "Эпоха Возрождения",
                    "description": "Гуманизм, искусство и наука XV-XVI веков. Узнайте о великих открытиях и творцах.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Где началась эпоха Возрождения?",
                            "answers": [
                                {"text": "Италия", "correct": True},
                                {"text": "Франция", "correct": False},
                                {"text": "Англия", "correct": False},
                                {"text": "Германия", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто написал 'Божественную комедию'?",
                            "answers": [
                                {"text": "Данте Алигьери", "correct": True},
                                {"text": "Франческо Петрарка", "correct": False},
                                {"text": "Джованни Боккаччо", "correct": False},
                                {"text": "Николо Макиавелли", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто изобрел книгопечатание?",
                            "answers": [
                                {"text": "Иоганн Гутенберг", "correct": True},
                                {"text": "Леонардо да Винчи", "correct": False},
                                {"text": "Галилео Галилей", "correct": False},
                                {"text": "Микеланджело", "correct": False},
                            ],
                        },
                        {
                            "text": "Что означает термин 'гуманизм'?",
                            "answers": [
                                {"text": "Идеология, ставящая в центр человека", "correct": True},
                                {"text": "Вера в Бога", "correct": False},
                                {"text": "Изучение природы", "correct": False},
                                {"text": "Политическая теория", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто написал 'Утопию'?",
                            "answers": [
                                {"text": "Томас Мор", "correct": True},
                                {"text": "Эразм Роттердамский", "correct": False},
                                {"text": "Уильям Шекспир", "correct": False},
                                {"text": "Фрэнсис Бэкон", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто написал 'Джоконду' (Мона Лиза)?",
                            "answers": [
                                {"text": "Леонардо да Винчи", "correct": True},
                                {"text": "Рафаэль", "correct": False},
                                {"text": "Микеланджело", "correct": False},
                                {"text": "Тициан", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Великие географические открытия?",
                            "answers": [
                                {"text": "Открытие новых земель в XV-XVI веках", "correct": True},
                                {"text": "Научные открытия", "correct": False},
                                {"text": "Художественные открытия", "correct": False},
                                {"text": "Религиозные реформы", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто открыл Америку?",
                            "answers": [
                                {"text": "Христофор Колумб", "correct": True},
                                {"text": "Васко да Гама", "correct": False},
                                {"text": "Фернан Магеллан", "correct": False},
                                {"text": "Америго Веспуччи", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда была открыта Америка?",
                            "answers": [
                                {"text": "1492 год", "correct": True},
                                {"text": "1453 год", "correct": False},
                                {"text": "1517 год", "correct": False},
                                {"text": "1588 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто написал 'Гамлета'?",
                            "answers": [
                                {"text": "Уильям Шекспир", "correct": True},
                                {"text": "Данте Алигьери", "correct": False},
                                {"text": "Мигель де Сервантес", "correct": False},
                                {"text": "Джованни Боккаччо", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Реформация?",
                            "answers": [
                                {"text": "Религиозное движение за реформу католической церкви", "correct": True},
                                {"text": "Художественное направление", "correct": False},
                                {"text": "Политическая революция", "correct": False},
                                {"text": "Научная революция", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто начал Реформацию?",
                            "answers": [
                                {"text": "Мартин Лютер", "correct": True},
                                {"text": "Жан Кальвин", "correct": False},
                                {"text": "Ульрих Цвингли", "correct": False},
                                {"text": "Игнатий Лойола", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда Мартин Лютер прибил 95 тезисов?",
                            "answers": [
                                {"text": "1517 год", "correct": True},
                                {"text": "1492 год", "correct": False},
                                {"text": "1521 год", "correct": False},
                                {"text": "1534 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто написал 'Сикстинскую Мадонну'?",
                            "answers": [
                                {"text": "Рафаэль", "correct": True},
                                {"text": "Леонардо да Винчи", "correct": False},
                                {"text": "Микеланджело", "correct": False},
                                {"text": "Тициан", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Контрреформация?",
                            "answers": [
                                {"text": "Борьба католической церкви с Реформацией", "correct": True},
                                {"text": "Продолжение Реформации", "correct": False},
                                {"text": "Научное движение", "correct": False},
                                {"text": "Художественное направление", "correct": False},
                            ],
                        },
                    ],
                },

                "vtoraya-mirovaya-voyna": {
                    "title": "Вторая мировая война",
                    "description": "Основные события и участники войны. Изучите ключевые сражения и их значение.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Когда началась Вторая мировая война?",
                            "answers": [
                                {"text": "1 сентября 1939 года", "correct": True},
                                {"text": "22 июня 1941 года", "correct": False},
                                {"text": "7 декабря 1941 года", "correct": False},
                                {"text": "1 сентября 1938 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Какая битва считается переломным моментом на Восточном фронте?",
                            "answers": [
                                {"text": "Сталинградская битва", "correct": True},
                                {"text": "Курская битва", "correct": False},
                                {"text": "Битва за Москву", "correct": False},
                                {"text": "Битва за Берлин", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда произошло нападение на Перл-Харбор?",
                            "answers": [
                                {"text": "7 декабря 1941 года", "correct": True},
                                {"text": "6 июня 1944 года", "correct": False},
                                {"text": "8 мая 1945 года", "correct": False},
                                {"text": "2 сентября 1945 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был премьер-министром Великобритании во время войны?",
                            "answers": [
                                {"text": "Уинстон Черчилль", "correct": True},
                                {"text": "Франклин Рузвельт", "correct": False},
                                {"text": "Иосиф Сталин", "correct": False},
                                {"text": "Шарль де Голль", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда был открыт Второй фронт в Европе (День Д)?",
                            "answers": [
                                {"text": "6 июня 1944 года", "correct": True},
                                {"text": "22 июня 1941 года", "correct": False},
                                {"text": "9 мая 1945 года", "correct": False},
                                {"text": "2 сентября 1945 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был главнокомандующим немецкими войсками?",
                            "answers": [
                                {"text": "Адольф Гитлер", "correct": True},
                                {"text": "Герман Геринг", "correct": False},
                                {"text": "Генрих Гиммлер", "correct": False},
                                {"text": "Эрвин Роммель", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Холокост?",
                            "answers": [
                                {"text": "Массовое уничтожение евреев нацистами", "correct": True},
                                {"text": "Бомбардировка городов", "correct": False},
                                {"text": "Концентрационные лагеря", "correct": False},
                                {"text": "Военные преступления", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда закончилась Вторая мировая война в Европе?",
                            "answers": [
                                {"text": "8 мая 1945 года", "correct": True},
                                {"text": "2 сентября 1945 года", "correct": False},
                                {"text": "6 июня 1944 года", "correct": False},
                                {"text": "9 мая 1945 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Какие страны были союзниками Германии?",
                            "answers": [
                                {"text": "Италия, Япония", "correct": True},
                                {"text": "СССР, США", "correct": False},
                                {"text": "Великобритания, Франция", "correct": False},
                                {"text": "Китай, Польша", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое операция 'Барбаросса'?",
                            "answers": [
                                {"text": "План нападения Германии на СССР", "correct": True},
                                {"text": "Высадка союзников в Нормандии", "correct": False},
                                {"text": "Битва за Берлин", "correct": False},
                                {"text": "Нападение на Перл-Харбор", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда началась блокада Ленинграда?",
                            "answers": [
                                {"text": "8 сентября 1941 года", "correct": True},
                                {"text": "22 июня 1941 года", "correct": False},
                                {"text": "7 декабря 1941 года", "correct": False},
                                {"text": "6 июня 1944 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Какое сражение было крупнейшим танковым сражением?",
                            "answers": [
                                {"text": "Курская битва", "correct": True},
                                {"text": "Сталинградская битва", "correct": False},
                                {"text": "Битва за Москву", "correct": False},
                                {"text": "Битва за Берлин", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда США сбросили атомную бомбу на Хиросиму?",
                            "answers": [
                                {"text": "6 августа 1945 года", "correct": True},
                                {"text": "9 августа 1945 года", "correct": False},
                                {"text": "2 сентября 1945 года", "correct": False},
                                {"text": "8 мая 1945 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое конференция в Ялте?",
                            "answers": [
                                {"text": "Встреча лидеров СССР, США и Великобритании", "correct": True},
                                {"text": "Подписание капитуляции Германии", "correct": False},
                                {"text": "Создание ООН", "correct": False},
                                {"text": "Открытие второго фронта", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был президентом США во время войны?",
                            "answers": [
                                {"text": "Франклин Рузвельт", "correct": True},
                                {"text": "Гарри Трумэн", "correct": False},
                                {"text": "Дуайт Эйзенхауэр", "correct": False},
                                {"text": "Уинстон Черчилль", "correct": False},
                            ],
                        },
                    ],
                },

                "revolyutsiya-1917": {
                    "title": "Революция 1917 года",
                    "description": "Февральская и Октябрьская революции в России. Узнайте о причинах и последствиях.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Когда произошла Февральская революция?",
                            "answers": [
                                {"text": "Февраль-март 1917 года", "correct": True},
                                {"text": "Октябрь 1917 года", "correct": False},
                                {"text": "Декабрь 1917 года", "correct": False},
                                {"text": "Январь 1918 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был последним российским императором?",
                            "answers": [
                                {"text": "Николай II", "correct": True},
                                {"text": "Александр III", "correct": False},
                                {"text": "Петр I", "correct": False},
                                {"text": "Александр I", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто возглавил Октябрьскую революцию?",
                            "answers": [
                                {"text": "Владимир Ленин", "correct": True},
                                {"text": "Лев Троцкий", "correct": False},
                                {"text": "Иосиф Сталин", "correct": False},
                                {"text": "Александр Керенский", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое 'Декрет о земле'?",
                            "answers": [
                                {"text": "Документ о передаче земли крестьянам", "correct": True},
                                {"text": "Документ о выходе из войны", "correct": False},
                                {"text": "Документ о создании Красной Армии", "correct": False},
                                {"text": "Документ о национализации банков", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда была принята первая советская конституция?",
                            "answers": [
                                {"text": "1918 год", "correct": True},
                                {"text": "1922 год", "correct": False},
                                {"text": "1924 год", "correct": False},
                                {"text": "1936 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Временное правительство?",
                            "answers": [
                                {"text": "Правительство России после отречения Николая II", "correct": True},
                                {"text": "Правительство Ленина", "correct": False},
                                {"text": "Царское правительство", "correct": False},
                                {"text": "Советское правительство", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто был председателем Временного правительства?",
                            "answers": [
                                {"text": "Александр Керенский", "correct": True},
                                {"text": "Владимир Ленин", "correct": False},
                                {"text": "Лев Троцкий", "correct": False},
                                {"text": "Иосиф Сталин", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое 'Апрельские тезисы'?",
                            "answers": [
                                {"text": "Программа действий большевиков после возвращения Ленина", "correct": True},
                                {"text": "Декрет о мире", "correct": False},
                                {"text": "Декрет о земле", "correct": False},
                                {"text": "Конституция 1918 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда произошел штурм Зимнего дворца?",
                            "answers": [
                                {"text": "25-26 октября 1917 года", "correct": True},
                                {"text": "Февраль 1917 года", "correct": False},
                                {"text": "Март 1917 года", "correct": False},
                                {"text": "Ноябрь 1917 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое СНК?",
                            "answers": [
                                {"text": "Совет народных комиссаров - первое советское правительство", "correct": True},
                                {"text": "Совет национальностей", "correct": False},
                                {"text": "Совет рабочих депутатов", "correct": False},
                                {"text": "Совет солдатских депутатов", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда был расстрелян Николай II и его семья?",
                            "answers": [
                                {"text": "17 июля 1918 года", "correct": True},
                                {"text": "25 октября 1917 года", "correct": False},
                                {"text": "3 марта 1918 года", "correct": False},
                                {"text": "30 декабря 1922 года", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Брестский мир?",
                            "answers": [
                                {"text": "Мирный договор между Советской Россией и Германией", "correct": True},
                                {"text": "Договор о создании СССР", "correct": False},
                                {"text": "Договор о капитуляции Германии", "correct": False},
                                {"text": "Договор с Антантой", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда началась Гражданская война в России?",
                            "answers": [
                                {"text": "1918 год", "correct": True},
                                {"text": "1917 год", "correct": False},
                                {"text": "1919 год", "correct": False},
                                {"text": "1920 год", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое продразверстка?",
                            "answers": [
                                {"text": "Обязательная сдача крестьянами излишков продукции государству", "correct": True},
                                {"text": "Раздача земли крестьянам", "correct": False},
                                {"text": "Национализация промышленности", "correct": False},
                                {"text": "Введение НЭПа", "correct": False},
                            ],
                        },
                        {
                            "text": "Когда был создан СССР?",
                            "answers": [
                                {"text": "30 декабря 1922 года", "correct": True},
                                {"text": "25 октября 1917 года", "correct": False},
                                {"text": "7 ноября 1917 года", "correct": False},
                                {"text": "21 января 1924 года", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "fizika": {
            "title": "Физика и Законы",
            "topics": {
                "klassicheskaya-mehanika": {
                    "title": "Классическая механика",
                    "description": "Законы Ньютона и кинематика. Изучите основы движения тел под действием сил.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Первый закон Ньютона называется:",
                            "answers": [
                                {"text": "Закон инерции", "correct": True},
                                {"text": "Закон всемирного тяготения", "correct": False},
                                {"text": "Закон сохранения энергии", "correct": False},
                                {"text": "Закон действия и противодействия", "correct": False},
                            ],
                        },
                        {
                            "text": "Второй закон Ньютона: F =",
                            "answers": [
                                {"text": "ma", "correct": True},
                                {"text": "mv", "correct": False},
                                {"text": "mgh", "correct": False},
                                {"text": "m/t", "correct": False},
                            ],
                        },
                        {
                            "text": "Единица измерения силы в системе СИ:",
                            "answers": [
                                {"text": "Ньютон (Н)", "correct": True},
                                {"text": "Джоуль (Дж)", "correct": False},
                                {"text": "Паскаль (Па)", "correct": False},
                                {"text": "Ватт (Вт)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кинетическая энергия?",
                            "answers": [
                                {"text": "Энергия движения тела", "correct": True},
                                {"text": "Энергия положения тела", "correct": False},
                                {"text": "Энергия тепла", "correct": False},
                                {"text": "Энергия света", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула потенциальной энергии тела на высоте h:",
                            "answers": [
                                {"text": "Eп = mgh", "correct": True},
                                {"text": "Eп = mv²/2", "correct": False},
                                {"text": "Eп = kx²/2", "correct": False},
                                {"text": "Eп = Fs", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое импульс тела?",
                            "answers": [
                                {"text": "p = mv", "correct": True},
                                {"text": "p = ma", "correct": False},
                                {"text": "p = F/t", "correct": False},
                                {"text": "p = mgh", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон сохранения импульса:",
                            "answers": [
                                {"text": "Сумма импульсов замкнутой системы постоянна", "correct": True},
                                {"text": "Импульс всегда увеличивается", "correct": False},
                                {"text": "Импульс зависит от времени", "correct": False},
                                {"text": "Импульс всегда равен нулю", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое механическая работа?",
                            "answers": [
                                {"text": "A = F·s·cosα", "correct": True},
                                {"text": "A = mv", "correct": False},
                                {"text": "A = mgh", "correct": False},
                                {"text": "A = F/t", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула мощности:",
                            "answers": [
                                {"text": "P = A/t", "correct": True},
                                {"text": "P = F·v", "correct": False},
                                {"text": "P = mgh", "correct": False},
                                {"text": "P = I·U", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое КПД (коэффициент полезного действия)?",
                            "answers": [
                                {"text": "η = (Aполезная/Aзатраченная)·100%", "correct": True},
                                {"text": "η = P·t", "correct": False},
                                {"text": "η = F/A", "correct": False},
                                {"text": "η = m/v", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон Гука:",
                            "answers": [
                                {"text": "F = kx", "correct": True},
                                {"text": "F = ma", "correct": False},
                                {"text": "F = Gm₁m₂/r²", "correct": False},
                                {"text": "F = ρgV", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое сила трения?",
                            "answers": [
                                {"text": "Сила, препятствующая движению", "correct": True},
                                {"text": "Сила притяжения", "correct": False},
                                {"text": "Сила упругости", "correct": False},
                                {"text": "Сила тяжести", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула центростремительного ускорения:",
                            "answers": [
                                {"text": "a = v²/R", "correct": True},
                                {"text": "a = F/m", "correct": False},
                                {"text": "a = g", "correct": False},
                                {"text": "a = Δv/Δt", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое момент силы?",
                            "answers": [
                                {"text": "M = F·d", "correct": True},
                                {"text": "M = m·v", "correct": False},
                                {"text": "M = F/A", "correct": False},
                                {"text": "M = p·V", "correct": False},
                            ],
                        },
                        {
                            "text": "Условие равновесия тела:",
                            "answers": [
                                {"text": "Сумма сил = 0, сумма моментов сил = 0", "correct": True},
                                {"text": "Все силы равны", "correct": False},
                                {"text": "Нет движения", "correct": False},
                                {"text": "Ускорение = 0", "correct": False},
                            ],
                        },
                    ],
                },

                "elektromagnetizm": {
                    "title": "Электромагнетизм",
                    "description": "Законы Максвелла и электромагнитные волны. Погрузитесь в мир электричества и магнетизма.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1620641786661-7db10d7d6829?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Кто открыл явление электромагнитной индукции?",
                            "answers": [
                                {"text": "Майкл Фарадей", "correct": True},
                                {"text": "Андре-Мари Ампер", "correct": False},
                                {"text": "Джеймс Максвелл", "correct": False},
                                {"text": "Георг Ом", "correct": False},
                            ],
                        },
                        {
                            "text": "Единица измерения электрического сопротивления:",
                            "answers": [
                                {"text": "Ом", "correct": True},
                                {"text": "Вольт", "correct": False},
                                {"text": "Ампер", "correct": False},
                                {"text": "Ватт", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон Ома для участка цепи: I =",
                            "answers": [
                                {"text": "U/R", "correct": True},
                                {"text": "R/U", "correct": False},
                                {"text": "U·R", "correct": False},
                                {"text": "P/U", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое магнитное поле?",
                            "answers": [
                                {"text": "Поле, создаваемое движущимися зарядами", "correct": True},
                                {"text": "Поле тяжести", "correct": False},
                                {"text": "Электрическое поле", "correct": False},
                                {"text": "Гравитационное поле", "correct": False},
                            ],
                        },
                        {
                            "text": "Скорость света в вакууме:",
                            "answers": [
                                {"text": "≈ 3·10⁸ м/с", "correct": True},
                                {"text": "≈ 3·10⁵ м/с", "correct": False},
                                {"text": "≈ 3·10³ м/с", "correct": False},
                                {"text": "≈ 340 м/с", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое электрический ток?",
                            "answers": [
                                {"text": "Упорядоченное движение заряженных частиц", "correct": True},
                                {"text": "Движение электронов", "correct": False},
                                {"text": "Поток энергии", "correct": False},
                                {"text": "Магнитное поле", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула электрической мощности:",
                            "answers": [
                                {"text": "P = U·I", "correct": True},
                                {"text": "P = I²·R", "correct": False},
                                {"text": "P = U²/R", "correct": False},
                                {"text": "P = A/t", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое конденсатор?",
                            "answers": [
                                {"text": "Устройство для накопления заряда", "correct": True},
                                {"text": "Источник тока", "correct": False},
                                {"text": "Проводник", "correct": False},
                                {"text": "Резистор", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон Кулона:",
                            "answers": [
                                {"text": "F = k·q₁q₂/r²", "correct": True},
                                {"text": "F = G·m₁m₂/r²", "correct": False},
                                {"text": "F = ma", "correct": False},
                                {"text": "F = B·I·l", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое самоиндукция?",
                            "answers": [
                                {"text": "Возникновение ЭДС в проводнике при изменении тока в нем", "correct": True},
                                {"text": "Индукция в другом проводнике", "correct": False},
                                {"text": "Магнитное поле постоянного магнита", "correct": False},
                                {"text": "Электрическое поле заряда", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула энергии магнитного поля катушки:",
                            "answers": [
                                {"text": "W = L·I²/2", "correct": True},
                                {"text": "W = C·U²/2", "correct": False},
                                {"text": "W = q·U", "correct": False},
                                {"text": "W = F·s", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое трансформатор?",
                            "answers": [
                                {"text": "Устройство для изменения напряжения переменного тока", "correct": True},
                                {"text": "Источник постоянного тока", "correct": False},
                                {"text": "Измерительный прибор", "correct": False},
                                {"text": "Нагревательный элемент", "correct": False},
                            ],
                        },
                        {
                            "text": "Правило левой руки определяет:",
                            "answers": [
                                {"text": "Направление силы, действующей на проводник с током в магнитном поле", "correct": True},
                                {"text": "Направление тока", "correct": False},
                                {"text": "Направление магнитных линий", "correct": False},
                                {"text": "Направление ЭДС индукции", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое электродвигатель?",
                            "answers": [
                                {"text": "Устройство, преобразующее электрическую энергию в механическую", "correct": True},
                                {"text": "Устройство для генерации тока", "correct": False},
                                {"text": "Источник питания", "correct": False},
                                {"text": "Измерительный прибор", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон электромагнитной индукции Фарадея:",
                            "answers": [
                                {"text": "ЭДС индукции пропорциональна скорости изменения магнитного потока", "correct": True},
                                {"text": "F = BIl sinα", "correct": False},
                                {"text": "I = U/R", "correct": False},
                                {"text": "F = kq₁q₂/r²", "correct": False},
                            ],
                        },
                    ],
                },

                "termodinamika": {
                    "title": "Термодинамика",
                    "description": "Законы сохранения энергии и тепловые процессы. Изучите передачу тепла и работу систем.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Первый закон термодинамики - это закон сохранения:",
                            "answers": [
                                {"text": "Энергии", "correct": True},
                                {"text": "Массы", "correct": False},
                                {"text": "Импульса", "correct": False},
                                {"text": "Заряда", "correct": False},
                            ],
                        },
                        {
                            "text": "Абсолютный ноль температуры по шкале Кельвина:",
                            "answers": [
                                {"text": "0 K", "correct": True},
                                {"text": "-273 °C", "correct": False},
                                {"text": "0 °C", "correct": False},
                                {"text": "273 K", "correct": False},
                            ],
                        },
                        {
                            "text": "Процесс, происходящий при постоянной температуре:",
                            "answers": [
                                {"text": "Изотермический", "correct": True},
                                {"text": "Изобарный", "correct": False},
                                {"text": "Изохорный", "correct": False},
                                {"text": "Адиабатный", "correct": False},
                            ],
                        },
                        {
                            "text": "Единица измерения температуры в системе СИ:",
                            "answers": [
                                {"text": "Кельвин (K)", "correct": True},
                                {"text": "Градус Цельсия (°C)", "correct": False},
                                {"text": "Градус Фаренгейта (°F)", "correct": False},
                                {"text": "Джоуль (Дж)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое внутренняя энергия?",
                            "answers": [
                                {"text": "Сумма кинетической и потенциальной энергии молекул", "correct": True},
                                {"text": "Энергия движения тела", "correct": False},
                                {"text": "Энергия положения тела", "correct": False},
                                {"text": "Тепловая энергия", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула первого закона термодинамики:",
                            "answers": [
                                {"text": "ΔU = Q - A", "correct": True},
                                {"text": "Q = cmΔT", "correct": False},
                                {"text": "pV = const", "correct": False},
                                {"text": "A = pΔV", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое адиабатный процесс?",
                            "answers": [
                                {"text": "Процесс без теплообмена с окружающей средой", "correct": True},
                                {"text": "Процесс при постоянном давлении", "correct": False},
                                {"text": "Процесс при постоянном объеме", "correct": False},
                                {"text": "Процесс при постоянной температуре", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула количества теплоты при нагревании:",
                            "answers": [
                                {"text": "Q = cmΔT", "correct": True},
                                {"text": "Q = λm", "correct": False},
                                {"text": "Q = Lm", "correct": False},
                                {"text": "Q = A + ΔU", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое КПД тепловой машины?",
                            "answers": [
                                {"text": "η = (Q₁ - Q₂)/Q₁", "correct": True},
                                {"text": "η = A/Q", "correct": False},
                                {"text": "η = Q/A", "correct": False},
                                {"text": "η = T₁/T₂", "correct": False},
                            ],
                        },
                        {
                            "text": "Второй закон термодинамики утверждает, что:",
                            "answers": [
                                {"text": "Невозможен вечный двигатель второго рода", "correct": True},
                                {"text": "Энергия сохраняется", "correct": False},
                                {"text": "Теплота переходит от горячего к холодному", "correct": False},
                                {"text": "Давление прямо пропорционально температуре", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое энтропия?",
                            "answers": [
                                {"text": "Мера беспорядка в системе", "correct": True},
                                {"text": "Количество теплоты", "correct": False},
                                {"text": "Внутренняя энергия", "correct": False},
                                {"text": "Температура", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула работы газа при изобарном процессе:",
                            "answers": [
                                {"text": "A = pΔV", "correct": True},
                                {"text": "A = 0", "correct": False},
                                {"text": "A = nRT ln(V₂/V₁)", "correct": False},
                                {"text": "A = ΔU", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое теплоемкость?",
                            "answers": [
                                {"text": "Количество теплоты для нагревания на 1 градус", "correct": True},
                                {"text": "Способность проводить тепло", "correct": False},
                                {"text": "Скорость нагревания", "correct": False},
                                {"text": "Температура плавления", "correct": False},
                            ],
                        },
                        {
                            "text": "Уравнение состояния идеального газа:",
                            "answers": [
                                {"text": "pV = νRT", "correct": True},
                                {"text": "p = const", "correct": False},
                                {"text": "V = const", "correct": False},
                                {"text": "T = const", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое цикл Карно?",
                            "answers": [
                                {"text": "Идеальный тепловой цикл с максимальным КПД", "correct": True},
                                {"text": "Процесс нагревания", "correct": False},
                                {"text": "Процесс охлаждения", "correct": False},
                                {"text": "Изотермический процесс", "correct": False},
                            ],
                        },
                    ],
                },

                "optika": {
                    "title": "Оптика",
                    "description": "Геометрическая и волновая оптика, линзы. Узнайте о природе света и его свойствах.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Закон отражения света: угол падения...",
                            "answers": [
                                {"text": "равен углу отражения", "correct": True},
                                {"text": "вдвое больше угла отражения", "correct": False},
                                {"text": "вдвое меньше угла отражения", "correct": False},
                                {"text": "не зависит от угла отражения", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула тонкой линзы: 1/F =",
                            "answers": [
                                {"text": "1/d + 1/f", "correct": True},
                                {"text": "d + f", "correct": False},
                                {"text": "d·f", "correct": False},
                                {"text": "d/f", "correct": False},
                            ],
                        },
                        {
                            "text": "Собирающая линза дает...",
                            "answers": [
                                {"text": "Действительное изображение", "correct": True},
                                {"text": "Мнимое изображение", "correct": False},
                                {"text": "Никакого изображения", "correct": False},
                                {"text": "Только прямое изображение", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое дисперсия света?",
                            "answers": [
                                {"text": "Разложение белого света на спектр", "correct": True},
                                {"text": "Отражение света", "correct": False},
                                {"text": "Преломление света", "correct": False},
                                {"text": "Поглощение света", "correct": False},
                            ],
                        },
                        {
                            "text": "Явление интерференции характерно для...",
                            "answers": [
                                {"text": "Волновых процессов", "correct": True},
                                {"text": "Только света", "correct": False},
                                {"text": "Только звука", "correct": False},
                                {"text": "Только частиц", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон преломления света:",
                            "answers": [
                                {"text": "n₁ sin α = n₂ sin β", "correct": True},
                                {"text": "α = β", "correct": False},
                                {"text": "sin α / sin β = const", "correct": False},
                                {"text": "n = c/v", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фокусное расстояние линзы?",
                            "answers": [
                                {"text": "Расстояние от линзы до фокуса", "correct": True},
                                {"text": "Толщина линзы", "correct": False},
                                {"text": "Диаметр линзы", "correct": False},
                                {"text": "Расстояние до изображения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое дифракция света?",
                            "answers": [
                                {"text": "Огибание светом препятствий", "correct": True},
                                {"text": "Отражение от поверхности", "correct": False},
                                {"text": "Преломление на границе", "correct": False},
                                {"text": "Поглощение веществом", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула увеличения линзы:",
                            "answers": [
                                {"text": "Γ = H/h = f/d", "correct": True},
                                {"text": "Γ = d/f", "correct": False},
                                {"text": "Γ = F/d", "correct": False},
                                {"text": "Γ = h/H", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое поляризация света?",
                            "answers": [
                                {"text": "Упорядочивание колебаний световой волны", "correct": True},
                                {"text": "Изменение цвета", "correct": False},
                                {"text": "Изменение интенсивности", "correct": False},
                                {"text": "Рассеяние света", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое оптическая сила линзы?",
                            "answers": [
                                {"text": "D = 1/F", "correct": True},
                                {"text": "D = F", "correct": False},
                                {"text": "D = F²", "correct": False},
                                {"text": "D = n/F", "correct": False},
                            ],
                        },
                        {
                            "text": "Явление полного внутреннего отражения происходит когда:",
                            "answers": [
                                {"text": "Угол падения больше предельного угла", "correct": True},
                                {"text": "Угол падения равен углу отражения", "correct": False},
                                {"text": "Свет идет из оптически менее плотной среды", "correct": False},
                                {"text": "Происходит дисперсия", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое спектр?",
                            "answers": [
                                {"text": "Совокупность цветов, получаемых при дисперсии", "correct": True},
                                {"text": "Интенсивность света", "correct": False},
                                {"text": "Длина волны", "correct": False},
                                {"text": "Частота колебаний", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула для расчета положения максимумов интерференции:",
                            "answers": [
                                {"text": "d sin φ = kλ", "correct": True},
                                {"text": "Δ = kλ", "correct": False},
                                {"text": "n = c/v", "correct": False},
                                {"text": "1/F = 1/d + 1/f", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое оптическое волокно?",
                            "answers": [
                                {"text": "Тонкий стеклянный волосок для передачи света", "correct": True},
                                {"text": "Линза", "correct": False},
                                {"text": "Призма", "correct": False},
                                {"text": "Зеркало", "correct": False},
                            ],
                        },
                    ],
                },

                "kvantovaya-mehanika": {
                    "title": "Квантовая механика",
                    "description": "Основы квантовой теорий и явления. Изучите мир элементарных частиц и их поведения.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Кто предложил квантовую теорию света?",
                            "answers": [
                                {"text": "Макс Планк", "correct": True},
                                {"text": "Альберт Эйнштейн", "correct": False},
                                {"text": "Нильс Бор", "correct": False},
                                {"text": "Эрвин Шрёдингер", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фотон?",
                            "answers": [
                                {"text": "Квант электромагнитного излучения", "correct": True},
                                {"text": "Частица атомного ядра", "correct": False},
                                {"text": "Элементарная частица с зарядом", "correct": False},
                                {"text": "Волна", "correct": False},
                            ],
                        },
                        {
                            "text": "Принцип неопределенности Гейзенберга связывает...",
                            "answers": [
                                {"text": "Координату и импульс", "correct": True},
                                {"text": "Энергию и время", "correct": False},
                                {"text": "Массу и скорость", "correct": False},
                                {"text": "Заряд и спин", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое волновая функция?",
                            "answers": [
                                {"text": "Функция, описывающая состояние квантовой системы", "correct": True},
                                {"text": "Функция движения", "correct": False},
                                {"text": "Функция энергии", "correct": False},
                                {"text": "Функция вероятности", "correct": False},
                            ],
                        },
                        {
                            "text": "Кто предложил модель атома с электронными орбитами?",
                            "answers": [
                                {"text": "Нильс Бор", "correct": True},
                                {"text": "Эрнест Резерфорд", "correct": False},
                                {"text": "Джозеф Томсон", "correct": False},
                                {"text": "Джеймс Чедвик", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фотоэффект?",
                            "answers": [
                                {"text": "Выбивание электронов из вещества светом", "correct": True},
                                {"text": "Излучение света", "correct": False},
                                {"text": "Поглощение света", "correct": False},
                                {"text": "Рассеяние света", "correct": False},
                            ],
                        },
                        {
                            "text": "Уравнение Шрёдингера описывает:",
                            "answers": [
                                {"text": "Эволюцию волновой функции", "correct": True},
                                {"text": "Движение частиц", "correct": False},
                                {"text": "Распределение энергии", "correct": False},
                                {"text": "Вероятность перехода", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое спин электрона?",
                            "answers": [
                                {"text": "Внутренний момент импульса", "correct": True},
                                {"text": "Заряд", "correct": False},
                                {"text": "Масса", "correct": False},
                                {"text": "Энергия", "correct": False},
                            ],
                        },
                        {
                            "text": "Принцип Паули утверждает, что:",
                            "answers": [
                                {"text": "В атоме не может быть двух электронов с одинаковым набором квантовых чисел", "correct": True},
                                {"text": "Энергия квантуется", "correct": False},
                                {"text": "Частицы ведут себя как волны", "correct": False},
                                {"text": "Измерение влияет на систему", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое квантовая суперпозиция?",
                            "answers": [
                                {"text": "Состояние, являющееся комбинацией других состояний", "correct": True},
                                {"text": "Переход между уровнями", "correct": False},
                                {"text": "Измерение состояния", "correct": False},
                                {"text": "Распад частицы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое туннельный эффект?",
                            "answers": [
                                {"text": "Прохождение частицы через потенциальный барьер", "correct": True},
                                {"text": "Распад ядра", "correct": False},
                                {"text": "Излучение фотона", "correct": False},
                                {"text": "Столкновение частиц", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое квантовая запутанность?",
                            "answers": [
                                {"text": "Корреляция состояний частиц на расстоянии", "correct": True},
                                {"text": "Связь частиц в атоме", "correct": False},
                                {"text": "Взаимодействие полей", "correct": False},
                                {"text": "Распределение энергии", "correct": False},
                            ],
                        },
                        {
                            "text": "Что описывает уравнение E = hν?",
                            "answers": [
                                {"text": "Энергию фотона", "correct": True},
                                {"text": "Энергию электрона в атоме", "correct": False},
                                {"text": "Энергию покоя", "correct": False},
                                {"text": "Кинетическую энергию", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое волна де Бройля?",
                            "answers": [
                                {"text": "Волна, связанная с движущейся частицей", "correct": True},
                                {"text": "Электромагнитная волна", "correct": False},
                                {"text": "Звуковая волна", "correct": False},
                                {"text": "Волна в среде", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое квантовый компьютер?",
                            "answers": [
                                {"text": "Компьютер, использующий квантовые биты (кубиты)", "correct": True},
                                {"text": "Очень быстрый компьютер", "correct": False},
                                {"text": "Компьютер для расчетов", "correct": False},
                                {"text": "Обычный компьютер", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "himiya": {
            "title": "Химия Веществ",
            "topics": {
                "neorganicheskaya-himiya": {
                    "title": "Неорганическая химия",
                    "description": "Металлы, неметаллы, основные классы соединений. Изучите свойства химических элементов.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Самый легкий химический элемент:",
                            "answers": [
                                {"text": "Водород", "correct": True},
                                {"text": "Гелий", "correct": False},
                                {"text": "Кислород", "correct": False},
                                {"text": "Азот", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула воды:",
                            "answers": [
                                {"text": "H₂O", "correct": True},
                                {"text": "H₂O₂", "correct": False},
                                {"text": "CO₂", "correct": False},
                                {"text": "CH₄", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой газ поддерживает горение?",
                            "answers": [
                                {"text": "Кислород", "correct": True},
                                {"text": "Азот", "correct": False},
                                {"text": "Углекислый газ", "correct": False},
                                {"text": "Водород", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое оксиды?",
                            "answers": [
                                {"text": "Соединения элементов с кислородом", "correct": True},
                                {"text": "Соединения с водородом", "correct": False},
                                {"text": "Соли", "correct": False},
                                {"text": "Основания", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула поваренной соли:",
                            "answers": [
                                {"text": "NaCl", "correct": True},
                                {"text": "Na₂CO₃", "correct": False},
                                {"text": "NaOH", "correct": False},
                                {"text": "Na₂SO₄", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кислоты?",
                            "answers": [
                                {"text": "Вещества, отдающие ионы H⁺", "correct": True},
                                {"text": "Вещества, отдающие OH⁻", "correct": False},
                                {"text": "Вещества, состоящие из металла и кислотного остатка", "correct": False},
                                {"text": "Оксиды металлов", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула серной кислоты:",
                            "answers": [
                                {"text": "H₂SO₄", "correct": True},
                                {"text": "HCl", "correct": False},
                                {"text": "HNO₃", "correct": False},
                                {"text": "H₃PO₄", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое щелочи?",
                            "answers": [
                                {"text": "Растворимые основания", "correct": True},
                                {"text": "Нерастворимые основания", "correct": False},
                                {"text": "Кислоты", "correct": False},
                                {"text": "Соли", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула гидроксида натрия:",
                            "answers": [
                                {"text": "NaOH", "correct": True},
                                {"text": "KOH", "correct": False},
                                {"text": "Ca(OH)₂", "correct": False},
                                {"text": "Al(OH)₃", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое амфотерные соединения?",
                            "answers": [
                                {"text": "Соединения, проявляющие и кислотные, и основные свойства", "correct": True},
                                {"text": "Только кислотные свойства", "correct": False},
                                {"text": "Только основные свойства", "correct": False},
                                {"text": "Никаких свойств", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула углекислого газа:",
                            "answers": [
                                {"text": "CO₂", "correct": True},
                                {"text": "CO", "correct": False},
                                {"text": "CH₄", "correct": False},
                                {"text": "C₂H₅OH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое металлы?",
                            "answers": [
                                {"text": "Элементы, отдающие электроны", "correct": True},
                                {"text": "Элементы, принимающие электроны", "correct": False},
                                {"text": "Неметаллы", "correct": False},
                                {"text": "Благородные газы", "correct": False},
                            ],
                        },
                        {
                            "text": "Самый активный металл:",
                            "answers": [
                                {"text": "Франций", "correct": True},
                                {"text": "Калий", "correct": False},
                                {"text": "Натрий", "correct": False},
                                {"text": "Литий", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула аммиака:",
                            "answers": [
                                {"text": "NH₃", "correct": True},
                                {"text": "NH₄OH", "correct": False},
                                {"text": "N₂", "correct": False},
                                {"text": "NO₂", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое инертные газы?",
                            "answers": [
                                {"text": "Газы, не вступающие в реакции", "correct": True},
                                {"text": "Горючие газы", "correct": False},
                                {"text": "Токсичные газы", "correct": False},
                                {"text": "Кислотные газы", "correct": False},
                            ],
                        },
                    ],
                },

                "organicheskaya-himiya": {
                    "title": "Органическая химия",
                    "description": "Углеводороды, спирты, карбоновые кислоты. Изучите мир соединений углерода.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Основной элемент органической химии:",
                            "answers": [
                                {"text": "Углерод", "correct": True},
                                {"text": "Водород", "correct": False},
                                {"text": "Кислород", "correct": False},
                                {"text": "Азот", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула метана:",
                            "answers": [
                                {"text": "CH₄", "correct": True},
                                {"text": "C₂H₆", "correct": False},
                                {"text": "C₃H₈", "correct": False},
                                {"text": "C₂H₄", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гомологи?",
                            "answers": [
                                {"text": "Соединения одного класса, отличающиеся на CH₂", "correct": True},
                                {"text": "Разные классы соединений", "correct": False},
                                {"text": "Неорганические соединения", "correct": False},
                                {"text": "Изомеры", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула этилового спирта:",
                            "answers": [
                                {"text": "C₂H₅OH", "correct": True},
                                {"text": "CH₃OH", "correct": False},
                                {"text": "C₃H₇OH", "correct": False},
                                {"text": "C₄H₉OH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое полимеры?",
                            "answers": [
                                {"text": "Макромолекулы из повторяющихся звеньев", "correct": True},
                                {"text": "Простые вещества", "correct": False},
                                {"text": "Неорганические соли", "correct": False},
                                {"text": "Металлы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое алканы?",
                            "answers": [
                                {"text": "Предельные углеводороды", "correct": True},
                                {"text": "Непредельные углеводороды", "correct": False},
                                {"text": "Ароматические углеводороды", "correct": False},
                                {"text": "Спирты", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула этилена:",
                            "answers": [
                                {"text": "C₂H₄", "correct": True},
                                {"text": "C₂H₆", "correct": False},
                                {"text": "CH₄", "correct": False},
                                {"text": "C₃H₆", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое реакция полимеризации?",
                            "answers": [
                                {"text": "Образование полимера из мономеров", "correct": True},
                                {"text": "Разложение вещества", "correct": False},
                                {"text": "Замещение атомов", "correct": False},
                                {"text": "Окисление", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула бензола:",
                            "answers": [
                                {"text": "C₆H₆", "correct": True},
                                {"text": "C₆H₁₂", "correct": False},
                                {"text": "C₆H₁₄", "correct": False},
                                {"text": "C₆H₅OH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое карбоновые кислоты?",
                            "answers": [
                                {"text": "Органические кислоты, содержащие группу -COOH", "correct": True},
                                {"text": "Неорганические кислоты", "correct": False},
                                {"text": "Спирты", "correct": False},
                                {"text": "Углеводороды", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула уксусной кислоты:",
                            "answers": [
                                {"text": "CH₃COOH", "correct": True},
                                {"text": "HCOOH", "correct": False},
                                {"text": "C₂H₅COOH", "correct": False},
                                {"text": "C₆H₅COOH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое аминокислоты?",
                            "answers": [
                                {"text": "Соединения, содержащие амино- и карбоксильную группы", "correct": True},
                                {"text": "Только аминогруппы", "correct": False},
                                {"text": "Только карбоксильные группы", "correct": False},
                                {"text": "Углеводороды", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое жиры?",
                            "answers": [
                                {"text": "Сложные эфиры глицерина и жирных кислот", "correct": True},
                                {"text": "Простые углеводы", "correct": False},
                                {"text": "Белки", "correct": False},
                                {"text": "Углеводороды", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула глюкозы:",
                            "answers": [
                                {"text": "C₆H₁₂O₆", "correct": True},
                                {"text": "C₁₂H₂₂O₁₁", "correct": False},
                                {"text": "C₆H₆O₆", "correct": False},
                                {"text": "C₆H₁₀O₅", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ферментация?",
                            "answers": [
                                {"text": "Брожение под действием ферментов", "correct": True},
                                {"text": "Горение", "correct": False},
                                {"text": "Окисление", "correct": False},
                                {"text": "Полимеризация", "correct": False},
                            ],
                        },
                    ],
                },

                "biohimiya": {
                    "title": "Биохимия",
                    "description": "Белки, ферменты, метаболизм клетки. Узнайте о химических процессах в живых организмах.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Из чего состоят белки?",
                            "answers": [
                                {"text": "Из аминокислот", "correct": True},
                                {"text": "Из нуклеотидов", "correct": False},
                                {"text": "Из жирных кислот", "correct": False},
                                {"text": "Из моносахаридов", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ферменты?",
                            "answers": [
                                {"text": "Биологические катализаторы", "correct": True},
                                {"text": "Гормоны", "correct": False},
                                {"text": "Витамины", "correct": False},
                                {"text": "Антитела", "correct": False},
                            ],
                        },
                        {
                            "text": "Основной источник энергии в клетке:",
                            "answers": [
                                {"text": "АТФ", "correct": True},
                                {"text": "ДНК", "correct": False},
                                {"text": "Белки", "correct": False},
                                {"text": "Жиры", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фотосинтез?",
                            "answers": [
                                {"text": "Процесс образования органических веществ из CO₂ и воды на свету", "correct": True},
                                {"text": "Дыхание клетки", "correct": False},
                                {"text": "Расщепление глюкозы", "correct": False},
                                {"text": "Синтез белков", "correct": False},
                            ],
                        },
                        {
                            "text": "Мономеры ДНК:",
                            "answers": [
                                {"text": "Нуклеотиды", "correct": True},
                                {"text": "Аминокислоты", "correct": False},
                                {"text": "Моносахариды", "correct": False},
                                {"text": "Жирные кислоты", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ДНК?",
                            "answers": [
                                {"text": "Молекула, хранящая генетическую информацию", "correct": True},
                                {"text": "Молекула, переносящая энергию", "correct": False},
                                {"text": "Молекула, выполняющая каталитическую функцию", "correct": False},
                                {"text": "Молекула, входящая в состав мембран", "correct": False},
                            ],
                        },
                        {
                            "text": "Сколько аминокислот входит в состав белков?",
                            "answers": [
                                {"text": "20", "correct": True},
                                {"text": "10", "correct": False},
                                {"text": "30", "correct": False},
                                {"text": "40", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое РНК?",
                            "answers": [
                                {"text": "Рибонуклеиновая кислота, участвующая в синтезе белков", "correct": True},
                                {"text": "Молекула для хранения информации", "correct": False},
                                {"text": "Энергетическая молекула", "correct": False},
                                {"text": "Структурная молекула", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гликолиз?",
                            "answers": [
                                {"text": "Расщепление глюкозы без участия кислорода", "correct": True},
                                {"text": "Синтез глюкозы", "correct": False},
                                {"text": "Расщепление белков", "correct": False},
                                {"text": "Синтез жиров", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое митохондрии?",
                            "answers": [
                                {"text": "Энергетические станции клетки", "correct": True},
                                {"text": "Хранилища генетической информации", "correct": False},
                                {"text": "Места синтеза белков", "correct": False},
                                {"text": "Органоиды фотосинтеза", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ген?",
                            "answers": [
                                {"text": "Участок ДНК, кодирующий белок", "correct": True},
                                {"text": "Молекула РНК", "correct": False},
                                {"text": "Аминокислота", "correct": False},
                                {"text": "Фермент", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое транскрипция?",
                            "answers": [
                                {"text": "Синтез РНК на матрице ДНК", "correct": True},
                                {"text": "Синтез белка на матрице РНК", "correct": False},
                                {"text": "Репликация ДНК", "correct": False},
                                {"text": "Расщепление ДНК", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое трансляция?",
                            "answers": [
                                {"text": "Синтез белка на рибосомах", "correct": True},
                                {"text": "Синтез РНК", "correct": False},
                                {"text": "Синтез ДНК", "correct": False},
                                {"text": "Расщепление белка", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое витамины?",
                            "answers": [
                                {"text": "Органические вещества, необходимые в малых количествах", "correct": True},
                                {"text": "Энергетические вещества", "correct": False},
                                {"text": "Строительные материалы", "correct": False},
                                {"text": "Ферменты", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гормоны?",
                            "answers": [
                                {"text": "Химические регуляторы функций организма", "correct": True},
                                {"text": "Ферменты", "correct": False},
                                {"text": "Витамины", "correct": False},
                                {"text": "Антитела", "correct": False},
                            ],
                        },
                    ],
                },

                "analiticheskaya-himiya": {
                    "title": "Аналитическая химия",
                    "description": "Методы качественного и количественного анализа. Изучите способы определения состава веществ.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое качественный анализ?",
                            "answers": [
                                {"text": "Определение состава вещества", "correct": True},
                                {"text": "Определение количества вещества", "correct": False},
                                {"text": "Изучение структуры", "correct": False},
                                {"text": "Изучение свойств", "correct": False},
                            ],
                        },
                        {
                            "text": "Индикатор для определения кислотности:",
                            "answers": [
                                {"text": "Лакмус", "correct": True},
                                {"text": "Хлорид бария", "correct": False},
                                {"text": "Нитрат серебра", "correct": False},
                                {"text": "Сульфат меди", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое титрование?",
                            "answers": [
                                {"text": "Метод количественного анализа", "correct": True},
                                {"text": "Метод очистки", "correct": False},
                                {"text": "Метод синтеза", "correct": False},
                                {"text": "Метод разделения", "correct": False},
                            ],
                        },
                        {
                            "text": "Прибор для измерения pH:",
                            "answers": [
                                {"text": "pH-метр", "correct": True},
                                {"text": "Спектрофотометр", "correct": False},
                                {"text": "Хроматограф", "correct": False},
                                {"text": "Рефрактометр", "correct": False},
                            ],
                        },
                        {
                            "text": "Метод разделения смесей на компоненты:",
                            "answers": [
                                {"text": "Хроматография", "correct": True},
                                {"text": "Титрование", "correct": False},
                                {"text": "Спектроскопия", "correct": False},
                                {"text": "Электролиз", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гравиметрический анализ?",
                            "answers": [
                                {"text": "Определение массы компонента", "correct": True},
                                {"text": "Определение объема", "correct": False},
                                {"text": "Определение цвета", "correct": False},
                                {"text": "Определение температуры", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое спектроскопия?",
                            "answers": [
                                {"text": "Изучение взаимодействия вещества с излучением", "correct": True},
                                {"text": "Измерение массы", "correct": False},
                                {"text": "Измерение объема", "correct": False},
                                {"text": "Разделение смесей", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое реагент?",
                            "answers": [
                                {"text": "Вещество, используемое для проведения реакции", "correct": True},
                                {"text": "Продукт реакции", "correct": False},
                                {"text": "Исходное вещество", "correct": False},
                                {"text": "Растворитель", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое осадок?",
                            "answers": [
                                {"text": "Твердое вещество, выпадающее из раствора", "correct": True},
                                {"text": "Жидкость", "correct": False},
                                {"text": "Газ", "correct": False},
                                {"text": "Раствор", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фильтрация?",
                            "answers": [
                                {"text": "Разделение твердого и жидкого", "correct": True},
                                {"text": "Разделение жидкостей", "correct": False},
                                {"text": "Разделение газов", "correct": False},
                                {"text": "Определение массы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое центрифугирование?",
                            "answers": [
                                {"text": "Разделение с помощью центробежной силы", "correct": True},
                                {"text": "Разделение нагреванием", "correct": False},
                                {"text": "Разделение фильтрацией", "correct": False},
                                {"text": "Определение состава", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое молярная концентрация?",
                            "answers": [
                                {"text": "Количество вещества в единице объема", "correct": True},
                                {"text": "Масса в единице объема", "correct": False},
                                {"text": "Объем вещества", "correct": False},
                                {"text": "Число частиц", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое эталон?",
                            "answers": [
                                {"text": "Образец с известными свойствами", "correct": True},
                                {"text": "Прибор для измерений", "correct": False},
                                {"text": "Метод анализа", "correct": False},
                                {"text": "Реактив", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое калибровка?",
                            "answers": [
                                {"text": "Настройка прибора по эталону", "correct": True},
                                {"text": "Проведение анализа", "correct": False},
                                {"text": "Очистка вещества", "correct": False},
                                {"text": "Синтез соединения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое погрешность измерения?",
                            "answers": [
                                {"text": "Отклонение результата от истинного значения", "correct": True},
                                {"text": "Точность прибора", "correct": False},
                                {"text": "Чувствительность метода", "correct": False},
                                {"text": "Скорость анализа", "correct": False},
                            ],
                        },
                    ],
                },

                "fizicheskaya-himiya": {
                    "title": "Физическая химия",
                    "description": "Термодинамика, кинетика, электрохимия. Изучите физические основы химических процессов.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что изучает химическая кинетика?",
                            "answers": [
                                {"text": "Скорость химических реакций", "correct": True},
                                {"text": "Тепловые эффекты", "correct": False},
                                {"text": "Электрохимические процессы", "correct": False},
                                {"text": "Строение веществ", "correct": False},
                            ],
                        },
                        {
                            "text": "Закон действующих масс связывает скорость реакции с...",
                            "answers": [
                                {"text": "Концентрацией реагентов", "correct": True},
                                {"text": "Температурой", "correct": False},
                                {"text": "Давлением", "correct": False},
                                {"text": "Объемом", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое электролиз?",
                            "answers": [
                                {"text": "Разложение вещества электрическим током", "correct": True},
                                {"text": "Образование электрического тока", "correct": False},
                                {"text": "Измерение проводимости", "correct": False},
                                {"text": "Изучение электродов", "correct": False},
                            ],
                        },
                        {
                            "text": "Формула для расчета энергии Гиббса: ΔG =",
                            "answers": [
                                {"text": "ΔH - TΔS", "correct": True},
                                {"text": "ΔH + TΔS", "correct": False},
                                {"text": "ΔH/TΔS", "correct": False},
                                {"text": "TΔS - ΔH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое катализатор?",
                            "answers": [
                                {"text": "Вещество, ускоряющее реакцию", "correct": True},
                                {"text": "Вещество, замедляющее реакцию", "correct": False},
                                {"text": "Продукт реакции", "correct": False},
                                {"text": "Исходное вещество", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое энергия активации?",
                            "answers": [
                                {"text": "Минимальная энергия для начала реакции", "correct": True},
                                {"text": "Энергия продуктов", "correct": False},
                                {"text": "Энергия реагентов", "correct": False},
                                {"text": "Теплота реакции", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое химическое равновесие?",
                            "answers": [
                                {"text": "Состояние, когда скорости прямой и обратной реакций равны", "correct": True},
                                {"text": "Отсутствие реакции", "correct": False},
                                {"text": "Завершение реакции", "correct": False},
                                {"text": "Начало реакции", "correct": False},
                            ],
                        },
                        {
                            "text": "Принцип Ле Шателье:",
                            "answers": [
                                {"text": "Система стремится уменьшить внешнее воздействие", "correct": True},
                                {"text": "Энергия сохраняется", "correct": False},
                                {"text": "Скорость зависит от концентрации", "correct": False},
                                {"text": "Равновесие постоянно", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое электродный потенциал?",
                            "answers": [
                                {"text": "Разность потенциалов на электроде", "correct": True},
                                {"text": "Сила тока", "correct": False},
                                {"text": "Сопротивление", "correct": False},
                                {"text": "Мощность", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гальванический элемент?",
                            "answers": [
                                {"text": "Устройство, преобразующее химическую энергию в электрическую", "correct": True},
                                {"text": "Устройство для электролиза", "correct": False},
                                {"text": "Источник тепла", "correct": False},
                                {"text": "Измерительный прибор", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое адсорбция?",
                            "answers": [
                                {"text": "Поглощение вещества поверхностью", "correct": True},
                                {"text": "Поглощение объемом", "correct": False},
                                {"text": "Выделение вещества", "correct": False},
                                {"text": "Реакция соединения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое коллоидные системы?",
                            "answers": [
                                {"text": "Системы с частицами размером 1-100 нм", "correct": True},
                                {"text": "Истинные растворы", "correct": False},
                                {"text": "Суспензии", "correct": False},
                                {"text": "Чистые вещества", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое поверхностное натяжение?",
                            "answers": [
                                {"text": "Сила, стремящаяся сократить поверхность жидкости", "correct": True},
                                {"text": "Сила тяжести", "correct": False},
                                {"text": "Сила трения", "correct": False},
                                {"text": "Сила давления", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое дисперсные системы?",
                            "answers": [
                                {"text": "Системы с распределенными частицами", "correct": True},
                                {"text": "Однородные системы", "correct": False},
                                {"text": "Чистые вещества", "correct": False},
                                {"text": "Кристаллы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кристаллизация?",
                            "answers": [
                                {"text": "Образование кристаллов из раствора", "correct": True},
                                {"text": "Плавление", "correct": False},
                                {"text": "Испарение", "correct": False},
                                {"text": "Конденсация", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "biologiya": {
            "title": "Биология Жизни",
            "topics": {
                "anatomiya-cheloveka": {
                    "title": "Анатомия человека",
                    "description": "Строение органов и систем организма. Изучите устройство человеческого тела.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Сколько костей в скелете взрослого человека?",
                            "answers": [
                                {"text": "206", "correct": True},
                                {"text": "196", "correct": False},
                                {"text": "216", "correct": False},
                                {"text": "226", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой орган отвечает за фильтрацию крови?",
                            "answers": [
                                {"text": "Почки", "correct": True},
                                {"text": "Печень", "correct": False},
                                {"text": "Сердце", "correct": False},
                                {"text": "Легкие", "correct": False},
                            ],
                        },
                        {
                            "text": "Самый большой орган человека:",
                            "answers": [
                                {"text": "Кожа", "correct": True},
                                {"text": "Печень", "correct": False},
                                {"text": "Легкие", "correct": False},
                                {"text": "Мозг", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой отдел мозга отвечает за координацию движений?",
                            "answers": [
                                {"text": "Мозжечок", "correct": True},
                                {"text": "Большие полушария", "correct": False},
                                {"text": "Ствол мозга", "correct": False},
                                {"text": "Промежуточный мозг", "correct": False},
                            ],
                        },
                        {
                            "text": "Сколько камер в сердце человека?",
                            "answers": [
                                {"text": "4", "correct": True},
                                {"text": "2", "correct": False},
                                {"text": "3", "correct": False},
                                {"text": "5", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой орган вырабатывает инсулин?",
                            "answers": [
                                {"text": "Поджелудочная железа", "correct": True},
                                {"text": "Печень", "correct": False},
                                {"text": "Щитовидная железа", "correct": False},
                                {"text": "Надпочечники", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое диафрагма?",
                            "answers": [
                                {"text": "Дыхательная мышца", "correct": True},
                                {"text": "Часть сердца", "correct": False},
                                {"text": "Костная структура", "correct": False},
                                {"text": "Нервный узел", "correct": False},
                            ],
                        },
                        {
                            "text": "Сколько зубов у взрослого человека?",
                            "answers": [
                                {"text": "32", "correct": True},
                                {"text": "28", "correct": False},
                                {"text": "30", "correct": False},
                                {"text": "36", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой орган производит желчь?",
                            "answers": [
                                {"text": "Печень", "correct": True},
                                {"text": "Желудок", "correct": False},
                                {"text": "Поджелудочная железа", "correct": False},
                                {"text": "Селезенка", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое эпителий?",
                            "answers": [
                                {"text": "Ткань, покрывающая поверхности тела и органов", "correct": True},
                                {"text": "Мышечная ткань", "correct": False},
                                {"text": "Нервная ткань", "correct": False},
                                {"text": "Соединительная ткань", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой орган является частью лимфатической системы?",
                            "answers": [
                                {"text": "Селезенка", "correct": True},
                                {"text": "Печень", "correct": False},
                                {"text": "Поджелудочная железа", "correct": False},
                                {"text": "Почки", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое альвеолы?",
                            "answers": [
                                {"text": "Легочные пузырьки для газообмена", "correct": True},
                                {"text": "Части сердца", "correct": False},
                                {"text": "Клетки крови", "correct": False},
                                {"text": "Нервные клетки", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой витамин вырабатывается в коже под действием солнца?",
                            "answers": [
                                {"text": "Витамин D", "correct": True},
                                {"text": "Витамин C", "correct": False},
                                {"text": "Витамин A", "correct": False},
                                {"text": "Витамин K", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое нейрон?",
                            "answers": [
                                {"text": "Нервная клетка", "correct": True},
                                {"text": "Мышечная клетка", "correct": False},
                                {"text": "Клетка крови", "correct": False},
                                {"text": "Костная клетка", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой гормон регулирует уровень кальция в крови?",
                            "answers": [
                                {"text": "Паратгормон", "correct": True},
                                {"text": "Инсулин", "correct": False},
                                {"text": "Адреналин", "correct": False},
                                {"text": "Тироксин", "correct": False},
                            ],
                        },
                    ],
                },

                "genetika": {
                    "title": "Генетика",
                    "description": "Законы Менделя, мутации, наследственность. Узнайте о передаче наследственной информации.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Кто считается основоположником генетики?",
                            "answers": [
                                {"text": "Грегор Мендель", "correct": True},
                                {"text": "Чарльз Дарвин", "correct": False},
                                {"text": "Джеймс Уотсон", "correct": False},
                                {"text": "Френсис Крик", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ДНК?",
                            "answers": [
                                {"text": "Молекула наследственной информации", "correct": True},
                                {"text": "Белок", "correct": False},
                                {"text": "Углевод", "correct": False},
                                {"text": "Жир", "correct": False},
                            ],
                        },
                        {
                            "text": "Сколько хромосом у человека?",
                            "answers": [
                                {"text": "46", "correct": True},
                                {"text": "23", "correct": False},
                                {"text": "48", "correct": False},
                                {"text": "24", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое мутация?",
                            "answers": [
                                {"text": "Изменение генетического материала", "correct": True},
                                {"text": "Воспроизведение клеток", "correct": False},
                                {"text": "Обмен генами", "correct": False},
                                {"text": "Наследование признаков", "correct": False},
                            ],
                        },
                        {
                            "text": "Как называется первый закон Менделя?",
                            "answers": [
                                {"text": "Закон единообразия гибридов первого поколения", "correct": True},
                                {"text": "Закон расщепления", "correct": False},
                                {"text": "Закон независимого наследования", "correct": False},
                                {"text": "Закон сцепленного наследования", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое аллельные гены?",
                            "answers": [
                                {"text": "Гены, расположенные в одинаковых локусах гомологичных хромосом", "correct": True},
                                {"text": "Разные гены", "correct": False},
                                {"text": "Гены на разных хромосомах", "correct": False},
                                {"text": "Гены, не влияющие на признак", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фенотип?",
                            "answers": [
                                {"text": "Совокупность внешних признаков организма", "correct": True},
                                {"text": "Совокупность генов", "correct": False},
                                {"text": "Хромосомный набор", "correct": False},
                                {"text": "Набор белков", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое генотип?",
                            "answers": [
                                {"text": "Совокупность генов организма", "correct": True},
                                {"text": "Внешние признаки", "correct": False},
                                {"text": "Набор хромосом", "correct": False},
                                {"text": "Количество клеток", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое доминантный признак?",
                            "answers": [
                                {"text": "Признак, проявляющийся в первом поколении", "correct": True},
                                {"text": "Признак, не проявляющийся", "correct": False},
                                {"text": "Признак, зависящий от среды", "correct": False},
                                {"text": "Признак, проявляющийся у мужчин", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рецессивный признак?",
                            "answers": [
                                {"text": "Признак, проявляющийся только в гомозиготном состоянии", "correct": True},
                                {"text": "Признак, всегда проявляющийся", "correct": False},
                                {"text": "Признак, зависящий от пола", "correct": False},
                                {"text": "Признак, не наследуемый", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кодоминирование?",
                            "answers": [
                                {"text": "Оба аллеля проявляются в фенотипе", "correct": True},
                                {"text": "Один аллель доминирует", "correct": False},
                                {"text": "Признак не проявляется", "correct": False},
                                {"text": "Гены на разных хромосомах", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое сцепленное наследование?",
                            "answers": [
                                {"text": "Наследование генов, расположенных на одной хромосоме", "correct": True},
                                {"text": "Независимое наследование", "correct": False},
                                {"text": "Наследование через митохондрии", "correct": False},
                                {"text": "Наследование признаков пола", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое геном?",
                            "answers": [
                                {"text": "Полный набор генов организма", "correct": True},
                                {"text": "Один ген", "correct": False},
                                {"text": "Набор хромосом", "correct": False},
                                {"text": "Белок", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое генная инженерия?",
                            "answers": [
                                {"text": "Изменение генетического материала", "correct": True},
                                {"text": "Изучение генов", "correct": False},
                                {"text": "Наследование", "correct": False},
                                {"text": "Селекция", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое полиплоидия?",
                            "answers": [
                                {"text": "Увеличение числа хромосомных наборов", "correct": True},
                                {"text": "Уменьшение числа хромосом", "correct": False},
                                {"text": "Изменение структуры хромосом", "correct": False},
                                {"text": "Мутация гена", "correct": False},
                            ],
                        },
                    ],
                },

                "ekologiya": {
                    "title": "Экология",
                    "description": "Экосистемы, цепи питания, охрана природы. Изучите взаимодействие организмов со средой.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое биосфера?",
                            "answers": [
                                {"text": "Оболочка Земли, заселенная живыми организмами", "correct": True},
                                {"text": "Атмосфера", "correct": False},
                                {"text": "Гидросфера", "correct": False},
                                {"text": "Литосфера", "correct": False},
                            ],
                        },
                        {
                            "text": "Организмы, производящие органическое вещество:",
                            "answers": [
                                {"text": "Продуценты", "correct": True},
                                {"text": "Консументы", "correct": False},
                                {"text": "Редуценты", "correct": False},
                                {"text": "Детритофаги", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое пищевая цепь?",
                            "answers": [
                                {"text": "Последовательность передачи энергии от одного организма к другому", "correct": True},
                                {"text": "Сеть питания", "correct": False},
                                {"text": "Экосистема", "correct": False},
                                {"text": "Биоценоз", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое симбиоз?",
                            "answers": [
                                {"text": "Взаимовыгодное сожительство организмов", "correct": True},
                                {"text": "Хищничество", "correct": False},
                                {"text": "Паразитизм", "correct": False},
                                {"text": "Конкуренция", "correct": False},
                            ],
                        },
                        {
                            "text": "Основной источник энергии для экосистемы Земли:",
                            "answers": [
                                {"text": "Солнце", "correct": True},
                                {"text": "Геотермальная энергия", "correct": False},
                                {"text": "Ветер", "correct": False},
                                {"text": "Вода", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое биогеоценоз?",
                            "answers": [
                                {"text": "Экосистема на определенной территории", "correct": True},
                                {"text": "Популяция организмов", "correct": False},
                                {"text": "Сообщество растений", "correct": False},
                                {"text": "Группа животных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое консументы первого порядка?",
                            "answers": [
                                {"text": "Травоядные животные", "correct": True},
                                {"text": "Хищники", "correct": False},
                                {"text": "Растения", "correct": False},
                                {"text": "Разлагатели", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое сукцессия?",
                            "answers": [
                                {"text": "Последовательная смена экосистем", "correct": True},
                                {"text": "Рост популяции", "correct": False},
                                {"text": "Миграция животных", "correct": False},
                                {"text": "Изменение климата", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое биоразнообразие?",
                            "answers": [
                                {"text": "Разнообразие видов в экосистеме", "correct": True},
                                {"text": "Количество особей", "correct": False},
                                {"text": "Размер популяции", "correct": False},
                                {"text": "Возраст организмов", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Красная книга?",
                            "answers": [
                                {"text": "Список исчезающих видов", "correct": True},
                                {"text": "Книга о животных", "correct": False},
                                {"text": "Учебник по экологии", "correct": False},
                                {"text": "Каталог растений", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое загрязнение окружающей среды?",
                            "answers": [
                                {"text": "Попадание вредных веществ в природу", "correct": True},
                                {"text": "Рост населения", "correct": False},
                                {"text": "Изменение климата", "correct": False},
                                {"text": "Эволюция видов", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое парниковый эффект?",
                            "answers": [
                                {"text": "Повышение температуры из-за накопления газов", "correct": True},
                                {"text": "Охлаждение атмосферы", "correct": False},
                                {"text": "Увеличение осадков", "correct": False},
                                {"text": "Уменьшение озонового слоя", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое устойчивое развитие?",
                            "answers": [
                                {"text": "Развитие, удовлетворяющее потребности настоящего без ущерба для будущего", "correct": True},
                                {"text": "Быстрое развитие", "correct": False},
                                {"text": "Развитие промышленности", "correct": False},
                                {"text": "Технический прогресс", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое природные ресурсы?",
                            "answers": [
                                {"text": "Компоненты природы, используемые человеком", "correct": True},
                                {"text": "Только полезные ископаемые", "correct": False},
                                {"text": "Только растения и животные", "correct": False},
                                {"text": "Только вода и воздух", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое экологический след?",
                            "answers": [
                                {"text": "Мера воздействия человека на природу", "correct": True},
                                {"text": "Следы животных", "correct": False},
                                {"text": "Загрязнение почвы", "correct": False},
                                {"text": "Вырубка лесов", "correct": False},
                            ],
                        },
                    ],
                },

                "evolyutsiya": {
                    "title": "Эволюция",
                    "description": "Теория Дарвина, естественный отбор, видообразование. Узнайте о развитии жизни на Земле.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Кто автор теории естественного отбора?",
                            "answers": [
                                {"text": "Чарльз Дарвин", "correct": True},
                                {"text": "Жан-Батист Ламарк", "correct": False},
                                {"text": "Карл Линней", "correct": False},
                                {"text": "Альфред Уоллес", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое естественный отбор?",
                            "answers": [
                                {"text": "Процесс выживания наиболее приспособленных особей", "correct": True},
                                {"text": "Искусственное выведение пород", "correct": False},
                                {"text": "Мутация", "correct": False},
                                {"text": "Изоляция", "correct": False},
                            ],
                        },
                        {
                            "text": "Самые древние живые организмы на Земле:",
                            "answers": [
                                {"text": "Прокариоты (бактерии)", "correct": True},
                                {"text": "Простейшие", "correct": False},
                                {"text": "Грибы", "correct": False},
                                {"text": "Растения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое вид?",
                            "answers": [
                                {"text": "Совокупность особей, способных к скрещиванию с плодовитым потомством", "correct": True},
                                {"text": "Группа родов", "correct": False},
                                {"text": "Совокупность семейств", "correct": False},
                                {"text": "Таксономическая единица", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гомологичные органы?",
                            "answers": [
                                {"text": "Органы, имеющие общее происхождение", "correct": True},
                                {"text": "Органы, выполняющие одинаковые функции", "correct": False},
                                {"text": "Рудиментарные органы", "correct": False},
                                {"text": "Атавизмы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое дивергенция?",
                            "answers": [
                                {"text": "Расхождение признаков в процессе эволюции", "correct": True},
                                {"text": "Схождение признаков", "correct": False},
                                {"text": "Постоянство признаков", "correct": False},
                                {"text": "Исчезновение признаков", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое конвергенция?",
                            "answers": [
                                {"text": "Схождение признаков у неродственных видов", "correct": True},
                                {"text": "Расхождение признаков", "correct": False},
                                {"text": "Появление новых признаков", "correct": False},
                                {"text": "Исчезновение признаков", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое атавизмы?",
                            "answers": [
                                {"text": "Признаки, свойственные далеким предкам", "correct": True},
                                {"text": "Новые признаки", "correct": False},
                                {"text": "Признаки других видов", "correct": False},
                                {"text": "Исчезнувшие признаки", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рудименты?",
                            "answers": [
                                {"text": "Органы, утратившие функцию в процессе эволюции", "correct": True},
                                {"text": "Новые органы", "correct": False},
                                {"text": "Полноценные органы", "correct": False},
                                {"text": "Временные органы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое изоляция в эволюции?",
                            "answers": [
                                {"text": "Препятствие для скрещивания популяций", "correct": True},
                                {"text": "Смешение популяций", "correct": False},
                                {"text": "Вымирание видов", "correct": False},
                                {"text": "Появление видов", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое макроэволюция?",
                            "answers": [
                                {"text": "Эволюция на уровне выше вида", "correct": True},
                                {"text": "Эволюция внутри вида", "correct": False},
                                {"text": "Быстрая эволюция", "correct": False},
                                {"text": "Медленная эволюция", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое микроэволюция?",
                            "answers": [
                                {"text": "Эволюция внутри вида", "correct": True},
                                {"text": "Эволюция выше вида", "correct": False},
                                {"text": "Искусственный отбор", "correct": False},
                                {"text": "Смена поколений", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое популяция?",
                            "answers": [
                                {"text": "Группа особей одного вида на определенной территории", "correct": True},
                                {"text": "Разные виды", "correct": False},
                                {"text": "Одна особь", "correct": False},
                                {"text": "Все живые организмы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое адаптация?",
                            "answers": [
                                {"text": "Приспособление к условиям среды", "correct": True},
                                {"text": "Изменение условий", "correct": False},
                                {"text": "Мутация", "correct": False},
                                {"text": "Отбор", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое филогенез?",
                            "answers": [
                                {"text": "Историческое развитие группы организмов", "correct": True},
                                {"text": "Развитие особи", "correct": False},
                                {"text": "Изменение популяции", "correct": False},
                                {"text": "Эволюция экосистемы", "correct": False},
                            ],
                        },
                    ],
                },

                "fiziologiya": {
                    "title": "Физиология",
                    "description": "Функционирование органов и систем. Изучите процессы жизнедеятельности организмов.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Какой гормон регулирует уровень сахара в крови?",
                            "answers": [
                                {"text": "Инсулин", "correct": True},
                                {"text": "Адреналин", "correct": False},
                                {"text": "Тироксин", "correct": False},
                                {"text": "Кортизол", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гомеостаз?",
                            "answers": [
                                {"text": "Поддержание постоянства внутренней среды", "correct": True},
                                {"text": "Рост организма", "correct": False},
                                {"text": "Размножение", "correct": False},
                                {"text": "Движение", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой отдел нервной системы регулирует работу внутренних органов?",
                            "answers": [
                                {"text": "Вегетативная (автономная) нервная система", "correct": True},
                                {"text": "Центральная нервная система", "correct": False},
                                {"text": "Периферическая нервная система", "correct": False},
                                {"text": "Соматическая нервная система", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рефлекс?",
                            "answers": [
                                {"text": "Ответная реакция организма на раздражитель", "correct": True},
                                {"text": "Произвольное движение", "correct": False},
                                {"text": "Мышление", "correct": False},
                                {"text": "Эмоция", "correct": False},
                            ],
                        },
                        {
                            "text": "Какой витамин синтезируется в коже под действием ультрафиолета?",
                            "answers": [
                                {"text": "Витамин D", "correct": True},
                                {"text": "Витамин C", "correct": False},
                                {"text": "Витамин A", "correct": False},
                                {"text": "Витамин K", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое синапс?",
                            "answers": [
                                {"text": "Место контакта нейронов", "correct": True},
                                {"text": "Нервная клетка", "correct": False},
                                {"text": "Мышечное волокно", "correct": False},
                                {"text": "Кровеносный сосуд", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гормон роста?",
                            "answers": [
                                {"text": "Соматотропин", "correct": True},
                                {"text": "Инсулин", "correct": False},
                                {"text": "Адреналин", "correct": False},
                                {"text": "Тироксин", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ферменты пищеварения?",
                            "answers": [
                                {"text": "Белки, расщепляющие пищу", "correct": True},
                                {"text": "Гормоны", "correct": False},
                                {"text": "Витамины", "correct": False},
                                {"text": "Минералы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое кровяное давление?",
                            "answers": [
                                {"text": "Давление крови на стенки сосудов", "correct": True},
                                {"text": "Объем крови", "correct": False},
                                {"text": "Скорость кровотока", "correct": False},
                                {"text": "Вязкость крови", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое иммунитет?",
                            "answers": [
                                {"text": "Защита организма от инфекций", "correct": True},
                                {"text": "Пищеварение", "correct": False},
                                {"text": "Дыхание", "correct": False},
                                {"text": "Кровообращение", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гемоглобин?",
                            "answers": [
                                {"text": "Белок, переносящий кислород в крови", "correct": True},
                                {"text": "Фермент", "correct": False},
                                {"text": "Гормон", "correct": False},
                                {"text": "Витамин", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое метаболизм?",
                            "answers": [
                                {"text": "Обмен веществ в организме", "correct": True},
                                {"text": "Пищеварение", "correct": False},
                                {"text": "Дыхание", "correct": False},
                                {"text": "Выделение", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое осморегуляция?",
                            "answers": [
                                {"text": "Поддержание водно-солевого баланса", "correct": True},
                                {"text": "Регуляция температуры", "correct": False},
                                {"text": "Регуляция давления", "correct": False},
                                {"text": "Регуляция pH", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое терморегуляция?",
                            "answers": [
                                {"text": "Поддержание постоянной температуры тела", "correct": True},
                                {"text": "Регуляция давления", "correct": False},
                                {"text": "Регуляция pH", "correct": False},
                                {"text": "Регуляция осмотического давления", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое нейромедиатор?",
                            "answers": [
                                {"text": "Химическое вещество, передающее сигнал между нейронами", "correct": True},
                                {"text": "Гормон", "correct": False},
                                {"text": "Фермент", "correct": False},
                                {"text": "Витамин", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "geografiya": {
            "title": "География Мира",
            "topics": {
                "fizicheskaya-geografiya": {
                    "title": "Физическая география",
                    "description": "Рельеф, климат, воды, природные зоны. Изучите природные особенности Земли.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Самый большой океан на Земле:",
                            "answers": [
                                {"text": "Тихий океан", "correct": True},
                                {"text": "Атлантический океан", "correct": False},
                                {"text": "Индийский океан", "correct": False},
                                {"text": "Северный Ледовитый океан", "correct": False},
                            ],
                        },
                        {
                            "text": "Самая длинная река в мире:",
                            "answers": [
                                {"text": "Нил", "correct": True},
                                {"text": "Амазонка", "correct": False},
                                {"text": "Янцзы", "correct": False},
                                {"text": "Миссисипи", "correct": False},
                            ],
                        },
                        {
                            "text": "Самая высокая горная система:",
                            "answers": [
                                {"text": "Гималаи", "correct": True},
                                {"text": "Анды", "correct": False},
                                {"text": "Альпы", "correct": False},
                                {"text": "Кордильеры", "correct": False},
                            ],
                        },
                        {
                            "text": "Самый большой остров на Земле:",
                            "answers": [
                                {"text": "Гренландия", "correct": True},
                                {"text": "Новая Гвинея", "correct": False},
                                {"text": "Калимантан", "correct": False},
                                {"text": "Мадагаскар", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое литосфера?",
                            "answers": [
                                {"text": "Твердая оболочка Земли", "correct": True},
                                {"text": "Водная оболочка", "correct": False},
                                {"text": "Воздушная оболочка", "correct": False},
                                {"text": "Живая оболочка", "correct": False},
                            ],
                        },
                        {
                            "text": "Самый глубокий океанический желоб:",
                            "answers": [
                                {"text": "Марианская впадина", "correct": True},
                                {"text": "Пуэрто-Риканский желоб", "correct": False},
                                {"text": "Яванский желоб", "correct": False},
                                {"text": "Перуанско-Чилийский желоб", "correct": False},
                            ],
                        },
                        {
                            "text": "Самая высокая гора в мире:",
                            "answers": [
                                {"text": "Джомолунгма (Эверест)", "correct": True},
                                {"text": "К2", "correct": False},
                                {"text": "Канченджанга", "correct": False},
                                {"text": "Лхоцзе", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое атмосфера?",
                            "answers": [
                                {"text": "Воздушная оболочка Земли", "correct": True},
                                {"text": "Водная оболочка", "correct": False},
                                {"text": "Твердая оболочка", "correct": False},
                                {"text": "Живая оболочка", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое гидросфера?",
                            "answers": [
                                {"text": "Водная оболочка Земли", "correct": True},
                                {"text": "Воздушная оболочка", "correct": False},
                                {"text": "Твердая оболочка", "correct": False},
                                {"text": "Живая оболочка", "correct": False},
                            ],
                        },
                        {
                            "text": "Самый большой материк:",
                            "answers": [
                                {"text": "Евразия", "correct": True},
                                {"text": "Африка", "correct": False},
                                {"text": "Северная Америка", "correct": False},
                                {"text": "Южная Америка", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое широта?",
                            "answers": [
                                {"text": "Расстояние от экватора в градусах", "correct": True},
                                {"text": "Расстояние от нулевого меридиана", "correct": False},
                                {"text": "Высота над уровнем моря", "correct": False},
                                {"text": "Глубина океана", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое долгота?",
                            "answers": [
                                {"text": "Расстояние от нулевого меридиана в градусах", "correct": True},
                                {"text": "Расстояние от экватора", "correct": False},
                                {"text": "Время", "correct": False},
                                {"text": "Температура", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое природная зона?",
                            "answers": [
                                {"text": "Территория с однородными природными условиями", "correct": True},
                                {"text": "Политическое образование", "correct": False},
                                {"text": "Экономический район", "correct": False},
                                {"text": "Историческая область", "correct": False},
                            ],
                        },
                        {
                            "text": "Самая большая пустыня:",
                            "answers": [
                                {"text": "Сахара", "correct": True},
                                {"text": "Гоби", "correct": False},
                                {"text": "Каракумы", "correct": False},
                                {"text": "Аравийская пустыня", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое тектонические плиты?",
                            "answers": [
                                {"text": "Крупные блоки земной коры", "correct": True},
                                {"text": "Горные породы", "correct": False},
                                {"text": "Речные долины", "correct": False},
                                {"text": "Океанические течения", "correct": False},
                            ],
                        },
                    ],
                },

                "ekonomicheskaya-geografiya": {
                    "title": "Экономическая география",
                    "description": "Отрасли хозяйства, ресурсы, транспорт. Узнайте о размещении производства и экономике.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое ВВП?",
                            "answers": [
                                {"text": "Валовой внутренний продукт", "correct": True},
                                {"text": "Валовой национальный продукт", "correct": False},
                                {"text": "Внешний валовой продукт", "correct": False},
                                {"text": "Внутренний валовой потенциал", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель нефти:",
                            "answers": [
                                {"text": "Россия", "correct": True},
                                {"text": "США", "correct": False},
                                {"text": "Саудовская Аравия", "correct": False},
                                {"text": "Китай", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое 'сырьевая экономика'?",
                            "answers": [
                                {"text": "Экономика, основанная на добыче и экспорте сырья", "correct": True},
                                {"text": "Экономика услуг", "correct": False},
                                {"text": "Промышленная экономика", "correct": False},
                                {"text": "Аграрная экономика", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель пшеницы:",
                            "answers": [
                                {"text": "Китай", "correct": True},
                                {"text": "Индия", "correct": False},
                                {"text": "Россия", "correct": False},
                                {"text": "США", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое инфраструктура?",
                            "answers": [
                                {"text": "Комплекс сооружений и служб, обеспечивающих функционирование экономики", "correct": True},
                                {"text": "Производственные предприятия", "correct": False},
                                {"text": "Сельское хозяйство", "correct": False},
                                {"text": "Финансовая система", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое агломерация?",
                            "answers": [
                                {"text": "Скопление населенных пунктов вокруг крупного города", "correct": True},
                                {"text": "Промышленный район", "correct": False},
                                {"text": "Сельская местность", "correct": False},
                                {"text": "Транспортный узел", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель автомобилей:",
                            "answers": [
                                {"text": "Китай", "correct": True},
                                {"text": "США", "correct": False},
                                {"text": "Япония", "correct": False},
                                {"text": "Германия", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое урбанизация?",
                            "answers": [
                                {"text": "Рост доли городского населения", "correct": True},
                                {"text": "Рост сельского населения", "correct": False},
                                {"text": "Развитие промышленности", "correct": False},
                                {"text": "Развитие сельского хозяйства", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший экспортер кофе:",
                            "answers": [
                                {"text": "Бразилия", "correct": True},
                                {"text": "Колумбия", "correct": False},
                                {"text": "Вьетнам", "correct": False},
                                {"text": "Индонезия", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое свободная экономическая зона?",
                            "answers": [
                                {"text": "Территория с льготными экономическими условиями", "correct": True},
                                {"text": "Зона без промышленности", "correct": False},
                                {"text": "Сельскохозяйственный район", "correct": False},
                                {"text": "Природный заповедник", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель риса:",
                            "answers": [
                                {"text": "Китай", "correct": True},
                                {"text": "Индия", "correct": False},
                                {"text": "Индонезия", "correct": False},
                                {"text": "Бангладеш", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое транснациональная корпорация?",
                            "answers": [
                                {"text": "Крупная компания, работающая в нескольких странах", "correct": True},
                                {"text": "Государственное предприятие", "correct": False},
                                {"text": "Малая компания", "correct": False},
                                {"text": "Сельскохозяйственное предприятие", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель стали:",
                            "answers": [
                                {"text": "Китай", "correct": True},
                                {"text": "Индия", "correct": False},
                                {"text": "Япония", "correct": False},
                                {"text": "США", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое логистика?",
                            "answers": [
                                {"text": "Управление потоками товаров и информации", "correct": True},
                                {"text": "Производство товаров", "correct": False},
                                {"text": "Продажа товаров", "correct": False},
                                {"text": "Хранение товаров", "correct": False},
                            ],
                        },
                        {
                            "text": "Страна - крупнейший производитель хлопка:",
                            "answers": [
                                {"text": "Китай", "correct": True},
                                {"text": "Индия", "correct": False},
                                {"text": "США", "correct": False},
                                {"text": "Пакистан", "correct": False},
                            ],
                        },
                    ],
                },

                "politicheskaya-geografiya": {
                    "title": "Политическая география",
                    "description": "Государства, границы, международные отношения. Изучите политическое устройство мира.",
                    "difficulty": "easy",
                    "poster_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Сколько стран в мире (приблизительно)?",
                            "answers": [
                                {"text": "Около 200", "correct": True},
                                {"text": "Около 100", "correct": False},
                                {"text": "Около 150", "correct": False},
                                {"text": "Около 250", "correct": False},
                            ],
                        },
                        {
                            "text": "Самые населенные страны:",
                            "answers": [
                                {"text": "Китай и Индия", "correct": True},
                                {"text": "США и Россия", "correct": False},
                                {"text": "Бразилия и Индонезия", "correct": False},
                                {"text": "Пакистан и Нигерия", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое суверенитет государства?",
                            "answers": [
                                {"text": "Независимость государства во внутренних и внешних делах", "correct": True},
                                {"text": "Территория государства", "correct": False},
                                {"text": "Население государства", "correct": False},
                                {"text": "Правительство государства", "correct": False},
                            ],
                        },
                        {
                            "text": "Столица Казахстана:",
                            "answers": [
                                {"text": "Астана", "correct": True},
                                {"text": "Алматы", "correct": False},
                                {"text": "Нур-Султан", "correct": False},
                                {"text": "Караганда", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ООН?",
                            "answers": [
                                {"text": "Организация Объединенных Наций", "correct": True},
                                {"text": "Организация независимых государств", "correct": False},
                                {"text": "Объединение наций", "correct": False},
                                {"text": "Организация народов", "correct": False},
                            ],
                        },
                        {
                            "text": "Самая большая по площади страна:",
                            "answers": [
                                {"text": "Россия", "correct": True},
                                {"text": "Канада", "correct": False},
                                {"text": "Китай", "correct": False},
                                {"text": "США", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое федерация?",
                            "answers": [
                                {"text": "Государство, состоящее из субъектов с определенной самостоятельностью", "correct": True},
                                {"text": "Унитарное государство", "correct": False},
                                {"text": "Монархия", "correct": False},
                                {"text": "Республика", "correct": False},
                            ],
                        },
                        {
                            "text": "Столица Австралии:",
                            "answers": [
                                {"text": "Канберра", "correct": True},
                                {"text": "Сидней", "correct": False},
                                {"text": "Мельбурн", "correct": False},
                                {"text": "Брисбен", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое НАТО?",
                            "answers": [
                                {"text": "Организация Североатлантического договора", "correct": True},
                                {"text": "Европейский союз", "correct": False},
                                {"text": "ООН", "correct": False},
                                {"text": "ВТО", "correct": False},
                            ],
                        },
                        {
                            "text": "Столица Бразилии:",
                            "answers": [
                                {"text": "Бразилиа", "correct": True},
                                {"text": "Рио-де-Жанейро", "correct": False},
                                {"text": "Сан-Паулу", "correct": False},
                                {"text": "Салвадор", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ЕС?",
                            "answers": [
                                {"text": "Европейский союз", "correct": True},
                                {"text": "Евразийский союз", "correct": False},
                                {"text": "Восточное сообщество", "correct": False},
                                {"text": "Северный союз", "correct": False},
                            ],
                        },
                        {
                            "text": "Столица Турции:",
                            "answers": [
                                {"text": "Анкара", "correct": True},
                                {"text": "Стамбул", "correct": False},
                                {"text": "Измир", "correct": False},
                                {"text": "Бурса", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Шенгенская зона?",
                            "answers": [
                                {"text": "Зона без паспортного контроля в Европе", "correct": True},
                                {"text": "Таможенный союз", "correct": False},
                                {"text": "Военный блок", "correct": False},
                                {"text": "Экономическая зона", "correct": False},
                            ],
                        },
                        {
                            "text": "Столица Канады:",
                            "answers": [
                                {"text": "Оттава", "correct": True},
                                {"text": "Торонто", "correct": False},
                                {"text": "Ванкувер", "correct": False},
                                {"text": "Монреаль", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое АСЕАН?",
                            "answers": [
                                {"text": "Ассоциация государств Юго-Восточной Азии", "correct": True},
                                {"text": "Африканский союз", "correct": False},
                                {"text": "Арабская лига", "correct": False},
                                {"text": "ОПЕК", "correct": False},
                            ],
                        },
                    ],
                },

                "kartografiya": {
                    "title": "Картография",
                    "description": "Виды карт, масштаб, условные знаки. Изучите искусство создания и чтения карт.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое масштаб карты?",
                            "answers": [
                                {"text": "Отношение длины отрезка на карте к длине соответствующего отрезка на местности", "correct": True},
                                {"text": "Размер карты", "correct": False},
                                {"text": "Количество условных знаков", "correct": False},
                                {"text": "Точность карты", "correct": False},
                            ],
                        },
                        {
                            "text": "Масштаб 1:100000 означает, что 1 см на карте равен:",
                            "answers": [
                                {"text": "1 км на местности", "correct": True},
                                {"text": "100 м на местности", "correct": False},
                                {"text": "10 км на местности", "correct": False},
                                {"text": "100 км на местности", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое легенда карты?",
                            "answers": [
                                {"text": "Список условных обозначений", "correct": True},
                                {"text": "История создания карты", "correct": False},
                                {"text": "Название карты", "correct": False},
                                {"text": "Автор карты", "correct": False},
                            ],
                        },
                        {
                            "text": "Линии, соединяющие точки с одинаковой высотой:",
                            "answers": [
                                {"text": "Горизонтали (изогипсы)", "correct": True},
                                {"text": "Изотермы", "correct": False},
                                {"text": "Изобары", "correct": False},
                                {"text": "Меридианы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ГИС?",
                            "answers": [
                                {"text": "Географическая информационная система", "correct": True},
                                {"text": "Глобальная информационная система", "correct": False},
                                {"text": "Государственная информационная система", "correct": False},
                                {"text": "Геологическая информационная система", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое азимут?",
                            "answers": [
                                {"text": "Угол между направлением на север и направлением на объект", "correct": True},
                                {"text": "Расстояние до объекта", "correct": False},
                                {"text": "Высота объекта", "correct": False},
                                {"text": "Широта объекта", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое топографическая карта?",
                            "answers": [
                                {"text": "Крупномасштабная карта с деталями рельефа", "correct": True},
                                {"text": "Мелкомасштабная карта мира", "correct": False},
                                {"text": "Политическая карта", "correct": False},
                                {"text": "Климатическая карта", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое параллели?",
                            "answers": [
                                {"text": "Линии, параллельные экватору", "correct": True},
                                {"text": "Линии, соединяющие полюса", "correct": False},
                                {"text": "Линии высот", "correct": False},
                                {"text": "Линии температуры", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое меридианы?",
                            "answers": [
                                {"text": "Линии, соединяющие полюса", "correct": True},
                                {"text": "Линии, параллельные экватору", "correct": False},
                                {"text": "Линии глубины", "correct": False},
                                {"text": "Линии давления", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое градусная сетка?",
                            "answers": [
                                {"text": "Система параллелей и меридианов", "correct": True},
                                {"text": "Сетка дорог", "correct": False},
                                {"text": "Сетка рек", "correct": False},
                                {"text": "Сетка границ", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое условные знаки?",
                            "answers": [
                                {"text": "Обозначения объектов на карте", "correct": True},
                                {"text": "Надписи на карте", "correct": False},
                                {"text": "Цвета карты", "correct": False},
                                {"text": "Масштаб", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рельеф?",
                            "answers": [
                                {"text": "Совокупность неровностей земной поверхности", "correct": True},
                                {"text": "Климат", "correct": False},
                                {"text": "Почвы", "correct": False},
                                {"text": "Растительность", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое абсолютная высота?",
                            "answers": [
                                {"text": "Высота над уровнем моря", "correct": True},
                                {"text": "Высота над местностью", "correct": False},
                                {"text": "Глубина ниже уровня моря", "correct": False},
                                {"text": "Перепад высот", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое относительная высота?",
                            "answers": [
                                {"text": "Разность высот между точками", "correct": True},
                                {"text": "Высота над уровнем моря", "correct": False},
                                {"text": "Средняя высота", "correct": False},
                                {"text": "Максимальная высота", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое план местности?",
                            "answers": [
                                {"text": "Чертеж небольшого участка местности в крупном масштабе", "correct": True},
                                {"text": "Карта мира", "correct": False},
                                {"text": "Карта страны", "correct": False},
                                {"text": "Схема метро", "correct": False},
                            ],
                        },
                    ],
                },

                "klimatologiya": {
                    "title": "Климатология",
                    "description": "Климатические пояса, погода, атмосфера. Узнайте о закономерностях климата Земли.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Сколько основных климатических поясов на Земле?",
                            "answers": [
                                {"text": "7", "correct": True},
                                {"text": "5", "correct": False},
                                {"text": "3", "correct": False},
                                {"text": "10", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое атмосферное давление?",
                            "answers": [
                                {"text": "Давление атмосферы на земную поверхность", "correct": True},
                                {"text": "Температура воздуха", "correct": False},
                                {"text": "Влажность воздуха", "correct": False},
                                {"text": "Скорость ветра", "correct": False},
                            ],
                        },
                        {
                            "text": "Прибор для измерения атмосферного давления:",
                            "answers": [
                                {"text": "Барометр", "correct": True},
                                {"text": "Термометр", "correct": False},
                                {"text": "Гигрометр", "correct": False},
                                {"text": "Анемометр", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое парниковый эффект?",
                            "answers": [
                                {"text": "Задержание тепла атмосферой Земли", "correct": True},
                                {"text": "Охлаждение атмосферы", "correct": False},
                                {"text": "Увеличение облачности", "correct": False},
                                {"text": "Уменьшение осадков", "correct": False},
                            ],
                        },
                        {
                            "text": "Какие газы вызывают парниковый эффект?",
                            "answers": [
                                {"text": "CO₂, метан, водяной пар", "correct": True},
                                {"text": "Кислород, азот", "correct": False},
                                {"text": "Гелий, неон", "correct": False},
                                {"text": "Озон, фреон", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое циклон?",
                            "answers": [
                                {"text": "Область низкого давления с восходящими потоками воздуха", "correct": True},
                                {"text": "Область высокого давления", "correct": False},
                                {"text": "Постоянный ветер", "correct": False},
                                {"text": "Морское течение", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое антициклон?",
                            "answers": [
                                {"text": "Область высокого давления с нисходящими потоками воздуха", "correct": True},
                                {"text": "Область низкого давления", "correct": False},
                                {"text": "Тропический шторм", "correct": False},
                                {"text": "Муссон", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое муссон?",
                            "answers": [
                                {"text": "Сезонный ветер, меняющий направление", "correct": True},
                                {"text": "Постоянный ветер", "correct": False},
                                {"text": "Вихрь", "correct": False},
                                {"text": "Бриз", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое бриз?",
                            "answers": [
                                {"text": "Ветер, меняющий направление днем и ночью", "correct": True},
                                {"text": "Сезонный ветер", "correct": False},
                                {"text": "Постоянный ветер", "correct": False},
                                {"text": "Ураган", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое влажность воздуха?",
                            "answers": [
                                {"text": "Содержание водяного пара в воздухе", "correct": True},
                                {"text": "Количество осадков", "correct": False},
                                {"text": "Температура воздуха", "correct": False},
                                {"text": "Давление воздуха", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое осадки?",
                            "answers": [
                                {"text": "Вода, выпадающая из атмосферы", "correct": True},
                                {"text": "Водяной пар", "correct": False},
                                {"text": "Облака", "correct": False},
                                {"text": "Туман", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое климат?",
                            "answers": [
                                {"text": "Многолетний режим погоды", "correct": True},
                                {"text": "Погода в данный момент", "correct": False},
                                {"text": "Средняя температура", "correct": False},
                                {"text": "Количество осадков", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое погода?",
                            "answers": [
                                {"text": "Состояние атмосферы в данный момент", "correct": True},
                                {"text": "Многолетний режим", "correct": False},
                                {"text": "Климатические условия", "correct": False},
                                {"text": "Сезонные изменения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое континентальность климата?",
                            "answers": [
                                {"text": "Увеличение амплитуды температур вдали от океана", "correct": True},
                                {"text": "Влияние океана", "correct": False},
                                {"text": "Постоянство температур", "correct": False},
                                {"text": "Высокая влажность", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое альбедо?",
                            "answers": [
                                {"text": "Способность поверхности отражать солнечное излучение", "correct": True},
                                {"text": "Поглощение излучения", "correct": False},
                                {"text": "Излучение тепла", "correct": False},
                                {"text": "Накопление тепла", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },

        "informatika": {
            "title": "Информатика и IT",
            "topics": {
                "algoritmy": {
                    "title": "Алгоритмы",
                    "description": "Основные алгоритмы и структуры данных. Изучите принципы решения вычислительных задач.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое алгоритм?",
                            "answers": [
                                {"text": "Точная последовательность действий для решения задачи", "correct": True},
                                {"text": "Программа на языке программирования", "correct": False},
                                {"text": "Математическая формула", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Какие свойства должен иметь алгоритм?",
                            "answers": [
                                {"text": "Дискретность, определенность, результативность, массовость", "correct": True},
                                {"text": "Скорость, точность, сложность", "correct": False},
                                {"text": "Красота, эффективность, краткость", "correct": False},
                                {"text": "Универсальность, оригинальность", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое сложность алгоритма?",
                            "answers": [
                                {"text": "Оценка времени выполнения в зависимости от размера входных данных", "correct": True},
                                {"text": "Количество строк кода", "correct": False},
                                {"text": "Скорость работы программы", "correct": False},
                                {"text": "Объем используемой памяти", "correct": False},
                            ],
                        },
                        {
                            "text": "Алгоритм сортировки 'пузырьком' имеет сложность:",
                            "answers": [
                                {"text": "O(n²)", "correct": True},
                                {"text": "O(n log n)", "correct": False},
                                {"text": "O(n)", "correct": False},
                                {"text": "O(log n)", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое рекурсия?",
                            "answers": [
                                {"text": "Вызов функцией самой себя", "correct": True},
                                {"text": "Повторение цикла", "correct": False},
                                {"text": "Переменная", "correct": False},
                                {"text": "Условие", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое бинарный поиск?",
                            "answers": [
                                {"text": "Поиск в отсортированном массиве делением пополам", "correct": True},
                                {"text": "Поиск перебором", "correct": False},
                                {"text": "Поиск по хешу", "correct": False},
                                {"text": "Поиск в дереве", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое динамическое программирование?",
                            "answers": [
                                {"text": "Решение задач разбиением на подзадачи с запоминанием результатов", "correct": True},
                                {"text": "Программирование в реальном времени", "correct": False},
                                {"text": "Изменение программы во время выполнения", "correct": False},
                                {"text": "Быстрое программирование", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое 'жадный алгоритм'?",
                            "answers": [
                                {"text": "Алгоритм, выбирающий локально оптимальное решение на каждом шаге", "correct": True},
                                {"text": "Алгоритм, работающий медленно", "correct": False},
                                {"text": "Алгоритм, требующий много памяти", "correct": False},
                                {"text": "Алгоритм для жадных людей", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое структура данных 'стек'?",
                            "answers": [
                                {"text": "LIFO (последним пришел - первым вышел)", "correct": True},
                                {"text": "FIFO (первым пришел - первым вышел)", "correct": False},
                                {"text": "Древовидная структура", "correct": False},
                                {"text": "Граф", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое структура данных 'очередь'?",
                            "answers": [
                                {"text": "FIFO (первым пришел - первым вышел)", "correct": True},
                                {"text": "LIFO (последним пришел - первым вышел)", "correct": False},
                                {"text": "Дерево", "correct": False},
                                {"text": "Список", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое хеш-таблица?",
                            "answers": [
                                {"text": "Структура данных для быстрого поиска по ключу", "correct": True},
                                {"text": "Таблица в базе данных", "correct": False},
                                {"text": "Массив", "correct": False},
                                {"text": "Список", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое бинарное дерево?",
                            "answers": [
                                {"text": "Дерево, где каждый узел имеет не более двух потомков", "correct": True},
                                {"text": "Дерево с многими потомками", "correct": False},
                                {"text": "Список", "correct": False},
                                {"text": "Граф", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое граф?",
                            "answers": [
                                {"text": "Структура из вершин и ребер", "correct": True},
                                {"text": "Диаграмма", "correct": False},
                                {"text": "Таблица", "correct": False},
                                {"text": "Список", "correct": False},
                            ],
                        },
                        {
                            "text": "Алгоритм Дейкстры используется для:",
                            "answers": [
                                {"text": "Нахождения кратчайшего пути в графе", "correct": True},
                                {"text": "Сортировки", "correct": False},
                                {"text": "Поиска", "correct": False},
                                {"text": "Хеширования", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое алгоритм сортировки слиянием?",
                            "answers": [
                                {"text": "Сортировка делением массива пополам и слиянием отсортированных частей", "correct": True},
                                {"text": "Сортировка перестановкой соседних элементов", "correct": False},
                                {"text": "Сортировка выбором минимального элемента", "correct": False},
                                {"text": "Сортировка вставками", "correct": False},
                            ],
                        },
                    ],
                },

                "bazy-dannyh": {
                    "title": "Базы данных",
                    "description": "Реляционные БД, SQL запросы, нормализация. Узнайте о хранении и обработке информации.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое СУБД?",
                            "answers": [
                                {"text": "Система управления базами данных", "correct": True},
                                {"text": "Система управления бизнесом", "correct": False},
                                {"text": "Сервер управления базами", "correct": False},
                                {"text": "Стандарт управления базами", "correct": False},
                            ],
                        },
                        {
                            "text": "Язык запросов к реляционным базам данных:",
                            "answers": [
                                {"text": "SQL", "correct": True},
                                {"text": "Python", "correct": False},
                                {"text": "Java", "correct": False},
                                {"text": "HTML", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое первичный ключ?",
                            "answers": [
                                {"text": "Уникальный идентификатор записи в таблице", "correct": True},
                                {"text": "Ключ доступа к базе", "correct": False},
                                {"text": "Пароль администратора", "correct": False},
                                {"text": "Основная таблица", "correct": False},
                            ],
                        },
                        {
                            "text": "Запрос SELECT используется для:",
                            "answers": [
                                {"text": "Выбора данных из таблицы", "correct": True},
                                {"text": "Вставки данных", "correct": False},
                                {"text": "Обновления данных", "correct": False},
                                {"text": "Удаления данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое нормализация?",
                            "answers": [
                                {"text": "Процесс организации данных для уменьшения избыточности", "correct": True},
                                {"text": "Ускорение работы базы", "correct": False},
                                {"text": "Защита данных", "correct": False},
                                {"text": "Создание резервной копии", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое внешний ключ?",
                            "answers": [
                                {"text": "Поле, ссылающееся на первичный ключ другой таблицы", "correct": True},
                                {"text": "Ключ для шифрования", "correct": False},
                                {"text": "Основной ключ", "correct": False},
                                {"text": "Уникальный ключ", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое транзакция?",
                            "answers": [
                                {"text": "Логическая единица работы с базой данных", "correct": True},
                                {"text": "Передача данных", "correct": False},
                                {"text": "Запрос к базе", "correct": False},
                                {"text": "Создание таблицы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ACID?",
                            "answers": [
                                {"text": "Atomicity, Consistency, Isolation, Durability - свойства транзакций", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Тип базы данных", "correct": False},
                                {"text": "Метод шифрования", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое индекс в базе данных?",
                            "answers": [
                                {"text": "Структура для ускорения поиска", "correct": True},
                                {"text": "Оглавление базы", "correct": False},
                                {"text": "Номер записи", "correct": False},
                                {"text": "Тип данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое NoSQL базы данных?",
                            "answers": [
                                {"text": "Нереляционные базы данных", "correct": True},
                                {"text": "Базы без SQL", "correct": False},
                                {"text": "Старые базы данных", "correct": False},
                                {"text": "Простые базы данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое репликация?",
                            "answers": [
                                {"text": "Копирование данных на несколько серверов", "correct": True},
                                {"text": "Удаление данных", "correct": False},
                                {"text": "Изменение данных", "correct": False},
                                {"text": "Шифрование данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое бэкап (резервное копирование)?",
                            "answers": [
                                {"text": "Создание копии данных на случай потери", "correct": True},
                                {"text": "Удаление старых данных", "correct": False},
                                {"text": "Очистка базы", "correct": False},
                                {"text": "Оптимизация базы", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое денормализация?",
                            "answers": [
                                {"text": "Намеренное нарушение нормальных форм для повышения производительности", "correct": True},
                                {"text": "Ошибка в проектировании", "correct": False},
                                {"text": "Новая нормальная форма", "correct": False},
                                {"text": "Удаление данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое хранимая процедура?",
                            "answers": [
                                {"text": "Программа, хранимая в базе данных", "correct": True},
                                {"text": "Процедура резервного копирования", "correct": False},
                                {"text": "Метод восстановления", "correct": False},
                                {"text": "Тип запроса", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ORM?",
                            "answers": [
                                {"text": "Object-Relational Mapping - преобразование объектов в реляционные данные", "correct": True},
                                {"text": "Язык запросов", "correct": False},
                                {"text": "Тип базы данных", "correct": False},
                                {"text": "Метод индексирования", "correct": False},
                            ],
                        },
                    ],
                },

                "kompyuternye-seti": {
                    "title": "Компьютерные сети",
                    "description": "Протоколы, топологии, сетевое оборудование. Изучите принципы передачи данных.",
                    "difficulty": "medium",
                    "poster_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое IP-адрес?",
                            "answers": [
                                {"text": "Уникальный числовой идентификатор устройства в сети", "correct": True},
                                {"text": "Имя компьютера", "correct": False},
                                {"text": "Пароль сети", "correct": False},
                                {"text": "Протокол передачи", "correct": False},
                            ],
                        },
                        {
                            "text": "Основной протокол передачи данных в интернете:",
                            "answers": [
                                {"text": "TCP/IP", "correct": True},
                                {"text": "HTTP", "correct": False},
                                {"text": "FTP", "correct": False},
                                {"text": "SMTP", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое маршрутизатор?",
                            "answers": [
                                {"text": "Устройство для передачи данных между сетями", "correct": True},
                                {"text": "Устройство для усиления сигнала", "correct": False},
                                {"text": "Сетевой кабель", "correct": False},
                                {"text": "Сервер", "correct": False},
                            ],
                        },
                        {
                            "text": "Топология сети 'звезда':",
                            "answers": [
                                {"text": "Все устройства подключены к центральному узлу", "correct": True},
                                {"text": "Все устройства соединены в кольцо", "correct": False},
                                {"text": "Все устройства соединены друг с другом", "correct": False},
                                {"text": "Устройства соединены цепочкой", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое DNS?",
                            "answers": [
                                {"text": "Система доменных имен", "correct": True},
                                {"text": "Сетевая безопасность", "correct": False},
                                {"text": "Протокол передачи файлов", "correct": False},
                                {"text": "Язык разметки", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое MAC-адрес?",
                            "answers": [
                                {"text": "Физический адрес сетевого устройства", "correct": True},
                                {"text": "IP-адрес", "correct": False},
                                {"text": "Доменное имя", "correct": False},
                                {"text": "Порт", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое HTTP?",
                            "answers": [
                                {"text": "Протокол передачи гипертекста", "correct": True},
                                {"text": "Протокол передачи файлов", "correct": False},
                                {"text": "Протокол электронной почты", "correct": False},
                                {"text": "Протокол безопасного соединения", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое HTTPS?",
                            "answers": [
                                {"text": "Безопасная версия HTTP", "correct": True},
                                {"text": "Быстрая версия HTTP", "correct": False},
                                {"text": "Упрощенная версия HTTP", "correct": False},
                                {"text": "Старая версия HTTP", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое пакет в сети?",
                            "answers": [
                                {"text": "Единица передачи данных", "correct": True},
                                {"text": "Упаковка", "correct": False},
                                {"text": "Программа", "correct": False},
                                {"text": "Файл", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ping?",
                            "answers": [
                                {"text": "Утилита проверки соединения с узлом", "correct": True},
                                {"text": "Протокол", "correct": False},
                                {"text": "Тип сети", "correct": False},
                                {"text": "Оборудование", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое локальная сеть (LAN)?",
                            "answers": [
                                {"text": "Сеть в пределах здания или кампуса", "correct": True},
                                {"text": "Глобальная сеть", "correct": False},
                                {"text": "Городская сеть", "correct": False},
                                {"text": "Личная сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое глобальная сеть (WAN)?",
                            "answers": [
                                {"text": "Сеть, охватывающая большие расстояния", "correct": True},
                                {"text": "Локальная сеть", "correct": False},
                                {"text": "Домашняя сеть", "correct": False},
                                {"text": "Корпоративная сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое Wi-Fi?",
                            "answers": [
                                {"text": "Беспроводная технология соединения", "correct": True},
                                {"text": "Проводная технология", "correct": False},
                                {"text": "Спутниковая связь", "correct": False},
                                {"text": "Мобильная связь", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое брандмауэр (файрвол)?",
                            "answers": [
                                {"text": "Система безопасности, контролирующая сетевой трафик", "correct": True},
                                {"text": "Устройство для подключения к интернету", "correct": False},
                                {"text": "Программа для создания сетей", "correct": False},
                                {"text": "Сетевой кабель", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое VPN?",
                            "answers": [
                                {"text": "Виртуальная частная сеть", "correct": True},
                                {"text": "Очень быстрая сеть", "correct": False},
                                {"text": "Открытая сеть", "correct": False},
                                {"text": "Бесплатная сеть", "correct": False},
                            ],
                        },
                    ],
                },

                "web-razrabotka": {
                    "title": "Web-разработка",
                    "description": "HTML, CSS, JavaScript, фреймворки. Освойте создание веб-приложений и сайтов.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое HTML?",
                            "answers": [
                                {"text": "Язык разметки гипертекста", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Язык стилей", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Для чего используется CSS?",
                            "answers": [
                                {"text": "Для описания внешнего вида HTML-документов", "correct": True},
                                {"text": "Для программирования логики", "correct": False},
                                {"text": "Для работы с базами данных", "correct": False},
                                {"text": "Для создания анимаций", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое JavaScript?",
                            "answers": [
                                {"text": "Язык программирования для создания интерактивных веб-страниц", "correct": True},
                                {"text": "Язык разметки", "correct": False},
                                {"text": "Язык стилей", "correct": False},
                                {"text": "Система управления базами данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое фреймворк?",
                            "answers": [
                                {"text": "Готовый набор инструментов для разработки", "correct": True},
                                {"text": "Операционная система", "correct": False},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое API?",
                            "answers": [
                                {"text": "Интерфейс программирования приложений", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "База данных", "correct": False},
                                {"text": "Протокол передачи", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое DOM?",
                            "answers": [
                                {"text": "Объектная модель документа", "correct": True},
                                {"text": "Тип базы данных", "correct": False},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Сетевой протокол", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое AJAX?",
                            "answers": [
                                {"text": "Асинхронный JavaScript и XML", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Фреймворк", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое cookie?",
                            "answers": [
                                {"text": "Небольшой фрагмент данных, хранимый браузером", "correct": True},
                                {"text": "Вид печенья", "correct": False},
                                {"text": "Тип базы данных", "correct": False},
                                {"text": "Протокол передачи", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое SEO?",
                            "answers": [
                                {"text": "Поисковая оптимизация", "correct": True},
                                {"text": "Система управления", "correct": False},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Тип сервера", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое CMS?",
                            "answers": [
                                {"text": "Система управления контентом", "correct": True},
                                {"text": "Система управления базами", "correct": False},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Тип сайта", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое responsive design?",
                            "answers": [
                                {"text": "Адаптивный дизайн под разные устройства", "correct": True},
                                {"text": "Быстрый дизайн", "correct": False},
                                {"text": "Простой дизайн", "correct": False},
                                {"text": "Красивый дизайн", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое frontend?",
                            "answers": [
                                {"text": "Клиентская часть веб-приложения", "correct": True},
                                {"text": "Серверная часть", "correct": False},
                                {"text": "База данных", "correct": False},
                                {"text": "Сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое backend?",
                            "answers": [
                                {"text": "Серверная часть веб-приложения", "correct": True},
                                {"text": "Клиентская часть", "correct": False},
                                {"text": "Дизайн", "correct": False},
                                {"text": "Сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое REST?",
                            "answers": [
                                {"text": "Архитектурный стиль для веб-сервисов", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Фреймворк", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое JSON?",
                            "answers": [
                                {"text": "Формат обмена данными", "correct": True},
                                {"text": "Язык программирования", "correct": False},
                                {"text": "Протокол", "correct": False},
                                {"text": "База данных", "correct": False},
                            ],
                        },
                    ],
                },

                "kiberbezopasnost": {
                    "title": "Кибербезопасность",
                    "description": "Защита информации, шифрование, атаки. Изучите методы обеспечения информационной безопасности.",
                    "difficulty": "hard",
                    "poster_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "questions": [
                        {
                            "text": "Что такое фишинг?",
                            "answers": [
                                {"text": "Вид мошенничества с целью получения конфиденциальной информации", "correct": True},
                                {"text": "Вид вируса", "correct": False},
                                {"text": "Метод шифрования", "correct": False},
                                {"text": "Протокол безопасности", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое шифрование?",
                            "answers": [
                                {"text": "Преобразование информации для защиты от несанкционированного доступа", "correct": True},
                                {"text": "Сжатие данных", "correct": False},
                                {"text": "Передача данных", "correct": False},
                                {"text": "Хранение данных", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое антивирус?",
                            "answers": [
                                {"text": "Программа для обнаружения и удаления вредоносного ПО", "correct": True},
                                {"text": "Программа для ускорения компьютера", "correct": False},
                                {"text": "Программа для шифрования", "correct": False},
                                {"text": "Программа для резервного копирования", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое брандмауэр?",
                            "answers": [
                                {"text": "Система сетевой безопасности, контролирующая трафик", "correct": True},
                                {"text": "Антивирусная программа", "correct": False},
                                {"text": "Программа шифрования", "correct": False},
                                {"text": "Система резервного копирования", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое двухфакторная аутентификация?",
                            "answers": [
                                {"text": "Метод идентификации с использованием двух разных факторов", "correct": True},
                                {"text": "Два пароля", "correct": False},
                                {"text": "Два логина", "correct": False},
                                {"text": "Два устройства", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое DDoS-атака?",
                            "answers": [
                                {"text": "Распределенная атака на отказ в обслуживании", "correct": True},
                                {"text": "Кража данных", "correct": False},
                                {"text": "Взлом пароля", "correct": False},
                                {"text": "Заражение вирусом", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое троян?",
                            "answers": [
                                {"text": "Вредоносная программа, маскирующаяся под легитимную", "correct": True},
                                {"text": "Вирус", "correct": False},
                                {"text": "Червь", "correct": False},
                                {"text": "Рекламное ПО", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое ботнет?",
                            "answers": [
                                {"text": "Сеть зараженных компьютеров, управляемых злоумышленником", "correct": True},
                                {"text": "Сеть ботов", "correct": False},
                                {"text": "Социальная сеть", "correct": False},
                                {"text": "Игровая сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое уязвимость?",
                            "answers": [
                                {"text": "Слабое место в системе безопасности", "correct": True},
                                {"text": "Ошибка в программе", "correct": False},
                                {"text": "Проблема с оборудованием", "correct": False},
                                {"text": "Недостаток памяти", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое патч?",
                            "answers": [
                                {"text": "Обновление для исправления уязвимостей", "correct": True},
                                {"text": "Новая программа", "correct": False},
                                {"text": "Резервная копия", "correct": False},
                                {"text": "Антивирус", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое социальная инженерия?",
                            "answers": [
                                {"text": "Манипулирование людьми для получения информации", "correct": True},
                                {"text": "Программирование", "correct": False},
                                {"text": "Инженерия общества", "correct": False},
                                {"text": "Социальные сети", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое VPN?",
                            "answers": [
                                {"text": "Виртуальная частная сеть для безопасного соединения", "correct": True},
                                {"text": "Очень быстрая сеть", "correct": False},
                                {"text": "Открытая сеть", "correct": False},
                                {"text": "Бесплатная сеть", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое криптография?",
                            "answers": [
                                {"text": "Наука о шифровании информации", "correct": True},
                                {"text": "Изучение криптовалют", "correct": False},
                                {"text": "Написание кодов", "correct": False},
                                {"text": "Создание паролей", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое биометрия?",
                            "answers": [
                                {"text": "Идентификация по уникальным биологическим признакам", "correct": True},
                                {"text": "Измерение организма", "correct": False},
                                {"text": "Медицинское исследование", "correct": False},
                                {"text": "Генетический анализ", "correct": False},
                            ],
                        },
                        {
                            "text": "Что такое инцидент информационной безопасности?",
                            "answers": [
                                {"text": "Событие, нарушающее безопасность информации", "correct": True},
                                {"text": "Обычное событие", "correct": False},
                                {"text": "Тестирование безопасности", "correct": False},
                                {"text": "Обновление системы", "correct": False},
                            ],
                        },
                    ],
                },
            },
        },
    }

    # --- Создание в базе ---
    for subject_slug, subject_info in subjects_data.items():
        subject, _ = Subject.objects.get_or_create(
            slug=subject_slug,
            defaults={"title": subject_info["title"]},
        )

        for topic_slug, topic_info in subject_info["topics"].items():
            topic, _ = Topic.objects.get_or_create(
                subject=subject,
                slug=topic_slug,
                defaults={
                    "title": topic_info["title"],
                    "description": topic_info["description"],
                    "difficulty": topic_info.get("difficulty", "medium"),
                    "poster_url": topic_info.get("poster_url", ""),
                },
            )

            for q_index, q in enumerate(topic_info["questions"], start=1):
                question = TopicQuestion.objects.create(
                    topic=topic,
                    text=q["text"],
                    order=q_index,
                )

                for a_index, a in enumerate(q["answers"], start=1):
                    TopicAnswer.objects.create(
                        question=question,
                        text=a["text"],
                        is_correct=a["correct"],
                        order=a_index,
                    )

    print(f"✅ Создано {Subject.objects.count()} предметов, {Topic.objects.count()} тем и {TopicQuestion.objects.count()} вопросов!")