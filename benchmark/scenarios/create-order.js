import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import {
  baseUrl,
  buildOptions,
  getQuantity,
} from "../lib/config.js";

export const options = buildOptions("create-order");

const JSON_HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

function parseJsonResponse(response, description) {
  const ok = check(response, {
    [`${description} status is 2xx`]: (res) => res.status >= 200 && res.status < 300,
  });

  if (!ok) {
    throw new Error(`${description} failed with status ${response.status}: ${response.body}`);
  }

  return response.json();
}

function resolveCreateDependencies() {
  const userId = __ENV.USER_ID;
  const productId = __ENV.PRODUCT_ID;

  if (!userId) {
    throw new Error("USER_ID is required for create-order benchmark");
  }

  if (!productId) {
    throw new Error("PRODUCT_ID is required for create-order benchmark");
  }

  return { userId, productId };
}

function buildCreateOrderPayload(testData, scenarioName = "create-order") {
  return {
    userId: testData.userId,
    currency: __ENV.CURRENCY || "RUB",
    items: [
      {
        productId: testData.productId,
        quantity: getQuantity(scenarioName),
      },
    ],
  };
}

function createOrder(testData, scenarioName = "create-order") {
  const payload = JSON.stringify(buildCreateOrderPayload(testData, scenarioName));
  const response = http.post(`${baseUrl}/api/orders`, payload, JSON_HEADERS);
  const body = parseJsonResponse(response, "create order");

  check(body, {
    "create order returns id": (data) => Boolean(data?.id),
  });

  return body;
}

export function setup() {
  return resolveCreateDependencies();
}

export default function (testData) {
  createOrder(testData, "create-order");
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
