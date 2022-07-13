import test from 'ava';
import {runLeaderboard} from './utils/leaderboard.js';
import {startServer} from './utils/dev-server.js';

let addr;

test.before(async (t) => {
  // Server for project
  addr = await startServer();
});

test('Performance Dashboard', async (t) => {
  t.timeout(10 * 60 * 1000, 'Perf leaderboard is limited to 10mins');

  await runLeaderboard(addr, 2);

  t.pass();
})