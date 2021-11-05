---
title: "What the Virtual Viewport?"
excerpt: "We've heard the term \"virtual viewport\" get kicked around the office over the past few days and no one knew what it was. Rick Byers to the rescue."
mainImage: "/images/blog/2015/2015-09-17/whatthevirtual.jpg"
primaryColor: "#454047"
date: "2015-01-16T14:38:40-08:00"
updatedOn: "2015-01-16T14:38:40-08:00"
slug: "what-the-virtual-viewport"
---

# What the Virtual Viewport? 

The virtual viewport is a new term that has been floating around the Chrome DevRel team lately and we kind of figured we should find out what it is.

The way [Rick Byers](https://plus.google.com/ RickByers/about) describes it is as follows, the idea is splitting the notion of "the viewport" into the "layout viewport" (where fixed position items are attached) and the "visual viewport" (What the users actually see).

Which on first parse isn't super easy to understand.

# Super Simple Example

The website videojs.com is a good example because it's toolbar is fixed to the top and has links on both the left and right side of the bar.

The image below shows what you would see if you zoomed in on a site and tried panning left and right, the top devices are Chrome Stable, which doesn't have a virtual viewport and the bottom 3 are from Chrome Beta, which does have a virtual viewport.

![Example of Virtual Viewport](/images/blog/2015/01/16/virtualviewport1500h.png "1000")

In this example, stable Chrome (The top three images), which doesn't have the notion of a "virtual viewport" will show the top bar when you zoom, but you can't scroll to the right and view the links, you'll only ever see the logo.

Compare this to Chrome Beta (which has a "virtual viewport") and you'll see that the "visual viewport" scrolls everything inside the "layout viewport", allowing you to view the links on the right.

# Internet Explorer were 1st

IE has actually been doing this for some time and according to Rick, the Chrome team reached the same point of view as IE through separate research and testing, so it's looking like a good step forward.
 
# More Solid Info

You want to learn more huh?

Well then, you can view the slide deck below OR check out [Rick's Google  Post](https://plus.google.com/ RickByers/posts/bpxrWN4G3X5), which you really should do since he's much better at this stuff than me ;)

<iframe src="https://docs.google.com/presentation/embed?id=1nJvJqL2dw5STi5FFpR6tP371vSpDWWs5Beksbfitpzc&start=false&loop=false" frameborder="0"></iframe>

Orig. Image: [https://unsplash.com/leonephraim](https://unsplash.com/leonephraim)