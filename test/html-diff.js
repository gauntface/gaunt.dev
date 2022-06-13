const path = require('path');
const test = require('ava');
const StaticServer = require('static-server');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const looksSame = require('looks-same');

const server = new StaticServer({
  rootPath: path.join(__dirname, '..', 'public'),
  port: 9999,
});

function startServer() {
  return new Promise((resolve, reject) => {
    server.start(() => {
      console.log(`Using http://localhost:${server.port}`);
      resolve(`http://localhost:${server.port}`);
    })
  });
};

const goldenDir = path.join(__dirname, 'html');
let addr;
let browser;

test.before(async (t) => {
  if (!fs.existsSync(goldenDir)) {
    fs.mkdirSync(goldenDir);
  }
});
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
  server.stop();

  await browser.close();
});

test.beforeEach(async (t) => {
  // Create new page for test
  t.context.page = await browser.newPage();
  t.context.page.setJavaScriptEnabled(false);

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

    // Load webpage
    await page.goto(`${addr}${p.url}`, {
      waitUntil: 'networkidle0',
    });

    const gotHTML = await page.content();

    const filename = `${p.title}.html`;
    const goldenpath = path.join(__dirname, 'html', filename);
    if (!fs.existsSync(goldenpath)) {
      fs.writeFileSync(goldenpath, gotHTML)
    }

    const wantHTML = fs.readFileSync(goldenpath).toString();
    t.deepEqual(gotHTML, wantHTML);
  })
}
