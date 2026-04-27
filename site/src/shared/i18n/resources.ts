export const resources = {
  ru: {
    translation: {
      brand: {
        title: 'Microservices Benchmark',
      },
      navigation: {
        home: 'Главная',
        aboutAuthor: 'Об авторе',
        methodology: 'Методика',
        reports: 'Отчеты',
        openSection: 'Открыть раздел',
      },
      common: {
        reportRoute: 'Перейти к отчетам',
        methodologyRoute: 'Перейти к методике',
        photo: 'Фотография',
        contacts: 'Контакты',
        skills: 'Навыки',
      },
      home: {
        hero: {
          title:
            'Исследование методов взаимодействия между микросервисами в веб-приложениях',
          description:
            'Выпускная квалификационная работа посвящена сравнению способов взаимодействия между микросервисами в веб-приложении. В работе рассматриваются HTTP, gRPC и событийная модель обмена, а также их влияние на задержки, пропускную способность и потребление ресурсов при нагрузочном тестировании.',
          reportsCta: 'Открыть отчеты',
          methodologyCta: 'Перейти к методике',
          imageAlt: 'Иллюстрация веб-приложения',
        },
        about: {
          title: 'О проекте',
          paragraph1Start:
            'Проект базируется на разработанной воспроизводимой методике сравнительной оценки производительности микросервисного взаимодействия. Исследование ориентировано на выбор технологической платформы для микросервисных систем в условиях',
          paragraph1Accent: 'реальной нагрузки',
          paragraph2:
            'В текущей версии проекта сопоставляются две реализации одного экспериментального e-commerce приложения: на Express для Node.js-стека и на Fiber для Go-стека. Сравнение выполняется по метрикам среднего времени отклика, p95 времени отклика, пропускной способности, загрузки CPU и потребления памяти. Нагрузочное тестирование проводится в контейнеризированной среде Docker с использованием k6, а сбор ресурсных метрик выполняется при фиксированных условиях эксперимента.',
        },
        methodology: {
          title: 'Ключевые этапы',
        },
        technologies: {
          title: 'Технологии',
          count: '{{count}} технологий',
          description:
            'В проекте используются следующие технологии для реализации микросервисов, хранения данных, контейнеризации и нагрузочного тестирования.',
        },
        researchNavigation: {
          title: 'Навигация по исследованию',
        },
      },
      methodologyPage: {
        title: 'Методика эксперимента',
        fixedTitle: 'Исследовательская рамка',
        selectedStagePrefix: 'Этап',
        stageOne: {
          title: 'Формирование единых условий эксперимента',
          intro:
            'Ключевая цель первого этапа — обеспечить воспроизводимость эксперимента. При неизменных условиях различия в результатах нагрузочных и функциональных тестов корректно связываются с выбранным технологическим стеком и способом межсервисного взаимодействия.',
          diagramText:
            'Схема отражает полный контур взаимодействий: путь запроса через API Gateway, связи между сервисами по HTTP, gRPC и AMQP, а также привязку каждого сервиса к своему хранилищу данных. Это фиксирует единый архитектурный baseline для корректного сравнения реализаций.',
          diagramAlt: 'Архитектура экспериментального стенда',
          platformLead:
            'Для обеспечения сопоставимости результатов были зафиксированы как параметры вычислительной платформы, так и версии ключевых технологий: все компоненты запускались в Docker-контейнерах на едином стенде, что изолировало окружение микросервисов и снизило влияние внешних факторов, связанных с конфигурацией системы, зависимостями и API библиотек.',
          platformTable: {
            leftHeader: 'Параметр среды',
            rightHeader: 'Показатель',
            rows: [
              { id: 'os', left: 'Операционная система', right: 'macOS Tahoe, 26.3' },
              { id: 'cpu', left: 'Процессор', right: 'Apple M5 (ARM)' },
              {
                id: 'ram',
                left: 'Оперативная память (RAM)',
                right: '16 GB Unified Memory',
              },
              {
                id: 'cores',
                left: 'Количество ядер',
                right: '10 (6 performance + 4 efficiency)',
              },
              { id: 'threads', left: 'Количество потоков', right: '10' },
            ],
          },
          technologyTable: {
            leftHeader: 'Технология',
            rightHeader: 'Версия',
            rows: [
              { id: 'node', left: 'Node.js', right: '22' },
              { id: 'ts', left: 'TypeScript', right: '5.9.3' },
              { id: 'express', left: 'Express', right: '5.2.1' },
              { id: 'typeorm', left: 'TypeORM', right: '0.3.28' },
              { id: 'mongoose', left: 'Mongoose', right: '9.2.3' },
              { id: 'axios', left: 'Axios', right: '1.13.6' },
              { id: 'amqplib', left: 'Amqplib', right: '0.10.9' },
              { id: 'go', left: 'Go', right: '1.25.6' },
              { id: 'fiber', left: 'Fiber', right: '3.1.0' },
              {
                id: 'mongo-driver',
                left: 'go.mongodb.org/mongo-driver',
                right: '2.5.0',
              },
              { id: 'pgx', left: 'pgx', right: '5.8.0' },
              {
                id: 'rabbitmq-go',
                left: 'RabbitMQ Go Client (amqp091-go)',
                right: '1.10.0',
              },
              { id: 'grpc', left: 'gRPC', right: '1.79.2' },
              {
                id: 'protobuf',
                left: 'Protocol Buffers (protobuf)',
                right: '1.36.11',
              },
              {
                id: 'protoc-gen-go-grpc',
                left: 'protoc-gen-go-grpc',
                right: '1.6.1',
              },
            ],
          },
        },
        stageTwo: {
          title: 'Выбор техник нагрузочного тестирования',
          intro:
            'В качестве базового подхода используется равномерное тестирование при постоянной нагрузке. Такой формат ориентирован на сопоставление производительности различных реализаций микросервисного взаимодействия в одинаковых и контролируемых условиях, а не на поиск предельной отказоустойчивости системы. Поддержание стабильного числа одновременно активных клиентов на всём протяжении прогона снижает влияние случайных колебаний интенсивности запросов и делает итоговые показатели более сопоставимыми.',
          scenariosLead:
            'Нагрузочное тестирование структурировано в виде четырёх сценариев, охватывающих чтение данных, запись данных и асинхронную обработку событий. Такое разбиение позволяет сравнивать поведение системы в разных режимах межсервисного взаимодействия при одинаковых условиях проведения эксперимента.',
          diagramAlt: 'Схема сценариев взаимодействия в микросервисном приложении',
          scenarios: [
            {
              id: 'scenario-1',
              title:
                'Сценарий 1: получение списка заказов при HTTP-взаимодействии между сервисами',
              text: 'Клиентский запрос поступает в API Gateway, после чего шлюз обращается к сервису пользователей и сервису заказов по HTTP. Сервис заказов дополнительно запрашивает данные у сервиса товаров также по HTTP, формирует итоговый ответ и возвращает его клиенту через API Gateway. Этот сценарий отражает классическую REST-коммуникацию и используется для оценки накладных расходов HTTP, сериализации данных и последовательной обработки запросов.',
            },
            {
              id: 'scenario-2',
              title:
                'Сценарий 2: получение списка заказов при gRPC-взаимодействии между сервисами',
              text: 'По прикладной логике сценарий повторяет первый, но взаимодействие между сервисом заказов и сервисом товаров выполняется через gRPC вместо HTTP. Такой вариант позволяет сопоставить два подхода к межсервисной коммуникации в одинаковых функциональных условиях и оценить влияние замены REST-вызова на задержки, пропускную способность и общее поведение системы.',
            },
            {
              id: 'scenario-3',
              title: 'Сценарий 3: создание заказа',
              text: 'Клиент отправляет POST-запрос через API Gateway в сервис заказов по HTTP. Сервис выполняет проверку входных данных, обрабатывает запрос, формирует новую сущность заказа и сохраняет результат. В отличие от первых двух сценариев, здесь моделируется операция записи, а не чтения данных.',
            },
            {
              id: 'scenario-4',
              title:
                'Сценарий 4: асинхронное обновление статуса заказа с публикацией события',
              text: 'Клиентский запрос проходит через API Gateway и направляется в сервис уведомлений по HTTP. После обработки сервис уведомлений публикует сообщение в брокер RabbitMQ с использованием AMQP.',
            },
          ],
          generatorTable: {
            leftHeader: 'Параметр',
            rightHeader: 'Значение',
            rows: [
              { id: 'tool', left: 'Инструмент генерации', right: 'k6' },
              {
                id: 'vus',
                left: 'Количество виртуальных пользователей',
                right: '1000',
              },
              {
                id: 'sleep',
                left: 'Интервал между запросами одного пользователя',
                right: '1 секунда',
              },
              {
                id: 'duration',
                left: 'Длительность одного прогона',
                right: '1 минута',
              },
              {
                id: 'repeats',
                left: 'Количество повторений каждого сценария',
                right: '10',
              },
            ],
          },
          profileParagraphs: [
            'Профиль нагрузки задаётся как стабильный и повторяемый режим воздействия: фиксируется интенсивность запросов, число одновременно активных пользователей, длительность прогона и количество повторений сценариев. Такая конфигурация снижает влияние случайных колебаний и делает сравнение технологических реализаций статистически более корректным.',
            'Для сохранения сопоставимости перед каждым прогоном выполнялась подготовка стенда: сброс состояния баз данных к исходному набору, очистка очередей сообщений и фиксация одинакового начального состояния входных данных. Это исключало накопительный эффект от предыдущих запусков и повышало достоверность измерений.',
          ],
        },
        stageThree: {
          title: 'Определение метрик оценки',
          intro:
            'На данном этапе фиксируется единый набор метрик, по которым сопоставляются исследуемые реализации. Каждая метрика отражает отдельный аспект поведения системы под нагрузкой и формирует общую картину производительности и ресурсоёмкости.',
        },
        stagesTitle: 'Структура методики',
        stagesDescription:
          'Методика построена как последовательность шагов, позволяющих удерживать архитектурную эквивалентность реализаций, контролировать нагрузочное окружение и получать сопоставимые результаты.',
        stageFourFive: {
          title: 'Проведение эксперимента, анализ и интерпретация результатов',
          intro:
            'На данном этапе выполняется полный цикл от повторяемых прогонов до интерпретации агрегированных результатов, что обеспечивает системный анализ производительности и ресурсоёмкости в одинаковых условиях эксперимента.',
          executionTitle: 'Этап 04. Проведение эксперимента',
          executionText:
            'Для каждого сценария выполняются серии повторных прогонов с фиксированным профилем нагрузки. В ходе выполнения снимаются временные метрики (latency, p95, RPS, ошибки) и ресурсные показатели контейнеров (CPU и RAM).',
          analysisTitle: 'Этап 05. Анализ и интерпретация',
          analysisText:
            'После завершения прогонов данные агрегируются и сопоставляются между технологическими реализациями и сценариями, что позволяет оценить устойчивость отклика, вычислительную стоимость и влияние способа межсервисного взаимодействия на итоговую эффективность.',
          resultsLead:
            'Подробные значения метрик и сравнительные результаты доступны в разделе отчётов.',
          resultsCta: 'Перейти к результатам',
        },
      },
      reportsPage: {
        eyebrow: 'Отчеты',
        scenario: 'Сценарий',
        nextTitle: 'Что добавить дальше',
        nextItems: [
          'Графики latency и throughput по сериям запусков.',
          'Ссылки на HTML и JSON артефакты из `benchmark/results`.',
          'Сводные выводы по bottleneck сервисам и ресурсным пикам.',
        ],
        otherScenarios: 'Другие сценарии',
      },
      aboutPage: {
        imagePlaceholder:
          'Здесь можно разместить фотографию автора. Сейчас блок оставлен как плейсхолдер до добавления изображения в проект.',
        reportsCta: 'Отчеты',
      },
      footer: {
        city: 'Санкт-Петербург',
      },
      language: {
        ru: 'RU',
        en: 'EN',
      },
      content: {
        heroStats: [
          { label: 'Сервисов в стенде', value: '5' },
          { label: 'Нагрузочных сценариев', value: '4' },
          { label: 'Технологических срезов', value: '2' },
        ],
        goals: [
          {
            title: 'Сравнение каналов взаимодействия',
            text: 'Стенд показывает разницу между HTTP, gRPC и событийным обменом в реальном наборе e-commerce сервисов.',
          },
          {
            title: 'Формализованная нагрузочная методика',
            text: 'Сценарии, окружение и метрики описаны так, чтобы эксперимент можно было повторить и расширить.',
          },
          {
            title: 'Прозрачные результаты',
            text: 'На сайте собраны отчеты, графики и агрегированные показатели производительности и потребления ресурсов.',
          },
        ],
        architecturePillars: [
          {
            name: 'API Gateway',
            description:
              'Единая точка входа для клиентов и координация вызовов к доменным сервисам.',
          },
          {
            name: 'User / Product / Order Services',
            description:
              'Основные доменные микросервисы со своими зонами ответственности и отдельными хранилищами.',
          },
          {
            name: 'Notification Service + RabbitMQ',
            description:
              'Асинхронный контур событий для публикации доменных уведомлений и реакции на операции.',
          },
        ],
        methodologySteps: [
          {
            step: '01',
            title: 'Формирование единых условий эксперимента',
            text: 'На первом этапе фиксируются предметная область, состав микросервисов, архитектурная схема, хранилища данных, API Gateway, брокер сообщений и единая бизнес-логика. Это исключает влияние функциональных различий между реализациями и позволяет сравнивать именно программно-технологические платформы.',
          },
          {
            step: '02',
            title: 'Определение техник нагрузочного тестирования',
            text: 'После фиксации условий задаётся профиль нагрузки. В исследовании используется равномерная постоянная нагрузка, позволяющая удерживать стабильное число виртуальных пользователей и анализировать поведение системы без искажения результатов случайными колебаниями интенсивности запросов.',
          },
          {
            step: '03',
            title: 'Выбор и формализация метрик',
            text: 'На этом этапе определяется единый набор показателей: среднее время отклика, p95, пропускная способность, средняя загрузка CPU и потребление оперативной памяти. Такой набор позволяет оценивать и скорость обработки запросов, и цену этой производительности с точки зрения вычислительных ресурсов.',
          },
          {
            step: '04',
            title: 'Проведение эксперимента и сбор метрик',
            text: 'На этом этапе выполняются повторяемые прогоны четырёх сценариев в контейнеризированной среде. Нагрузка генерируется инструментом k6, а ресурсные показатели контейнеров фиксируются во время выполнения сценариев с помощью docker stats.',
          },
          {
            step: '05',
            title: 'Анализ и интерпретация результатов',
            text: 'Финальный этап посвящён сопоставлению собранных метрик, анализу устойчивости отклика, оценке ресурсоёмкости и формулированию выводов о том, как выбранный стек и способ межсервисного взаимодействия влияют на производительность приложения.',
          },
        ],
        technologies: [
          {
            name: 'Go',
            description:
              'Одна из двух сравниваемых платформ для реализации микросервисов в экспериментальном стенде.',
          },
          {
            name: 'Node.js',
            description:
              'Вторая платформа исследования, используемая для параллельной реализации того же приложения.',
          },
          {
            name: 'Fiber',
            description:
              'Web-фреймворк для Go, на котором построена Go-реализация микросервисного приложения.',
          },
          {
            name: 'Express',
            description:
              'Web-фреймворк для Node.js, используемый в Node.js-реализации исследуемого приложения.',
          },
          {
            name: 'MongoDB',
            description:
              'Документо-ориентированная база данных для хранения части доменных сущностей стенда.',
          },
          {
            name: 'Postgres',
            description:
              'Реляционная база данных, используемая в сервисах, где важна структурированная модель данных.',
          },
          {
            name: 'Docker',
            description:
              'Контейнерная среда, фиксирующая единые условия запуска сервисов и инфраструктуры.',
          },
          {
            name: 'k6',
            description:
              'Инструмент нагрузочного тестирования, которым запускаются повторяемые сценарии и собираются метрики.',
          },
          {
            name: 'RabbitMQ',
            description:
              'Брокер сообщений для событийного взаимодействия между сервисами внутри микросервисного контура.',
          },
        ],
        reports: [
          {
            id: 'get-all-orders-http',
            title: 'Получение всех заказов по HTTP',
            summary:
              'Чтение списка заказов через HTTP downstream для оценки накладных расходов синхронного взаимодействия.',
            tags: ['k6', 'HTTP', 'Orders'],
            metrics: [
              { label: 'Node.js avg', value: '806 ms' },
              { label: 'Go avg', value: '221 ms' },
              { label: 'Node.js CPU', value: '314%' },
              { label: 'Go CPU', value: '478%' },
            ],
          },
          {
            id: 'get-all-orders-grpc',
            title: 'Получение всех заказов по gRPC',
            summary:
              'Сценарий сравнивает чтение заказов через gRPC downstream при высокой конкурентной нагрузке.',
            tags: ['k6', 'gRPC', 'Orders'],
            metrics: [
              { label: 'Node.js p95', value: '1609 ms' },
              { label: 'Go p95', value: '374 ms' },
              { label: 'Node.js RAM', value: '843 MiB' },
              { label: 'Go RAM', value: '343 MiB' },
            ],
          },
          {
            id: 'create-order',
            title: 'Создание заказа',
            summary:
              'Оценивает полный путь создания заказа: gateway, валидация, получение товара и запись результата.',
            tags: ['Write path', 'Orders', 'Users'],
            metrics: [
              { label: 'Node.js avg', value: '325 ms' },
              { label: 'Go avg', value: '19 ms' },
              { label: 'Node.js requests', value: '45 784' },
              { label: 'Go requests', value: '59 236' },
            ],
          },
          {
            id: 'update-order-status',
            title: 'Обновление статуса заказа',
            summary:
              'Показывает наиболее легкий сценарий обновления, удобный для базового сравнения write latency.',
            tags: ['Status', 'Orders', 'Baseline'],
            metrics: [
              { label: 'Node.js p95', value: '66.5 ms' },
              { label: 'Go p95', value: '6.85 ms' },
              { label: 'Node.js RAM', value: '423 MiB' },
              { label: 'Go RAM', value: '99.9 MiB' },
            ],
          },
        ],
        navigationCards: [
          {
            title: 'Об авторе',
            description: 'Информация об авторе, контакты.',
            to: '/about-author',
          },
          {
            title: 'Методика',
            description:
              'Правила постановки эксперимента, профили нагрузки, набор метрик и принципы повторяемости прогонов.',
            to: '/metodika',
          },
          {
            title: 'Отчеты',
            description:
              'Сценарии сравнительного тестирования с ключевыми показателями latency, throughput, CPU и RAM.',
            to: '/reports/get-all-orders-grpc',
          },
          {
            title: 'Архитектура',
            description:
              'Схема экспериментального стенда, роли микросервисов и место асинхронного контура в системе.',
            to: '/#architecture',
          },
        ],
        methodologyDetails: [
          'Независимой переменной эксперимента выступает программно-технологическая реализация микросервисного приложения: Express/Node.js и Fiber/Go при неизменной архитектуре, одинаковой бизнес-логике и фиксированных сценариях межсервисного взаимодействия.',
          'Цель методики состоит в том, чтобы получить сопоставимую экспериментальную оценку производительности без смешения исследуемого фактора с различиями в предметной области, структуре сервисов, нагрузке или инфраструктуре.',
          'Поэтому все существенные условия эксперимента фиксируются заранее: состав сервисов, типы хранилищ, API Gateway, RabbitMQ, контейнерное окружение, параметры генерации нагрузки, входные данные и правила агрегирования результатов.',
          'Такой подход позволяет интерпретировать различия в метриках как следствие особенностей реализации и взаимодействия сервисов, а не как эффект случайных изменений внешней среды.',
        ],
        methodologyPrinciples: [
          {
            title: 'Что именно сравнивается',
            text: 'Сравниваются две реализации одного и того же микросервисного веб-приложения: на Express в среде Node.js и на Fiber в среде Go. Архитектура, доменная модель, сценарии обработки запросов и набор инфраструктурных компонентов при этом сохраняются неизменными.',
          },
          {
            title: 'Почему эксперимент воспроизводим',
            text: 'Все сервисы и инфраструктурные компоненты разворачиваются в Docker-контейнерах на единой тестовой платформе. Это уменьшает влияние различий в системных зависимостях, конфигурации окружения и порядке запуска сервисов.',
          },
          {
            title: 'Как обеспечивается корректность сравнения',
            text: 'Перед прогонами фиксируются версии технологий, состояние хранилищ, входные данные и параметры нагрузки. За счёт этого наблюдаемые различия можно связывать с особенностями стека и межсервисной коммуникации, а не с побочными факторами.',
          },
        ],
        methodologyMetrics: [
          {
            title: 'Среднее время отклика',
            text: 'Показывает усреднённый интервал между отправкой запроса и получением полного ответа. Метрика позволяет оценить общий уровень быстродействия системы при заданной нагрузке.',
          },
          {
            title: '95-й перцентиль времени отклика (p95)',
            text: 'Используется для анализа устойчивости отклика и поведения системы в менее благоприятной части распределения задержек. Именно эта метрика показывает, насколько предсказуемо приложение ведёт себя под нагрузкой.',
          },
          {
            title: 'Пропускная способность (RPS)',
            text: 'Характеризует количество успешно обработанных запросов в секунду. Метрика позволяет оценить, какой объём работы система способна выполнить при фиксированном профиле нагрузки.',
          },
          {
            title: 'Средняя загрузка CPU',
            text: 'Отражает интенсивность использования процессорных ресурсов контейнерами приложения. Этот показатель нужен для сопоставления скорости обработки запросов с вычислительной ценой достигнутой производительности.',
          },
          {
            title: 'Потребление оперативной памяти',
            text: 'Показывает объём памяти, используемый контейнерами в ходе прогона. Метрика позволяет оценить ресурсоёмкость реализации и её пригодность для плотного контейнерного развёртывания.',
          },
        ],
        authorProfile: {
          name: 'Иван Моничев',
          education: 'Магистрант, Университет ИТМО',
          age: '29 лет',
          description:
            'Веб-разработчик с опытом в коммерческой разработке с 2022 года. Специализируюсь на frontend-разработке, уделяю большое внимание архитектуре приложений, инженерным процессам и системному развитию экспертизы. Параллельно углубляюсь в backend-направление и интересуюсь проектированием современных программных систем. В рамках ВКР провожу исследование, посвященное микросервисной архитектуре и особенностям взаимодействия сервисов.',
          position: 'Senior Frontend Developer, ООО "Балтех"',
          contacts: [
            {
              label: 'Почта',
              value: 'id.monichev@gmail.com',
              href: 'mailto:id.monichev@gmail.com',
            },
            {
              label: 'VK',
              value: 'vk.com/ivan_monichev',
              href: 'https://vk.com/ivan_monichev',
            },
          ],
          skills: [
            'React',
            'JavaScript',
            'Node.js',
            'CSS',
            'HTML',
            'CSS3',
            'HTML5',
            'Git',
            'Frontend',
            'Node.js',
            'Electron',
            'Redux',
            'FSD',
            'nestJS',
            'JS',
            'Веб-программирование',
            'React.js',
            'Обучение персонала',
            'SSR',
          ],
        },
        reportDetailContent: {
          'get-all-orders-http': {
            title: 'Сравнение HTTP downstream',
            lead: 'Сценарий полезен для оценки накладных расходов на синхронные вызовы между gateway и downstream сервисами при выборке списка заказов.',
          },
          'get-all-orders-grpc': {
            title: 'Сравнение gRPC downstream',
            lead: 'Фокус на сравнении той же доменной операции при смене протокола downstream взаимодействия на gRPC.',
          },
          'create-order': {
            title: 'Нагрузочный тест пути записи',
            lead: 'Комплексный write path позволяет увидеть влияние сериализации, бизнес-логики и сетевого взаимодействия на создание заказа.',
          },
          'update-order-status': {
            title: 'Базовый сценарий обновления статуса',
            lead: 'Короткий сценарий обновления статуса используется как базовый ориентир для latency и ресурсоемкости write операций.',
          },
        },
      },
    },
  },
  en: {
    translation: {
      brand: {
        title: 'Microservices Benchmark',
      },
      navigation: {
        home: 'Home',
        aboutAuthor: 'About Author',
        methodology: 'Method',
        reports: 'Reports',
        openSection: 'Open section',
      },
      common: {
        reportRoute: 'Open reports',
        methodologyRoute: 'Go to method',
        photo: 'Photo',
        contacts: 'Contacts',
        skills: 'Skills',
      },
      home: {
        hero: {
          title:
            'A study of interaction methods between microservices in web applications',
          description:
            'This graduation thesis compares several interaction patterns between microservices in a web application. It examines HTTP, gRPC, and event-driven messaging, along with their impact on latency, throughput, and resource usage under load testing.',
          reportsCta: 'Open reports',
          methodologyCta: 'Go to method',
          imageAlt: 'Web application illustration',
        },
        about: {
          title: 'About the project',
          paragraph1Start:
            'The project is based on a reproducible method for comparative evaluation of microservice interaction performance. The study is focused on selecting a technology platform for microservice systems under',
          paragraph1Accent: 'realistic load',
          paragraph2:
            'The current version compares two implementations of the same experimental e-commerce application: Express for the Node.js stack and Fiber for the Go stack. The comparison covers average response time, p95 response time, throughput, CPU usage, and memory consumption. Load testing is performed in a containerized Docker environment with k6, while resource metrics are collected under fixed experimental conditions.',
        },
        methodology: {
          title: 'Key stages',
        },
        technologies: {
          title: 'Technologies',
          count: '{{count}} technologies',
          description:
            'The project uses the following technologies for microservice implementation, data storage, containerization, and load testing.',
        },
        researchNavigation: {
          title: 'Research navigation',
        },
      },
      methodologyPage: {
        title: 'Experimental method',
        fixedTitle: 'Research frame',
        selectedStagePrefix: 'Step',
        stageOne: {
          title: 'Define uniform experimental conditions',
          intro:
            'The key objective of the first stage is to ensure experiment reproducibility. With fixed conditions, differences in load and functional test results can be correctly attributed to the selected technology stack and interservice communication approach.',
          diagramText:
            'The diagram shows the full interaction contour: the request path through the API Gateway, service-to-service links over HTTP, gRPC, and AMQP, and the storage binding for each service. This establishes a single architectural baseline for fair implementation comparison.',
          diagramAlt: 'Experimental testbed architecture',
          platformLead:
            'To keep results comparable, both the computational platform parameters and key technology versions were fixed. All components ran in Docker containers on a single testbed, isolating microservice runtime conditions and reducing external effects from system configuration, dependencies, and library APIs.',
          platformTable: {
            leftHeader: 'Environment parameter',
            rightHeader: 'Value',
            rows: [
              { id: 'os', left: 'Operating system', right: 'macOS Tahoe, 26.3' },
              { id: 'cpu', left: 'Processor', right: 'Apple M5 (ARM)' },
              {
                id: 'ram',
                left: 'Random access memory (RAM)',
                right: '16 GB Unified Memory',
              },
              {
                id: 'cores',
                left: 'Core count',
                right: '10 (6 performance + 4 efficiency)',
              },
              { id: 'threads', left: 'Thread count', right: '10' },
            ],
          },
          technologyTable: {
            leftHeader: 'Technology',
            rightHeader: 'Version',
            rows: [
              { id: 'node', left: 'Node.js', right: '22' },
              { id: 'ts', left: 'TypeScript', right: '5.9.3' },
              { id: 'express', left: 'Express', right: '5.2.1' },
              { id: 'typeorm', left: 'TypeORM', right: '0.3.28' },
              { id: 'mongoose', left: 'Mongoose', right: '9.2.3' },
              { id: 'axios', left: 'Axios', right: '1.13.6' },
              { id: 'amqplib', left: 'Amqplib', right: '0.10.9' },
              { id: 'go', left: 'Go', right: '1.25.6' },
              { id: 'fiber', left: 'Fiber', right: '3.1.0' },
              {
                id: 'mongo-driver',
                left: 'go.mongodb.org/mongo-driver',
                right: '2.5.0',
              },
              { id: 'pgx', left: 'pgx', right: '5.8.0' },
              {
                id: 'rabbitmq-go',
                left: 'RabbitMQ Go Client (amqp091-go)',
                right: '1.10.0',
              },
              { id: 'grpc', left: 'gRPC', right: '1.79.2' },
              {
                id: 'protobuf',
                left: 'Protocol Buffers (protobuf)',
                right: '1.36.11',
              },
              {
                id: 'protoc-gen-go-grpc',
                left: 'protoc-gen-go-grpc',
                right: '1.6.1',
              },
            ],
          },
        },
        stageTwo: {
          title: 'Select load testing techniques',
          intro:
            'The baseline approach uses uniform testing under constant load. This format is aimed at comparing performance across different microservice interaction implementations under identical controlled conditions, rather than finding the system’s absolute fault-tolerance limit. Keeping the number of concurrently active clients stable throughout each run reduces random request-intensity fluctuations and makes final metrics more comparable.',
          scenariosLead:
            'Load testing is structured into four scenarios covering read operations, write operations, and asynchronous event handling. This decomposition makes it possible to compare system behavior across different interservice communication modes under the same experimental conditions.',
          diagramAlt: 'Interaction scenario diagram for the microservice application',
          scenarios: [
            {
              id: 'scenario-1',
              title:
                'Scenario 1: get order list with HTTP interservice communication',
              text: 'A client request reaches the API Gateway, which then calls the user service and the order service over HTTP. The order service additionally requests product data over HTTP, forms the final response, and returns it to the client through the API Gateway. This scenario represents classic REST communication and is used to evaluate HTTP overhead, data serialization costs, and sequential request processing.',
            },
            {
              id: 'scenario-2',
              title:
                'Scenario 2: get order list with gRPC interservice communication',
              text: 'By business logic, this scenario is identical to the first one, but communication between the order service and the product service is done over gRPC instead of HTTP. This allows two interservice communication approaches to be compared under the same functional conditions and shows how replacing a REST call with gRPC affects latency, throughput, and overall system behavior.',
            },
            {
              id: 'scenario-3',
              title: 'Scenario 3: create order',
              text: 'The client sends a POST request through the API Gateway to the order service over HTTP. The service validates input data, processes the request, creates a new order entity, and persists the result. Unlike the first two scenarios, this one models a write operation rather than a read operation.',
            },
            {
              id: 'scenario-4',
              title:
                'Scenario 4: asynchronous order status update with event publication',
              text: 'The client request passes through the API Gateway and is routed to the notification service over HTTP. After processing, the notification service publishes a message to the RabbitMQ broker using AMQP.',
            },
          ],
          generatorTable: {
            leftHeader: 'Parameter',
            rightHeader: 'Value',
            rows: [
              { id: 'tool', left: 'Load generation tool', right: 'k6' },
              { id: 'vus', left: 'Virtual users', right: '1000' },
              {
                id: 'sleep',
                left: 'Delay between user requests',
                right: '1 second',
              },
              { id: 'duration', left: 'Single-run duration', right: '1 minute' },
              {
                id: 'repeats',
                left: 'Repetitions per scenario',
                right: '10',
              },
            ],
          },
          profileParagraphs: [
            'The load profile is set as a stable and repeatable mode: request intensity, concurrently active users, run duration, and number of scenario repetitions are fixed. This configuration reduces random fluctuations and makes cross-stack comparison statistically more robust.',
            'To preserve comparability, the testbed was prepared before each run: database state was reset to the baseline dataset, message queues were cleared, and input data was returned to the same initial state. This removed carry-over effects from previous runs and improved measurement reliability.',
          ],
        },
        stageThree: {
          title: 'Define evaluation metrics',
          intro:
            'At this stage, a unified metric set is fixed for comparing implementations. Each metric reflects a specific aspect of behavior under load and together forms an integral view of performance and resource efficiency.',
        },
        stagesTitle: 'Method stages',
        stagesDescription:
          'The method is organized as a sequence of steps that preserve architectural equivalence, control the load environment, and provide comparable results.',
        stageFourFive: {
          title: 'Experiment execution, analysis, and interpretation',
          intro:
            'This stage covers the full cycle from repeatable runs to interpretation of aggregated results, enabling a system-level analysis of performance and resource usage under identical experimental conditions.',
          executionTitle: 'Step 04. Experiment execution',
          executionText:
            'Each scenario is executed in repeated runs with a fixed load profile. During execution, temporal metrics (latency, p95, RPS, errors) and container resource metrics (CPU and RAM) are collected.',
          analysisTitle: 'Step 05. Analysis and interpretation',
          analysisText:
            'After the runs complete, the collected data is aggregated and compared across technology implementations and scenarios to evaluate response stability, computational cost, and the impact of interservice communication mode on overall efficiency.',
          resultsLead:
            'Detailed metric values and comparative results are available in the reports section.',
          resultsCta: 'Go to results',
        },
      },
      reportsPage: {
        eyebrow: 'Reports',
        scenario: 'Scenario',
        nextTitle: 'What to add next',
        nextItems: [
          'Latency and throughput charts across run series.',
          'Links to HTML and JSON artifacts from `benchmark/results`.',
          'Summary conclusions on bottleneck services and resource peaks.',
        ],
        otherScenarios: 'Other scenarios',
      },
      aboutPage: {
        imagePlaceholder:
          'An author photo can be placed here. The block is currently left as a placeholder until an image is added to the project.',
        reportsCta: 'Reports',
      },
      footer: {
        city: 'Saint Petersburg',
      },
      language: {
        ru: 'RU',
        en: 'EN',
      },
      content: {
        heroStats: [
          { label: 'Services in the testbed', value: '5' },
          { label: 'Load scenarios', value: '4' },
          { label: 'Technology slices', value: '2' },
        ],
        goals: [
          {
            title: 'Interaction channel comparison',
            text: 'The testbed shows the difference between HTTP, gRPC, and event-driven exchange across a realistic set of e-commerce services.',
          },
          {
            title: 'Formalized load method',
            text: 'Scenarios, environment, and metrics are described so the experiment can be reproduced and extended.',
          },
          {
            title: 'Transparent results',
            text: 'The site aggregates reports, charts, and performance and resource usage metrics.',
          },
        ],
        architecturePillars: [
          {
            name: 'API Gateway',
            description:
              'A single entry point for clients and a coordinator of calls to domain services.',
          },
          {
            name: 'User / Product / Order Services',
            description:
              'The core domain microservices, each with its own bounded responsibility and storage.',
          },
          {
            name: 'Notification Service + RabbitMQ',
            description:
              'An asynchronous event layer for publishing domain notifications and reacting to operations.',
          },
        ],
        methodologySteps: [
          {
            step: '01',
            title: 'Define uniform experimental conditions',
            text: 'The first stage fixes the problem domain, service set, architectural scheme, data stores, API Gateway, message broker, and shared business logic. This removes functional differences from the comparison and keeps the focus on the technology stack itself.',
          },
          {
            step: '02',
            title: 'Select load testing techniques',
            text: 'After the baseline is fixed, the load profile is defined. The study uses steady constant load to keep the number of active virtual users stable and avoid distorting the comparison with random fluctuations in request intensity.',
          },
          {
            step: '03',
            title: 'Choose and formalize metrics',
            text: 'At this stage the metric set is defined: average response time, p95 latency, throughput, average CPU usage, and memory consumption. This makes it possible to evaluate both response speed and the computational cost of achieving it.',
          },
          {
            step: '04',
            title: 'Run the experiment and collect metrics',
            text: 'This stage runs repeatable executions of the four scenarios in a containerized environment. Load is generated with k6, while container-level resource metrics are captured during the runs with docker stats.',
          },
          {
            step: '05',
            title: 'Analyze and interpret results',
            text: 'The final stage compares the collected metrics, evaluates latency stability and resource usage, and formulates conclusions about how the chosen stack and interservice communication mode affect overall system performance.',
          },
        ],
        technologies: [
          {
            name: 'Go',
            description:
              'One of the two platforms compared for microservice implementation in the experimental testbed.',
          },
          {
            name: 'Node.js',
            description:
              'The second study platform used to implement the same application in parallel.',
          },
          {
            name: 'Fiber',
            description:
              'The Go web framework used for the Go implementation of the microservice application.',
          },
          {
            name: 'Express',
            description:
              'The Node.js web framework used in the Node.js implementation of the application under study.',
          },
          {
            name: 'MongoDB',
            description:
              'A document-oriented database used to store part of the domain entities in the testbed.',
          },
          {
            name: 'Postgres',
            description:
              'A relational database used in services where a structured data model matters.',
          },
          {
            name: 'Docker',
            description:
              'A container environment that enforces uniform runtime conditions for services and infrastructure.',
          },
          {
            name: 'k6',
            description:
              'The load testing tool used to execute repeatable scenarios and collect metrics.',
          },
          {
            name: 'RabbitMQ',
            description:
              'A message broker used for event-driven interaction between services inside the microservice landscape.',
          },
        ],
        reports: [
          {
            id: 'get-all-orders-http',
            title: 'Get All Orders over HTTP',
            summary:
              'Reads the order list through an HTTP downstream to estimate the overhead of synchronous interaction.',
            tags: ['k6', 'HTTP', 'Orders'],
            metrics: [
              { label: 'Node.js avg', value: '806 ms' },
              { label: 'Go avg', value: '221 ms' },
              { label: 'Node.js CPU', value: '314%' },
              { label: 'Go CPU', value: '478%' },
            ],
          },
          {
            id: 'get-all-orders-grpc',
            title: 'Get All Orders over gRPC',
            summary:
              'This scenario compares reading orders through a gRPC downstream under high concurrent load.',
            tags: ['k6', 'gRPC', 'Orders'],
            metrics: [
              { label: 'Node.js p95', value: '1609 ms' },
              { label: 'Go p95', value: '374 ms' },
              { label: 'Node.js RAM', value: '843 MiB' },
              { label: 'Go RAM', value: '343 MiB' },
            ],
          },
          {
            id: 'create-order',
            title: 'Create Order',
            summary:
              'Evaluates the full order creation path: gateway, validation, product fetch, and result persistence.',
            tags: ['Write path', 'Orders', 'Users'],
            metrics: [
              { label: 'Node.js avg', value: '325 ms' },
              { label: 'Go avg', value: '19 ms' },
              { label: 'Node.js requests', value: '45 784' },
              { label: 'Go requests', value: '59 236' },
            ],
          },
          {
            id: 'update-order-status',
            title: 'Update Order Status',
            summary:
              'Shows the lightest update scenario and works well as a baseline comparison for write latency.',
            tags: ['Status', 'Orders', 'Baseline'],
            metrics: [
              { label: 'Node.js p95', value: '66.5 ms' },
              { label: 'Go p95', value: '6.85 ms' },
              { label: 'Node.js RAM', value: '423 MiB' },
              { label: 'Go RAM', value: '99.9 MiB' },
            ],
          },
        ],
        navigationCards: [
          {
            title: 'About author',
            description:
              'Who authored the thesis and in what academic and professional context the work is being done.',
            to: '/about-author',
          },
          {
            title: 'Method',
            description:
              'Experiment setup rules, load profiles, metric set, and repeatability principles.',
            to: '/metodika',
          },
          {
            title: 'Reports',
            description:
              'Comparative testing scenarios with key latency, throughput, CPU, and RAM indicators.',
            to: '/reports/get-all-orders-grpc',
          },
          {
            title: 'Architecture',
            description:
              'The experimental testbed scheme, microservice roles, and the place of the asynchronous layer in the system.',
            to: '/#architecture',
          },
        ],
        methodologyDetails: [
          'The independent variable of the experiment is the software platform used to implement the microservice application: Express/Node.js versus Fiber/Go, while architecture, business logic, and interaction scenarios remain unchanged.',
          'The goal of the method is to obtain a comparable performance evaluation without mixing the studied factor with differences in the problem domain, service structure, load profile, or infrastructure.',
          'For that reason, all substantial conditions are fixed in advance: service composition, data stores, API Gateway, RabbitMQ, container environment, load parameters, input data, and result aggregation rules.',
          'This makes it possible to interpret metric differences as a consequence of implementation and communication choices rather than accidental changes in the external environment.',
        ],
        methodologyPrinciples: [
          {
            title: 'What is being compared',
            text: 'Two implementations of the same microservice web application are compared: Express in Node.js and Fiber in Go. The architecture, domain model, request processing scenarios, and infrastructure remain the same across both implementations.',
          },
          {
            title: 'Why the experiment is reproducible',
            text: 'All services and infrastructure components are deployed in Docker containers on a single test platform. This reduces the impact of differences in system dependencies, environment configuration, and startup order.',
          },
          {
            title: 'How comparison validity is preserved',
            text: 'Technology versions, storage state, input data, and load parameters are fixed before the runs. Because of that, observed differences can be attributed to stack behavior and interservice communication rather than side effects.',
          },
        ],
        methodologyMetrics: [
          {
            title: 'Average response time',
            text: 'Shows the average interval between sending a request and receiving the full response. It provides a general estimate of how fast the system responds under the chosen load profile.',
          },
          {
            title: '95th percentile latency (p95)',
            text: 'Used to analyze latency stability and the less favorable part of the delay distribution. This metric shows how predictable the application remains under load.',
          },
          {
            title: 'Throughput (RPS)',
            text: 'Represents the number of successfully processed requests per second. It shows how much useful work the system can perform under fixed load conditions.',
          },
          {
            title: 'Average CPU usage',
            text: 'Reflects how intensively the application containers use processor resources. This helps relate response speed to the computational cost of delivering that performance.',
          },
          {
            title: 'Memory consumption',
            text: 'Shows how much memory the containers use during a run. This metric is necessary for assessing resource efficiency and deployment density in containerized environments.',
          },
        ],
        authorProfile: {
          name: 'Ivan Monichev',
          education: 'Master’s student, ITMO University',
          age: '29 years old',
          position: 'Senior Frontend Developer, Baltekh LLC',
          description:
            'Web developer with commercial experience since 2022. I focus on frontend engineering, application architecture, engineering processes, and systematic professional growth. At the same time, I continue to deepen my backend expertise and study the design of modern software systems. In this thesis, I investigate microservice architecture and the performance impact of different service interaction patterns.',
          contacts: [
            {
              label: 'Email',
              value: 'id.monichev@gmail.com',
              href: 'mailto:id.monichev@gmail.com',
            },
            {
              label: 'VK',
              value: 'vk.com/ivan_monichev',
              href: 'https://vk.com/ivan_monichev',
            },
          ],
          skills: [
            'React',
            'JavaScript',
            'Node.js',
            'CSS',
            'HTML',
            'CSS3',
            'HTML5',
            'Git',
            'Frontend',
            'Node.js',
            'Electron',
            'Redux',
            'FSD',
            'nestJS',
            'JS',
            'Web programming',
            'React.js',
            'Staff training',
            'SSR',
          ],
        },
        reportDetailContent: {
          'get-all-orders-http': {
            title: 'HTTP downstream comparison',
            lead: 'The scenario is useful for evaluating the overhead of synchronous calls between the gateway and downstream services when retrieving the order list.',
          },
          'get-all-orders-grpc': {
            title: 'gRPC downstream comparison',
            lead: 'The focus is on comparing the same domain operation after switching the downstream interaction protocol to gRPC.',
          },
          'create-order': {
            title: 'Write path benchmark',
            lead: 'The end-to-end write path makes it possible to observe the impact of serialization, business logic, and network interaction on order creation.',
          },
          'update-order-status': {
            title: 'Status update baseline',
            lead: 'The short status update scenario is used as a baseline reference for latency and resource usage of write operations.',
          },
        },
      },
    },
  },
} as const

export type AppLanguage = keyof typeof resources
