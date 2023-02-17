---
title: "Use Reusable GitHub Workflows"
description: "If you have a bunch of projects with similar workflows, it's time to make a reusable workflow and simplify your GitHub Actions CI."
mainImage: "/images/blog/2023/2023-02-16/andrew-seaman-Y8ruVPHUSnc-unsplash.jpg"
mainImageAlt: .
date: "2023-02-16T18:46:00-07:00"
updatedOn: "2023-02-16T18:46:00-07:00"
---

# Use Reusable GitHub Workflows

Some of my websites, including gaunt.dev, were borked recently.

The reason was simple; I relied on a PostCSS feature that would inline CSS variables.

For example, if my source was:

```css
/* variables/_colors.css */
:root {
	--light-theme-base: #f8f6f4;
	--light-theme-opposite: #373150;
	--light-theme-base-2: #373150;
	--light-theme-opposite-2: #f8f6f4;
	--light-theme-accent-1: #ff7867;
	--light-theme-accent-2: #84d2ee;
	--light-theme-accent-3: #fed9a1;
	--light-theme-accent-4: #3c55a5;
}

/* components/c-example.css */
.c-example {
	color: var(--light-theme-accent-1);
}
```

The sites would end up with something similar to:

```css
/* components/c-example.css */
.c-example {
	color: #ff7867;
}
```

Regardless of how I was going to fix this, this existed across three sites
which had workflows, config and tools copied and pasted to get things running.

Rather than fix the problem in each site, I wanted to see if reusable workflows
could help me consolidate the builds across each repo/site.

Each site was Hugo-based and used similar steps and tools to produce the
production build. Any differences would have been due to a lack of drive
to share features and updates (if it ain't broke, don't fix it).

[Reusable GitHub Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
was introduced to me by [@asottile](https://github.com/asottile), who shared
what he was doing with them during a chat and this issue gave me the perfect
reason to try them out.

The goals weren't too ambitious

- Reduce the duplication of GitHub workflows.
- Get all projects using the same version of tools.
- Fix the PostCSS bug on all sites
- Add a generic test that will catch the undefined CSS variable issue in the
  future and run as part of the shared workflow.

## The Workflows

Let's start with what each repo needs to define to build a site:

```yaml
name: Build

on:
  push:
    branches:
      - main
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  hugo-build:
    uses: gauntface/workflows-static-site/.github/workflows/hugo-build.yaml@main
    secrets:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

If you're used to GitHub actions, everything should look normal up to the
`jobs` line. The job `hugo-build` is using a reusable workflow, in this case,
`gauntface/workflows-static-site/.github/workflows/hugo-build.yaml@main`.

The `uses` rule is similar to the syntax  of using a published GitHub action:

```yaml
jobs:
  hugo-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
```

In writing this, I wondered why creating a reusable workflow is preferable to
creating a composite action. The most significant difference for me is the UX.

An action will have its output grouped as a single step of a workflow.

![Output for an action step](/images/blog/2023/2023-02-16/github-action-output.png)

Meanwhile, reusable workflows will show each of the steps being performed.

![Output from a resuable GitHub workflow](/images/blog/2023/2023-02-16/github-reusable-workflow.png)

As far as building the reusable workflow, it's almost identical to writing a
normal workflow.

```yaml
name: Hugo Build 🔧

on:
  workflow_call:
    secrets:
      AWS_ACCESS_KEY_ID:
        required: true
      AWS_SECRET_ACCESS_KEY:
        required: true
      VIMEO_TOKEN:
    inputs:
      ENVIRONMENT:
        type: string
        default: 'test'

jobs:
  hugo-build:
    runs-on: ubuntu-latest
    steps:
      - name: Install Go 🛠️
         uses: actions/setup-go@v3
         with:
           go-version: '^1.18.3'
      - name: ...
```

The main differences are:

1. You must define the `on: workflow_call:` event to allow other repos to use
   this workflow.
1. Any secrets or inputs your workflow needs has to be defined with the
   `workflow_call` event.

With the `workflow_call` event you have a reusable workflow. The next
question that folks might have is, can I nest reusable workflows? Why yes,
you can!

For my "publish" workflow, I wanted to build and test the site the same
as the workflow above and run any additional steps to publish the built site
afterwards.

What that looks like in practice is each site has a "publish" workflow like so:

```yaml
name: Publish

# Run every Sunday @ 03:00 UTC
on:
  workflow_dispatch:
  schedule:
    - cron:  '0 3 * * 0'

jobs:
  workflows:
    uses: gauntface/workflows-static-site/.github/workflows/hugo-deploy.yaml@main
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    with:
      S3_BUCKET_NAME: my-example-bucket
```

The reusable `hugo-deploy.yaml` workflow looks like this:

```yaml
name: Hugo Deploy 🌤️

on:
  workflow_call:
    secrets:
      AWS_ACCESS_KEY_ID:
        required: true
      AWS_SECRET_ACCESS_KEY:
        required: true
      VIMEO_TOKEN:
    inputs:
      S3_BUCKET_NAME:
        type: 'string'
        required: true

jobs:
  hugo-build:
    uses: gauntface/workflows-static-site/.github/workflows/hugo-build.yaml@main
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    with:
      ENVIRONMENT: 'production'

  publish:
    runs-on: ubuntu-latest
    needs: [hugo-build]
    steps:
      - name: Configure AWS Credentials ☁️
        uses: aws-actions/configure-aws-credentials@v1-node16
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-1
      - name: Download artifact 📦
        uses: actions/download-artifact@v3
        with:
          name: hugo-site
          path: hugo-site
      - name: Publish to AWS
         .....
```

Note how it runs the `hugo-build.yaml` workflow, i.e. nesting the workflow.
All that was needed was the `needs: ['hugo-build']` definition so that the
`publish` job could wait for the site to be built before attempting to
publish anything.

## Worth Exploring?

Overall I recommend folks try this if you have several projects with similar
workflows. I've found this consolidation helpful for adding features, and it
should reduce the burden of maintaining these projects.

The negatives for reusable workflows:

- Testing can be slow/painful, but it's no worse than building a custom action.
- I wish I could have defined the events and concurrency for the calling repo,
  removing the need to repeat this in each site.
- Workflows don't share their workspace, so you need to use
  [GitHub artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
  to transfer assets between workflows.
  - This problem isn't specific to reusable workflow, but it is a factor in
    deciding to use a reusable workflow vs. a reusable action.

## The Benefits

I wanted to blog about this because it allowed me to improve multiple sites
with little effort for each one.

- I managed to fix the PostCSS bug in the workflow, making it easy to apply
  across the sites.
- Upgraded and standardized the Hugo version.
- Upgraded and standardized the formatting.
- Build duration improvements were immediately picked up across all sites
  (minutes down to seconds).
- Generic tests, like checking CSS variables can be written and run on all sites.

Long term, I know I'll run into speed bumps. I dread the day I update the
formatting rules and trigger build failures. But it's the perfect forcing
function to define standard requirements and enforce them on all relevant
projects, leaving me to decide if a project should be updated or archived.
