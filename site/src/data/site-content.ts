export const heroStats = [
  { label: "Сервисов в стенде", value: "5" },
  { label: "Нагрузочных сценариев", value: "4" },
  { label: "Технологических срезов", value: "2" },
];

export const goals = [
  {
    title: "Сравнение каналов взаимодействия",
    text: "Стенд показывает разницу между HTTP, gRPC и событийным обменом в реальном наборе e-commerce сервисов.",
  },
  {
    title: "Формализованная нагрузочная методика",
    text: "Сценарии, окружение и метрики описаны так, чтобы эксперимент можно было повторить и расширить.",
  },
  {
    title: "Прозрачные результаты",
    text: "На сайте собраны отчёты, графики и агрегированные показатели производительности и потребления ресурсов.",
  },
];

export const architecturePillars = [
  {
    name: "API Gateway",
    description:
      "Единая точка входа для клиентов и координация вызовов к доменным сервисам.",
  },
  {
    name: "User / Product / Order Services",
    description:
      "Основные доменные микросервисы со своими зонами ответственности и отдельными хранилищами.",
  },
  {
    name: "Notification Service + RabbitMQ",
    description:
      "Асинхронный контур событий для публикации доменных уведомлений и реакции на операции.",
  },
];

export const methodologySteps = [
  {
    step: "01",
    title: "Подготовка стенда",
    text: "Запуск целевых реализаций gateway и зависимых сервисов в одинаковом окружении.",
  },
  {
    step: "02",
    title: "Запуск k6 сценариев",
    text: "Для каждого сценария используются фиксированные профили нагрузки и отдельные bash-раннеры.",
  },
  {
    step: "03",
    title: "Сбор системных метрик",
    text: "Во время теста снимаются данные `docker stats`, затем агрегируются CPU и RAM показатели по контейнерам.",
  },
  {
    step: "04",
    title: "Анализ артефактов",
    text: "Сравниваются latency, throughput, error rate и ресурсные метрики для TypeScript и Go реализаций.",
  },
];

export const reports = [
  {
    id: "get-all-orders-http",
    title: "Get All Orders over HTTP",
    summary:
      "Чтение списка заказов через HTTP downstream для оценки накладных расходов синхронного взаимодействия.",
    tags: ["k6", "HTTP", "Orders"],
    metrics: [
      { label: "TypeScript avg", value: "806 ms" },
      { label: "Go avg", value: "221 ms" },
      { label: "TypeScript CPU", value: "314%" },
      { label: "Go CPU", value: "478%" },
    ],
  },
  {
    id: "get-all-orders-grpc",
    title: "Get All Orders over gRPC",
    summary:
      "Сценарий сравнивает чтение заказов через gRPC downstream при высокой конкурентной нагрузке.",
    tags: ["k6", "gRPC", "Orders"],
    metrics: [
      { label: "TypeScript p95", value: "1609 ms" },
      { label: "Go p95", value: "374 ms" },
      { label: "TypeScript RAM", value: "843 MiB" },
      { label: "Go RAM", value: "343 MiB" },
    ],
  },
  {
    id: "create-order",
    title: "Create Order",
    summary:
      "Оценивает полный путь создания заказа: gateway, валидация, получение товара и запись результата.",
    tags: ["Write path", "Orders", "Users"],
    metrics: [
      { label: "TypeScript avg", value: "325 ms" },
      { label: "Go avg", value: "19 ms" },
      { label: "TypeScript requests", value: "45 784" },
      { label: "Go requests", value: "59 236" },
    ],
  },
  {
    id: "update-order-status",
    title: "Update Order Status",
    summary:
      "Показывает наиболее лёгкий сценарий обновления, удобный для базового сравнения write latency.",
    tags: ["Status", "Orders", "Baseline"],
    metrics: [
      { label: "TypeScript p95", value: "66.5 ms" },
      { label: "Go p95", value: "6.85 ms" },
      { label: "TypeScript RAM", value: "423 MiB" },
      { label: "Go RAM", value: "99.9 MiB" },
    ],
  },
];

export const navigationCards = [
  {
    title: "Методика эксперимента",
    description:
      "Профили нагрузки, сценарии k6, набор метрик и правила повторяемости прогонов.",
    to: "/methodology",
  },
  {
    title: "Каталог отчётов",
    description:
      "Карточки сценариев, сводные показатели latency, throughput, CPU и RAM, а также ссылки на графики.",
    to: "/reports/get-all-orders-grpc",
  },
  {
    title: "О проекте",
    description:
      "Назначение лабораторного стенда, стек реализации и подготовка к публикации на GitHub Pages.",
    to: "/about",
  },
];

export const methodologyDetails = [
  "Сценарии: `get-all-orders-http`, `get-all-orders-grpc`, `create-order`, `update-order-status`.",
  "Параметры по умолчанию: 500 VUs, длительность 30s или 1m в зависимости от сценария.",
  "Артефакты: summary JSON, HTML report, лог запуска, сырые `docker stats`, агрегированная JSON-сводка.",
  "Ключевые метрики: p95 latency, среднее время ответа, количество запросов, CPU time, average/max RAM.",
];

export const reportDetailContent = {
  "get-all-orders-http": {
    title: "HTTP downstream comparison",
    lead: "Сценарий полезен для оценки накладных расходов на синхронные вызовы между gateway и downstream сервисами при выборке списка заказов.",
  },
  "get-all-orders-grpc": {
    title: "gRPC downstream comparison",
    lead: "Фокус на сравнении той же доменной операции при смене протокола downstream взаимодействия на gRPC.",
  },
  "create-order": {
    title: "Write path benchmark",
    lead: "Комплексный write path позволяет увидеть влияние сериализации, бизнес-логики и сетевого взаимодействия на создание заказа.",
  },
  "update-order-status": {
    title: "Status update baseline",
    lead: "Короткий сценарий обновления статуса используется как базовый ориентир для latency и ресурсоёмкости write операций.",
  },
} as const;
