---
title: "Vibe Check №3"
description: "Nothing but vibes."
mainImage: "/images/blog/2022/2022-11-20/jonas-allert-JjLGumpmAyQ-unsplash.jpg"
mainImageAlt: Photo of a plants leaves, titled "modern spirit of nature" by Jonas Allert.
date: "2022-11-20T10:26:00-07:00"
updatedOn: "2022-11-20T10:26:00-07:00"
---

# Vibe Check №3

Not much to report this month, barely feels like a month has passed.

- 🫠 Work is currently focused on a big old pile of terraform and GoCD. While it's fun working on something
    that is completely new to me, I'm questioning myself on whether our time investments were misplaced
    in terms of corners we could cut in the short terms vs investing time confirming broad implementation
    details.

    Sidenote: I continue to hate Mac's and their decision to use `CMD` instead of `CTRL`.

- 💻 Spare time was bundled into a few odd areas.

  - I started playing around with the 
    [Pimoroni Inventor 2040 W](https://shop.pimoroni.com/products/inventor-2040-w?variant=40053063155795)
    which I've had sat on my desk for a while. I wanted to use the LEDs on the board to be a traffic light
    system for GitHub repos (i.e. is the build failing, are there annotation warnings etc).

    First thing I wanted to do was have the pico create a WiFi network that I'd connect to to setup the WiFi
    credentials on the devices. Once I had this, I didn't want to hand craft a UI and figured I'd give
    [Dracula UI](https://ui.draculatheme.com/) a try.

    It was really pleasant to use, got me pretty far without much work, the down side was the size of the
    static page was larger than I felt it needed to be given that it had to stored and served from the
    Pico which has 2MB of memory. **Granted, I should have left it as easy because the page was only 12KB.

    Curiousity was too much, so I started to dig a little. Dracula UI has an NPM package that contains a
    single CSS file for the styles and my first attempt was to 
    [create a tool](https://github.com/gauntface/breakup-css) that would break this
    up into smaller CSS files that I could use with [go-html-asset-manager](https://github.com/gauntface/go-html-asset-manager). This worked well enough, but I still ended up with ~8KB for the final page.

    The reason for that, seemed to be the CSS variables.

    Because Dracula UI comes with a bunch of classes to set colors on backgrounds and text, I didn't
    need the CSS variables, but that meant I'd need to process the CSS to apply the values.

    In the end I forked Dracula UI, altered the repo to follow my desired naming convention and built an
    NPM package that was the CSS passed through PostCSS. With this, the page size dropped to ~2KB.

    **Was it worth the effort?** Kind of. I'm hoping to use Dracula UI for a bunch of small projects, so
    this shouldn't be a throw away effort. This whole process has made me rethink CSS variables though
    and I think there may be some best practices there in terms of when to put variables in a class
    selector vs a root selector.

  - I made this little project "printboy" to create and print labels on a Dymo label maker from a website. It's
    super simple and meant anyone in the house could make labels as needed. **The problem** was the Raspberry Pi's
    SD card stopped working. What was meant to be a quick fix turned into a headache becaue I decided to use
    [SvelteKit](https://kit.svelte.dev/).

    In hindsight, I didn't pay much attention to the setup of SvelteKit, but it ultimately resulted in the depedency
    `"@sveltejs/kit": "next"`. Sadly this meant when I came up setup the Raspberry Pi again, *nothing worked*.

    Looking online after this, there are notes that SvelteKit is beta, but nothing on the home page.

    I've spent some time moving this over to a static site with a small Node API server rather than deal
    with SvelteKit because this is a fairly simple project and I shouldn't have to change anything until
    the web platform break the site (which I doubt it will given how basic this is).

    Guess what I used for the UI.....

  - [Mastodon Hosting](https://mastodon.gaunt.dev/@matt). Pretty sure I'll come to regret this, but in the
    mean time I'm pretty excited to have it running and I own the data.

    I ended up hosting with [Digital Ocean](https://marketplace.digitalocean.com/apps/mastodon) for simplicities
    sake. AWS S3 is my file storage, Google Workspace is the email provider and Cloudflare is set up so redirects
    work webfinger, allowing folks to use `matt@gaunt.dev` in Mastodons search (or at least I think it works).

### 📺 TV Shows

- Top Gear
  - No idea why we ended up watching this, but really enjoyed Paddy, Freddie and Chris.

### 📚 Books

- Alchemist
  - Finally finished this off. It was a nice easy read. It's probably not something I'd appreciate when I
    was younger.
- The Little Book of Common Sense Investing
  - Finally finished this off too. I've still very new to investing, taking odd bits of advices from 
    various places that lead to Index Funds / ETFs but I never appreciated why. This book covers why and 
    backs up why a simple investment strategy is a good path forward. Not sure that this is great if
    you have zero understanding of investments, but it definitely can't hurt.

### 🎨 Crafts

- Ah the surviving pottery. There are some personal wins here. The bowl is the largest thing I've thrown so
  far. The small pots are different shaping techniques I've never achieved before.
  - ![Surviving Pottery](/images/blog/2022/2022-11-20/pottery.jpg)
  - ![Pottery Stamp](/images/blog/2022/2022-11-20/pottery-stamp.jpg)
- Halloween fun
  - ![Chomper](/images/blog/2022/2022-11-20/chomper.jpg)
