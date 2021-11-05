---
title: "To Zoom or to Scale"
excerpt: |
  A common practice for web developers targeting TVs seems to be taking the 720p UI and simply zooming in on it to fill a 1080p screen.

  But this isn't the best way.
mainImage: "/images/blog/2014/06/15/5882785-dbfe28f983-o.jpg"
primaryColor: "#e21905"
date: "2012-12-04T13:34:11-08:00"
updatedOn: "2012-12-04T13:34:11-08:00"
slug: "to-zoom-or-to-scale"
---

# To Zoom or to Scale

You've made your website for Google TV, it's looking damn fine, but you've hard coded a width, eek, how do I handle 720p & 1080p . . . . I know I'll zoom the hell out of it.

This is a fairly common use case, generally I would strongly encourage developers to create websites which are responsive and handle different screen sizes accordingly, but the history of web development has shown that fixed width pages are fairly common, especially moving from designs to HTML + CSS.

The recommendation from the Google TV team has been to apply a CSS zoom property to enlarge your UI, however some developers found minor artefacts and sprite issues would appear as a result.

One alternative to this approach is to use -webkit-transform: scale(1.x) which scales the UI and seems to do a better job at avoiding artefacts.

```javascript
var scaleElementWidth = $('body').width();
var scaleElementHeight = $('body').height();

var windowWidth = $(window).width();
var windowHeight = $(window).height();

var wRatio = windowWidth/scaleElementWidth;
var hRatio = windowHeight/scaleElementHeight;
var ratio = Math.min(wRatio, hRatio);

$('body').css('-webkit-transform', 'scale('+ratio+')');
```

_Big shout out to [+Paul Lewis](https://plus.google.com/105201233571140699617/posts) for this idea_

Orig Photo: [https://flic.kr/p/w9Kk](https://flic.kr/p/w9Kk)