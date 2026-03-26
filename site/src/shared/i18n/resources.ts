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
            'В текущей версии проекта сопоставляются две реализации одного экспериментального e-commerce приложения: на Express для TypeScript-стека и на Fiber для Go-стека. Сравнение выполняется по метрикам среднего времени отклика, p95 времени отклика, пропускной способности, загрузки CPU и потребления памяти. Нагрузочное тестирование проводится в контейнеризированной среде Docker с использованием k6, а сбор ресурсных метрик выполняется при фиксированных условиях эксперимента.',
          keywordsTitle: 'Ключевые слова',
          keywords: [
            'Микросервисная архитектура',
            'Веб-фреймворки',
            'Производительность',
            'Нагрузочное тестирование',
            'Контролируемый эксперимент',
            'Воспроизводимость',
          ],
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
        eyebrow: 'Methodology',
        title: 'Методика эксперимента',
        description:
          'Эта страница дает опорную структуру раздела, который можно расширять подробными таблицами, графиками и ссылками на артефакты прогонов.',
        fixedTitle: 'Что фиксируется',
      },
      reportsPage: {
        eyebrow: 'Reports',
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
            text: 'На первом этапе фиксируются архитектура приложения, бизнес-логика, сценарии взаимодействия сервисов, базы данных и параметры инфраструктурного окружения, чтобы сравнение платформ оставалось сопоставимым.',
          },
          {
            step: '02',
            title: 'Определение техник нагрузочного тестирования',
            text: 'После фиксации условий выбираются техники нагрузочного воздействия: равномерная нагрузка, стресс-тестирование, пиковые сценарии и тестирование стабильности в зависимости от исследуемого аспекта поведения системы.',
          },
          {
            step: '03',
            title: 'Выбор и формализация метрик',
            text: 'На этом этапе фиксируется набор метрик для сравнения реализаций: среднее время отклика, p95, пропускная способность, загрузка CPU и потребление оперативной памяти.',
          },
          {
            step: '04',
            title: 'Проведение эксперимента и сбор метрик',
            text: 'На этом этапе выполняются повторяемые прогоны сценариев в контейнеризированной среде, генерируется нагрузка и собираются временные и ресурсные показатели по всем компонентам приложения.',
          },
          {
            step: '05',
            title: 'Анализ и интерпретация результатов',
            text: 'Финальный этап посвящен сопоставлению полученных метрик, выявлению узких мест и формулированию выводов о поведении платформ в идентичных условиях микросервисного взаимодействия.',
          },
        ],
        technologies: [
          {
            name: 'Go',
            description:
              'Одна из двух сравниваемых платформ для реализации микросервисов в экспериментальном стенде.',
          },
          {
            name: 'TypeScript',
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
              'Web-фреймворк для Node.js, используемый в TypeScript-реализации исследуемого приложения.',
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
            title: 'Get All Orders over HTTP',
            summary:
              'Чтение списка заказов через HTTP downstream для оценки накладных расходов синхронного взаимодействия.',
            tags: ['k6', 'HTTP', 'Orders'],
            metrics: [
              { label: 'TypeScript avg', value: '806 ms' },
              { label: 'Go avg', value: '221 ms' },
              { label: 'TypeScript CPU', value: '314%' },
              { label: 'Go CPU', value: '478%' },
            ],
          },
          {
            id: 'get-all-orders-grpc',
            title: 'Get All Orders over gRPC',
            summary:
              'Сценарий сравнивает чтение заказов через gRPC downstream при высокой конкурентной нагрузке.',
            tags: ['k6', 'gRPC', 'Orders'],
            metrics: [
              { label: 'TypeScript p95', value: '1609 ms' },
              { label: 'Go p95', value: '374 ms' },
              { label: 'TypeScript RAM', value: '843 MiB' },
              { label: 'Go RAM', value: '343 MiB' },
            ],
          },
          {
            id: 'create-order',
            title: 'Create Order',
            summary:
              'Оценивает полный путь создания заказа: gateway, валидация, получение товара и запись результата.',
            tags: ['Write path', 'Orders', 'Users'],
            metrics: [
              { label: 'TypeScript avg', value: '325 ms' },
              { label: 'Go avg', value: '19 ms' },
              { label: 'TypeScript requests', value: '45 784' },
              { label: 'Go requests', value: '59 236' },
            ],
          },
          {
            id: 'update-order-status',
            title: 'Update Order Status',
            summary:
              'Показывает наиболее легкий сценарий обновления, удобный для базового сравнения write latency.',
            tags: ['Status', 'Orders', 'Baseline'],
            metrics: [
              { label: 'TypeScript p95', value: '66.5 ms' },
              { label: 'Go p95', value: '6.85 ms' },
              { label: 'TypeScript RAM', value: '423 MiB' },
              { label: 'Go RAM', value: '99.9 MiB' },
            ],
          },
        ],
        navigationCards: [
          {
            title: 'Об авторе',
            description:
              'Кто выполнил ВКР, в каком академическом и профессиональном контексте ведется работа.',
            to: '/about-author',
          },
          {
            title: 'Методика',
            description:
              'Правила постановки эксперимента, профили нагрузки, набор метрик и принципы повторяемости прогонов.',
            to: '/methodology',
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
          'Независимый параметр эксперимента: используемая технологическая платформа при неизменной архитектуре и бизнес-логике.',
          'Среда выполнения фиксируется через контейнеризацию Docker и единые условия запуска сервисов и хранилищ.',
          'Нагрузка формируется повторяемыми сценариями, а временные и ресурсные показатели собираются в одинаковом режиме для всех реализаций.',
          'Ключевые метрики: среднее время отклика, p95, RPS, средняя загрузка CPU и потребление оперативной памяти.',
        ],
        authorProfile: {
          name: 'Иван Моничев',
          education: 'Магистрант, Университет ИТМО',
          age: '29 лет',
          position: 'Senior Frontend Developer, ООО "Балтех"',
          description:
            'Я занимаюсь разработкой веб-интерфейсов и инженерной проработкой frontend-архитектуры. В рамках ВКР исследую, как разные способы взаимодействия между микросервисами влияют на производительность веб-приложения в условиях воспроизводимого нагрузочного эксперимента.',
          contacts: [
            {
              label: 'Почта',
              value: 'Добавьте email',
              href: '#',
            },
            {
              label: 'VK',
              value: 'Добавьте ссылку на VK',
              href: '#',
            },
          ],
          skills: [
            'TypeScript',
            'React',
            'Next.js',
            'Frontend Architecture',
            'Design Systems',
            'Node.js',
            'Tailwind CSS',
            'Performance',
            'Docker',
            'Microservices',
          ],
        },
        reportDetailContent: {
          'get-all-orders-http': {
            title: 'HTTP downstream comparison',
            lead: 'Сценарий полезен для оценки накладных расходов на синхронные вызовы между gateway и downstream сервисами при выборке списка заказов.',
          },
          'get-all-orders-grpc': {
            title: 'gRPC downstream comparison',
            lead: 'Фокус на сравнении той же доменной операции при смене протокола downstream взаимодействия на gRPC.',
          },
          'create-order': {
            title: 'Write path benchmark',
            lead: 'Комплексный write path позволяет увидеть влияние сериализации, бизнес-логики и сетевого взаимодействия на создание заказа.',
          },
          'update-order-status': {
            title: 'Status update baseline',
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
        methodology: 'Methodology',
        reports: 'Reports',
        openSection: 'Open section',
      },
      common: {
        reportRoute: 'Open reports',
        methodologyRoute: 'Go to methodology',
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
          methodologyCta: 'Go to methodology',
          imageAlt: 'Web application illustration',
        },
        about: {
          title: 'About the project',
          paragraph1Start:
            'The project is based on a reproducible methodology for comparative evaluation of microservice interaction performance. The study is focused on selecting a technology platform for microservice systems under',
          paragraph1Accent: 'realistic load',
          paragraph2:
            'The current version compares two implementations of the same experimental e-commerce application: Express for the TypeScript stack and Fiber for the Go stack. The comparison covers average response time, p95 response time, throughput, CPU usage, and memory consumption. Load testing is performed in a containerized Docker environment with k6, while resource metrics are collected under fixed experimental conditions.',
          keywordsTitle: 'Keywords',
          keywords: [
            'Microservice architecture',
            'Web frameworks',
            'Performance',
            'Load testing',
            'Controlled experiment',
            'Reproducibility',
          ],
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
        eyebrow: 'Methodology',
        title: 'Experiment methodology',
        description:
          'This page provides a structural baseline for the section and can be expanded with detailed tables, charts, and links to run artifacts.',
        fixedTitle: 'What is fixed',
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
            title: 'Formalized load methodology',
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
            text: 'The first stage fixes application architecture, business logic, service interaction scenarios, databases, and infrastructure parameters so platform comparison remains consistent.',
          },
          {
            step: '02',
            title: 'Select load testing techniques',
            text: 'After conditions are fixed, the load techniques are selected: steady load, stress testing, spike scenarios, and stability testing depending on the aspect of system behavior being studied.',
          },
          {
            step: '03',
            title: 'Choose and formalize metrics',
            text: 'At this stage the metric set is fixed for implementation comparison: average response time, p95, throughput, CPU usage, and memory consumption.',
          },
          {
            step: '04',
            title: 'Run the experiment and collect metrics',
            text: 'This stage executes repeatable scenario runs in a containerized environment, generates load, and collects temporal and resource metrics across all application components.',
          },
          {
            step: '05',
            title: 'Analyze and interpret results',
            text: 'The final stage compares the collected metrics, identifies bottlenecks, and formulates conclusions about platform behavior under identical microservice interaction conditions.',
          },
        ],
        technologies: [
          {
            name: 'Go',
            description:
              'One of the two platforms compared for microservice implementation in the experimental testbed.',
          },
          {
            name: 'TypeScript',
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
              'The Node.js web framework used in the TypeScript implementation of the application under study.',
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
              { label: 'TypeScript avg', value: '806 ms' },
              { label: 'Go avg', value: '221 ms' },
              { label: 'TypeScript CPU', value: '314%' },
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
              { label: 'TypeScript p95', value: '1609 ms' },
              { label: 'Go p95', value: '374 ms' },
              { label: 'TypeScript RAM', value: '843 MiB' },
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
              { label: 'TypeScript avg', value: '325 ms' },
              { label: 'Go avg', value: '19 ms' },
              { label: 'TypeScript requests', value: '45 784' },
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
              { label: 'TypeScript p95', value: '66.5 ms' },
              { label: 'Go p95', value: '6.85 ms' },
              { label: 'TypeScript RAM', value: '423 MiB' },
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
            title: 'Methodology',
            description:
              'Experiment setup rules, load profiles, metric set, and repeatability principles.',
            to: '/methodology',
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
          'The independent experimental variable is the technology platform, while architecture and business logic remain unchanged.',
          'The execution environment is fixed through Docker containerization and uniform service and storage startup conditions.',
          'Load is generated through repeatable scenarios, while temporal and resource metrics are collected in the same mode for all implementations.',
          'Key metrics are average response time, p95, RPS, average CPU usage, and memory consumption.',
        ],
        authorProfile: {
          name: 'Ivan Monichev',
          education: 'Master’s student, ITMO University',
          age: '29 years old',
          position: 'Senior Frontend Developer, Baltekh LLC',
          description:
            'I work on web interface development and frontend architecture. In this thesis, I study how different microservice interaction patterns affect web application performance under a reproducible load experiment.',
          contacts: [
            {
              label: 'Email',
              value: 'Add email',
              href: '#',
            },
            {
              label: 'VK',
              value: 'Add VK link',
              href: '#',
            },
          ],
          skills: [
            'TypeScript',
            'React',
            'Next.js',
            'Frontend Architecture',
            'Design Systems',
            'Node.js',
            'Tailwind CSS',
            'Performance',
            'Docker',
            'Microservices',
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
