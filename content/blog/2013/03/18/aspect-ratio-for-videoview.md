---
title: "Android Aspect Ratio for VideoView"
excerpt: "If you've ever needed to get the VideoView to size a video with the correct aspect ratio and found that the Android VideoView isn't working for you then give this a try...."
mainImage: "/images/blog/2014/05/24/cinema.jpg"
primaryColor: "#ca4233"
date: "2013-03-18T15:44:49-07:00"
updatedOn: "2013-03-18T15:44:49-07:00"
slug: "aspect-ratio-for-videoview"
---

# Android Aspect Ratio for VideoView 

A couple of people have had issues with the aspect ratio of their videos not being what they expected on Google TV. 

The problem seems to come from the VideoView sizing itself in the layout and making the SurfaceHolder the same size, regardless of video content. 

By fixing the size of the SurfaceHolder you have a good canvas for the video to be drawn on, then ensure the size of the VideoView is the right aspect ratio so as it  sizes the SurfaceHolder, it's uniform with the video size. 

I started digging into the issue and came up with a simple library, which allows you to insert the width and height of the video source, which the  VideoView will then stick to by sizing the SurfaceHolder and then overriding the onMeasure method. Simple. 

How do I use it I hear you cry. Well, start by grabbing the library project from the link below and add it to your project: 

<https://code.google.com/p/googletv-android-samples/source/browse/#git%2Faspect-ratio-video-library> 

Instead of using a VideoView in your layouts, use the following: 

[gist id="5160703"] 

Then in your source code do something along the lines of: [gist id="5160731"] That should be all you need to do. This has only been tested across a couple of media sources, but if you use it and find issues then please create a bug here and we'll see what we can do: <https://code.google.com/p/googletv-android-samples/issues/list>

Orig. Photo: https://flic.kr/p/89c66D