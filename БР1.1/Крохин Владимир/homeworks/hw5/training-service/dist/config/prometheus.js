'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.metricsEndpoint = exports.metricsMiddleware = void 0;
const prom_client_1 = __importDefault(require('prom-client'));
// Create a Registry to register the metrics
const register = new prom_client_1.default.Registry();
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'training-service',
});
// Enable the collection of default metrics
prom_client_1.default.collectDefaultMetrics({ register });
// Create custom metrics
const httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});
// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
// Middleware for collecting metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    var _a;
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(
        req.method,
        ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) ||
          req.path,
        res.statusCode.toString(),
      )
      .observe(duration / 1000);
  });
  next();
};
exports.metricsMiddleware = metricsMiddleware;
// Endpoint for Prometheus metrics
const metricsEndpoint = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', register.contentType);
    res.end(yield register.metrics());
  });
exports.metricsEndpoint = metricsEndpoint;
exports.default = {
  metricsMiddleware: exports.metricsMiddleware,
  metricsEndpoint: exports.metricsEndpoint,
};
