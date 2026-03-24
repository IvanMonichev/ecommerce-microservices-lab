import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { baseUrl, buildOptions, getListParams } from "../lib/config.js";

export const options = buildOptions("get-all-orders-grpc");

export default function () {
  const params = getListParams("get-all-orders-grpc");
  const page = ((__ITER % 3) + 1);
  const response = http.get(
    `${baseUrl}/api/orders/all/grpc?page=${page}&limit=${params.limit}`
  );

  check(response, {
    "list grpc status is 200": (res) => res.status === 200,
    "list grpc returns data": (res) => {
      const body = res.json();
      return Array.isArray(body?.data);
    },
  });

  sleep(1);
}

export function handleSummary(data) {
  const result = {
    stdout: textSummary(data, {
      indent: " ",
      enableColors: true,
    }),
  };

  if (__ENV.HTML_REPORT_FILE) {
    result[__ENV.HTML_REPORT_FILE] = htmlReport(data, {
      title: __ENV.HTML_REPORT_TITLE,
    });
  }

  return result;
}
