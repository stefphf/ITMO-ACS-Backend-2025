import client from 'prom-client';
import express from 'express';

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'training-service',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware for collecting metrics
export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000);
  });
  next();
};

// Endpoint for Prometheus metrics
export const metricsEndpoint = async (req: any, res: any) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export default {
  metricsMiddleware,
  metricsEndpoint,
};
