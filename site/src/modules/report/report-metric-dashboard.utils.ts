import type { ChartOptions } from 'chart.js'

export function getReportMetricChartOptions(): ChartOptions<'line' | 'bar'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#23252c',
          font: {
            family: 'Inter',
            size: 12,
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
          color: '#23252c',
        },
      },
      y: {
        grid: {
          color: 'rgba(35, 37, 44, 0.08)',
        },
        ticks: {
          color: '#23252c',
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
