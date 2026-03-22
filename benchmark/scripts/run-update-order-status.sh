#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BENCHMARK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
RESULTS_DIR="${BENCHMARK_DIR}/results"
STATS_SCRIPT="${SCRIPT_DIR}/collect-docker-stats.sh"
SUMMARY_SCRIPT="${SCRIPT_DIR}/summarize-docker-stats.sh"
SCENARIO="update-order-status"
TARGET="${1:-ts}"
RUNS="${RUNS:-1}"

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

EXP_NUMBER="$(printf "%02d" "$((max_exp + 1))")"
EXP_DIR="${RESULTS_DIR}/${SCENARIO}/${TARGET}/exp-${EXP_NUMBER}"
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
