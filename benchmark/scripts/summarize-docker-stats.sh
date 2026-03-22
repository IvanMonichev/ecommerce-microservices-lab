#!/usr/bin/env bash

set -euo pipefail

INPUT_FILE="${1:-}"
OUTPUT_FILE="${2:-}"
SAMPLE_INTERVAL_SECONDS="${SAMPLE_INTERVAL_SECONDS:-1}"

if [[ -z "${INPUT_FILE}" || -z "${OUTPUT_FILE}" ]]; then
  echo "Usage: $0 <input-csv> <output-json>" >&2
  exit 1
fi

if [[ ! -f "${INPUT_FILE}" ]]; then
  echo "Input file not found: ${INPUT_FILE}" >&2
  exit 1
fi

awk -F',' -v sample_interval="${SAMPLE_INTERVAL_SECONDS}" '
function trim(s) {
  sub(/^[[:space:]]+/, "", s)
  sub(/[[:space:]]+$/, "", s)
  return s
}

function escape_json(s) {
  gsub(/\\/, "\\\\", s)
  gsub(/"/, "\\\"", s)
  return s
}

function mem_to_mib(s,    n, unit) {
  s = trim(s)
  if (s == "" || s == "0B") return 0
  unit = s
  gsub(/[0-9.]/, "", unit)
  n = s
  gsub(/[A-Za-z]/, "", n)
  n += 0
  if (unit == "B") return n / 1024 / 1024
  if (unit == "KiB" || unit == "kB") return n / 1024
  if (unit == "MiB" || unit == "MB") return n
  if (unit == "GiB" || unit == "GB") return n * 1024
  if (unit == "TiB" || unit == "TB") return n * 1024 * 1024
  return n
}

BEGIN {
  container_count = 0
  timestamp_count = 0
}

NR == 1 { next }

{
  ts = trim($1)
  container = trim($2)
  cpu = trim($3)
  mem = trim($4)
  mem_perc = trim($6)

  gsub(/%/, "", cpu)
  gsub(/%/, "", mem_perc)

  cpu_value = cpu + 0
  mem_mib = mem_to_mib(mem)
  mem_perc_value = mem_perc + 0

  if (!(container in seen_container)) {
    seen_container[container] = 1
    containers[++container_count] = container
  }

  if (!(ts in seen_ts)) {
    seen_ts[ts] = 1
    timestamps[++timestamp_count] = ts
  }

  samples[container]++
  cpu_sum[container] += cpu_value
  cpu_time[container] += (cpu_value / 100.0) * sample_interval
  if (!(container in cpu_max) || cpu_value > cpu_max[container]) cpu_max[container] = cpu_value

  mem_sum[container] += mem_mib
  if (!(container in mem_max) || mem_mib > mem_max[container]) mem_max[container] = mem_mib

  mem_perc_sum[container] += mem_perc_value
  if (!(container in mem_perc_max) || mem_perc_value > mem_perc_max[container]) mem_perc_max[container] = mem_perc_value

  ts_cpu_sum[ts] += cpu_value
  ts_mem_sum[ts] += mem_mib
}

END {
  print "{"
  print "  \"sample_interval_seconds\": " sample_interval ","
  print "  \"timestamps\": " timestamp_count ","
  print "  \"duration_seconds\": " (timestamp_count * sample_interval) ","
  print "  \"containers\": {"

  total_cpu_time = 0
  total_container_avg_cpu = 0
  total_container_avg_mem = 0
  total_container_max_mem = 0

  for (i = 1; i <= container_count; i++) {
    c = containers[i]
    avg_cpu = samples[c] ? cpu_sum[c] / samples[c] : 0
    avg_mem = samples[c] ? mem_sum[c] / samples[c] : 0
    avg_mem_perc = samples[c] ? mem_perc_sum[c] / samples[c] : 0

    total_cpu_time += cpu_time[c]
    total_container_avg_cpu += avg_cpu
    total_container_avg_mem += avg_mem
    if (mem_max[c] > total_container_max_mem) total_container_max_mem = mem_max[c]

    printf "    \"%s\": {\n", escape_json(c)
    printf "      \"samples\": %d,\n", samples[c]
    printf "      \"avg_cpu_pct\": %.4f,\n", avg_cpu
    printf "      \"max_cpu_pct\": %.4f,\n", cpu_max[c]
    printf "      \"cpu_time_seconds\": %.4f,\n", cpu_time[c]
    printf "      \"avg_mem_mib\": %.4f,\n", avg_mem
    printf "      \"max_mem_mib\": %.4f,\n", mem_max[c]
    printf "      \"avg_mem_pct\": %.4f,\n", avg_mem_perc
    printf "      \"max_mem_pct\": %.4f\n", mem_perc_max[c]
    if (i < container_count) {
      print "    },"
    } else {
      print "    }"
    }
  }

  print "  },"

  avg_stack_cpu = 0
  max_stack_cpu = 0
  avg_stack_mem = 0
  max_stack_mem = 0

  for (i = 1; i <= timestamp_count; i++) {
    ts = timestamps[i]
    avg_stack_cpu += ts_cpu_sum[ts]
    avg_stack_mem += ts_mem_sum[ts]
    if (ts_cpu_sum[ts] > max_stack_cpu) max_stack_cpu = ts_cpu_sum[ts]
    if (ts_mem_sum[ts] > max_stack_mem) max_stack_mem = ts_mem_sum[ts]
  }

  if (timestamp_count > 0) {
    avg_stack_cpu /= timestamp_count
    avg_stack_mem /= timestamp_count
  }

  print "  \"totals\": {"
  printf "    \"containers\": %d,\n", container_count
  printf "    \"cpu_time_seconds\": %.4f,\n", total_cpu_time
  printf "    \"avg_cpu_pct\": %.4f,\n", avg_stack_cpu
  printf "    \"max_cpu_pct\": %.4f,\n", max_stack_cpu
  printf "    \"avg_mem_mib\": %.4f,\n", avg_stack_mem
  printf "    \"max_mem_mib\": %.4f\n", max_stack_mem
  print "  }"
  print "}"
}
' "${INPUT_FILE}" > "${OUTPUT_FILE}"
