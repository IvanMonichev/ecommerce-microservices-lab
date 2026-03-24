export const baseUrl = (__ENV.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const DEFAULT_PAGE = Number(__ENV.PAGE || 1);

const SCENARIO_DEFAULTS = {
  "get-all-orders-http": {
    vus: 1000,
    duration: "1m",
    limit: 25,
    thresholds: {
      http_req_failed: ["rate<0.05"],
      http_req_duration: ["p(95)<2000"],
    },
  },
  "get-all-orders-grpc": {
    vus: 1000,
    duration: "1m",
    limit: 25,
    thresholds: {
      http_req_failed: ["rate<0.05"],
      http_req_duration: ["p(95)<2000"],
    },
  },
  "create-order": {
    vus: 1000,
    duration: "1m",
    quantity: 1,
    thresholds: {
      http_req_failed: ["rate<0.05"],
      http_req_duration: ["p(95)<2000"],
    },
  },
  "update-order-status": {
    vus: 1000,
    duration: "1m",
    status: "COMPLETED",
    thresholds: {
      http_req_failed: ["rate<0.05"],
      http_req_duration: ["p(95)<2000"],
    },
  },
};

function getScenarioDefaults(name) {
  const defaults = SCENARIO_DEFAULTS[name];

  if (!defaults) {
    throw new Error(`Unknown scenario defaults for ${name}`);
  }

  return defaults;
}

function buildExecution(name) {
  const defaults = getScenarioDefaults(name);
  const vus = Number(__ENV.VUS || defaults.vus);
  const duration = __ENV.DURATION || defaults.duration;

  if (duration) {
    return {
      benchmark: {
        executor: "constant-vus",
        vus,
        duration,
      },
    };
  }

  return {
    benchmark: {
      executor: "shared-iterations",
      vus,
      iterations: Number(__ENV.ITERATIONS || defaults.iterations),
      maxDuration: __ENV.MAX_DURATION || defaults.maxDuration,
    },
  };
}

export function buildOptions(name) {
  const defaults = getScenarioDefaults(name);

  return {
    scenarios: buildExecution(name),
    thresholds: defaults.thresholds,
    tags: {
      scenario: name,
      base_url: baseUrl,
    },
  };
}

export function getListParams(name) {
  const defaults = getScenarioDefaults(name);

  return {
    page: DEFAULT_PAGE,
    limit: Number(__ENV.LIMIT || defaults.limit || 20),
  };
}

export function getStatus(name) {
  const defaults = getScenarioDefaults(name);
  return __ENV.STATUS || defaults.status || "COMPLETED";
}

export function getQuantity(name) {
  const defaults = getScenarioDefaults(name);
  return Number(__ENV.QUANTITY || defaults.quantity || 1);
}

export function getScenarioProfile(name) {
  const defaults = getScenarioDefaults(name);

  return {
    vus: Number(__ENV.VUS || defaults.vus),
    iterations: Number(__ENV.ITERATIONS || defaults.iterations || 0),
    duration: __ENV.DURATION || defaults.duration || null,
    maxDuration: __ENV.MAX_DURATION || defaults.maxDuration || null,
    page: DEFAULT_PAGE,
    limit: Number(__ENV.LIMIT || defaults.limit || 20),
    quantity: Number(__ENV.QUANTITY || defaults.quantity || 1),
    status: __ENV.STATUS || defaults.status || "COMPLETED",
  };
}

export function getGatewayKind() {
  const port = new URL(baseUrl).port;

  if (port === "3000") {
    return "ts";
  }

  if (port === "4000") {
    return "go";
  }

  return "custom";
}

export function getUsersBaseUrl() {
  if (__ENV.USERS_BASE_URL) {
    return __ENV.USERS_BASE_URL.replace(/\/$/, "");
  }

  const url = new URL(baseUrl);
  if (url.port === "3000") {
    url.port = "3010";
    return url.toString().replace(/\/$/, "");
  }

  if (url.port === "4000") {
    url.port = "4010";
    return url.toString().replace(/\/$/, "");
  }

  throw new Error("USERS_BASE_URL is required when BASE_URL is not on port 3000 or 4000");
}

export function getProductsBaseUrl() {
  if (__ENV.PRODUCTS_BASE_URL) {
    return __ENV.PRODUCTS_BASE_URL.replace(/\/$/, "");
  }

  const url = new URL(baseUrl);
  if (url.port === "3000") {
    url.port = "3030";
    return url.toString().replace(/\/$/, "");
  }

  if (url.port === "4000") {
    url.port = "4030";
    return url.toString().replace(/\/$/, "");
  }

  throw new Error("PRODUCTS_BASE_URL is required when BASE_URL is not on port 3000 or 4000");
}
