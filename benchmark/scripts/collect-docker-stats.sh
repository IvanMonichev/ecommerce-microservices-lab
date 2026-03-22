#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BENCHMARK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

TARGET="${1:-}"
OUTPUT_DIR="${2:-}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-1}"

if [[ -z "${TARGET}" || -z "${OUTPUT_DIR}" ]]; then
  echo "Usage: $0 <ts|go|all|regex:...> <output-dir>" >&2
  exit 1
fi

case "${TARGET}" in
  ts)
    CONTAINER_PATTERN='^(ts-api-gateway|ts-users|ts-products|ts-orders|ts-notification)$'
    ;;
  go)
    CONTAINER_PATTERN='^(api-gateway|users|products|orders|notification)$'
    ;;
  all)
    CONTAINER_PATTERN='.*'
    ;;
  regex:*)
    CONTAINER_PATTERN="${TARGET#regex:}"
    ;;
  *)
    echo "Unknown target '${TARGET}'. Use: ts, go, all, or regex:<pattern>" >&2
    exit 1
    ;;
esac

mkdir -p "${OUTPUT_DIR}"

OUTPUT_FILE_NAME="${OUTPUT_FILE_NAME:-docker-stats.csv}"
OUTPUT_FILE="${OUTPUT_DIR}/${OUTPUT_FILE_NAME}"
TMP_FILE="${OUTPUT_DIR}/.docker-stats.tmp"
NAMES_FILE="${OUTPUT_DIR}/.docker-container-names.tmp"

cleanup() {
  rm -f "${TMP_FILE}"
  rm -f "${NAMES_FILE}"
}

trap cleanup EXIT

cat > "${OUTPUT_FILE}" <<'EOF'
timestamp,container,cpu_perc,mem_usage,mem_limit,mem_perc,net_io,block_io,pids
EOF

while true; do
  timestamp="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  docker ps --no-trunc --format '{{.ID}}|{{.Names}}' > "${NAMES_FILE}"

  docker stats --no-stream \
    --format '{{.Container}}|{{.CPUPerc}}|{{.MemUsage}}|{{.MemPerc}}|{{.NetIO}}|{{.BlockIO}}|{{.PIDs}}' \
    > "${TMP_FILE}"

  while IFS='|' read -r container cpu_perc mem_usage mem_perc net_io block_io pids; do
    [[ -n "${container}" ]] || continue

    resolved_container="$(awk -F'|' -v id="${container}" '$1 == id { print $2; exit }' "${NAMES_FILE}")"
    if [[ -z "${resolved_container}" ]]; then
      resolved_container="${container}"
    fi

    if [[ ! "${resolved_container}" =~ ${CONTAINER_PATTERN} ]]; then
      continue
    fi

    mem_used="${mem_usage%% / *}"
    mem_limit="${mem_usage#* / }"

    printf '%s,%s,%s,%s,%s,%s,%s,%s,%s\n' \
      "${timestamp}" \
      "${resolved_container}" \
      "${cpu_perc}" \
      "${mem_used}" \
      "${mem_limit}" \
      "${mem_perc}" \
      "${net_io}" \
      "${block_io}" \
      "${pids}" >> "${OUTPUT_FILE}"
  done < "${TMP_FILE}"

  sleep "${INTERVAL_SECONDS}"
done
