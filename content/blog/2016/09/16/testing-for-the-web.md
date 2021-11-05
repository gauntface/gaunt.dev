---
title: "Testing for the Web"
excerpt: "Automated testing on the web has some real gnarly gotchas. Time to find out what they are."
mainImage: "/images/blog/2016/2016-09-16/developer-desk.jpg"
primaryColor: "#752e40"
date: "2016-09-16T03:20:06-07:00"
updatedOn: "2016-09-16T03:20:06-07:00"
slug: "testing-for-the-web"
---

# Testing for the Web

After sitting on this for a while, I've come to the conclusion that testing a web app is a **manual job**.

I've been working on [selenium-assistant](https://googlechrome.github.io/selenium-assistant/) for some time now, trying to make testing on real browsers a little easier. 

In the early versions of building the library, supporting Chrome and Firefox was proving it's worth highlighting service worker differences.

However, the problems I've hit as I've continued working on this library is making me question whether testing for the web is something browsers / developers really care about.

# Unstable Ground

![Panda Falling Over](https://i.giphy.com/ZeB4HcMpsyDo4.gif)

[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) are all the rage at the moment, but the APIs they use are brand new, meaning you'd be wise to test across all the major browsers and look at changes in each of those browsers before they hit stable (i.e. what your users see).

The matrix of that gives us Chrome, Firefox, Opera, Safari and Edge and for each one support their stable, beta and unstable releases (if they have them).

Sadly, each of these have "quirks" when it comes to automated testing.

The conclusion I've come to is:

1. You can only test on stable and beta if you want reliable continuous integration, not due to browser problems, but because integrations between browsers and selenium-webdriver are flakey. This mean you lose 6 weeks heads up of possible issues and can't test the latest features.
1. Chrome and Firefox are the only browsers that can be downloaded and used without human intervention, so only test on those....

Below are specifics that have made me reach this conclusion, but feel free to skip to the next section.

###### Chrome
The dev version at the time of writing (Version 54 / 55) didn't work with Chrome Driver (The middle piece between Chrome the browser and [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)). Not disastrous, but worrying the two can become out of sync rendering the browser useless for testing.

###### Opera
On Linux I can't find a reliable way to download the latest stable, beta and developer versions (the URL's on their download page seem to have a unique ID rather than a consistent URL).

On OS X, Opera has an installer which requires human intervention, so again no automation of download and using the browser. However, OS X does have consistent URL's to get the latest stable, beta and developer versions.

###### Firefox
Firefox recently changed to "Marionette" /  "GeckoDriver", essentially a brand new driver for Firefox browsers.

With this move came about 3 months of unreliable behaviour from a number of sides (issues with GeckoDriver releases, selenium-webdriver issues and inconsistent behaviour).

It's getting better, but requires a beta release of selenium-webdriver so still not out of the woods yet.

###### Safari
Safari is moving in the right direction. You can test stable and technology preview versions of Safari, but the older versions of Safari need a plugin to be **manually** installed. Newer version require manually [configuring developer menus and settings before it will work](https://webkit.org/blog/6900/webdriver-support-in-safari-10/).

Downloading the Technology Preview version also seems to have require manual intervention with an installer and the URL to download it seems to have a unique ID in it.

###### Edge
I've always struggled with developing on Windows. I'm hoping the bash shell will make this easier, but last time I tried a few weeks ago, copy and paste was a painful hurdle that was "conveniently" avoided during the [Build release video](https://msdn.microsoft.com/en-us/commandline/wsl/about) and I didn't want to find out what else was going to cause me pain.

Again, I'm not sure if I can automate downloading preview Edge releases because it seems to be through the Windows insider program, which I'm a part of but not really sure how it affects the various programs on my Surface.

# Desktop Only is OK Right?

![Example Browser Window Being Dragged Bigger and Smaller](https://i.giphy.com/IpKuFZxEC5584.gif)

One of the core reasons I wanted to run selenium tests locally was the hope that I could get them running on mobile devices with the real browsers, not emulators with "fake" browsers.

The closest I could get was using [Appium](http://appium.io/) to control the stable version of Chrome on Android. It looks like Safari would also work if I spent some more time on it.

That is two out of 5 browsers and the stable version only.

Arguably this might not be a problem if mobile === desktop in terms of API support. One browser would be enough to test performance on a device.

This isn't the case though. Browsers are racing to implement new features and these features are landing on mobile first (or in some cases mobile only).

Push on Opera is a good example. Works on mobile while desktop has the API's, can't feature detect, but it will fail at the last hurdle with an error, saying it's not supported.

# Where Are We?

We are in a world where [sites are slow on mobile](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/), but we can't load a site up on a mobile device and easily run automated tests.

We are in a world where you can continuously test on any browser as long as that browser can be downloaded and run without a human, in otherwise, on any browser as long as the browser is Chrome or Firefox.

We are in a world where your tests may work today, but tomorrow may bring a new tool change, driver change or browser change that will break you tests.

# What Should Change?

The simple things like allowing a developer to download the latest versions of a browser can go a long way with automating tests. The large issue is making these builds publicly available and installable without human intervention.

Integration tests between a browser and selenium-webdriver would go a long way to help developers keep there tests enabled and running, rather than disabling them. Forseveral months Firefox and Chrome versions have simply been disabled on a range of open source projects because the maintenance / overhead of keeping the tests up and running have been huge.

Testing on mobile needs some major attention. Not being able to load a site up on a device and measure the time taken to load assets and for JavaScript to bootstrap an app is astonishing.

# Testing for Your Projects

Given that you can't test on mobile browsers locally, I'd strongly recommend using services like Saucelabs or Browserstack to test on desktop browser. [See Philip Walton's post for more info](https://philipwalton.com/articles/learning-how-to-set-up-automated-cross-browser-javascript-unit-testing/).

If you need finer grained control / want to run tests locally then [selenium-assistant](https://googlechrome.github.io/selenium-assistant/) may be worth a look, but I cannot promise it'll be working as reliably as I'd like.

# Closing Note

I'm stunned that web development still hasn't moved to mobile devices.

Opening a browser, typing a URL and opening DevTools is still far easier than getting the same URL up on a mobile device.

When I built native apps, I developed on mobile devices, rarely on an emulator. The advantage of this is that testing on a high end phone and a low end phone was the same amount of effort and I could quickly see the performance of the devices. I felt what the end user and target audience felt.

On the web, you build on desktop, wiggle the browser around or emulate screen size. What isn't the same as testing on the actual devices your users have.

CPU throttling is meant to help with performance, but it still feels like a false sense of security. Why is testing on mobile not a higher priority for browsers?

![Famous People Shrugging](https://i.giphy.com/Ll2fajzk9DgaY.gif)