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

function compareScreenshots(image1, image2) {
  return new Promise((resolve, reject) => {
    looksSame(image1, image2, function(err, {equal}) {
      if (err) {
        reject(err);
        return;
      }
      resolve(equal);
    })
  })
}

function createDiff(image1, image2, filename) {
  return new Promise((resolve, reject) => {
    const diffdir = fs.mkdtempSync(path.join('screenshot-diffs'))
    const tmppath = path.join(diffdir, filename)
    looksSame.createDiff({
      reference: image1,
      current: image2,
      diff: tmppath,
      highlightColor: '#ff00ff', // color to highlight the differences
    }, function(error) {
        if (error) {
          reject(error);
          return;
        }
        resolve(tmppath);
    });
  })
}

for (const p of pages) {
  test(p.title, async (t) => {
    const page = t.context.page;

    // Load webpage
    await page.goto(`${addr}${p.url}`, {
      waitUntil: 'networkidle0',
    });

    const filename = `${p.title}.png`;
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'gaunt-dev-test'))
    const tmppath = path.join(tmpdir, filename)
    await page.screenshot({
      path: tmppath,
      fullPage: true,
      captureBeyondViewport: false,
    });

    const goldenpath = path.join(__dirname, 'screenshots', filename);
    if (!fs.existsSync(goldenpath)) {
      fs.cpSync(tmppath, goldenpath);
    }

    const equal = await compareScreenshots(goldenpath, tmppath);
    if (!equal) {
      console.warn(`The two screenshots differ; ${goldenpath} vs ${tmppath}`);
      const diffpath = await createDiff(goldenpath, tmppath, filename);
      console.log(`    Diff: ${diffpath}`);
    }
    t.true(equal);
  })
}
