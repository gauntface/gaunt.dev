import test from 'ava';
import puppeteer from 'puppeteer';
import {startServer, stopServer} from './utils/dev-server.js';

let addr;
let browser;

test.before(async (t) => {
	// Server for project
	addr = await startServer();
});
test.before(async (t) => {
	// Start browser
	browser = await puppeteer.launch();
})

test.after('cleanup', async (t) => {
	// This runs before all tests
	stopServer();

	await browser.close();
});

test.beforeEach(async (t) => {
	// Create new page for test
	t.context.page = await browser.newPage();

	// Ensure we get 200 responses from the server
	t.context.page.on('response', (response) => {
		if (response) {
			t.deepEqual(response.status(), 200);
		}
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
