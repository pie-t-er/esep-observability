console.log("Tracing: start minimal");

console.log("Loading NodeSDK...");
const { NodeSDK } = require('@opentelemetry/sdk-node');
console.log("Loaded NodeSDK");

console.log("Loading resources...");
const { resourceFromAttributes } = require('@opentelemetry/resources');
console.log("Loaded resources");

console.log("Loading semantic conventions...");
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
console.log("Loaded semantic conventions...");

console.log("Loading Console Span Exporter...");
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
console.log("Loaded Console Span Exporter");

console.log("Loading sdk metrics...");
const { ConsoleMetricExporter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
console.log("Loaded sdk metrics");

console.log("Loading Node Auto Instrumentations...");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
console.log("Loaded Node Auto Instrumentations.");

console.log("Loading ExpressInstrumentation...");
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
console.log("Loaded ExpressInstrumentation");

console.log("Loading MongoDB Instrumentation...");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
console.log("Loaded MongoDB Instrumentation.");

console.log("Loading HTTP Instrumentation...");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
console.log("Loaded HTTP Instrumentation.");

//const opentelemetry = require('@opentelemetry/sdk-node');
//const {
//  getNodeAutoInstrumentations,
//} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');
const {
  OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-proto');
//const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://localhost:4318/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {}, // an optional object containing custom headers to be sent with each request
      concurrencyLimit: 1, // an optional limit on pending requests
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

module.exports = { sdk };


/*
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { ConsoleMetricExporter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "todo-service"
  }),
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new ExpressInstrumentation(),
    new MongoDBInstrumentation(),
    new HttpInstrumentation()
  ],
});

// IMPORTANT: do NOT call sdk.start() here
module.exports = { sdk };
*/