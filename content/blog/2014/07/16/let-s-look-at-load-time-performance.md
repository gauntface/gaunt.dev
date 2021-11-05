---
title: "Let's Look at Load Time Performance"
excerpt: "After getting my site to a score of 100/100 on PageSpeed Insights, I couldn't help but look into the one little niggle (read issue) I had with the way I achieved the score."
mainImage: "/images/blog/2014/07/16/2122071509-4aa065df3c-o.jpg"
primaryColor: "#7f777c"
date: "2014-07-16T18:54:23-07:00"
updatedOn: "2014-07-16T18:54:23-07:00"
slug: "let-s-look-at-load-time-performance"
---

# Let's Look at Load Time Performance 

I've been doing work on my site for far too long now.

One of the things I spent some time on up front was getting my PageSpeed Score up. All the way up in fact, to 100/100.

![The Perfect PageSpeed Insights Score for Gauntface.com](/images/blog/2014/07/16/pagespeed-insights-score-100-for-gauntface.jpg "800")

The one niggle I had with this score, was I felt like I cheated it. I hadn't optimised my critical rendering path. I just inlined my CSS. My CSS was hand-written and the structure of my Sass meant each CSS file included what it needed and nothing else (or at least I think it does).

#The Test

Once I had SSL all set-up these are the kind of results I'm seeing on my sites.

## Webpagetest.org

On Webpagetest.org, running my site through a **slow** 3G connection, these are the load times I'm seeing.

![WebPageTest.org Times and Speed Index for Slow 3G Connection](/images/blog/2014/07/16/web-page-test-score-gauntface.jpg "800")

That's 4.964s to document loaded, that is bad.

My key worry here is that inlined CSS, means no cached CSS files, which means any shared CSS across pages, will be lost and there are a lot of shared elements.

I can't tell too much from this waterfall chart. The biggest concerns are the time to first byte and I'm not entirely sure why it's so slow (bad PHP code or server instance).

## Analytics

Analytics has a rather nice feature of telling you what your average load time is for a page.

You can find it in Behaviour > Site Speed > Page Timings

I can't really follow what the data is showing me, but one of the important metrics is the 3.92s average load time. Not that far off from the Webpagetest.org findings.

![The Average Page Load Time for Gauntface.com on Analytics](/images/blog/2014/07/16/gauntface-avg-page-load-time-analytics.jpg "800")

#What If I Didn't Inline All the CSS

There are a few reasons why I thought separating inlined styles and shared CSS file styles:
    - The initial HTML to download will be smaller
    - The stylesheet would then be downloaded asynchronously with the other assets (hopefully). You can see this happening for some assets on the webpagetest waterfall
    - This *should* help the average page load time since the CSS file can then be cached and shared across each page.
    - SPDY support is meant to be ok with sending multiple requests on a single connection.

I made the changes to my site, inlining **only** the styles specific to that page and creating a common CSS file for the other pages to share.

![Webpagetest After Seperate CSS file and Inlined Style](/images/blog/2014/07/16/gauntface-seperate-css-webpagetest.jpg "800")

![Webpagetest Waterfall after Seperating the  CSS file and Inlined Styles](/images/blog/2014/07/16/webpagetest-for-gauntface-waterfall-with-seperate-css-file.jpg "800")

Comparing the webpagetest results from before with this test, we see a few things.

1. The site takes longer to load going from 4.964s to 5.244s for the first view and from 0.918s to 0.972s on the repeat view.
2. The CSS seems to be delaying the loading of the image on the home page.

## Now We Play the Waiting Game

I want to see if this change affects the average page load time over on Analytics.

In theory, pages should be able to pull the cached version of CSS while benefiting from the smaller HTML making it faster to download.

More in a weeks time.

# A Week Later

Well after a week, it seemed that the average load time shot up. 

I think this was simply due to not giving Analytics enough time to collect a valid amount of data, it seems that not every request collects page load time.

I've reverted the change for now, will perhaps dig into Analytics to get some more reliable results.

Orig Photo: [https://flic.kr/p/4ewaVP](https://flic.kr/p/4ewaVP)