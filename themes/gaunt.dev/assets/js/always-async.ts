import {init} from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

init({
	dsn: "https://74547611df4c4a0097edec0053db428f@o1296550.ingest.sentry.io/6623002",
	integrations: [new BrowserTracing()],
	tracesSampleRate: 0.4,
});
