---
title: "Notes from playing with Android's Canvas"
excerpt: "The title says it all."
mainImage: "/images/blog/2014/06/16/2100724010-56f520346f-o.jpg"
primaryColor: "#585458"
date: "2010-11-21T19:00:56-08:00"
updatedOn: "2010-11-21T19:00:56-08:00"
slug: "notes-from-playing-with-androids-canvas"
---

# Notes from playing with Android's Canvas 

The first thing I couldn't find quickly in the docs was that the top left corner is (0,0) and the bottom right is the canvas size (w, h).

The measured height of the canvas doesn't necessarily equal the canvas size, what this means is that the canvas size shouldn't be used for calculating positions, but the getMeasuredHeight() and getMeasuredWidth() should be.

One situation I has was I wanted to fill up as much space as possible but allow the containing linearlayout determine how much space I got by setting the weight to 1 for my custom view. However the onMeasure function can be overriden but will give a much larger space than is actually available.

The way around this was to override the onLayout function and in this function I call setMeasuredDimension with my required size. The advantage of using this function is that the size is given depending on what the layout actually has available. When drawing rectangles a sure fire way to not get your rectangle drawn is to have the top lower than the bottom coordinate. This is obvious when put like that but if you consider you're just drawing a rectangle, left and right coordinates should surfice but in terms of implementation I imagine this restriction makes things easier.

Orig Photo: [https://flic.kr/p/4cCL4u](https://flic.kr/p/4cCL4u)