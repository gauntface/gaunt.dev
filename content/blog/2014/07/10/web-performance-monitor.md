---
title: "Web Performance Monitor"
excerpt: |
  One of my main gripes about PageSpeed Insights is that I have to go and manually run each of my pages through it. Instead I went and put together a little tool to do it for me.
  
  Don't forget kiddlywinks #PerfMatters
mainImage: "/images/blog/2014/07/10/3707813723-398457e8e1-o.jpg"
primaryColor: "#c74214"
date: "2014-07-10T21:11:13-07:00"
updatedOn: "2014-07-10T21:11:13-07:00"
slug: "web-performance-monitor"
---

# Web Performance Monitor 

I've been wanting and needing a dashboard for continuously testing out the performance of my site and I've never really found anything that met my needs. In the end, I put together a Web Performance Monitor.

It consists of three parts:

- A PageSpeed library module [webperf-lib-psi](https://github.com/gauntface/webperf-lib-psi)
    - This essentially takes either a list of URL's or a sitemap and runs it through the [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v1/getting_started) and emits events when a new result, run completion or error event occurs.
- A Cron Job-esque module called [webperf-monitor](https://github.com/gauntface/webperf-monitor)
    - Running this module with a config file containing database credentials and a sitemap URL, the tool will use the aforementioned library to crawl over a set of URLs, get the PageSpeed Scores for each of them and stash the results into a database.
- The final piece of the jigsaw is the web front-end [webperf-monitor-frontend](https://github.com/gauntface/webperf-monitor-frontend)
    - This is an uber simple NodeJS app which creates a web front-end for the data which is now stored in a database.

You can checkout what the end result is like at [gauntface.com/perfmatters/](https://gauntface.com/perfmatters/)

![Example Screenshot of Web Perf Monitor](/images/blog/2014/07/10/chromebook-pixel-web-perf-monitor.png "800")

The end goal of this, is that over time I can extend it to include support for [webpagetest.org](http://webpagetest.org) as well as data hints from [Google Analytics](http://www.google.com/analytics/) to create things like screenshots of the 10 most popular devices which visit my site.

Clearly I'm a way off from this grand vision, but anyone wanting to try it out, please do, pull requests and issues are welcome.

As always #PerfMatters

Orig Photo: [https://flic.kr/p/6DDvQP](https://flic.kr/p/6DDvQP)