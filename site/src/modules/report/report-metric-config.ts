import { benchmarkData } from '@/data/benchmark-data.generated'

export type ReportMetricId =
  | 'avg-latency'
  | 'p95-latency'
  | 'throughput'
  | 'cpu'
  | 'memory'

export type ReportMetricDefinition = {
  id: ReportMetricId
  label: {
    ru: string
    en: string
  }
  tabLabel: {
    ru: string
    en: string
  }
  description: {
    ru: string
    en: string
  }
  unit: {
    ru: string
    en: string
  }
  lowerIsBetter: boolean
  getValue: (
    scenario: (typeof benchmarkData.scenarios)[keyof typeof benchmarkData.scenarios],
    stack: 'go' | 'ts',
  ) => number
  getRunValue: (run: {
    avgLatencyMs: number
    p95LatencyMs: number
    throughputRps: number
    requestsTotal: number
    avgCpuPct: number
    avgMemMib: number
    failureRatePct: number
    runId: string
  }) => number
}

export const reportMetricDefinitions: ReportMetricDefinition[] = [
  {
    id: 'avg-latency',
    label: {
      ru: 'Среднее время отклика',
      en: 'Average response time',
    },
    tabLabel: {
      ru: 'Avg',
      en: 'AVG',
    },
    description: {
      ru: 'Усреднённое время полного ответа по каждому сценарию.',
      en: 'Average full response time for each scenario.',
    },
    unit: {
      ru: 'мс',
      en: 'ms',
    },
    lowerIsBetter: true,
    getValue: (scenario, stack) => scenario[stack].overview.avgLatencyMs,
    getRunValue: (run) => run.avgLatencyMs,
  },
  {
    id: 'p95-latency',
    label: {
      ru: '95-й перцентиль времени отклика (p95)',
      en: '95th percentile latency (p95)',
    },
    tabLabel: {
      ru: 'P95',
      en: 'P95',
    },
    description: {
      ru: 'Показывает устойчивость отклика в менее благоприятной части распределения задержек.',
      en: 'Shows latency stability in the less favorable part of the delay distribution.',
    },
    unit: {
      ru: 'мс',
      en: 'ms',
    },
    lowerIsBetter: true,
    getValue: (scenario, stack) => scenario[stack].overview.p95LatencyMs,
    getRunValue: (run) => run.p95LatencyMs,
  },
  {
    id: 'throughput',
    label: {
      ru: 'Пропускная способность',
      en: 'Throughput',
    },
    tabLabel: {
      ru: 'RPS',
      en: 'RPS',
    },
    description: {
      ru: 'Количество успешно обработанных запросов в секунду.',
      en: 'Number of successfully processed requests per second.',
    },
    unit: {
      ru: 'req/s',
      en: 'req/s',
    },
    lowerIsBetter: false,
    getValue: (scenario, stack) => scenario[stack].overview.throughputRps,
    getRunValue: (run) => run.throughputRps,
  },
  {
    id: 'cpu',
    label: {
      ru: 'Средняя загрузка CPU',
      en: 'Average CPU usage',
    },
    tabLabel: {
      ru: 'CPU',
      en: 'CPU',
    },
    description: {
      ru: 'Средняя суммарная загрузка процессора контейнерами приложения.',
      en: 'Average aggregate CPU usage of the application containers.',
    },
    unit: {
      ru: '%',
      en: '%',
    },
    lowerIsBetter: true,
    getValue: (scenario, stack) => scenario[stack].overview.avgCpuPct,
    getRunValue: (run) => run.avgCpuPct,
  },
  {
    id: 'memory',
    label: {
      ru: 'Потребление оперативной памяти',
      en: 'Memory consumption',
    },
    tabLabel: {
      ru: 'ОЗУ',
      en: 'RAM',
    },
    description: {
      ru: 'Средний объём оперативной памяти, используемой контейнерами приложения.',
      en: 'Average amount of memory used by the application containers.',
    },
    unit: {
      ru: 'MiB',
      en: 'MiB',
    },
    lowerIsBetter: true,
    getValue: (scenario, stack) => scenario[stack].overview.avgMemMib,
    getRunValue: (run) => run.avgMemMib,
  },
]

export const defaultReportMetricId: ReportMetricId = 'avg-latency'

export function getReportMetricDefinition(metricId: string) {
  return (
    reportMetricDefinitions.find((metric) => metric.id === metricId) ??
    reportMetricDefinitions[0]
  )
}
