---
title: "GitHub Notifications"
description: "Notes on my workflow for working through GitHub pull requests."
mainImage: "/images/blog/2024/2024-12-11/github-notifications.png"
mainImageAlt: An illustration of a mailbox in a data center.
date: "2024-12-11T20:36:00-07:00"
updatedOn: "2024-12-11T20:36:00-07:00"
---

# GitHub Notifications

This is how I work through GitHub pull requests, this isn't going to be for
everyone but it's been working well for me for a while.

The **tl;dr** is [Notifier for GitHub](https://chromewebstore.google.com/detail/notifier-for-github/lmjdlojahmbbcodnpecnjnmlddbkjhnn)
for keeping an eye on PR count & quick access to GitHub inbox and I use a
GitHub Action to keep the notifications focused on what needs attention.

All of this revolves around GitHub's inbox, it's far from perfect, but it
works well for me compared monitoring my emails.

## Notifier for GitHub

Downloading and setting up [Notifier for GitHub](https://chromewebstore.google.com/detail/notifier-for-github/lmjdlojahmbbcodnpecnjnmlddbkjhnn)
is fairly easy. You need to add a GitHub token in the extensions options and
then it'll show a badge for the number of PRs and issues needing your attention.

![Notifier for GitHub pinned in Chrome](/images/blog/2024/2024-12-11/notifier-pinned.png)

Clicking on the icon will take you GitHub's UI for notifications.

![Inbox on GitHub](/images/blog/2024/2024-12-11/github-inbox.png)

## GitHub Actions for Cleanup

The big problem I have with GitHub's inbox/notifications is that it requires
a lot of garden keeping to be useful. For example, a merged or closed PR
will remain in the inbox, which for me means someone else has reviewed
the change and no longer needs my attention.

To cleanup these notifications, I have a GitHub Action that works through
the notifications and clears up anything I don't want to be told about.

### The Workflow

Below is the workflow I use, it runs once an hour and all this does is
install node and run a javascript file, passing in a personal access token
for the script to authenticate with.

```yaml
name: Process and manage GitHub notifications

on:
  workflow_dispatch:
  schedule:
    - cron: "9 * * * *"

jobs:
  manage:
    name: Process notifications
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@692973e3d937129bcbf40652eb9f2f61becf3332 # v4
      - uses: actions/setup-node@1e60f620b9541d16bece96c5465dc8ee9832be0b # v4
        with:
          node-version: latest
      - run: npm install
      - run: node manage-notifications.js
        env:
          GITHUB_PERSONAL_ACCESS_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
```

The more interesting part is what `node manage-notifications.js` does. It
goes through all fo the notifications and marks them as read based on a
set of ignore lists and states.

Below is the full script:

```javascript
import * as dotenv from 'dotenv';
import { Octokit } from '@octokit/rest';

dotenv.config();

const botsToIgnore = [
  'renovate[bot]',
];

const emailsToIgnore = [
  'hello@gaunt.dev',
];

const prOwners = [
  'gauntface'
];

const mergedByToIgnore = [
  'gauntface'
];

function ignoreBot(name) {
  return botsToIgnore.indexOf(name) != -1;
}

function ignoreEmail(email) {
  return emailsToIgnore.indexOf(email) != -1
}

function ignoreMergedBy(login) {
  return mergedByToIgnore.indexOf(login) != -1
}

// Mark the notification as read to remove the notification from my count
async function closeNotification(notification) {
  await octokit.rest.activity.markThreadAsRead({
    thread_id: notification.id,
  });
}

async function processPR(notification) {
  const url = notification.subject.url;
  const prRegexp = /^https:\/\/api\.github\.com\/repos\/(?<owner>.*)\/(?<repo>.*)\/pulls\/(?<prnum>\d+)$/;
  const prResult = prRegexp.exec(url);
  if (!prResult) {
    console.log(`    ⚠️ Failed to parse URL '${url}'`);
    return;
  }
  const {owner, repo, prnum} = prResult.groups;
  const pr = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prnum,
  })

  if (pr.data.head.repo.archived) {
    console.log(`    PR ${owner}/${repo}/${prnum} is in an archived repo, so removing notification`);
    await closeNotification(notification);
  } else if (pr.data.state == 'closed') {
    console.log(`    PR ${owner}/${repo}/${prnum} is closed`);
    if (ignoreBot(pr.data.user.login) || (!prOwners.includes(pr.data.user.login) && !prOwners.includes(pr.data.head.repo?.owner.login || ""))) {
      console.log(`    PR author '${pr.data.user.login}' is in the ignore list OR this is not one of your PRs, so removing the notification`);
      await closeNotification(notification);
    } else if (pr.data.merged_by && ignoreMergedBy(pr.data.merged_by.login)) {
      console.log(`    PR was merged by '${pr.data.merged_by.login}' from the ignore list, so removing the notification`);
      await closeNotification(notification);
    } else if (pr.data.merged == false) {
      console.log(`    PR was abandoned, so removing the notification`);
      await closeNotification(notification);
    }
  }
}

async function processCommit(notification) {
  const url = notification.subject.url;
  const commitRegexp = /^https:\/\/api\.github\.com\/repos\/(?<owner>.*)\/(?<repo>.*)\/commits\/(?<sha>\w+)$/;
  const commitResult = commitRegexp.exec(url);
  if (!commitResult) {
    console.log(`    Failed to parse URL '${url}'`);
    return;
  }
  const {owner, repo, sha} = commitResult.groups;
  const commit = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: sha,
  });
  if (ignoreBot(commit.data.committer.name) || ignoreEmail(commit.data.author.email)) {
    await closeNotification(notification);
  } else if (commit.data.committer.name == 'GitHub' && commit.data.committer.email == 'noreply@github.com') {
    await closeNotification(notification);
  } else {
    console.log(`    Skipping commit by ${commit.data.author.email}`);
  }
}

async function processIssue(notification) {
  const url = notification.subject.url;
  const regexp = /^https:\/\/api\.github\.com\/repos\/(?<owner>.*)\/(?<repo>.*)\/issues\/(?<num>\d+)$/;
  const result = regexp.exec(url);
  if (!result) {
    console.log(`    Failed to parse URL '${url}'`);
    return;
  }
  const {owner, repo, num} = result.groups;
  const issue = await octokit.issues.get({
    owner,
    repo,
    issue_number: num,
  });
  if (issue.data.state == 'closed') {
    await closeNotification(notification);
    return;
  }
}

async function processNotifications(notifications) {
  for (let i = 0; i < notifications.length; i++) {
    try {
      const n = notifications[i];
      console.log(`${i+1} of ${notifications.length}: [${n.subject.type}] ${n.subject.title}`);

      switch (n.subject.type.toLowerCase()) {
        case 'pullrequest':
          await processPR(n);
          break;
        case 'commit':
          await processCommit(n);
          break;
        case 'issue':
          await processIssue(n);
          break;
        default:
          console.log(`    Unknown notification type: ${n.subject.type}`);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  }
}

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

console.log(`Retrieving all notifications`);
const notifications = await octokit.paginate(octokit.rest.activity.listNotificationsForAuthenticatedUser, {
  per_page: 100,
}, request => request.data);

console.log(`Processing ${notifications.length} notifications`);
await processNotifications(notifications);
```

I haven't encountered any issues with this and have been using it for the best
part of a year.
