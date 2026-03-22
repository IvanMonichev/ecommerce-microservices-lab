# Benchmark

Набор `k6`-сценариев для сравнения двух реализаций одного и того же e-commerce gateway:

- TypeScript + Express: `http://localhost:3000`
- Go + Fiber: `http://localhost:4000`

Во время каждого прогона сохраняются:

- стандартные `k6`-артефакты
- сырые метрики контейнеров из `docker stats`
- агрегированная JSON-сводка по CPU и RAM

## Сценарии

- `get-all-orders-http` - чтение заказов через HTTP downstream
- `get-all-orders-grpc` - чтение заказов через gRPC downstream
- `create-order` - создание заказа
- `update-order-status` - обновление статуса заказа

## Структура

- `scenarios/` - `k6`-сценарии
- `lib/config.js` - общие профили нагрузки и env-конфигурация
- `scripts/run-*.sh` - отдельные раннеры для каждого сценария
- `scripts/collect-docker-stats.sh` - сбор CPU/RAM по контейнерам через `docker stats`
- `scripts/summarize-docker-stats.sh` - агрегация CSV в JSON summary
- `results/` - артефакты запусков

## Требования

- установлен `k6`
- поднята нужная реализация gateway и её сервисы
- доступен Docker CLI
- для `create-order` заданы `USER_ID` и `PRODUCT_ID`

Для `update-order-status`:

- `USER_ID` и `PRODUCT_ID` можно не задавать, тогда сценарий попробует получить их из `users` и `products`
- `ORDER_ID` можно не задавать, тогда сценарий создаст заказ в `setup()`

## Быстрый запуск

```bash
cd benchmark
./scripts/run-get-all-orders-http.sh ts
./scripts/run-get-all-orders-grpc.sh go
./scripts/run-create-order.sh ts
./scripts/run-update-order-status.sh go
```

Поддерживаемые target:

- `ts`
- `go`

## Профили нагрузки по умолчанию

Параметры заданы в [config.js](/Users/ivan-monichev/Projects/ecommerce-microservices-lab/benchmark/lib/config.js).

| Сценарий | VUS | Duration | Доп. параметры |
| --- | ---: | --- | --- |
| `get-all-orders-http` | 500 | `30s` | `LIMIT=25`, `PAGE=1` |
| `get-all-orders-grpc` | 500 | `30s` | `LIMIT=25`, `PAGE=1` |
| `create-order` | 500 | `1m` | `QUANTITY=1`, `CURRENCY=RUB` |
| `update-order-status` | 500 | `1m` | `STATUS=COMPLETED`, `QUANTITY=1` |

Общие thresholds:

- `http_req_failed: rate < 0.05`
- `http_req_duration: p(95) < 2000`

## Полезные env

Общие:

```bash
BASE_URL=http://localhost:3000
VUS=500
DURATION=30s
RUNS=1
INTERVAL_SECONDS=1
```

Для листингов:

```bash
PAGE=1
LIMIT=25
```

Для `create-order` и `update-order-status`:

```bash
USER_ID=<existing-user-id>
PRODUCT_ID=<existing-product-id>
ORDER_ID=<existing-order-id>
CURRENCY=RUB
QUANTITY=1
STATUS=COMPLETED
USERS_BASE_URL=http://localhost:3010
PRODUCTS_BASE_URL=http://localhost:3030
```

`USERS_BASE_URL` и `PRODUCTS_BASE_URL` нужны только если `BASE_URL` не указывает на стандартные порты `3000` или `4000`.

## Что сохраняется в results

Каждый запуск создаёт директорию:

```text
results/<scenario>/<target>/exp-XX/
```

Внутри каждого прогона сохраняются:

- `run-01-summary.json` - `k6` summary JSON
- `run-01-summary.html` - HTML report
- `run-01.log` - stdout/stderr прогона
- `run-01-docker-stats.csv` - сырые snapshot-метрики контейнеров
- `run-01-docker-stats-summary.json` - агрегированная сводка CPU/RAM

Пример:

```text
results/
  get-all-orders-http/
    ts/
      exp-01/
        run-01-summary.json
        run-01-summary.html
        run-01.log
        run-01-docker-stats.csv
        run-01-docker-stats-summary.json
```

## Как работает сбор контейнерных метрик

Во время теста `collect-docker-stats.sh` раз в `INTERVAL_SECONDS` секунд вызывает:

```bash
docker stats --no-stream
```

Сборщик пишет в CSV:

- timestamp
- container
- cpu_perc
- mem_usage
- mem_limit
- mem_perc
- net_io
- block_io
- pids

Для target `ts` собираются:

- `ts-api-gateway`
- `ts-users`
- `ts-products`
- `ts-orders`
- `ts-notification`

Для target `go` собираются:

- `api-gateway`
- `users`
- `products`
- `orders`
- `notification`

## Что означает docker-stats summary

Файл `run-01-docker-stats-summary.json` содержит:

- `containers` - статистику по каждому контейнеру
- `totals` - суммарную статистику по стеку

Основные поля:

- `avg_cpu_pct` - средняя загрузка CPU по sampled snapshots
- `max_cpu_pct` - пиковая загрузка CPU
- `cpu_time_seconds` - оценка суммарно потреблённого CPU времени
- `avg_mem_mib` - среднее потребление памяти
- `max_mem_mib` - пиковое потребление памяти

`cpu_time_seconds` считается как:

```text
sum(cpu_perc / 100 * sample_interval_seconds)
```

То есть:

- `100%` в течение `1s` = `1 CPU-second`
- `250%` в течение `1s` = `2.5 CPU-seconds`

## Какие метрики использовать для сравнения

Для сравнения TypeScript и Go достаточно смотреть:

- из `k6`: latency, throughput, error rate
- из `docker-stats-summary.json`:
  - `totals.cpu_time_seconds`
  - `totals.avg_cpu_pct`
  - `totals.max_cpu_pct`
  - `totals.avg_mem_mib`
  - `totals.max_mem_mib`

Дополнительно полезно смотреть `containers.*`, чтобы понять, какой сервис стал bottleneck.

## Примеры запуска

Чтение заказов через HTTP на TypeScript gateway:

```bash
cd benchmark
RUNS=3 ./scripts/run-get-all-orders-http.sh ts
```

Создание заказа на Go gateway:

```bash
cd benchmark
USER_ID=<user-id> PRODUCT_ID=<product-id> RUNS=3 ./scripts/run-create-order.sh go
```

Обновление статуса заказа на TypeScript gateway:

```bash
cd benchmark
USER_ID=<user-id> PRODUCT_ID=<product-id> STATUS=COMPLETED ./scripts/run-update-order-status.sh ts
```
