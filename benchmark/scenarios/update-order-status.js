import http from "k6/http";
import { check } from "k6";

import {
  baseUrl,
  buildOptions,
  getProductsBaseUrl,
  getQuantity,
  getStatus,
  getUsersBaseUrl,
} from "../lib/config.js";

export const options = buildOptions("update-order-status");

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

function getFirstEntityId(payload) {
  if (Array.isArray(payload) && payload.length > 0) {
    return payload[0]?.id;
  }

  if (Array.isArray(payload?.data) && payload.data.length > 0) {
    return payload.data[0]?.id;
  }

  return undefined;
}

function fetchFirstUserId() {
  const response = http.get(`${getUsersBaseUrl()}/api/users?limit=1`);
  const payload = parseJsonResponse(response, "fetch users");
  const id = getFirstEntityId(payload);

  if (!id) {
    throw new Error("Unable to resolve USER_ID from users service");
  }

  return String(id);
}

function fetchFirstProductId() {
  const response = http.get(`${getProductsBaseUrl()}/api/products?limit=1`);
  const payload = parseJsonResponse(response, "fetch products");
  const id = getFirstEntityId(payload);

  if (!id) {
    throw new Error("Unable to resolve PRODUCT_ID from products service");
  }

  return String(id);
}

function resolveCreateDependencies() {
  const userId = __ENV.USER_ID || fetchFirstUserId();
  const productId = __ENV.PRODUCT_ID || fetchFirstProductId();

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

function resolveUpdateDependencies() {
  const testData = resolveCreateDependencies();

  if (__ENV.ORDER_ID) {
    return {
      ...testData,
      orderId: __ENV.ORDER_ID,
    };
  }

  const created = createOrder(testData);

  return {
    ...testData,
    orderId: String(created.id),
  };
}

function updateOrderStatus(orderId, scenarioName = "update-order-status") {
  const payload = JSON.stringify({
    orderId,
    status: getStatus(scenarioName),
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
  return resolveUpdateDependencies();
}

export default function (testData) {
  updateOrderStatus(testData.orderId, "update-order-status");
}
