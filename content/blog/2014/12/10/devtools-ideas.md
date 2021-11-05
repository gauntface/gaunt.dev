---
title: "DevTools Ideas"
excerpt: "Having worked with service worker in Chrome, there are a few areas where I'm at odds with DevTools as to how to get a sane workflow."
mainImage: "/images/blog/2014/12/10/bulb-idea.png"
primaryColor: "#0984dc"
date: "2014-12-10T11:51:11-08:00"
updatedOn: "2014-12-10T11:51:11-08:00"
slug: "devtools-ideas"
---

# DevTools Ideas 

One of the biggest failings of service worker at the moment is the debugging story.

Its genuinely a shame since the API for service worker is simple enough to get going with, but complex enough to loop yourself in circles with simple errors and they'd be easier to work with if the debugging story had been thought through.

# Service Worker - a.k.a Terminator

![Terminator Thumbs Up Gif](/images/blog/2014/12/10/tumblr-mv50ieuf7n1s3zvf8o1-500.gif)

One of the major things you quickly learn about service worker is that it will come and go (or technically terminate and instantiate) as it needs to. Totally legit. The problem is that for debugging, DevTools does this:

![Service Worker DevTools Dead](/images/blog/2014/12/10/devtools-dead.png "800")

This actually prevents you from interacting with the DevTools window all together. For the most part this sucks when trying to trawl through console log messages trying to see what happens.

The other side of this, you can't set up your workspace, which with service worker becomes a bit of a pain - Chrome Window, DevTools for service worker, terminal for build process, text editor and chrome://serviceworker-internals/.

# UI for Service Worker Inspection

In terms of how you get the service worker devtools to open, it's some what cumbersome, under chrome://inspect there is a tab for service worker, now this works - but really implements the bare minimum of features.

![Chrome Inspect for DevTools](/images/blog/2014/12/10/screen-shot-2014-12-10-at-9-45-59-am.png "800")

There is an unpredictability to that grinds my gears, I can occasionally see multiple service workers for the same page, without any discernible difference, i.e. they have the same pid (which I am assuming stands for Process ID) and there only seems to be one service worker in action according to chrome://serviceworker-internals/. I've also seen that refreshing this page will add or drop server workers, so either the page is failing to get updates or its simply not updating.

## Possible features

Things which might make life a bit easier:

- Promote the URL in the title rather than "Worker pid:24104". We know it's a worker because it's under the service workers tab and the pid gives us nothing more than internal info which we can't control. [Bug](https://code.google.com/p/chromium/issues/detail?id=441176&thanks=441176&ts=1418288307).
- Add some notion of favoriting or adding a way to surface URL's I care about and suppress other sites. [Bug](https://code.google.com/p/chromium/issues/detail?id=441177&thanks=441177&ts=1418288536).
- Include some notion of state in the list of service workers. This is something that you can see in chrome://serviceworker-internals/, but it's super unclear because of the range of other information it gives. [Bug](https://code.google.com/p/chromium/issues/detail?id=441173&thanks=441173&ts=1418287959).
- Keep alive option. This would just help when you're debugging. I feel like there will likely need to be a reset each time you open chrome://inspect as I can imagine people getting to a point of "works for me" when relying on global state that breaks in the wild where the service worker comes and goes. [Bug](https://code.google.com/p/chromium/issues/detail?id=441171&thanks=441171&ts=1418287623).
- One thing I've not considered but worth mentioning - how to handle the history of service workers - i.e. should we be dropping old dead service workers from the UI or should they be made available? Are they useful?

![DevTools Service Worker Concept](/images/blog/2014/12/10/service-worker-devtools-panel-idea.png "800")



# Mobile Devices

This is a minor gripe, but threw me right off at first. Mobile devices show up in chrome://inspect - coolio. A Mobile devices service worker will show up under the devices, but not under the service workers tab, this results in a weird scenario where your computer is the device, your devices are other and the two are in the same place but separate.

If you switch around the devices and tabs, you get into a situation where everything is discoverable for any device in the same place. [Bug](https://code.google.com/p/chromium/issues/detail?id=438558).

![DevTools Devices Mock](/images/blog/2014/12/10/devtools-devices-mock.png "800")

One thing to note: it may be worth pulling out the "Favorites" idea into pages, this way you can have favorites across all the Pages, Service Workers and Shared Workers tabs.

# Service Workers Away from Page DevTools

The last thing that would improve debugging service workers would be to pull their debugging into the page it relates to. Ideally, viewing DevTools for a specific page, should give me access to all the tools I need for working with that page, including service workers.

I'm glad that it's separate for now since the DevTools panel is getting difficult to manage without adding more, but I hope the end goal of the DevTools team will be to simplify things in DevTools and bring everything together.

Ranting and mocks fin.

[Orig Photo: https://flic.kr/p/AYxe2](https://flic.kr/p/AYxe2)