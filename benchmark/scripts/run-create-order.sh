#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BENCHMARK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
RESULTS_DIR="${BENCHMARK_DIR}/results"
STATS_SCRIPT="${SCRIPT_DIR}/collect-docker-stats.sh"
SUMMARY_SCRIPT="${SCRIPT_DIR}/summarize-docker-stats.sh"
SCENARIO="create-order"
TARGET="${1:-go}"
RUNS="${RUNS:-10}"
USER_ID="${USER_ID:-69ac3e096bf6d0f7eaffb5f8}"
PRODUCT_ID="${PRODUCT_ID:-69ac451b9896cb84ead49a9d}"

case "${TARGET}" in
  ts)
    BASE_URL="${BASE_URL:-http://localhost:3000}"
    ;;
  go)
    BASE_URL="${BASE_URL:-http://localhost:4000}"
    ;;
  *)
    echo "Use target: ts or go" >&2
    exit 1
    ;;
esac

if [[ -z "${USER_ID}" ]]; then
  echo "USER_ID is required. Example: USER_ID=<user-id> PRODUCT_ID=<product-id> ./scripts/run-create-order.sh ${TARGET}" >&2
  exit 1
fi

if [[ -z "${PRODUCT_ID}" ]]; then
  echo "PRODUCT_ID is required. Example: USER_ID=<user-id> PRODUCT_ID=<product-id> ./scripts/run-create-order.sh ${TARGET}" >&2
  exit 1
fi

mkdir -p "${RESULTS_DIR}/${SCENARIO}/${TARGET}"

max_exp=0
shopt -s nullglob
for path in "${RESULTS_DIR}/${SCENARIO}/${TARGET}"/exp-*; do
  name="${path##*/exp-}"
  if [[ "${name}" =~ ^[0-9]+$ ]]; then
    value=$((10#${name}))
    if (( value > max_exp )); then
      max_exp="${value}"
    fi
  fi
done
shopt -u nullglob

next_exp=$((max_exp + 1))
while true; do
  EXP_NUMBER="$(printf "%03d" "${next_exp}")"
  EXP_DIR="${RESULTS_DIR}/${SCENARIO}/${TARGET}/exp-${EXP_NUMBER}"
  if [[ ! -e "${EXP_DIR}" ]]; then
    break
  fi
  next_exp=$((next_exp + 1))
done
mkdir -p "${EXP_DIR}"

for ((run = 1; run <= RUNS; run++)); do
  run_label="$(printf "run-%02d" "${run}")"
  summary_file="${EXP_DIR}/${run_label}-summary.json"
  html_file="${EXP_DIR}/${run_label}-summary.html"
  log_file="${EXP_DIR}/${run_label}.log"
  docker_stats_file="${EXP_DIR}/${run_label}-docker-stats.csv"
  docker_stats_summary_file="${EXP_DIR}/${run_label}-docker-stats-summary.json"
  report_title="$(printf "%s | %s | %s" "$(echo "${TARGET}" | tr '[:lower:]' '[:upper:]')" "${SCENARIO}" "${run_label}")"

  echo "[${SCENARIO}] ${run_label}/${RUNS} -> ${TARGET} (${BASE_URL})"

  OUTPUT_FILE_NAME="$(basename "${docker_stats_file}")" "${STATS_SCRIPT}" "${TARGET}" "${EXP_DIR}" &
  stats_pid=$!

  (
    cd "${BENCHMARK_DIR}"
    BASE_URL="${BASE_URL}" \
    USER_ID="${USER_ID}" \
    PRODUCT_ID="${PRODUCT_ID}" \
    HTML_REPORT_FILE="${html_file}" \
    HTML_REPORT_TITLE="${report_title}" \
    k6 run "scenarios/${SCENARIO}.js" \
      --summary-export "${summary_file}"
  ) 2>&1 | tee "${log_file}"
  k6_exit_code=${PIPESTATUS[0]}

  kill "${stats_pid}" 2>/dev/null || true
  wait "${stats_pid}" 2>/dev/null || true

  "${SUMMARY_SCRIPT}" "${docker_stats_file}" "${docker_stats_summary_file}"

  if [[ "${k6_exit_code}" -ne 0 ]]; then
    exit "${k6_exit_code}"
  fi
done

echo "Results saved to ${EXP_DIR}"
