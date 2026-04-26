export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value)
}

export function formatMetric(value: number, unit: string, digits = 2) {
  return `${formatNumber(value, digits)} ${unit}`
}
