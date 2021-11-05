---
title: "Touch Feedback for Mobile Sites"
excerpt: |
  Most sites don't respond to a users touch.
  
  This raises the question of how should you respond?
mainImage: "/images/blog/2014/05/24/touch.jpg"
primaryColor: "#746c71"
date: "2013-06-25T14:20:17-07:00"
updatedOn: "2013-06-25T14:20:17-07:00"
slug: "touch-feedback-for-mobile-sites"
---

# Touch Feedback for Mobile Sites 

![Mobile Touch Feedback Hero Image](/images/blog/2013/06/Touch-Hero-Image1.png "400") 

During a conversation about a mobile site, one of the comments made was "Why do they hate touch feedback?" and my general response was "It's the web, it doesn't really have touch feedback". 

Basically, this kicked off a little hissy fit in my mind. The rant was along the lines of "Well why the hell don't we have touch feedback? I want it, how do I get it? . . . Rawr Rawr Rawr". 

# Why?

Before going into the how, first consider why. 

Generally, every action a user makes should have some kind of feedback as soon as possible. This means that any action they make, they get a quick confirmation that your app has received and dealt with it. 

The reason this is so vital for native mobile apps, is that if the UI thread is blocked by some process, the user actually gets no feedback since the device is busy with something else. If you then have an app which is running perfectly but just offers no visual feedback, you end up with the same experience as an unresponsive, UI blocked app. 

# Out of the Box

What do you get out of the box if the user clicks a link on your site? 

[Demo](http://jsbin.com/ofotal/2/quiet/) | [Code](http://jsbin.com/ofotal/2/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/mjTNG7Wuzi8" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/A6afcJRKwp0" frameborder="0" allowfullscreen></iframe>

With Chrome for Android you get a flash of blue. Safari on iOS will give you a nice flash of grey. 

These colors are default values from the browsers and can be overridden using: 

`-webkit-tap-highlight-color: rgba(255,0,0, 1.0);` 

Generally these aren't great at giving the user feedback. It tends to happen after the user has touched the link and only seen for a fraction of a second before the next page is loaded. 

# :active

This feels like the best place to achieve feedback of this kind. If we were using a mouse, the active pseudo class is set when the user presses down on the mouse button and removed when the user releases the button. 

The issue with this class for touch devices, is that it actually throws up the color to late for the user to really see it before the browser loads the next page (similar to the tap highlight color). As a result, we end up with this flashing effect on Android & iOS doesn't actually set the active class - Sad times. 

[Demo](http://jsbin.com/ucedej/1/quiet/) | [Code](http://jsbin.com/ucedej/1/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/vD77Lyfl-_A" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/DrZ4WZBavEs" frameborder="0" allowfullscreen></iframe>

## Safari & :active

You may have noticed that Safari does nothing with the :active pseudo class, which sucks. 

[+Paul Kinlan](https://plus.google.com/+PaulKinlan) noticed that if you set an empty ontouchstart attribute on the body, it starts to play nicely - nasty hack, but the end result works just as well as some of the techniques discussed further in this post. 

[Demo](http://jsbin.com/ucedej/2/quiet/) | [Code](http://jsbin.com/ucedej/2/edit)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/FTco2vK7ubA" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/OC6VLqz6jhQ" frameborder="0" allowfullscreen></iframe>

# Touch Events

The next best thing to try, touch events, which we can use to change the style of the element and this actually gets us a bit closer to the end result. 

[Demo](http://jsbin.com/omulid/2/quiet/) | [Code](http://jsbin.com/omulid/2/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/1Lv7MVh4ZGA" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/LGpSGFVYEOk" frameborder="0" allowfullscreen></iframe>

## Flicker

Did you notice the second flicker on the Android device? 

This is caused by the browser actually going into the active state which was still set from the previous test. 

We have a choice, leave it with the horrible flicker, remove it and ignore devices with mouses or remove it and include a 'mousedown' and 'mouseup' event listener. 

Here's an example of the third option where the flicker is no more and it works with a mouse - Good times. 

[Demo](http://jsbin.com/ujibix/1/quiet/) | [Code](http://jsbin.com/ujibix/1/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/67UnId5Vzrg" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/n1lu3ZjWfsU" frameborder="0" allowfullscreen></iframe>

# Scrolling

We have touch feedback, good times, but what is we touch and then scroll the page? 

Scrolling in Chrome for Android, will cause the initial element to receive the 'touchstart' event and this applies the class to the element, but as I start to scroll, the browser cancels the touch event, at which point, the style is reset. 

In an ideal world this wouldn't show the style is the gesture is a scroll, but at least we cancel it when we know the user isn't clicking, but iOS has other ideas as you can see below . . . . 

[Demo](http://jsbin.com/ujibix/1/quiet/) | [Code](http://jsbin.com/ujibix/1/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/985ZDf4_v_E" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/KjHYISz8uF8" frameborder="0" allowfullscreen></iframe>
</div>

# FastClick

FastClick doesn’t really help with the drawing but it does speed up the click behaviour by removing the 300ms delay to determine if the gesture is a click or double click and is well worth checking out if you are finding you are having problems with the responsiveness of your site.

[Demo](http://jsbin.com/ocejin/4/quiet/) | [Code](http://jsbin.com/ocejin/4/edit/)

### Android

<iframe width="640" height="480" src="//www.youtube.com/embed/x1cwOUFkvSM" frameborder="0" allowfullscreen></iframe>

### iOS

<iframe width="640" height="480" src="//www.youtube.com/embed/1J-tZ62v_Bw" frameborder="0" allowfullscreen></iframe>
</div>

# Conclusion

The active pseudo class is designed for mouse devices, not touch screen and the spec doesn’t currently mention how to handle touch screens <http://dev.w3.org/csswg/selectors4/#active-pseudo>. But it easily translates to touch – touch down = mouse down etc and this is what Chrome has done (and Safari does when ontouchstart is set).

If you want support for today I’d recommend using touch events to set a style to the relevant elements.

In the near future the :active pseudo class will be all you need, so if nothing else, simply add this into your styles for when this improves on mobile devices.

Orig Photos: Illustrations provided by GestureWorks® (<www.gestureworks.com>)
<http://graphicburger.com/5-blurred-backgrounds-vol-2/>
