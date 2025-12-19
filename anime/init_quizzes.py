# anime/init_quizzes.py
from .models import Anime, Quiz, QuizQuestion, QuizAnswer

def create_complete_quizzes():
    """Создание полных викторин для всех аниме с вопросами и ответами"""
    
    print("Создание викторин для всех аниме...")
    
    # Если викторины уже существуют, пропускаем
    if Quiz.objects.exists():
        print("Викторины уже существуют. Используйте update_quizzes() для обновления.")
        return
    
    # Словарь с викторинами для каждого аниме
    quizzes_data = {
        # 1. Атака титанов
        'ataka-titanov': {
            'quiz_slug': 'quiz-ataka-titanov',
            'questions': [
                {
                    'text': 'Как зовут главного героя Атаки титанов?',
                    'answers': [
                        {'text': 'Эрен Йегер', 'correct': True},
                        {'text': 'Микаса Аккерман', 'correct': False},
                        {'text': 'Армин Арлерт', 'correct': False},
                        {'text': 'Леви Аккерман', 'correct': False}
                    ]
                },
                {
                    'text': 'Во что превращается Эрен Йегер?',
                    'answers': [
                        {'text': 'В Атакующего титана', 'correct': True},
                        {'text': 'В Колоссального титана', 'correct': False},
                        {'text': 'В Бронированного титана', 'correct': False},
                        {'text': 'В Звероподобного титана', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут приемную сестру Эрена?',
                    'answers': [
                        {'text': 'Микаса Аккерман', 'correct': True},
                        {'text': 'Анни Леонхарт', 'correct': False},
                        {'text': 'Саша Браус', 'correct': False},
                        {'text': 'Иста Браун', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой корпус возглавляет Эрвин Смит?',
                    'answers': [
                        {'text': 'Разведывательный корпус', 'correct': True},
                        {'text': 'Военная полиция', 'correct': False},
                        {'text': 'Гарнизонный корпус', 'correct': False},
                        {'text': 'Корпус стражей', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто является Колоссальным титаном?',
                    'answers': [
                        {'text': 'Бертольт Гувер', 'correct': True},
                        {'text': 'Райнер Браун', 'correct': False},
                        {'text': 'Энни Леонхарт', 'correct': False},
                        {'text': 'Зик Йегер', 'correct': False}
                    ]
                },
                {
                    'text': 'Сколько стен защищает человечество?',
                    'answers': [
                        {'text': 'Три стены', 'correct': True},
                        {'text': 'Две стены', 'correct': False},
                        {'text': 'Четыре стены', 'correct': False},
                        {'text': 'Пять стен', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой титан обладает способностью затвердевать?',
                    'answers': [
                        {'text': 'Бронированный титан', 'correct': True},
                        {'text': 'Атакующий титан', 'correct': False},
                        {'text': 'Колоссальный титан', 'correct': False},
                        {'text': 'Звероподобный титан', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто является основателем Реставрации Елены?',
                    'answers': [
                        {'text': 'Зик Йегер', 'correct': True},
                        {'text': 'Эрен Йегер', 'correct': False},
                        {'text': 'Гриша Йегер', 'correct': False},
                        {'text': 'Карла Йегер', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется техника перемещения с помощью маневренного снаряжения?',
                    'answers': [
                        {'text': '3D маневренное снаряжение', 'correct': True},
                        {'text': 'Аэро-двигатель', 'correct': False},
                        {'text': 'Титановый полет', 'correct': False},
                        {'text': 'Воздушный джет', 'correct': False}
                    ]
                },
                {
                    'text': 'Что находится в подвале дома Гриши Йегера?',
                    'answers': [
                        {'text': 'Правда об истории мира и титанах', 'correct': True},
                        {'text': 'Оружие против титанов', 'correct': False},
                        {'text': 'Золото и сокровища', 'correct': False},
                        {'text': 'Тетрадь с записями о титанах', 'correct': False}
                    ]
                }
            ]
        },
        
        # 2. Клинок рассекающий демонов
        'klinok-rassekayushchiy-demonov': {
            'quiz_slug': 'quiz-klinok-rassekayushchiy-demonov',
            'questions': [
                {
                    'text': 'Как зовут главного героя, ставшего истребителем демонов?',
                    'answers': [
                        {'text': 'Танджиро Камадо', 'correct': True},
                        {'text': 'Зеницу Агацума', 'correct': False},
                        {'text': 'Иноскэ Хашибира', 'correct': False},
                        {'text': 'Кёдзюро Рэнгоку', 'correct': False}
                    ]
                },
                {
                    'text': 'Во что превратилась сестра Танджиро?',
                    'answers': [
                        {'text': 'В демона', 'correct': True},
                        {'text': 'В человека', 'correct': False},
                        {'text': 'В бога', 'correct': False},
                        {'text': 'В животное', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой дыхательный стиль использует Танджиро?',
                    'answers': [
                        {'text': 'Дыхание воды', 'correct': True},
                        {'text': 'Дыхание огня', 'correct': False},
                        {'text': 'Дыхание грома', 'correct': False},
                        {'text': 'Дыхание змеи', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто обучил Танджиро технике дыхания?',
                    'answers': [
                        {'text': 'Сакаджи Урокодаки', 'correct': True},
                        {'text': 'Кёдзюро Рэнгоку', 'correct': False},
                        {'text': 'Тенге Узуй', 'correct': False},
                        {'text': 'Гию Томиока', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой меч использует Танджиро?',
                    'answers': [
                        {'text': 'Нитиринское лезвие', 'correct': True},
                        {'text': 'Водяной меч', 'correct': False},
                        {'text': 'Огненный клинок', 'correct': False},
                        {'text': 'Черный меч', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто является главным антагонистом сериала?',
                    'answers': [
                        {'text': 'Музан Кибуцуджи', 'correct': True},
                        {'text': 'Руй', 'correct': False},
                        {'text': 'Энму', 'correct': False},
                        {'text': 'Аказа', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой демон является верхним рангом 1?',
                    'answers': [
                        {'text': 'Кокушибо', 'correct': True},
                        {'text': 'Дума', 'correct': False},
                        {'text': 'Аказа', 'correct': False},
                        {'text': 'Хантенгу', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется организация истребителей демонов?',
                    'answers': [
                        {'text': 'Корпус истребителей демонов', 'correct': True},
                        {'text': 'Братство демонов', 'correct': False},
                        {'text': 'Орден охотников', 'correct': False},
                        {'text': 'Лига уничтожителей', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой цвет имеет клинок Танджиро?',
                    'answers': [
                        {'text': 'Черный', 'correct': True},
                        {'text': 'Красный', 'correct': False},
                        {'text': 'Синий', 'correct': False},
                        {'text': 'Зеленый', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто спас Танджиро и Незуко в самом начале?',
                    'answers': [
                        {'text': 'Гию Томиока', 'correct': True},
                        {'text': 'Сабуро', 'correct': False},
                        {'text': 'Урокодаки', 'correct': False},
                        {'text': 'Макумо', 'correct': False}
                    ]
                }
            ]
        },
        
        # 3. Доктор Стоун
        'doktor-stoun': {
            'quiz_slug': 'quiz-doktor-stoun',
            'questions': [
                {
                    'text': 'Как зовут главного героя, гениального ученого?',
                    'answers': [
                        {'text': 'Сенку Ишигами', 'correct': True},
                        {'text': 'Таджуро Оки', 'correct': False},
                        {'text': 'Ген Асагири', 'correct': False},
                        {'text': 'Кохан', 'correct': False}
                    ]
                },
                {
                    'text': 'Что превратило все человечество в камень?',
                    'answers': [
                        {'text': 'Таинственный зеленый свет', 'correct': True},
                        {'text': 'Вирус', 'correct': False},
                        {'text': 'Ядерная война', 'correct': False},
                        {'text': 'Инопланетяне', 'correct': False}
                    ]
                },
                {
                    'text': 'Сколько лет человечество пробыло в каменном состоянии?',
                    'answers': [
                        {'text': '3700 лет', 'correct': True},
                        {'text': '1000 лет', 'correct': False},
                        {'text': '5000 лет', 'correct': False},
                        {'text': '2000 лет', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется деревня, которую основал Сенку?',
                    'answers': [
                        {'text': 'Царство науки', 'correct': True},
                        {'text': 'Деревня каменного века', 'correct': False},
                        {'text': 'Научная община', 'correct': False},
                        {'text': 'Камнеград', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто является лидером Империи Могущества?',
                    'answers': [
                        {'text': 'Цукаса Сисио', 'correct': True},
                        {'text': 'Хёга', 'correct': False},
                        {'text': 'Укё', 'correct': False},
                        {'text': 'Модзи', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой напиток Сенку воссоздает первым?',
                    'answers': [
                        {'text': 'Кока-кола', 'correct': True},
                        {'text': 'Чай', 'correct': False},
                        {'text': 'Кофе', 'correct': False},
                        {'text': 'Сок', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут лучшего друга Сенку?',
                    'answers': [
                        {'text': 'Таджуро Оки', 'correct': True},
                        {'text': 'Кохан', 'correct': False},
                        {'text': 'Ген', 'correct': False},
                        {'text': 'Юдзариха', 'correct': False}
                    ]
                },
                {
                    'text': 'Что означает крик Сенку "10 миллиардов процентов!"?',
                    'answers': [
                        {'text': 'Его уверенность в успехе', 'correct': True},
                        {'text': 'Процент успеха эксперимента', 'correct': False},
                        {'text': 'Мощность изобретения', 'correct': False},
                        {'text': 'Количество возможных вариантов', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое первое серьезное оружие создает Сенку?',
                    'answers': [
                        {'text': 'Пушка', 'correct': True},
                        {'text': 'Меч', 'correct': False},
                        {'text': 'Лук', 'correct': False},
                        {'text': 'Копье', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто помогает Сенку восстановить науку?',
                    'answers': [
                        {'text': 'Юдзариха Огава', 'correct': True},
                        {'text': 'Кохан', 'correct': False},
                        {'text': 'Ген', 'correct': False},
                        {'text': 'Таэ', 'correct': False}
                    ]
                }
            ]
        },
        
        # 4. Тетрадь смерти
        'tetrad-smerti': {
            'quiz_slug': 'quiz-tetrad-smerti',
            'questions': [
                {
                    'text': 'Как зовут главного героя, нашедшего Тетрадь смерти?',
                    'answers': [
                        {'text': 'Лайт Ягами', 'correct': True},
                        {'text': 'L', 'correct': False},
                        {'text': 'Миса Амане', 'correct': False},
                        {'text': 'Рюк', 'correct': False}
                    ]
                },
                {
                    'text': 'Что происходит, если написать имя человека в Тетради смерти?',
                    'answers': [
                        {'text': 'Человек умирает', 'correct': True},
                        {'text': 'Человек становится бессмертным', 'correct': False},
                        {'text': 'Человек теряет память', 'correct': False},
                        {'text': 'Человек заболевает', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой псевдоним использует Лайт?',
                    'answers': [
                        {'text': 'Кира', 'correct': True},
                        {'text': 'L', 'correct': False},
                        {'text': 'Рюк', 'correct': False},
                        {'text': 'Смерть', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой L?',
                    'answers': [
                        {'text': 'Легендарный детектив', 'correct': True},
                        {'text': 'Бог смерти', 'correct': False},
                        {'text': 'Полицейский', 'correct': False},
                        {'text': 'Друг Лайта', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут бога смерти, который потерял свою Тетрадь смерти?',
                    'answers': [
                        {'text': 'Рюк', 'correct': True},
                        {'text': 'Рем', 'correct': False},
                        {'text': 'Сидо', 'correct': False},
                        {'text': 'Джелус', 'correct': False}
                    ]
                },
                {
                    'text': 'Что нужно знать, чтобы убить человека с помощью Тетради смерти?',
                    'answers': [
                        {'text': 'Лицо и имя', 'correct': True},
                        {'text': 'Только имя', 'correct': False},
                        {'text': 'Только лицо', 'correct': False},
                        {'text': 'Дату рождения', 'correct': False}
                    ]
                },
                {
                    'text': 'Какую должность занимает отец Лайта?',
                    'answers': [
                        {'text': 'Начальник полиции', 'correct': True},
                        {'text': 'Детектив', 'correct': False},
                        {'text': 'Прокурор', 'correct': False},
                        {'text': 'Министр', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто становится второй Кирой?',
                    'answers': [
                        {'text': 'Миса Амане', 'correct': True},
                        {'text': 'L', 'correct': False},
                        {'text': 'Рюк', 'correct': False},
                        {'text': 'Мелло', 'correct': False}
                    ]
                },
                {
                    'text': 'Что происходит с человеком, который владеет Тетрадью смерти?',
                    'answers': [
                        {'text': 'Он не попадает в рай или ад', 'correct': True},
                        {'text': 'Он становится бессмертным', 'correct': False},
                        {'text': 'Он теряет душу', 'correct': False},
                        {'text': 'Он становится богом смерти', 'correct': False}
                    ]
                },
                {
                    'text': 'Как заканчивается аниме?',
                    'answers': [
                        {'text': 'Лайт умирает', 'correct': True},
                        {'text': 'Лайт побеждает', 'correct': False},
                        {'text': 'L побеждает', 'correct': False},
                        {'text': 'Тетрадь уничтожена', 'correct': False}
                    ]
                }
            ]
        },
        
        # 5. Хантер х хантер
        'hanter-h-hanter': {
            'quiz_slug': 'quiz-hanter-h-hanter',
            'questions': [
                {
                    'text': 'Как зовут главного героя, ищущего своего отца?',
                    'answers': [
                        {'text': 'Гон Фрикс', 'correct': True},
                        {'text': 'Киллуа Золдик', 'correct': False},
                        {'text': 'Леорио Парадинайт', 'correct': False},
                        {'text': 'Курапика', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Джин Фрикс?',
                    'answers': [
                        {'text': 'Отец Гона', 'correct': True},
                        {'text': 'Дед Гона', 'correct': False},
                        {'text': 'Брат Гона', 'correct': False},
                        {'text': 'Дядя Гона', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое Нэн?',
                    'answers': [
                        {'text': 'Жизненная энергия', 'correct': True},
                        {'text': 'Оружие', 'correct': False},
                        {'text': 'Магия', 'correct': False},
                        {'text': 'Техника боя', 'correct': False}
                    ]
                },
                {
                    'text': 'Какая способность у Гона?',
                    'answers': [
                        {'text': 'Дзюнкен (камень-ножницы-бумага)', 'correct': True},
                        {'text': 'Богскорость', 'correct': False},
                        {'text': 'Цепь заключения', 'correct': False},
                        {'text': 'Лапа зверя', 'correct': False}
                    ]
                },
                {
                    'text': 'Из какой семьи происходит Киллуа?',
                    'answers': [
                        {'text': 'Семья наемных убийц Золдик', 'correct': True},
                        {'text': 'Семья охотников', 'correct': False},
                        {'text': 'Королевская семья', 'correct': False},
                        {'text': 'Семья магов', 'correct': False}
                    ]
                },
                {
                    'text': 'Что хочет найти Курапика?',
                    'answers': [
                        {'text': 'Банду Паука', 'correct': True},
                        {'text': 'Сокровище', 'correct': False},
                        {'text': 'Своего отца', 'correct': False},
                        {'text': 'Лекарство', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Хисока?',
                    'answers': [
                        {'text': 'Сильный охотник и маг', 'correct': True},
                        {'text': 'Учитель Гона', 'correct': False},
                        {'text': 'Отец Киллуа', 'correct': False},
                        {'text': 'Лидер Пауков', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется организация вольных охотников?',
                    'answers': [
                        {'text': 'Труппа Призраков (Пауки)', 'correct': True},
                        {'text': 'Орден охотников', 'correct': False},
                        {'text': 'Братство вольных', 'correct': False},
                        {'text': 'Лига искателей', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое Greed Island?',
                    'answers': [
                        {'text': 'Игра, созданная Джином', 'correct': True},
                        {'text': 'Остров сокровищ', 'correct': False},
                        {'text': 'Город охотников', 'correct': False},
                        {'text': 'Тюрьма для преступников', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто является лидером Труппы Призраков?',
                    'answers': [
                        {'text': 'Чролло Люсифер', 'correct': True},
                        {'text': 'Хисока', 'correct': False},
                        {'text': 'Франклин', 'correct': False},
                        {'text': 'Мачи', 'correct': False}
                    ]
                }
            ]
        },
        
        # 6. Поднятие уровня в одиночку
        'podnyatie-urovnya-v-odinochku': {
            'quiz_slug': 'quiz-podnyatie-urovnya-v-odinochku',
            'questions': [
                {
                    'text': 'Как зовут главного героя, самого слабого охотника?',
                    'answers': [
                        {'text': 'Сун Джин Ву', 'correct': True},
                        {'text': 'Чхве Джон Ин', 'correct': False},
                        {'text': 'Ю Джин Хо', 'correct': False},
                        {'text': 'Ким Док Чхоль', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется способность Джин Ву?',
                    'answers': [
                        {'text': 'Система игрока', 'correct': True},
                        {'text': 'Король теней', 'correct': False},
                        {'text': 'Владыка демонов', 'correct': False},
                        {'text': 'Мастер меча', 'correct': False}
                    ]
                },
                {
                    'text': 'Что получает Джин Ву после смерти в первом подземелье?',
                    'answers': [
                        {'text': 'Второй шанс и систему', 'correct': True},
                        {'text': 'Новое оружие', 'correct': False},
                        {'text': 'Деньги', 'correct': False},
                        {'text': 'Новых друзей', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут отца Джин Ву?',
                    'answers': [
                        {'text': 'Сун Иль Хван', 'correct': True},
                        {'text': 'Пак Хи Джун', 'correct': False},
                        {'text': 'Ли Джон Хёк', 'correct': False},
                        {'text': 'Ким Сок Чжин', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое первое подземелье проходит Джин Ву?',
                    'answers': [
                        {'text': 'Подземелье двойных подземелий', 'correct': True},
                        {'text': 'Логово красных гоблинов', 'correct': False},
                        {'text': 'Пещера гигантов', 'correct': False},
                        {'text': 'Храм демонов', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Беру?',
                    'answers': [
                        {'text': 'Тень, служащая Джин Ву', 'correct': True},
                        {'text': 'Друг детства', 'correct': False},
                        {'text': 'Учитель', 'correct': False},
                        {'text': 'Отец', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой ранк охотника был у Джин Ву в начале?',
                    'answers': [
                        {'text': 'E-ранк', 'correct': True},
                        {'text': 'D-ранк', 'correct': False},
                        {'text': 'C-ранк', 'correct': False},
                        {'text': 'B-ранк', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Ча Хэ Ин?',
                    'answers': [
                        {'text': 'Охотник A-ранка, интересующаяся Джин Ву', 'correct': True},
                        {'text': 'Сестра Джин Ву', 'correct': False},
                        {'text': 'Мать Джин Ву', 'correct': False},
                        {'text': 'Учительница Джин Ву', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Врата"?',
                    'answers': [
                        {'text': 'Порталы в подземелья', 'correct': True},
                        {'text': 'Оружие охотников', 'correct': False},
                        {'text': 'Техника перемещения', 'correct': False},
                        {'text': 'Магические барьеры', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой класс выбирает Джин Ву?',
                    'answers': [
                        {'text': 'Некромант', 'correct': True},
                        {'text': 'Воин', 'correct': False},
                        {'text': 'Маг', 'correct': False},
                        {'text': 'Лучник', 'correct': False}
                    ]
                }
            ]
        },
        
        # 7. Реанкарнация безработного
        'reankarnatsiya-bezrabotnogo': {
            'quiz_slug': 'quiz-reankarnatsiya-bezrabotnogo',
            'questions': [
                {
                    'text': 'Как зовут главного героя после перерождения?',
                    'answers': [
                        {'text': 'Рудеус Грейрат', 'correct': True},
                        {'text': 'Эрис Бореас Грейрат', 'correct': False},
                        {'text': 'Рокси Мигрудия', 'correct': False},
                        {'text': 'Сильфиетт', 'correct': False}
                    ]
                },
                {
                    'text': 'Кем был главный герой в прошлой жизни?',
                    'answers': [
                        {'text': '34-летний безработный отшельник', 'correct': True},
                        {'text': 'Офисный работник', 'correct': False},
                        {'text': 'Студент', 'correct': False},
                        {'text': 'Военный', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто становится первым учителем магии Рудеуса?',
                    'answers': [
                        {'text': 'Рокси Мигрудия', 'correct': True},
                        {'text': 'Эрис Бореас Грейрат', 'correct': False},
                        {'text': 'Сильфиетт', 'correct': False},
                        {'text': 'Гисель', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой стиль магии Рудеус осваивает первым?',
                    'answers': [
                        {'text': 'Водяная магия', 'correct': True},
                        {'text': 'Огненная магия', 'correct': False},
                        {'text': 'Земляная магия', 'correct': False},
                        {'text': 'Воздушная магия', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Сильфиетт?',
                    'answers': [
                        {'text': 'Эльфийка-служанка', 'correct': True},
                        {'text': 'Учительница магии', 'correct': False},
                        {'text': 'Принцесса', 'correct': False},
                        {'text': 'Ведьма', 'correct': False}
                    ]
                },
                {
                    'text': 'Почему Рудеуса изгоняют из дома?',
                    'answers': [
                        {'text': 'Инцидент с принцем', 'correct': True},
                        {'text': 'Неудача в магии', 'correct': False},
                        {'text': 'Конфликт с отцом', 'correct': False},
                        {'text': 'Болезнь', 'correct': False}
                    ]
                },
                {
                    'text': 'С кем Рудеус отправляется в путешествие?',
                    'answers': [
                        {'text': 'С Гизель и Эрис', 'correct': True},
                        {'text': 'С Рокси и Сильфи', 'correct': False},
                        {'text': 'С отцом и матерью', 'correct': False},
                        {'text': 'В одиночку', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Поворотный момент"?',
                    'answers': [
                        {'text': 'События, меняющие судьбу мира', 'correct': True},
                        {'text': 'Новый уровень магии', 'correct': False},
                        {'text': 'Перерождение', 'correct': False},
                        {'text': 'Путешествие между мирами', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Орстед?',
                    'answers': [
                        {'text': 'Дракон-бог, враг человечества', 'correct': True},
                        {'text': 'Король магов', 'correct': False},
                        {'text': 'Учитель Рудеуса', 'correct': False},
                        {'text': 'Отец Рудеуса', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут будущую жену Рудеуса?',
                    'answers': [
                        {'text': 'Рокси Мигрудия', 'correct': True},
                        {'text': 'Эрис Бореас Грейрат', 'correct': False},
                        {'text': 'Сильфиетт', 'correct': False},
                        {'text': 'Аиша Грейрат', 'correct': False}
                    ]
                }
            ]
        },
        
        # 8. Человек бензопила
        'chelovek-benzopila': {
            'quiz_slug': 'quiz-chelovek-benzopila',
            'questions': [
                {
                    'text': 'Как зовут главного героя, слившегося с демоном?',
                    'answers': [
                        {'text': 'Денджи', 'correct': True},
                        {'text': 'Аки Хаякава', 'correct': False},
                        {'text': 'Пауэр', 'correct': False},
                        {'text': 'Макима', 'correct': False}
                    ]
                },
                {
                    'text': 'С каким демоном сливается Денджи?',
                    'answers': [
                        {'text': 'Почита (бензопила)', 'correct': True},
                        {'text': 'Змей', 'correct': False},
                        {'text': 'Призрак', 'correct': False},
                        {'text': 'Вампир', 'correct': False}
                    ]
                },
                {
                    'text': 'Что нужно Денджи для превращения в Человека-бензопилу?',
                    'answers': [
                        {'text': 'Потянуть за шнур на груди', 'correct': True},
                        {'text': 'Произнести заклинание', 'correct': False},
                        {'text': 'Выпить кровь', 'correct': False},
                        {'text': 'Разозлиться', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Макима?',
                    'answers': [
                        {'text': 'Командир Денджи в организации', 'correct': True},
                        {'text': 'Сестра Денджи', 'correct': False},
                        {'text': 'Подруга Денджи', 'correct': False},
                        {'text': 'Учительница Денджи', 'correct': False}
                    ]
                },
                {
                    'text': 'Что хочет Денджи от жизни?',
                    'answers': [
                        {'text': 'Нормальную жизнь и девушку', 'correct': True},
                        {'text': 'Стать сильнейшим', 'correct': False},
                        {'text': 'Отомстить за родителей', 'correct': False},
                        {'text': 'Разбогатеть', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Аки Хаякава?',
                    'answers': [
                        {'text': 'Напарник Денджи, одержимый местью', 'correct': True},
                        {'text': 'Брат Денджи', 'correct': False},
                        {'text': 'Враг Денджи', 'correct': False},
                        {'text': 'Учитель Денджи', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой демон заключил контракт с Аки?',
                    'answers': [
                        {'text': 'Демон лисы', 'correct': True},
                        {'text': 'Демон змеи', 'correct': False},
                        {'text': 'Демон меча', 'correct': False},
                        {'text': 'Демон призрака', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Пауэр?',
                    'answers': [
                        {'text': 'Демон крови, напарница Денджи', 'correct': True},
                        {'text': 'Сестра Денджи', 'correct': False},
                        {'text': 'Враг Денджи', 'correct': False},
                        {'text': 'Босс Денджи', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Государственная организация по безопасности"?',
                    'answers': [
                        {'text': 'Организация, охотящаяся на демонов', 'correct': True},
                        {'text': 'Полиция', 'correct': False},
                        {'text': 'Армия', 'correct': False},
                        {'text': 'Больница', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой демон убил отца Денджи?',
                    'answers': [
                        {'text': 'Демон зомби', 'correct': True},
                        {'text': 'Демон бензопилы', 'correct': False},
                        {'text': 'Демон крови', 'correct': False},
                        {'text': 'Демон лисы', 'correct': False}
                    ]
                }
            ]
        },
        
        # 9. Кайдзю №8
        'kaydzhu-8': {
            'quiz_slug': 'quiz-kaydzhu-8',
            'questions': [
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Кафка Хибино', 'correct': True},
                        {'text': 'Лено Идзунами', 'correct': False},
                        {'text': 'Кикура Синдзи', 'correct': False},
                        {'text': 'Хосина Сатору', 'correct': False}
                    ]
                },
                {
                    'text': 'Сколько лет Кафке Хибино?',
                    'answers': [
                        {'text': '32 года', 'correct': True},
                        {'text': '28 лет', 'correct': False},
                        {'text': '35 лет', 'correct': False},
                        {'text': '40 лет', 'correct': False}
                    ]
                },
                {
                    'text': 'Кем работает Кафка в начале сериала?',
                    'answers': [
                        {'text': 'Уборщиком после кайдзю', 'correct': True},
                        {'text': 'Охотником на кайдзю', 'correct': False},
                        {'text': 'Полицейским', 'correct': False},
                        {'text': 'Инженером', 'correct': False}
                    ]
                },
                {
                    'text': 'Во что превращается Кафка?',
                    'answers': [
                        {'text': 'В Кайдзю №8', 'correct': True},
                        {'text': 'В Кайдзю №9', 'correct': False},
                        {'text': 'В Кайдзю №10', 'correct': False},
                        {'text': 'В Кайдзю №1', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут лучшего друга Кафки?',
                    'answers': [
                        {'text': 'Лено Идзунами', 'correct': True},
                        {'text': 'Кикура Синдзи', 'correct': False},
                        {'text': 'Хосина Сатору', 'correct': False},
                        {'text': 'Аояма Рио', 'correct': False}
                    ]
                },
                {
                    'text': 'В какой организации служит Лено?',
                    'answers': [
                        {'text': 'Силы обороны от кайдзю', 'correct': True},
                        {'text': 'Полиция', 'correct': False},
                        {'text': 'Армия', 'correct': False},
                        {'text': 'Спецслужбы', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой процент силы использует Кайдзю №8?',
                    'answers': [
                        {'text': '1%', 'correct': True},
                        {'text': '5%', 'correct': False},
                        {'text': '10%', 'correct': False},
                        {'text': '50%', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется оружие Силов обороны?',
                    'answers': [
                        {'text': 'Орудие противокайдзю', 'correct': True},
                        {'text': 'Меч кайдзю', 'correct': False},
                        {'text': 'Пушка монстров', 'correct': False},
                        {'text': 'Оружие разрушения', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Рено Итикава?',
                    'answers': [
                        {'text': 'Новичок в Силах обороны', 'correct': True},
                        {'text': 'Сестра Кафки', 'correct': False},
                        {'text': 'Дочь Лено', 'correct': False},
                        {'text': 'Учительница', 'correct': False}
                    ]
                },
                {
                    'text': 'Какова цель Кафки?',
                    'answers': [
                        {'text': 'Присоединиться к Силам обороны', 'correct': True},
                        {'text': 'Стать самым сильным кайдзю', 'correct': False},
                        {'text': 'Уничтожить всех кайдзю', 'correct': False},
                        {'text': 'Скрыть свои способности', 'correct': False}
                    ]
                }
            ]
        },
        
        # 10. Провожающая в последний путь Фрирен
        'provozhayushchaya-v-posledniy-put-friren': {
            'quiz_slug': 'quiz-provozhayushchaya-v-posledniy-put-friren',
            'questions': [
                {
                    'text': 'Как зовут главную героиню?',
                    'answers': [
                        {'text': 'Фрирен', 'correct': True},
                        {'text': 'Химмель', 'correct': False},
                        {'text': 'Айзен', 'correct': False},
                        {'text': 'Штарк', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Химмель?',
                    'answers': [
                        {'text': 'Лидер партии героя', 'correct': True},
                        {'text': 'Маг', 'correct': False},
                        {'text': 'Воин', 'correct': False},
                        {'text': 'Жрец', 'correct': False}
                    ]
                },
                {
                    'text': 'Сколько лет Фрирен?',
                    'answers': [
                        {'text': 'Более 1000 лет', 'correct': True},
                        {'text': '100 лет', 'correct': False},
                        {'text': '500 лет', 'correct': False},
                        {'text': '50 лет', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Ферн?',
                    'answers': [
                        {'text': 'Ученица Фрирен', 'correct': True},
                        {'text': 'Сестра Фрирен', 'correct': False},
                        {'text': 'Дочь Фрирен', 'correct': False},
                        {'text': 'Мать Фрирен', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Штарк?',
                    'answers': [
                        {'text': 'Воин в партии Фрирен', 'correct': True},
                        {'text': 'Маг', 'correct': False},
                        {'text': 'Жрец', 'correct': False},
                        {'text': 'Король', 'correct': False}
                    ]
                },
                {
                    'text': 'Против кого сражалась партия героя?',
                    'answers': [
                        {'text': 'Короля демонов', 'correct': True},
                        {'text': 'Дракона', 'correct': False},
                        {'text': 'Армии монстров', 'correct': False},
                        {'text': 'Темного мага', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой магией владеет Фрирен?',
                    'answers': [
                        {'text': 'Всеми видами магии', 'correct': True},
                        {'text': 'Только огненной', 'correct': False},
                        {'text': 'Только водяной', 'correct': False},
                        {'text': 'Только исцеляющей', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Граубарт"?',
                    'answers': [
                        {'text': 'Родной город Фрирен', 'correct': True},
                        {'text': 'Волшебный артефакт', 'correct': False},
                        {'text': 'Заклинание', 'correct': False},
                        {'text': 'Магическое существо', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто обучает Ферн магии?',
                    'answers': [
                        {'text': 'Фрирен', 'correct': True},
                        {'text': 'Химмель', 'correct': False},
                        {'text': 'Айзен', 'correct': False},
                        {'text': 'Штарк', 'correct': False}
                    ]
                },
                {
                    'text': 'Какую цель преследует Фрирен?',
                    'answers': [
                        {'text': 'Лучше понять людей', 'correct': True},
                        {'text': 'Стать сильнейшей', 'correct': False},
                        {'text': 'Найти сокровище', 'correct': False},
                        {'text': 'Завоевать мир', 'correct': False}
                    ]
                }
            ]
        },
        
        # 11. Этот замечательный мир
        'etot-zamechatelnyy-mir': {
            'quiz_slug': 'quiz-etot-zamechatelnyy-mir',
            'questions': [
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Кадзума Сато', 'correct': True},
                        {'text': 'Аква', 'correct': False},
                        {'text': 'Мегумин', 'correct': False},
                        {'text': 'Даркнесс', 'correct': False}
                    ]
                },
                {
                    'text': 'Как умер Кадзума в прошлой жизни?',
                    'answers': [
                        {'text': 'От испуга, думая что его сбил трактор', 'correct': True},
                        {'text': 'В автокатастрофе', 'correct': False},
                        {'text': 'От болезни', 'correct': False},
                        {'text': 'В драке', 'correct': False}
                    ]
                },
                {
                    'text': 'Кого Кадзума взял с собой в новый мир?',
                    'answers': [
                        {'text': 'Богиню Акву', 'correct': True},
                        {'text': 'Меч-кладенец', 'correct': False},
                        {'text': 'Бесконечные деньги', 'correct': False},
                        {'text': 'Суперспособность', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой класс у Мегумин?',
                    'answers': [
                        {'text': 'Волшебница-архимаг', 'correct': True},
                        {'text': 'Жрица', 'correct': False},
                        {'text': 'Крестоносец', 'correct': False},
                        {'text': 'Вор', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут мазохистку-крестоносца?',
                    'answers': [
                        {'text': 'Даркнесс', 'correct': True},
                        {'text': 'Аква', 'correct': False},
                        {'text': 'Мегумин', 'correct': False},
                        {'text': 'Юнь-Юнь', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое единственное заклинание знает Мегумин?',
                    'answers': [
                        {'text': 'Взрыв', 'correct': True},
                        {'text': 'Огненный шар', 'correct': False},
                        {'text': 'Ледяная стрела', 'correct': False},
                        {'text': 'Молния', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Юнь-Юнь?',
                    'answers': [
                        {'text': 'Подруга Мегумин из деревни магов', 'correct': True},
                        {'text': 'Сестра Мегумин', 'correct': False},
                        {'text': 'Королева демонов', 'correct': False},
                        {'text': 'Богиня удачи', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой статус у Аквы в новом мире?',
                    'answers': [
                        {'text': 'Бесполезная богиня', 'correct': True},
                        {'text': 'Королева', 'correct': False},
                        {'text': 'Верховная жрица', 'correct': False},
                        {'text': 'Архимаг', 'correct': False}
                    ]
                },
                {
                    'text': 'Что чаще всего делает команда Кадзумы?',
                    'answers': [
                        {'text': 'Влезает в долги', 'correct': True},
                        {'text': 'Спасает мир', 'correct': False},
                        {'text': 'Ищет сокровища', 'correct': False},
                        {'text': 'Учится магии', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется город, где живут герои?',
                    'answers': [
                        {'text': 'Аксель', 'correct': True},
                        {'text': 'Камелот', 'correct': False},
                        {'text': 'Ривенделл', 'correct': False},
                        {'text': 'Мидгард', 'correct': False}
                    ]
                }
            ]
        },
        
        # 12. О моём перерождении в слизь
        'o-moem-pererozhdenii-v-sliz': {
            'quiz_slug': 'quiz-o-moem-pererozhdenii-v-sliz',
            'questions': [
                {
                    'text': 'Как зовут главного героя после перерождения?',
                    'answers': [
                        {'text': 'Римуру Темпест', 'correct': True},
                        {'text': 'Вельдора', 'correct': False},
                        {'text': 'Шиона', 'correct': False},
                        {'text': 'Беннимар', 'correct': False}
                    ]
                },
                {
                    'text': 'Кем был главный герой в прошлой жизни?',
                    'answers': [
                        {'text': '37-летний офисный работник', 'correct': True},
                        {'text': 'Студент', 'correct': False},
                        {'text': 'Военный', 'correct': False},
                        {'text': 'Ученый', 'correct': False}
                    ]
                },
                {
                    'text': 'Как умер главный герой?',
                    'answers': [
                        {'text': 'Его закололи ножом, защищая коллегу', 'correct': True},
                        {'text': 'Попал под машину', 'correct': False},
                        {'text': 'Умер от болезни', 'correct': False},
                        {'text': 'Погиб в катастрофе', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут штормового дракона?',
                    'answers': [
                        {'text': 'Вельдора', 'correct': True},
                        {'text': 'Миллим', 'correct': False},
                        {'text': 'Карьон', 'correct': False},
                        {'text': 'Фрей', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется способность Римуру поглощать предметы и существ?',
                    'answers': [
                        {'text': 'Пожиратель', 'correct': True},
                        {'text': 'Абсорбер', 'correct': False},
                        {'text': 'Поглотитель', 'correct': False},
                        {'text': 'Всасыватель', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут короля орков?',
                    'answers': [
                        {'text': 'Гельд', 'correct': True},
                        {'text': 'Гобта', 'correct': False},
                        {'text': 'Ригруд', 'correct': False},
                        {'text': 'Соуэй', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется созданное Римуру государство?',
                    'answers': [
                        {'text': 'Страна Темпеста', 'correct': True},
                        {'text': 'Королевство Слизней', 'correct': False},
                        {'text': 'Империя Монстров', 'correct': False},
                        {'text': 'Федерация Джюра', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Шиона?',
                    'answers': [
                        {'text': 'Огр, ставшая подчиненной Римуру', 'correct': True},
                        {'text': 'Эльфийка-маг', 'correct': False},
                        {'text': 'Королева людей', 'correct': False},
                        {'text': 'Богиня', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется конференция правителей монстров?',
                    'answers': [
                        {'text': 'Вальпургиева ночь', 'correct': True},
                        {'text': 'Совет магов', 'correct': False},
                        {'text': 'Собрание повелителей', 'correct': False},
                        {'text': 'Конклав монстров', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Миллим Нава?',
                    'answers': [
                        {'text': 'Дракон-разрушитель', 'correct': True},
                        {'text': 'Королева эльфов', 'correct': False},
                        {'text': 'Богиня войны', 'correct': False},
                        {'text': 'Повелительница демонов', 'correct': False}
                    ]
                }
            ]
        },
        
        # 13. Re:Zero. Жизнь с нуля в альтернативном мире
        're-zero-zhizn-s-nulya-v-alternativnom-mire': {
            'quiz_slug': 'quiz-re-zero-zhizn-s-nulya-v-alternativnom-mire',
            'questions': [
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Субэру Нацуки', 'correct': True},
                        {'text': 'Эмилия', 'correct': False},
                        {'text': 'Рем', 'correct': False},
                        {'text': 'Рам', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется способность Субэру?',
                    'answers': [
                        {'text': 'Возвращение смерти', 'correct': True},
                        {'text': 'Бессмертие', 'correct': False},
                        {'text': 'Телепортация', 'correct': False},
                        {'text': 'Невидимость', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут сереброволосую полуэльфийку?',
                    'answers': [
                        {'text': 'Эмилия', 'correct': True},
                        {'text': 'Рем', 'correct': False},
                        {'text': 'Рам', 'correct': False},
                        {'text': 'Фельт', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут служанок-демонов в особняке Розваля?',
                    'answers': [
                        {'text': 'Рем и Рам', 'correct': True},
                        {'text': 'Эмилия и Фельт', 'correct': False},
                        {'text': 'Беатрис и Петра', 'correct': False},
                        {'text': 'Анастасия и Присцилла', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут дух, заключивший контракт с Эмилией?',
                    'answers': [
                        {'text': 'Пак', 'correct': True},
                        {'text': 'Беатрис', 'correct': False},
                        {'text': 'Росвал', 'correct': False},
                        {'text': 'Юлиус', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется королевство, где происходит действие?',
                    'answers': [
                        {'text': 'Лугуника', 'correct': True},
                        {'text': 'Эльсиор', 'correct': False},
                        {'text': 'Астрал', 'correct': False},
                        {'text': 'Грандгард', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Росвал Л. Мазерс?',
                    'answers': [
                        {'text': 'Владелец особняка и покровитель Эмилии', 'correct': True},
                        {'text': 'Король Лугуники', 'correct': False},
                        {'text': 'Отец Субэру', 'correct': False},
                        {'text': 'Главный злодей', 'correct': False}
                    ]
                },
                {
                    'text': 'Что случилось с Рам в прошлом?',
                    'answers': [
                        {'text': 'Ей отрезали рог', 'correct': True},
                        {'text': 'Она потеряла память', 'correct': False},
                        {'text': 'Её прокляли', 'correct': False},
                        {'text': 'Она умерла', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Беатрис?',
                    'answers': [
                        {'text': 'Дух, охраняющий библиотеку', 'correct': True},
                        {'text': 'Служанка', 'correct': False},
                        {'text': 'Королева', 'correct': False},
                        {'text': 'Воин', 'correct': False}
                    ]
                },
                {
                    'text': 'За что Рем любит Субэру?',
                    'answers': [
                        {'text': 'За то, что спас её от Проклятия', 'correct': True},
                        {'text': 'За его силу', 'correct': False},
                        {'text': 'За его ум', 'correct': False},
                        {'text': 'За его доброту', 'correct': False}
                    ]
                }
            ]
        },
        
        # 14. Восхождение в тени
        'voshozhdenie-v-teni': {
            'quiz_slug': 'quiz-voshozhdenie-v-teni',
            'questions': [
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Сид Кэйджо', 'correct': True},
                        {'text': 'Альфа', 'correct': False},
                        {'text': 'Бета', 'correct': False},
                        {'text': 'Гамма', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой псевдоним использует Сид?',
                    'answers': [
                        {'text': 'Тень', 'correct': True},
                        {'text': 'Темный', 'correct': False},
                        {'text': 'Призрак', 'correct': False},
                        {'text': 'Ночной охотник', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется организация, созданная Сидом?',
                    'answers': [
                        {'text': 'Темное Братство', 'correct': True},
                        {'text': 'Орден Тени', 'correct': False},
                        {'text': 'Лига Темных', 'correct': False},
                        {'text': 'Секта Тьмы', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Альфа?',
                    'answers': [
                        {'text': 'Первая из Семи Теней', 'correct': True},
                        {'text': 'Сестра Сида', 'correct': False},
                        {'text': 'Учительница Сида', 'correct': False},
                        {'text': 'Королева демонов', 'correct': False}
                    ]
                },
                {
                    'text': 'В какой школе учится Сид?',
                    'answers': [
                        {'text': 'Магическая академия Мидгар', 'correct': True},
                        {'text': 'Академия магии и меча', 'correct': False},
                        {'text': 'Школа рыцарей', 'correct': False},
                        {'text': 'Университет магии', 'correct': False}
                    ]
                },
                {
                    'text': 'Какую роль играет Сид в обычной жизни?',
                    'answers': [
                        {'text': 'Обычного студента-статиста', 'correct': True},
                        {'text': 'Отличника', 'correct': False},
                        {'text': 'Спортсмена', 'correct': False},
                        {'text': 'Лидера класса', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Культ Диаболоса"?',
                    'answers': [
                        {'text': 'Тайная организация, с которой борется Темное Братство', 'correct': True},
                        {'text': 'Религиозная секта', 'correct': False},
                        {'text': 'Магический орден', 'correct': False},
                        {'text': 'Правительственная организация', 'correct': False}
                    ]
                },
                {
                    'text': 'Как Сид объясняет свои способности?',
                    'answers': [
                        {'text': 'Он называет это "контролем магии"', 'correct': True},
                        {'text': 'Наследственная магия', 'correct': False},
                        {'text': 'Дар богов', 'correct': False},
                        {'text': 'Результат тренировок', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Клер?',
                    'answers': [
                        {'text': 'Сестра Сида', 'correct': True},
                        {'text': 'Подруга Сида', 'correct': False},
                        {'text': 'Одноклассница', 'correct': False},
                        {'text': 'Учительница', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется техника, которую использует Сид?',
                    'answers': [
                        {'text': 'Атомный', 'correct': True},
                        {'text': 'Взрывной кулак', 'correct': False},
                        {'text': 'Магический луч', 'correct': False},
                        {'text': 'Теневой удар', 'correct': False}
                    ]
                }
            ]
        },
        
        # 15. Торадора
        'toradora': {
            'quiz_slug': 'quiz-toradora',
            'questions': [
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Рюджи Такасу', 'correct': True},
                        {'text': 'Такасу Рюджи', 'correct': False},
                        {'text': 'Китамура Юсаку', 'correct': False},
                        {'text': 'Коджи Хару', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут главную героиню?',
                    'answers': [
                        {'text': 'Тайга Айсака', 'correct': True},
                        {'text': 'Айсака Тайга', 'correct': False},
                        {'text': 'Кавасима Ами', 'correct': False},
                        {'text': 'Минори Кусиэда', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой персонаж известен как "Карманный тигр"?',
                    'answers': [
                        {'text': 'Тайга Айсака', 'correct': True},
                        {'text': 'Рюджи Такасу', 'correct': False},
                        {'text': 'Минори Кусиэда', 'correct': False},
                        {'text': 'Ами Кавасима', 'correct': False}
                    ]
                },
                {
                    'text': 'В кого влюблен Рюджи?',
                    'answers': [
                        {'text': 'Минори Кусиэда', 'correct': True},
                        {'text': 'Тайга Айсака', 'correct': False},
                        {'text': 'Ами Кавасима', 'correct': False},
                        {'text': 'Юсаку Китамура', 'correct': False}
                    ]
                },
                {
                    'text': 'В кого влюблена Тайга?',
                    'answers': [
                        {'text': 'Юсаку Китамура', 'correct': True},
                        {'text': 'Рюджи Такасу', 'correct': False},
                        {'text': 'Хару Коджи', 'correct': False},
                        {'text': 'Ни в кого', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут лучшую подругу Тайги?',
                    'answers': [
                        {'text': 'Минори Кусиэда', 'correct': True},
                        {'text': 'Ами Кавасима', 'correct': False},
                        {'text': 'Юко Канно', 'correct': False},
                        {'text': 'Саки Кавахара', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой клички боится Тайга?',
                    'answers': [
                        {'text': 'Карманный тигр', 'correct': True},
                        {'text': 'Маленькая принцесса', 'correct': False},
                        {'text': 'Злая фея', 'correct': False},
                        {'text': 'Мини-дьявол', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой персонаж известен как "Злой пес"?',
                    'answers': [
                        {'text': 'Рюджи Такасу', 'correct': True},
                        {'text': 'Юсаку Китамура', 'correct': False},
                        {'text': 'Хару Коджи', 'correct': False},
                        {'text': 'Коити Китамура', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут отца Рюджи?',
                    'answers': [
                        {'text': 'Он живет только с матерью', 'correct': True},
                        {'text': 'Юсаку', 'correct': False},
                        {'text': 'Хару', 'correct': False},
                        {'text': 'Коити', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое событие происходит на пляже?',
                    'answers': [
                        {'text': 'Тайга признается в своих чувствах', 'correct': True},
                        {'text': 'Рюджи и Тайга начинают встречаться', 'correct': False},
                        {'text': 'Минори признается Рюджи', 'correct': False},
                        {'text': 'Юсаку и Тайга начинают встречаться', 'correct': False}
                    ]
                }
            ]
        },
        
        # 16. Хоримия
        'horimiya': {
            'quiz_slug': 'quiz-horimiya',
            'questions': [
                {
                    'text': 'Как зовут главную героиню?',
                    'answers': [
                        {'text': 'Кёко Хори', 'correct': True},
                        {'text': 'Идзуми Миямура', 'correct': False},
                        {'text': 'Юки Ёсикава', 'correct': False},
                        {'text': 'Тору Исикава', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут главного героя?',
                    'answers': [
                        {'text': 'Идзуми Миямура', 'correct': True},
                        {'text': 'Кёко Хори', 'correct': False},
                        {'text': 'Кёсуке Исикава', 'correct': False},
                        {'text': 'Сихо Савада', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут младшего брата Хори?',
                    'answers': [
                        {'text': 'Сота Хори', 'correct': True},
                        {'text': 'Юки Хори', 'correct': False},
                        {'text': 'Кенто Хори', 'correct': False},
                        {'text': 'Рю Хори', 'correct': False}
                    ]
                },
                {
                    'text': 'Что скрывает Миямура под одеждой?',
                    'answers': [
                        {'text': 'Татуировки и пирсинг', 'correct': True},
                        {'text': 'Шрамы', 'correct': False},
                        {'text': 'Оружие', 'correct': False},
                        {'text': 'Ничего', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой секрет скрывает Хори в школе?',
                    'answers': [
                        {'text': 'Что она ухаживает за младшим братом', 'correct': True},
                        {'text': 'Что она из бедной семьи', 'correct': False},
                        {'text': 'Что она плохо учится', 'correct': False},
                        {'text': 'Что она встречается с Миямурой', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой цвет волос у Миямуры в школе?',
                    'answers': [
                        {'text': 'Черный', 'correct': True},
                        {'text': 'Синий', 'correct': False},
                        {'text': 'Серебристый', 'correct': False},
                        {'text': 'Рыжий', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Юки Ёсикава?',
                    'answers': [
                        {'text': 'Лучшая подруга Хори', 'correct': True},
                        {'text': 'Сестра Хори', 'correct': False},
                        {'text': 'Подруга Миямуры', 'correct': False},
                        {'text': 'Учительница', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут парня Юки?',
                    'answers': [
                        {'text': 'Тору Исикава', 'correct': True},
                        {'text': 'Кёсуке Исикава', 'correct': False},
                        {'text': 'Сихо Савада', 'correct': False},
                        {'text': 'Рема Аясаки', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой предмет особенно хорошо дается Хори?',
                    'answers': [
                        {'text': 'Математика', 'correct': True},
                        {'text': 'Литература', 'correct': False},
                        {'text': 'История', 'correct': False},
                        {'text': 'Английский', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой цвет волос у Миямуры после школы?',
                    'answers': [
                        {'text': 'Серебристый', 'correct': True},
                        {'text': 'Черный', 'correct': False},
                        {'text': 'Синий', 'correct': False},
                        {'text': 'Розовый', 'correct': False}
                    ]
                }
            ]
        },
        
        # 17. Дотянуться до тебя (добавлено из HTML)
        'dotyanutsya-do-tebya': {
            'quiz_slug': 'quiz-dotyanutsya-do-tebya',
            'questions': [
                {
                    'text': 'Как зовут главную героиню аниме "Дотянуться до тебя"?',
                    'answers': [
                        {'text': 'Савако Курумияма', 'correct': True},
                        {'text': 'Сёта Кадзехая', 'correct': False},
                        {'text': 'Аюми Такэмото', 'correct': False},
                        {'text': 'Нана Нисино', 'correct': False}
                    ]
                },
                {
                    'text': 'Почему Савако стала изгоем в школе?',
                    'answers': [
                        {'text': 'Ее внешность похожа на призрака из фильмов', 'correct': True},
                        {'text': 'Она была очень богатой', 'correct': False},
                        {'text': 'Она плохо училась', 'correct': False},
                        {'text': 'Она была новенькой', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут самого популярного парня в школе?',
                    'answers': [
                        {'text': 'Сёта Кадзехая', 'correct': True},
                        {'text': 'Тору Рё', 'correct': False},
                        {'text': 'Кента Яно', 'correct': False},
                        {'text': 'Кадзума Араи', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое прозвище дали Савако одноклассники?',
                    'answers': [
                        {'text': 'Садако (по имени персонажа из "Звонка")', 'correct': True},
                        {'text': 'Призрак', 'correct': False},
                        {'text': 'Ведьма', 'correct': False},
                        {'text': 'Тихая девочка', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой предмет помогает Савако подружиться с одноклассниками?',
                    'answers': [
                        {'text': 'Учебники и помощь в учебе', 'correct': True},
                        {'text': 'Игра на музыкальном инструменте', 'correct': False},
                        {'text': 'Спортивные достижения', 'correct': False},
                        {'text': 'Рисование', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто первым заговорил с Савако в школе?',
                    'answers': [
                        {'text': 'Сёта Кадзехая', 'correct': True},
                        {'text': 'Аюми Такэмото', 'correct': False},
                        {'text': 'Тору Рё', 'correct': False},
                        {'text': 'Кента Яно', 'correct': False}
                    ]
                },
                {
                    'text': 'Как Савако относится к своему прозвищу?',
                    'answers': [
                        {'text': 'Она пытается изменить отношение людей', 'correct': True},
                        {'text': 'Ей нравится это прозвище', 'correct': False},
                        {'text': 'Она игнорирует его', 'correct': False},
                        {'text': 'Она плачет из-за него', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой характер у Сёты Кадзехая?',
                    'answers': [
                        {'text': 'Добрый и дружелюбный', 'correct': True},
                        {'text': 'Холодный и отстраненный', 'correct': False},
                        {'text': 'Надменный и высокомерный', 'correct': False},
                        {'text': 'Злой и агрессивный', 'correct': False}
                    ]
                },
                {
                    'text': 'Что общего у Савако и Сёты?',
                    'answers': [
                        {'text': 'Оба хотят понять других людей', 'correct': True},
                        {'text': 'Оба любят спорт', 'correct': False},
                        {'text': 'Оба из богатых семей', 'correct': False},
                        {'text': 'Оба отличники в учебе', 'correct': False}
                    ]
                },
                {
                    'text': 'Как меняется жизнь Савако на протяжении аниме?',
                    'answers': [
                        {'text': 'Она находит друзей и становится увереннее', 'correct': True},
                        {'text': 'Она становится самой популярной в школе', 'correct': False},
                        {'text': 'Она переходит в другую школу', 'correct': False},
                        {'text': 'Она остается такой же одинокой', 'correct': False}
                    ]
                }
            ]
        },
        
        # 18. Твоя апрельская ложь (добавлено из HTML)
        'tvoya-aprelskaya-lozh': {
            'quiz_slug': 'quiz-tvoya-aprelskaya-lozh',
            'questions': [
                {
                    'text': 'Как зовут главного героя, пианиста?',
                    'answers': [
                        {'text': 'Косэй Арима', 'correct': True},
                        {'text': 'Каори Миядзоно', 'correct': False},
                        {'text': 'Такэси Аида', 'correct': False},
                        {'text': 'Рюносукэ Каваи', 'correct': False}
                    ]
                },
                {
                    'text': 'Почему Косэй перестал играть на пианино?',
                    'answers': [
                        {'text': 'После смерти матери он потерял способность слышать музыку', 'correct': True},
                        {'text': 'Он сломал руку', 'correct': False},
                        {'text': 'Его раскритиковали на конкурсе', 'correct': False},
                        {'text': 'Он устал от музыки', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут скрипачку, которая меняет жизнь Косэя?',
                    'answers': [
                        {'text': 'Каори Миядзоно', 'correct': True},
                        {'text': 'Цубаки Савабэ', 'correct': False},
                        {'text': 'Наги Аизава', 'correct': False},
                        {'text': 'Эми Игава', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой музыкальный стиль предпочитает Каори?',
                    'answers': [
                        {'text': 'Свободная и экспрессивная игра', 'correct': True},
                        {'text': 'Классическая точность', 'correct': False},
                        {'text': 'Джазовые импровизации', 'correct': False},
                        {'text': 'Народная музыка', 'correct': False}
                    ]
                },
                {
                    'text': 'Какая болезнь у Каори?',
                    'answers': [
                        {'text': 'Тяжелое заболевание, приковывающее ее к постели', 'correct': True},
                        {'text': 'Астма', 'correct': False},
                        {'text': 'Диабет', 'correct': False},
                        {'text': 'Болезнь сердца', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такой Ватари Рюносукэ?',
                    'answers': [
                        {'text': 'Друг детства Косэя и бейсболист', 'correct': True},
                        {'text': 'Учитель музыки', 'correct': False},
                        {'text': 'Брат Каори', 'correct': False},
                        {'text': 'Врач Каори', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой конкурс становится важным событием в аниме?',
                    'answers': [
                        {'text': 'Конкурс юных музыкантов', 'correct': True},
                        {'text': 'Бейсбольный турнир', 'correct': False},
                        {'text': 'Школьный фестиваль', 'correct': False},
                        {'text': 'Художественный конкурс', 'correct': False}
                    ]
                },
                {
                    'text': 'Что символизирует цвет сакуры в аниме?',
                    'answers': [
                        {'text': 'Красоту и быстротечность жизни', 'correct': True},
                        {'text': 'Надежду на будущее', 'correct': False},
                        {'text': 'Дружбу между персонажами', 'correct': False},
                        {'text': 'Музыкальный талант', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой композитор является любимым у Косэя?',
                    'answers': [
                        {'text': 'Фредерик Шопен', 'correct': True},
                        {'text': 'Людвиг ван Бетховен', 'correct': False},
                        {'text': 'Вольфганг Амадей Моцарт', 'correct': False},
                        {'text': 'Иоганн Себастьян Бах', 'correct': False}
                    ]
                },
                {
                    'text': 'Как заканчивается аниме?',
                    'answers': [
                        {'text': 'Каори умирает, но вдохновляет Косэя продолжать играть', 'correct': True},
                        {'text': 'Косэй и Каори начинают встречаться', 'correct': False},
                        {'text': 'Косэй полностью выздоравливает и становится знаменитым', 'correct': False},
                        {'text': 'Каори выздоравливает', 'correct': False}
                    ]
                }
            ]
        },
        
        # 19. Кагуя: В любви как на войне (добавлено из HTML)
        'kaguya-v-lyubvi-kak-na-voyne': {
            'quiz_slug': 'quiz-kaguya-v-lyubvi-kak-na-voyne',
            'questions': [
                {
                    'text': 'Как зовут главную героиню, вице-президента студсовета?',
                    'answers': [
                        {'text': 'Кагуя Синомия', 'correct': True},
                        {'text': 'Миюки Сироганэ', 'correct': False},
                        {'text': 'Тюка Фудзивара', 'correct': False},
                        {'text': 'Ю Исигами', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут президента студсовета?',
                    'answers': [
                        {'text': 'Миюки Сироганэ', 'correct': True},
                        {'text': 'Кагуя Синомия', 'correct': False},
                        {'text': 'Ю Исигами', 'correct': False},
                        {'text': 'Тюка Фудзивара', 'correct': False}
                    ]
                },
                {
                    'text': 'Из какой семьи происходит Кагуя?',
                    'answers': [
                        {'text': 'Из очень богатой и влиятельной семьи', 'correct': True},
                        {'text': 'Из семьи ученых', 'correct': False},
                        {'text': 'Из обычной семьи', 'correct': False},
                        {'text': 'Из семьи политиков', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой у Кагуи и Миюки план?',
                    'answers': [
                        {'text': 'Заставить другого признаться в любви первым', 'correct': True},
                        {'text': 'Стать лучшими друзьями', 'correct': False},
                        {'text': 'Победить на школьных выборах', 'correct': False},
                        {'text': 'Поступить в один университет', 'correct': False}
                    ]
                },
                {
                    'text': 'Кто такая Тюка Фудзивара?',
                    'answers': [
                        {'text': 'Секретарь студсовета и подруга Кагуи', 'correct': True},
                        {'text': 'Сестра Миюки', 'correct': False},
                        {'text': 'Учительница в школе', 'correct': False},
                        {'text': 'Соперница Кагуи', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой вид спорта практикует Миюки?',
                    'answers': [
                        {'text': 'Кендо (фехтование на мечах)', 'correct': True},
                        {'text': 'Бейсбол', 'correct': False},
                        {'text': 'Футбол', 'correct': False},
                        {'text': 'Плавание', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой у Кагуи особый талант?',
                    'answers': [
                        {'text': 'Она гениальный стратег', 'correct': True},
                        {'text': 'Она отличная певица', 'correct': False},
                        {'text': 'Она мастер каллиграфии', 'correct': False},
                        {'text': 'Она чемпионка по шахматам', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут затворника, которого Кагуя и Миюки берут в студсовет?',
                    'answers': [
                        {'text': 'Ю Исигами', 'correct': True},
                        {'text': 'Макото Сиина', 'correct': False},
                        {'text': 'Кадзуно Суо', 'correct': False},
                        {'text': 'Нагиса Касиваги', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой известный жест часто делает Кагуя?',
                    'answers': [
                        {'text': 'Прикладывает руку ко рту и злобно ухмыляется', 'correct': True},
                        {'text': 'Закрывает лицо руками', 'correct': False},
                        {'text': 'Скрещивает руки на груди', 'correct': False},
                        {'text': 'Показывает знак победы', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется школа, где учатся герои?',
                    'answers': [
                        {'text': 'Академия Сюйтин', 'correct': True},
                        {'text': 'Академия Тооцуки', 'correct': False},
                        {'text': 'Школа Кёра', 'correct': False},
                        {'text': 'Лицей Сэйрё', 'correct': False}
                    ]
                }
            ]
        },
        
        # 20. Необъятный океан (добавлено из HTML)
        'neobyyatnyy-okean': {
            'quiz_slug': 'quiz-neobyyatnyy-okean',
            'questions': [
                {
                    'text': 'Как зовут главную героиню, которая начинает заниматься дайвингом?',
                    'answers': [
                        {'text': 'Хикари Куками', 'correct': True},
                        {'text': 'Омару Сиодомэ', 'correct': False},
                        {'text': 'Аянэ Сиодомэ', 'correct': False},
                        {'text': 'Иссэй Идзаки', 'correct': False}
                    ]
                },
                {
                    'text': 'В какой клуб вступает Хикари?',
                    'answers': [
                        {'text': 'Клуб подводного плавания', 'correct': True},
                        {'text': 'Клуб плавания', 'correct': False},
                        {'text': 'Клуб серфинга', 'correct': False},
                        {'text': 'Клуб морской биологии', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой город является местом действия аниме?',
                    'answers': [
                        {'text': 'Город на острове Идзу', 'correct': True},
                        {'text': 'Токио', 'correct': False},
                        {'text': 'Осака', 'correct': False},
                        {'text': 'Киото', 'correct': False}
                    ]
                },
                {
                    'text': 'Почему Хикари решила заняться дайвингом?',
                    'answers': [
                        {'text': 'Ее впечатлила красота подводного мира', 'correct': True},
                        {'text': 'Она хочет стать профессиональным дайвером', 'correct': False},
                        {'text': 'Ее заставили родители', 'correct': False},
                        {'text': 'Она хочет найти сокровища', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут инструктора по дайвингу?',
                    'answers': [
                        {'text': 'Омару Сиодомэ', 'correct': True},
                        {'text': 'Аянэ Сиодомэ', 'correct': False},
                        {'text': 'Иссэй Идзаки', 'correct': False},
                        {'text': 'Юки Осакабэ', 'correct': False}
                    ]
                },
                {
                    'text': 'Какое море исследуют герои?',
                    'answers': [
                        {'text': 'Море возле островов Идзу', 'correct': True},
                        {'text': 'Японское море', 'correct': False},
                        {'text': 'Тихий океан', 'correct': False},
                        {'text': 'Восточно-Китайское море', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой вид морских обитателей особенно впечатляет Хикари?',
                    'answers': [
                        {'text': 'Тропические рыбы и кораллы', 'correct': True},
                        {'text': 'Акулы', 'correct': False},
                        {'text': 'Дельфины', 'correct': False},
                        {'text': 'Морские черепахи', 'correct': False}
                    ]
                },
                {
                    'text': 'Что символизирует дайвинг для Хикари?',
                    'answers': [
                        {'text': 'Свободу и открытие нового мира', 'correct': True},
                        {'text': 'Спортивные достижения', 'correct': False},
                        {'text': 'Карьерные перспективы', 'correct': False},
                        {'text': 'Исполнение мечты детства', 'correct': False}
                    ]
                },
                {
                    'text': 'Как меняется отношение Хикари к морю на протяжении аниме?',
                    'answers': [
                        {'text': 'Она начинает ценить и любить море еще больше', 'correct': True},
                        {'text': 'Она разочаровывается в дайвинге', 'correct': False},
                        {'text': 'Она становится профессиональным дайвером', 'correct': False},
                        {'text': 'Она начинает бояться моря', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой основной посыл аниме?',
                    'answers': [
                        {'text': 'Красота и важность сохранения морской природы', 'correct': True},
                        {'text': 'Важность спортивных достижений', 'correct': False},
                        {'text': 'Необходимость образования', 'correct': False},
                        {'text': 'Важность дружбы', 'correct': False}
                    ]
                }
            ]
        },
        
        # 21. Гинтама (добавлено из HTML)
        'gintama': {
            'quiz_slug': 'quiz-gintama',
            'questions': [
                {
                    'text': 'Как зовут главного героя, бывшего самурая?',
                    'answers': [
                        {'text': 'Гинтоки Саката', 'correct': True},
                        {'text': 'Симпати Ёроидзуя', 'correct': False},
                        {'text': 'Синпати Симура', 'correct': False},
                        {'text': 'Кагура', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется работа, которой занимается Гинтоки?',
                    'answers': [
                        {'text': 'Ёроидзуя (помощник по любым делам)', 'correct': True},
                        {'text': 'Самурай', 'correct': False},
                        {'text': 'Детектив', 'correct': False},
                        {'text': 'Учитель', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут инопланетную девочку-бойца из Ёми?',
                    'answers': [
                        {'text': 'Кагура', 'correct': True},
                        {'text': 'Симпати Ёроидзуя', 'correct': False},
                        {'text': 'Синпати Симура', 'correct': False},
                        {'text': 'Цукуё', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут бывшего синигами, ставшего учеником Гинтоки?',
                    'answers': [
                        {'text': 'Синпати Симура', 'correct': True},
                        {'text': 'Симпати Ёроидзуя', 'correct': False},
                        {'text': 'Хадзимэ Кондо', 'correct': False},
                        {'text': 'Исао Кондо', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется меч Гинтоки?',
                    'answers': [
                        {'text': 'Лакеломка', 'correct': True},
                        {'text': 'Сакура', 'correct': False},
                        {'text': 'Восходящее солнце', 'correct': False},
                        {'text': 'Лунный свет', 'correct': False}
                    ]
                },
                {
                    'text': 'Какие существа захватили Японию в мире Гинтамы?',
                    'answers': [
                        {'text': 'Амаанто (инопланетяне)', 'correct': True},
                        {'text': 'Демоны', 'correct': False},
                        {'text': 'Роботы', 'correct': False},
                        {'text': 'Мутанты', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут собаку-предсказателя?',
                    'answers': [
                        {'text': 'Садахару', 'correct': True},
                        {'text': 'Пати', 'correct': False},
                        {'text': 'Кюбэй', 'correct': False},
                        {'text': 'Отаэ', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется полицейская организация в Эдо?',
                    'answers': [
                        {'text': 'Синсэнгуми', 'correct': True},
                        {'text': 'Токугава', 'correct': False},
                        {'text': 'Бакуфу', 'correct': False},
                        {'text': 'Ронины', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут лидера Синсэнгуми?',
                    'answers': [
                        {'text': 'Исао Кондо', 'correct': True},
                        {'text': 'Хадзимэ Кондо', 'correct': False},
                        {'text': 'Тосиро Хидзиката', 'correct': False},
                        {'text': 'Сого Окита', 'correct': False}
                    ]
                },
                {
                    'text': 'Что такое "Сирое Воинство"?',
                    'answers': [
                        {'text': 'Армия самураев, сражавшихся против амаанто', 'correct': True},
                        {'text': 'Полицейское подразделение', 'correct': False},
                        {'text': 'Банда преступников', 'correct': False},
                        {'text': 'Клан ниндзя', 'correct': False}
                    ]
                }
            ]
        },
        
        # 22. Несчастная жизнь Сайки Кусуо (добавлено из HTML)
        'neschastnaya-zhizn-sayki-kusuo': {
            'quiz_slug': 'quiz-neschastnaya-zhizn-sayki-kusuo',
            'questions': [
                {
                    'text': 'Как зовут главного героя, обладающего психическими способностями?',
                    'answers': [
                        {'text': 'Кусуо Сайки', 'correct': True},
                        {'text': 'Сюн Кайдо', 'correct': False},
                        {'text': 'Рики Нэндо', 'correct': False},
                        {'text': 'Кокоми Тэрухаси', 'correct': False}
                    ]
                },
                {
                    'text': 'Какие способности есть у Сайки?',
                    'answers': [
                        {'text': 'Телепатия, телекинез, предвидение и многое другое', 'correct': True},
                        {'text': 'Только телепатия', 'correct': False},
                        {'text': 'Только телекинез', 'correct': False},
                        {'text': 'Только левитация', 'correct': False}
                    ]
                },
                {
                    'text': 'Что носит Сайки на голове?',
                    'answers': [
                        {'text': 'Ограничители для контроля своих способностей', 'correct': True},
                        {'text': 'Просто модный аксессуар', 'correct': False},
                        {'text': 'Корону победителя', 'correct': False},
                        {'text': 'Ничего не носит', 'correct': False}
                    ]
                },
                {
                    'text': 'Какую еду больше всего любит Сайки?',
                    'answers': [
                        {'text': 'Кофейное желе', 'correct': True},
                        {'text': 'Рамен', 'correct': False},
                        {'text': 'Суши', 'correct': False},
                        {'text': 'Шоколад', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут девочку, которая считает себя возлюбленной Сайки?',
                    'answers': [
                        {'text': 'Кокоми Тэрухаси', 'correct': True},
                        {'text': 'Айра Куроки', 'correct': False},
                        {'text': 'Мики Сайто', 'correct': False},
                        {'text': 'Юмэ Асаки', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут идиота, который постоянно преследует Сайки?',
                    'answers': [
                        {'text': 'Сюн Кайдо', 'correct': True},
                        {'text': 'Рики Нэндо', 'correct': False},
                        {'text': 'Хироси Сайто', 'correct': False},
                        {'text': 'Кэнто Мори', 'correct': False}
                    ]
                },
                {
                    'text': 'Что больше всего ненавидит Сайки?',
                    'answers': [
                        {'text': 'Внимание и беспокойство', 'correct': True},
                        {'text': 'Шумных людей', 'correct': False},
                        {'text': 'Школьные занятия', 'correct': False},
                        {'text': 'Свои способности', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой цвет волос у Сайки?',
                    'answers': [
                        {'text': 'Розовый', 'correct': True},
                        {'text': 'Синий', 'correct': False},
                        {'text': 'Черный', 'correct': False},
                        {'text': 'Серебристый', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут телепата, который может читать мысли Сайки?',
                    'answers': [
                        {'text': 'Рики Нэндо', 'correct': True},
                        {'text': 'Сюн Кайдо', 'correct': False},
                        {'text': 'Тору Мацузаки', 'correct': False},
                        {'text': 'Хакуто Кудо', 'correct': False}
                    ]
                },
                {
                    'text': 'Какая главная цель Сайки?',
                    'answers': [
                        {'text': 'Прожить обычную, спокойную жизнь', 'correct': True},
                        {'text': 'Стать самым сильным психом', 'correct': False},
                        {'text': 'Спасти мир', 'correct': False},
                        {'text': 'Найти других психов', 'correct': False}
                    ]
                }
            ]
        },
        
        # 23. Обычная жизнь старшеклассников (добавлено из HTML)
        'obychnaya-zhizn-starsheklassnikov': {
            'quiz_slug': 'quiz-obychnaya-zhizn-starsheklassnikov',
            'questions': [
                {
                    'text': 'Как зовут главного героя, основателя клуба?',
                    'answers': [
                        {'text': 'Хатиман Хикигая', 'correct': True},
                        {'text': 'Юкино Юкиносита', 'correct': False},
                        {'text': 'Юи Юигахама', 'correct': False},
                        {'text': 'Саки Кавасуги', 'correct': False}
                    ]
                },
                {
                    'text': 'Как называется клуб, который создает Хатиман?',
                    'answers': [
                        {'text': 'Клуб помощи другим', 'correct': True},
                        {'text': 'Клуб литературы', 'correct': False},
                        {'text': 'Клуб психологии', 'correct': False},
                        {'text': 'Клуб социальных услуг', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут президента клуба?',
                    'answers': [
                        {'text': 'Юкино Юкиносита', 'correct': True},
                        {'text': 'Хатиман Хикигая', 'correct': False},
                        {'text': 'Юи Юигахама', 'correct': False},
                        {'text': 'Саки Кавасуги', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой философии придерживается Хатиман?',
                    'answers': [
                        {'text': 'Циничной философии одиночества', 'correct': True},
                        {'text': 'Оптимистичной философии дружбы', 'correct': False},
                        {'text': 'Религиозной философии', 'correct': False},
                        {'text': 'Философии успеха', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут девушку, которая случайно попадает в клуб?',
                    'answers': [
                        {'text': 'Юи Юигахама', 'correct': True},
                        {'text': 'Саки Кавасуги', 'correct': False},
                        {'text': 'Ироха Иссхики', 'correct': False},
                        {'text': 'Комати', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой предмет преподает учительница, курирующая клуб?',
                    'answers': [
                        {'text': 'Английский язык', 'correct': True},
                        {'text': 'Математика', 'correct': False},
                        {'text': 'История', 'correct': False},
                        {'text': 'Биология', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут младшую сестру Хатимана?',
                    'answers': [
                        {'text': 'Комати Хикигая', 'correct': True},
                        {'text': 'Ироха Иссхики', 'correct': False},
                        {'text': 'Саки Кавасуги', 'correct': False},
                        {'text': 'Юи Юигахама', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой проблемой страдает Хатиман в общении?',
                    'answers': [
                        {'text': 'Он социопат и не умеет общаться с людьми', 'correct': True},
                        {'text': 'Он заикается', 'correct': False},
                        {'text': 'Он слишком застенчив', 'correct': False},
                        {'text': 'Он говорит только правду', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой известный монолог произносит Хатиман?',
                    'answers': [
                        {'text': 'Монолог о красоте настоящего', 'correct': True},
                        {'text': 'Монолог о дружбе', 'correct': False},
                        {'text': 'Монолог о любви', 'correct': False},
                        {'text': 'Монолог о школе', 'correct': False}
                    ]
                },
                {
                    'text': 'Как заканчивается аниме?',
                    'answers': [
                        {'text': 'Хатиман, Юкино и Юи остаются друзьями', 'correct': True},
                        {'text': 'Хатиман и Юкино начинают встречаться', 'correct': False},
                        {'text': 'Хатиман и Юи начинают встречаться', 'correct': False},
                        {'text': 'Клуб распускается', 'correct': False}
                    ]
                }
            ]
        },
        
        # 24. Сатана на подработке (добавлено из HTML)
        'satana-na-podrabotke': {
            'quiz_slug': 'quiz-satana-na-podrabotke',
            'questions': [
                {
                    'text': 'Как зовут главного героя, повелителя тьмы?',
                    'answers': [
                        {'text': 'Сатана (Садао Мао)', 'correct': True},
                        {'text': 'Люцифер', 'correct': False},
                        {'text': 'Алуцар Эмилия', 'correct': False},
                        {'text': 'Урусихара Асахи', 'correct': False}
                    ]
                },
                {
                    'text': 'В каком месте работает Сатана в человеческом мире?',
                    'answers': [
                        {'text': 'В ресторане быстрого питания MgRonald', 'correct': True},
                        {'text': 'В офисе', 'correct': False},
                        {'text': 'В школе', 'correct': False},
                        {'text': 'В магазине', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут героиню, которая преследует Сатану?',
                    'answers': [
                        {'text': 'Эмилия Юсура', 'correct': True},
                        {'text': 'Сидзука Сасаки', 'correct': False},
                        {'text': 'Мэйко Сасаки', 'correct': False},
                        {'text': 'Тихиро Огасавара', 'correct': False}
                    ]
                },
                {
                    'text': 'Почему Сатана пришел в человеческий мир?',
                    'answers': [
                        {'text': 'Завоевать его, но вынужден работать из-за нехватки магии', 'correct': True},
                        {'text': 'Отдохнуть от адской работы', 'correct': False},
                        {'text': 'Найти любовь', 'correct': False},
                        {'text': 'Изучить человеческую культуру', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой должности достигает Сатана в MgRonald?',
                    'answers': [
                        {'text': 'Менеджера смены', 'correct': True},
                        {'text': 'Обычного работника', 'correct': False},
                        {'text': 'Директора', 'correct': False},
                        {'text': 'Шеф-повара', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут коллегу Сатаны, который также является ангелом?',
                    'answers': [
                        {'text': 'Сидзука Сасаки', 'correct': True},
                        {'text': 'Эмилия Юсура', 'correct': False},
                        {'text': 'Тихиро Огасавара', 'correct': False},
                        {'text': 'Юрико Курода', 'correct': False}
                    ]
                },
                {
                    'text': 'Какую еду особенно любит Сатана?',
                    'answers': [
                        {'text': 'Гамбургеры из MgRonald', 'correct': True},
                        {'text': 'Пиццу', 'correct': False},
                        {'text': 'Суши', 'correct': False},
                        {'text': 'Рамен', 'correct': False}
                    ]
                },
                {
                    'text': 'Как зовут демона-помощника Сатаны?',
                    'answers': [
                        {'text': 'Алуцар', 'correct': True},
                        {'text': 'Люцифер', 'correct': False},
                        {'text': 'Мамоно', 'correct': False},
                        {'text': 'Они', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой навык Сатаны помогает ему в работе?',
                    'answers': [
                        {'text': 'Способность точно измерять время', 'correct': True},
                        {'text': 'Сверхсила', 'correct': False},
                        {'text': 'Телепатия', 'correct': False},
                        {'text': 'Телекинез', 'correct': False}
                    ]
                },
                {
                    'text': 'Какой главный урок извлекает Сатана из своей работы?',
                    'answers': [
                        {'text': 'Важность трудолюбия и ответственности', 'correct': True},
                        {'text': 'Как завоевать мир', 'correct': False},
                        {'text': 'Как стать богатым', 'correct': False},
                        {'text': 'Как обманывать людей', 'correct': False}
                    ]
                }
            ]
        }
    }
    
    created_count = 0
    updated_count = 0
    
    for anime_slug, quiz_data in quizzes_data.items():
        try:
            anime = Anime.objects.get(slug=anime_slug)
            quiz_slug = quiz_data['quiz_slug']
            
            # Проверяем, существует ли викторина
            quiz_exists = Quiz.objects.filter(slug=quiz_slug).exists()
            
            if quiz_exists:
                # Обновляем существующую викторину
                quiz = Quiz.objects.get(slug=quiz_slug)
                quiz.questions.all().delete()  # Удаляем старые вопросы
                updated_count += 1
            else:
                # Создаем новую викторину
                quiz = Quiz.objects.create(
                    anime=anime,
                    title=f'Викторина по аниме "{anime.title}"',
                    slug=quiz_slug,
                    description=f'''Проверьте свои знания об аниме "{anime.title}"!

Эта викторина состоит из 10 вопросов, охватывающих основные моменты сюжета, персонажей и ключевые события.

Правила:
• На каждый вопрос дается 15 секунд
• Выберите один правильный ответ из четырех вариантов
• Результат сохранится в вашем профиле
• После завершения можно посмотреть правильные ответы

Удачи в проверке своих знаний!''',
                    difficulty='medium',
                    time_limit=15,
                    total_questions=10
                )
                created_count += 1
                print(f"✓ Создана викторина: {quiz.title} (slug: {quiz.slug})")
            
            # Создаем вопросы и ответы
            for i, question_data in enumerate(quiz_data['questions'], 1):
                question = QuizQuestion.objects.create(
                    quiz=quiz,
                    text=question_data['text'],
                    order=i
                )
                
                for answer_data in question_data['answers']:
                    QuizAnswer.objects.create(
                        question=question,
                        text=answer_data['text'],
                        is_correct=answer_data['correct']
                    )
            
        except Anime.DoesNotExist:
            print(f"✗ Аниме с slug '{anime_slug}' не найдено в базе данных")
            continue
        except Exception as e:
            print(f"✗ Ошибка при создании викторины для '{anime_slug}': {str(e)}")
            continue
    
    print(f"\n{'='*50}")
    print(f"РЕЗУЛЬТАТ:")
    print(f"Создано викторин: {created_count}")
    print(f"Обновлено викторин: {updated_count}")
    print(f"Всего викторин в базе: {Quiz.objects.count()}")
    print(f"Всего вопросов: {QuizQuestion.objects.count()}")
    print(f"Всего ответов: {QuizAnswer.objects.count()}")
    print(f"{'='*50}")

def update_existing_quizzes():
    """Обновить существующие викторины"""
    Quiz.objects.all().delete()
    create_complete_quizzes()

def create_missing_quizzes():
    """Создать только недостающие викторины"""
    all_anime = Anime.objects.all()
    
    for anime in all_anime:
        quiz_slug = f'quiz-{anime.slug}'
        
        if not Quiz.objects.filter(slug=quiz_slug).exists():
            # Создаем базовую викторину
            quiz = Quiz.objects.create(
                anime=anime,
                title=f'Викторина по аниме "{anime.title}"',
                slug=quiz_slug,
                description=f'Проверьте свои знания об аниме "{anime.title}"!',
                difficulty='medium',
                time_limit=15,
                total_questions=10
            )
            print(f"✓ Создана базовая викторина для: {anime.title}")
            
            # Создаем базовые вопросы
            for i in range(1, 11):
                question = QuizQuestion.objects.create(
                    quiz=quiz,
                    text=f'Вопрос {i} про аниме "{anime.title}"?',
                    order=i
                )
                
                QuizAnswer.objects.create(
                    question=question,
                    text='Правильный ответ',
                    is_correct=True
                )
                
                for j in range(3):
                    QuizAnswer.objects.create(
                        question=question,
                        text=f'Неправильный ответ {j+1}',
                        is_correct=False
                    )