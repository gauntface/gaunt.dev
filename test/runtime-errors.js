import test from 'ava';
import puppeteer from 'puppeteer';
import {startServer, stopServer} from './utils/dev-server.js';

let addr;
let browser;

test.before(async () => {
	// Server for project
	addr = await startServer();
});
test.before(async () => {
	// Start browser
	browser = await puppeteer.launch({ headless: 'new' });
})

test.after('cleanup', async () => {
	// This runs before all tests
	stopServer();

	await browser.close();
});

test.beforeEach(async (t) => {
	// Create new page for test
	t.context.page = await browser.newPage();

	// Ensure we get 200 responses from the server
	t.context.page.on('response', (response) => {
		if (!response) {
			return;
		}

		if (response.status() !== 200) {
			if (response.url().endsWith("/favicon.ico") ||
				response.url().startsWith(`${addr}/generated/`) ||
				!response.url().startsWith(addr)) {
				// We use other icons and shouldn't error on third party sites
				return;
			}

			console.error(`Non-200 reponse: (${response.status()}) ${response.url()}`);
		}

		t.deepEqual(response.status(), 200);
	})
});

test.afterEach(async (t) => {
	await t.context.page.close();
})

const pages = [
	{
		title: 'index',
		url: '/',
	},
	{
		title: 'resume',
		url: '/resume',
	},
	{
		title: 'blog-archive',
		url: '/blog',
	},
	{
		title: 'blog-post',
		url: '/blog/2020/gauntface.com-version-2020/',
	},
	{
		title: 'projects-list',
		url: '/projects',
	},
	{
		title: 'projects-page',
		url: '/projects/pin-it/',
	},
];

for (const p of pages) {
	test(p.title, async (t) => {
		const page = t.context.page;

		const failedRequests = [];
		const consoleErrors = [];
		// Catch all failed requests like 4xx..5xx status codes
		page.on('requestfailed', request => {
			if (!request.url().startsWith(addr)) {
				console.warn(`Non-200 reponse from third party site: url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
				return;
			}
			failedRequests.push(request);
		});
		// Catch console log errors
		page.on("pageerror", err => {
			consoleErrors.push(err)
		});

		// Load webpage
		await page.goto(`${addr}${p.url}`, {
			waitUntil: 'networkidle0',
		});

		await wait(1000)

		if (failedRequests.length > 0) {
			console.log(`Failed network requests:`);
			for (const fr of failedRequests) {
				console.log(`    - url: ${fr.url()}, errText: ${fr.failure().errorText}, method: ${fr.method()}`);
			}
		}
		if (consoleErrors.length > 0) {
			console.log(`Console errors:`);
			for (const err of consoleErrors) {
				console.log(`    - url: ${err.toString()}`);
			}
		}

		t.deepEqual(failedRequests, [], `There were ${failedRequests.length} failed network requests`)
		t.deepEqual(consoleErrors, [], `There were ${consoleErrors.length} console errors`)
	})
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
