---
title: "Is the Web a Developers Cwtch?"
excerpt: "The web is awesome, no doubt about it. But are the very features that make it so powerful, also act as the very thing that holds it back."
mainImage: "/images/blog/2014/10/10/4295780443-1822974617-o.jpg"
primaryColor: "#7a9a8b"
date: "2014-10-10T10:19:27-07:00"
updatedOn: "2014-10-10T10:19:27-07:00"
slug: "is-the-web-a-developers-cwtch"
---

# Is the Web a Developers Cwtch? 

I've been looking for a way to frame this post, this title is probably the closest I can get to expressing my point of view; plus I can reward myself bonus points for using my favorite welsh word.

> *Cwtch*
>
> Welsh word for an affectionate hug.
>
> There's no literal English translation, but its nearest equivalent is "safe place".
>
> So if you give someone a cwtch, you're giving them a "safe place". 
>
> [Source: Urban Dictionary](http://www.urbandictionary.com/define.php?term=cwtch)

# My Background

I'm not a web guy, this will shine through and through in this article. 

That's not me saying I hate the web - far from it, it's awesome. But coming from a native app background, I look at the web from a different view.

And no I'm not one of those native vs web guys either. Both are awesome, both have their place and if you are a company, you'll always need Web and if you can serve your users with extra functionality of a native app - do it.

First I want to discuss API's on the web, something that rub's me up the wrong way when they are created, then discuss how the web looks to me and how the two things play hand in hand.

# Think of the API's

If you've ever been a part of a conversation with someone working on a Web API (defining the standard or altering / expanding an existing standard), chances are you've heard them talk about giving developers "foot guns".

I take issue with this, because it ultimately boils down to one of two notions.

1. This API has the ability to allow developers to do something that results in a bad outcome for the user / browser.

2. This API is too complex for developers to use and there is a high risk of them getting it wrong.

## The Bad Outcome for the User / Browser

Opening up an API that has the ability to be used incorrectly or even abused, shouldn't be a reason not to offer the API. If the API is useful enough to be seriously considered, i.e. numerous use cases are addressed with it, then surely the question shouldn't be - will developers abuse this API and if so how do we stop it - but rather, how do we make it easy for developers to use, assume the majority will use it for good and then how to protect our users from the possible abuses.

A good example is the '[net-info](http://w3c.github.io/netinfo/)' API. Is it a good spec? Yes, it gives a vague indication on what you can inspect in terms of connection. The issue many have with such an API is that developers might start to abuse it and think - "oohh I'm on Wifi, I can download all the things in super high res and it'll be super fast.". When matter of fact the user is coffee shop, the connection is slow and frankly they'd be better off with a 3G connection.

Because of this, the API shouldn't exist, right? 

I mean, not having the API means that they wouldn't do the bad thing of downloading all the high-res images.

No, not right, the API should exist. 

The API isn't dangerous. The API solves the use case where the user is on 2G and you may want to offer a toggle for low / high res assets, ultimately the reverse of the above. It may be that as the platform grows, the net API is fundamental to background syncing, where you only want to sync when on wifi.

What needs to stop is this notion of - developers will use it in a wrong way. Yes they will. Developers on any platform with any set of API's will probably find a way of using said API in a way you wouldn't expect, some times in a good way, as well as bad. But don't use that as a reason to not do something.

## This API is Too Complex...

...**or**...this API is poorly designed.

With the [Web Manifesto](http://extensiblewebmanifesto.org/), there will hopefully be a shift to working on smaller primitives that developers can build on top of. I imagine this will result in complex API's that will be designed for flexibility with the expectation that they'll be used by abstraction layers. If this happens, then it's a good sign that the Web Manifesto is doing it's job. If we end up with overly complex API's, with differences across browsers, then we hit the point where abstraction libraries are few and far between and target the lowest common denominator.

The best example I can think of for this is everything surrounding TouchEvents.

A TouchEvent may fire mouse events for compatibility reasons. Which means that you now have to identify whether a mouse event is *really* a mouse event, or a TouchEvent which has morphed into a fake mouse event.

This is a messy API, it get's messier when you compare across browsers.

The web manifesto approach (small low level APIs) would surely more to a model of a touch is a touch, a mouse is a mouse, the events they fire are independent, then any developer can opt to manage them separately or together.

# My View of the Web

It comes down to compatibility.

The browser has tried to paper over the cracks of the old web to work on the new mobile web.

If you want to build something and leave it, the web feels like the safe place to do it, because every effort will be made to keep it working.

If you want to build something where an absolute fail in your code will still show something and not crash, the web is a safe place to do that.

The efforts to keep stuff working is impressive on the web, and it's not a bad thing at all, but it has its faults and no escape hatch to get to a sane set of API's.

# Where Does the Cwtch Fit In?

Ultimately, compatibility creates a Cwtch. A set of API's where foot-guns are kept well away from you creates a Cwtch.

I suppose my view is that the direction of the web needs to find it's clean path forward.

Should it continue being this safe place where developers only have access to API's where they "can't shoot themselves in the foot", or do we give them access to powerful API's and let everyone learn from their mistakes and move browser vendor focus on protecting users.

The other concern I have, how far **should** a browser go to keep an old site from running? 

At the moment it feels like the only thing that keeps Native ahead, isn't the API's or features - which the web is getting a lot of - but rather the sanity and well thought out primitives in their API's. Native platforms manage compatibility modes and the opt-out to the latest, greatest and cleanest API is as simple updating your app to say "Hey, I'm awesome and keeping up to date".

> Dear Web,
>
> I'm awesome and want to keep up to date.
>
> Love,
> Web Developers.

Orig. Photo: [https://flic.kr/p/7xAZS4](https://flic.kr/p/7xAZS4)