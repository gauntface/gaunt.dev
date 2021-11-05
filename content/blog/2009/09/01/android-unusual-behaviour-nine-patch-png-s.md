---
title: "Android Unusual Behaviour - Nine Patch PNG's"
excerpt: "I had a scenario where my nine-patches were playing up as they didn't have an area for content."
mainImage: "/images/blog/2014/06/30/277281172-9c150e712c-o.jpg"
primaryColor: "#f2293f"
date: "2009-09-01T21:49:49-07:00"
updatedOn: "2009-09-01T21:49:49-07:00"
slug: "android-unusual-behaviour-nine-patch-png-s"
---

# Android Unusual Behaviour - Nine Patch PNG's 

I was doing some development on an app and got some weird behaviour where 3 buttons, all of the same background would line up as expected in eclipse and the emulator, but when I inserted a different button in the centre, it messed up when ran on the emulator.

I played around with a number different layouts trying to work out how I was going to fix this, assuming it was just my layout that was playing up. But I got curious and played around with the 9 patch png used for the new button and quickly realised that was the problem. To explain further, compare the left image (The layout shown in eclipse, how I wanted the view to display, and the right is how it displayed when inflated in the emulator [Ignore the button widths - that was me playing around, just look at the heights]). 

![Where-To-Do Button Eclipse](/images/blog/2009/09/Screenshot1.png "500")

![Where-To-Do Emulator Button](/images/blog/2009/09/device.png "500")

The problem was that android was putting in an empty space for text but didn't know where to put it as I hadn't set an area the bin image could put content, as soon as I put this in the 9 patch png, I got the required result.

If anyone gets weird results, play with the 9.png if you are using them as this can mess up your layout as well as the actual layout itself.

Orig. Photo: [https://flic.kr/p/qv92S](https://flic.kr/p/qv92S)