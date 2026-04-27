import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import {
  baseUrl,
  buildOptions,
} from "../lib/config.js";

export const options = buildOptions("update-order-status");

const JSON_HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

const AVAILABLE_STATUSES = ["NEW", "COMPLETED", "CANCELED"];

function parseJsonResponse(response, description) {
  const ok = check(response, {
    [`${description} status is 2xx`]: (res) => res.status >= 200 && res.status < 300,
  });

  if (!ok) {
    throw new Error(`${description} failed with status ${response.status}: ${response.body}`);
  }

  return response.json();
}

function resolveOrderId() {
  if (!__ENV.ORDER_ID) {
    throw new Error("ORDER_ID is required for update-order-status benchmark");
  }

  return String(__ENV.ORDER_ID);
}

function pickRandomStatus() {
  const index = Math.floor(Math.random() * AVAILABLE_STATUSES.length);
  return AVAILABLE_STATUSES[index];
}

function updateOrderStatus(orderId) {
  const payload = JSON.stringify({
    orderId,
    status: pickRandomStatus(),
  });

  const response = http.post(
    `${baseUrl}/api/orders/notify/order-status`,
    payload,
    JSON_HEADERS
  );
  const body = parseJsonResponse(response, "update order status");

  check(body, {
    "update status returns ok": (data) => data?.ok === true,
  });

  return body;
}

export function setup() {
  return { orderId: resolveOrderId() };
}

export default function (testData) {
  updateOrderStatus(testData.orderId);
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
