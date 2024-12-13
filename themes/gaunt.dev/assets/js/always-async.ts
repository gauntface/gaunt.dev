import {init, browserTracingIntegration} from "@sentry/browser";

init({
	dsn: "https://74547611df4c4a0097edec0053db428f@o1296550.ingest.sentry.io/6623002",
	integrations: [browserTracingIntegration()],
	tracesSampleRate: 0.4,
});
