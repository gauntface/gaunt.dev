---
title: "Vibe Check №5"
description: "Nothing but vibes."
mainImage: "/images/blog/2023/2023-02-28/narwhal-sea.png"
mainImageAlt: An illustration of a narwhal swimming underwater.
date: "2023-02-28T17:39:00-07:00"
updatedOn: "2023-02-28T17:39:00-07:00"
---

# Vibe Check №5

- ⚗️ Been working on plumbing GoCD into Sentry's custom workflows (pinging tools that direct events to people and channels). Nothing too crazy, but several languages and moving pieces.

    Folks before me set up [Sentry](https://sentry.io) error monitoring from our GitHub CI to log when specific tests fail. I've been sorting the issues this past month, so it's easier to parse and track which tests are flakey and how frequently they flake. It's surprisingly helpful to have this data, and Sentry's libraries make it easy to collect ([pytest-sentry](https://github.com/getsentry/pytest-sentry), [jest-sentry-environment](https://github.com/getsentry/jest-sentry-environment)). The downside is that acting on this has been difficult. Some tests are trivial to fix, others I need help figuring out how to run them. In many cases, identifying an owner is challenging.

   Beyond learning more about Sentry as a tool, it's been interesting learning the common causes of flakes in the Sentry test suite, time and sorting being the main two. **Remember, kids** - freeze time in your tests or consider time zones and what happens at midnight and ensure your values are deterministic.

- 💻 Side projects have been here and there.
  - Been doing a whole bunch of work on a [teensy](https://www.pjrc.com/teensy/) project, which I'm hoping I'll get done in time to give as a gift. Will hopefully share more of this later.
  - [Surma](https://surma.dev/) continues to be [most excellent](https://www.youtube.com/watch?v=VsspGufYSUo) and helpful in reviewing my newbie Rust PRs. ❤️
  - Started adding tests to a small React project after breaking it by accident.
  - Thank you [Alexey Rodionov](https://github.com/FluorescentHallucinogen) for updating [simple-push-demo](https://simple-push-demo.vercel.app/) with notes on Safari and its web push support.
  - **I wrote a bloomin' blog post 🎉**.
    - [Re-usable GitHub Workflows are a thing](https://www.gaunt.dev/blog/2023/use-reusable-github-workflows/). I've been using them to deploy my Hugo sites and so far it's working great.

### 📖 Reading

- If you haven't read [Stop saying "techincal debt"](https://stackoverflow.blog/2023/02/27/stop-saying-technical-debt/) I'd strongly recommend it.
  A lot of what is covered here is very much what the Open Source team at Google did (without really realizing it). We targetted sources of pain
  in terms of maintanence/on-going time requirements and tried to reduce the work as much as possible.
- [The Seeds](https://www.darkhorse.com/Books/3002-041/The-Seeds-TPB) was an ok read. I really wish they are done a little more with the story/world
  they created, but it's beautifully made and illustrated.

### 📺 TV Shows

- Last of Us 🥲
  - So good but so sad.
- Drive to Survive 5
  - Love the tea.

### 🎨 Crafts

- Been trying my hand at crochet, and now I have a new desk buddy.

    ![Photo of Gnarly the crocheted narwhal](/images/blog/2023/2023-02-28/2023-02-28_17.38.52.jpg)
