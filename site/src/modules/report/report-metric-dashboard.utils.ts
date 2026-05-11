import type { ChartOptions } from 'chart.js'

type ChartOptionsParams = {
  compact?: boolean
}

export function getReportMetricChartOptions({
  compact = false,
}: ChartOptionsParams = {}): ChartOptions<'line' | 'bar'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 120,
    plugins: {
      legend: {
        position: compact ? 'bottom' : 'top',
        labels: {
          color: '#23252c',
          boxHeight: compact ? 8 : 12,
          boxWidth: compact ? 16 : 40,
          font: {
            family: 'Inter',
            size: compact ? 10 : 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#23252c',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(35, 37, 44, 0.08)',
        },
        ticks: {
          autoSkip: true,
          color: '#23252c',
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: compact ? 10 : 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(35, 37, 44, 0.08)',
        },
        ticks: {
          color: '#23252c',
          maxTicksLimit: compact ? 5 : 8,
          font: {
            size: compact ? 10 : 12,
          },
        },
      },
    },
  }
}

export function averageValues(values: number[]) {
  if (values.length === 0) {
    return 0
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function formatReportRunLabel(runId: string) {
  return runId.replace(/^run-/, '')
}
