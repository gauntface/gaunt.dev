---
title: "Android is Still a Young'un"
excerpt: "Android is growing and doing so quickly, but let's not lose sight of the fact that it's still relatively young."
mainImage: "/images/blog/2014/06/15/7017272625-b1fd7b8e8b-o.jpg"
primaryColor: "#6f767b"
date: "2012-01-15T19:33:57-08:00"
updatedOn: "2012-01-15T19:33:57-08:00"
slug: "android-is-still-a-youngun"
---

# Android is Still a Young'un 

Seeing the changes of a platform which has grown to handle various screen sizes, various OEM alterations, various API tweaks, re-writes and now devices types has been an exciting, albeit challenging experience. 

I've had the fortune of working with some of the best Android developers out there, but keeping on top of all of this is a must and unfortunately only experience can account for a lot of quirks in Android. 

There's been a number of times where I'll moan about the method of achieving a task in android despite there being seemingly no reason to alter the initial attempt. Examples of this include: 

  1. 'this' vs getApplicationContext(). A large number of examples when Android first came up passed 'this' around when a context was needed. This was [later addressed by Romain Guy](http://android-developers.blogspot.com/2009/01/avoiding-memory-leaks.html) as being an easy way to cause memory leaks. But the problem is it's easy to miss these posts and the only time you'll need to read it is when the application starts to act in weird ways, not really giving an indication that this is the cause.
  2. ViewFlipper. There was a very subtle bug in ViewFlipper where it causes a force close after a few orientation changes / moving between activities. [The fix was simple](http://daniel-codes.blogspot.com/2010/05/viewflipper-receiver-not-registered.html), but it was an easy one to miss and release into wild.
  3. Helper classes like AsyncTask & ListViewActivity. I will openly admit that this one is largely personal preference but I will still chuckle if anyone discusses the issue with me and later finds it would of been easier if they had taken the initial hit of more work. Starting with the ListViewActivity, I see little point is using this, the code saved in finding the ListView from the layout seems so trivial it is easily out weighed by the fact you can no longer extend a different class. As for AsyncTasks, the code has a great deal of boiler plate and doesn't really simplify things (From my point of view). But the real issue is you lose freedom to spin off other threads if you need to. Al Sutton did a great talk at Droidcon 2011 on [Android multi-threading](http://skillsmatter.com/podcast/home/concurrency-and-multi-core-honeycomb).
  4. Tiling Bitmaps. I've found numerous posts where people have had issues with tiling bitmaps. Again this is one of those bugs where even though the majority of the time it works, the odd once or twice it files and you end up with a stretched image. The solution, again simple, request the tiling in code instead of XML.
  
Back to my point, a lot of things I do in Android is a result of experience and learning off of others. 

I regularly try out new things in Android and try to forget some of these issues in the hope that they are resolved. This is only ever done when I'm producing examples, where a force close caused by a bug in the Android source isn't a real concern. 

Today I've been working on one of the simplest app's I've ever worked on. A Kitchen Sink application for Android, the main aim of which is to make themes quicker and easier as well as cover off most of the scenarios of input and state.

I've not done much work with Android Fragments and been using this app as a learning experience.  But it has revealed an extremely old pet hate. 

The Dialog. 

I've spent a few hours hitting my head against a brick wall figuring out why displaying a DialogFragment and then rotating the device would cause a crash. 

The answer was to simply not add the fragment in XML, but add it in programmatically. 

These kind of issues scare me. I tend to create bespoke Dialog's in my own app's to keep in with a heavily customised UI, but for client code I will tend to opt for the Google code base. With bugs like these, where the outcome is determined by such a fundamental decision, it's shows Androids infancy. 

Android began to stabilise a lot before the release of Honeycomb. Now with the release of Ice Cream Sandwich I get the impression more of these bugs are going to surface. Fortunately the issues will be found faster than ever before thanks to the thriving community of developers. 

Orig Photo: [https://flic.kr/p/bG6mF4](https://flic.kr/p/bG6mF4)
