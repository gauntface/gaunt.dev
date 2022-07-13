const PerfLeaderboard = require('performance-leaderboard');

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

/* const options = {
  axePuppeteerTimeout: 30000, // 30 seconds
  writeLogs: true, // Store audit data
  logDirectory: '.log', // Default audit data files stored at `.log`
  readFromLogDirectory: false, // Skip tests with existing logs
  // onlyCategories: ["performance", "accessibility"],
  chromeFlags: ['--headless'],
  freshChrome: "site", // or "run"
  launchOptions: {}, // Puppeteer launch options
};*/

const urls = pages.map((p) => `https://www.gaunt.dev${p.url}`);
(async function() {
console.log( await PerfLeaderboard(urls, 5) );
})();

//

	// Run each site 3 times with default options
	// console.log( await PerfLeaderboard(urls) );

	// Or run each site 5 times with default options


	// Or run each site 5 times with custom options
	// console.log( await PerfLeaderboard(urls, 5, options) );
// })();