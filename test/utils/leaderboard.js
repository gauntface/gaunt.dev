import PerfLeaderboard from 'performance-leaderboard';

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

export async function runLeaderboard(addr, runs) {
  const urls = pages.map((p) => `${addr}${p.url}`);
  const results = await PerfLeaderboard(urls, runs);

  const headings = [
    '',
    'URL',
    'Perf.',
    'Access.',
    'Best P.',
    'SEO',
  ];
  const rows = [];
  for (const r of results) {
    rows.push([
      `${r.ranks.cumulative}) `,
      r.url,
      r.lighthouse.performance,
      r.lighthouse.accessibility,
      r.lighthouse.bestPractices,
      r.lighthouse.seo,
    ]);
  }

  console.log(`\n${rowsToTable(headings, rows)}\n`);
}

function rowsToTable(headings, rows) {
  const colLengths = new Array(headings.length).fill(0);
  for (let i = 0; i < headings.length; i++) {
    colLengths[i] = Math.max(colLengths[i], headings[i].length);
  }

  for (const r of rows) {
    for (let i = 0; i < r.length; i++) {
      r[i] = `${r[i]}`;
      colLengths[i] = Math.max(colLengths[i], r[i].length);
    }
  }
  const rowStrings = [];
  let rowPadded = [];
  for (let i = 0; i < headings.length; i++) {
    rowPadded.push(padString(headings[i], colLengths[i]));
  }
  rowStrings.push(rowPadded.join(' | '));

  rowPadded = [];
  for (let i = 0; i < headings.length; i++) {
    rowPadded.push('-'.repeat(colLengths[i]));
  }
  rowStrings.push(rowPadded.join(' | '));

  for (const r of rows) {
    rowPadded = [];
    for (let i = 0; i < r.length; i++) {
      rowPadded.push(padString(r[i], colLengths[i]));
    }
    rowStrings.push(rowPadded.join(' | '));
  }
  return rowStrings.join('\n');
}

function padString(s, len) {
  const add = len - s.length;
  if (add > 0) {
    s += ' '.repeat(add);
  }
  return s;
}