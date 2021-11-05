---
title: "Desktop Site and the Viewport"
excerpt: "Ever wondered what exactly happens when you try to get a mobile device display a desktop site correctly, with the required zoom level?"
mainImage: "/images/blog/2014/05/24/2670960042-cddebd5ab2-o.jpg"
primaryColor: "#547c74"
date: "2013-11-29T19:41:26-08:00"
updatedOn: "2013-11-29T19:41:26-08:00"
slug: "desktop-site-and-the-viewport"
---

# Desktop Site and the Viewport 

![Desktop Viewport Cheatsheet](/images/blog/2013/11/desktop_viewport_cheat_sheet_trans.png) 

The viewport came and gave web developers a way to determine the best way to support mobile devices. 

But what exactly happens when you define a viewport width and initial scale for a desktop site? 

It's hard to visualise what the result is of twiddling the initial-scale value, so here it is for your very eyes (and my own memory / sanity). 

Firstly let’s consider the devices: 

### Nexus 5

 
Physical Pixels CSS Pixels Screen Density

Width
1080
360
3

Height
1920
640
 

### Nexus 10

 
Physical Pixels CSS Pixels Screen Density

Width
2560
1280
2

Height
1600
800
 
Let’s say we have a site which has been designed for a width of 640px, how does that look across mobile devices? 

On desktop we’ll get a view like the image below, where the blue section is an element with a hardcoded width of 640px and we’ve centered an image within that with a width of 320px and height of 320px. 

![Desktop Website with Viewport](/images/blog/2013/11/Page-on-Desktop.png "1024")

# <meta name="viewport" content="width=640">

This viewport will tell devices that the page is designed for 640px and since there is no initial-scale, the user agent will fit the 640px width to the devices width. 

You can regard this as the browser setting the initial-scale to a value where the content will fit the screen exactly (i.e. zoom in or zoom out such that the entire width of the site can be viewed). 

For our site with a width of 640px and a Nexus 5 with a width of 360px, the initial scale is 360px / 640px = 0.5625 [i.e. Zoom Out]. 

Compared to a Nexus 10 with a width of 1280px in landscape, 1280px / 640px = 2.0 [i.e. Zoom In]. 

### Nexus 5

![Desktop Site on Nexus 5 with No Initial Scale](/images/blog/2013/11/Frame-No-Initial-Scale.png "605")

360px / 640px = 0.5625

### Nexus 10

![Desktop Site on Nexus 10 with No Initial Scale](/images/blog/2013/11/Frame-No-Initial-Scale1.png "1024")

1280px / 640px = 2.0

# <meta name="viewport" content="width=640,initial-scale=1.0">

With the addition of an _initial-scale=1.0_, we are telling the user agent to set the zoom level to 100%, i.e. don’t zoom in or out. 

Following this logic, a Nexus 5 with a width of 360px, will show 360px worth of the 640px site and the other 280px will be off screen. 

For Nexus 10, which has a width of 1280px, we would expect there to be 640px of white space. 

### Nexus 5 (Width 360px)

![Desktop Site on Nexus 5 with Initial Scale of 1.0](/images/blog/2013/11/Frame-Initial-Scale-1.0.png "605")

### Nexus 10 (Width 1280px)

![Desktop Site on Nexus 10 with Initial Scale of 1.0](/images/blog/2013/11/Frame-Initial-Scale-1.01.png "1024")

# <meta name="viewport" content="width=640,initial-scale=0.5">

Setting an _initial-scale < 1_ the page will zoom out. 

In the case of 0.5, you are doubling the number of CSS pixels you can show given the screens width. 

For the Nexus 5’s width of 360px, we would have a viewport width of 360px / 0.5 = 720px, which results in our 640px width site having 80px worth of white space. 

The Nexus 10 will have a viewport width of 1280px / 0.5 = 2560px, causing 1920px worth of white space. 

### Nexus 5 (Width 360px)

![Desktop Site on Nexus 5 with Initial Scale of 0.5](/images/blog/2013/11/Frame-Initial-Scale-0.5.png "605")

### Nexus 10 (Width 1280px)

![Desktop Site on Nexus 10 with Initial Scale of 0.5](/images/blog/2013/11/Frame-Initial-Scale-0.51.png "1024")

# <meta name="viewport" content="width=640,initial-scale=1.5">

To round off the examples, is initial-scale=1.5. 

With _initial-scale > 1_ we are zooming in on the pages content, which ultimately reduces the number of CSS pixels we can show on the screen. 

Nexus 5 = 360px width, if we then apply the 1.5 scale, we end up with 360px / 1.5 = 240px [i.e. zoomed in]. 

Lastly, Nexus 10, 1280px / 1.5 = 853px, so we should still have some white space of 213px. 

### Nexus 5 (Width 360px)

![Desktop Site on Nexus 5 with Initial Scale of 1.5](/images/blog/2013/11/Frame-Initial-Scale-1.5.png "605")

### Nexus 10 (Width 1280px)

![Desktop Site on Nexus 10 with Initial Scale of 1.5](/images/blog/2013/11/Frame-Initial-Scale-1.51.png "1024")

# iPhone & iPad

Safari on iOS 7 on both of these devices behave the same as Chrome for Android on the Nexus 5 and 10. 

# Cheatsheet

My memory is terrible so here’s a little bare bones cheat sheet of the images and the viewports applied. 

![Desktop Viewport Cheatsheet](/images/blog/2013/11/desktop_viewport_cheat_sheet_white.png "1024")

Orig. Photo: https://flic.kr/p/552nnd