import test from 'ava';
import {runLeaderboard} from '../utils/leaderboard.js';

test('Performance Dashboard', async (t) => {
  t.timeout(10 * 60 * 1000, 'Perf leaderboard is limited to 10mins');

  await runLeaderboard('https://www.gaunt.dev', 5);

  t.pass();
})