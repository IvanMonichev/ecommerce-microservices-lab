const METRIC_LABELS_RU: Record<string, string> = {
  checks: 'Проверки корректности',
  http_req_blocked: 'Время блокировки HTTP-запроса',
  http_req_connecting: 'Время установки TCP-соединения',
  http_req_duration: 'Полное время HTTP-запроса',
  http_req_failed: 'Доля ошибочных HTTP-запросов',
  http_req_receiving: 'Время получения ответа',
  http_req_sending: 'Время отправки запроса',
  http_req_tls_handshaking: 'Время TLS-рукопожатия',
  http_req_waiting: 'Время ожидания ответа сервера',
  iteration_duration: 'Полная длительность итерации сценария',
  iterations: 'Итерации сценария',
  vus: 'Активные виртуальные пользователи',
  vus_max: 'Максимум виртуальных пользователей',
}

export function getMetricLabel(metricName: string) {
  return METRIC_LABELS_RU[metricName] ?? metricName
}
