---
title: "Nokia Nokia Nokia"
excerpt: "I attended a Nokia event in London, here we have some notes as well as comments on the way Nokia positioned themselves at the event."
mainImage: "/images/blog/2014/06/16/6082117463-f01f7b1273-o.jpg"
primaryColor: "#613e24"
date: "2011-02-05T14:53:28-08:00"
updatedOn: "2011-02-05T14:53:28-08:00"
slug: "nokia-nokia-nokia"
---

# Nokia Nokia Nokia 

Yesterday I went to a Nokia event hosted in London.

First off I have to say a huge thank you for Nokia for doing it, at least now should I ever need to develop for Nokia, I'd know where to start, which for certain platforms is a bit of an issue *Nokia Cough* *Blackberry Cough* *Windows Cough* 

To be blunt, RIM, Nokia and Microsoft (Although less so) all are starting to realise that developer communities become the reason a platform can be so successful.

Consider Google who are consistently helping through clinics at small events, holding their own events and helping regularly through IRC and forums. Apple have obviously built up the app eco system and as the first ones to do it, the community is pretty much self sustaining but they do also hold clinics at some events.

RIM have started to change their ways to encourage developers to target Blackberry, this is through new web apps (or Blackberry Widgets as they are confusingly known to by RIM) and releasing new open source code and RIM staff actively helping on the developer forums (a year ago no such help seemed to exist).

Microsoft are still being a bit cold with the developer community, inviting development companies to see the latest devices but no free devices to develop on. But they have been helping out anyone who shows interest and proof of developing apps (or even showing interest in jail breaking community) so I'm half way to thinking they know what they're doing.

So that leaves Palm / HP and Nokia. Samsung have Android and Bada, but Bada is a bit of an outsider and I haven't had much experience with this.

Palm / HP I don't think have set up their full strategy yet for mobile.

Nokia . . . . boy oh boy Nokia. Before yesterday, someone says Nokia I think, Symbian, Maemo, Meego and Ovi. What each of those are - I didn't know, which one should I target, I didn't know, so I haven't even started and I'm already left with a big problem before I've even started. 

Yesterday cleared this up:

Symbian - $100+ phones

Maemo - is now Meego which is a joint effort between Nokia and Intel Meego - Designed in a similar way to Android - to run on a wide range of devices

Ovi - Just the store, I used to be confused with Ovi maps and all sorts of stuff media Nokia where pumping out around it

So which do you target? well to get at most of the Nokia's 30% market share, go for Symbian, how? using Qt, NOT a web app. What tools? Use Qt Quick, this is only a preview but seemed to be getting pushed pretty hard by Nokia as the way forward.

This is kind of good and bad news, Qt Quick seems great BUT it's not ready for prime time, sooo dev's are basically getting shown what the plan for the future is, but this kind of illustrates how late to the party Nokia are with smartphones and developers. They also pointed out that the phones you can target, won't necessarily have the Ovi store installed and while users can download it, they probably won't.

Meaning Nokia's 30% doesn't really count for all that much to developers, because Nokia aren't allowed to push an update to the devices.

Bad news thus far, incomplete tools for a handful of devices that probably don't stand up to much.

Let's start off with the tools, generally they look pretty good, using Qt you can target Symbian and Meego, Windows, Mac and Linux. But they don't have default components like Buttons :-/ but the community has some and Nokia are working on a set to release, so can't complain too much. 

Generally Nokia seems to of done a pretty good job with the toolset and the Ovi store seems solid.

I just wish they came across a bit more confident, most speakers from Nokia seem a little reluctant when approaching iPhone and Android developers. But at the same time a developer from Cute Hacks was on hand giving developers extra info and speaking bluntly about the platform from the point of view of an ex Nokia employee and ex Trolltech employee.

So what device can you target? well the only one I know you definately can target (since it comes pre-installed with Nokia's Ovi store) is the N8. Low and behold, that's just the device ever attendee got at the event (that's right they did a Google and gave out a load of free phones).

What is the N8 like then, I hear you cry?

Well the actual device is awesome. HDMI output, you can plug in USB hard drives directly into the phone, the camera seems pretty cool. The problems start as soon as you turn it on. It doesn't seem like the Nokia has been ran through a user testing group to see how they find the device, the UI the whole lot. Nothing it particularly clear right from the offset. No I admit it must be hard not stealing iPhone or Android UI and keeping your own style / way of doing things when a numebr of user's will be coming from using iPhone or Android.

And I admit I'm an Android user, but iPhone I can play with and enjoy, Blackberry I can play with and know where to go and find stuff, Nokia - Nu uh, took me long enough to find how to get the menu up. This is what concerns me most, Symbian targets cheaper devices, but everyone wants an iPhone. iPhone's aren't cheap, when they start looking for cheaper, Android will start flagging up, these are the smartphone markets that most developers target, so why aren't Nokia telling developers to target Meego?

If Meego is any better than Symbian (which shouldn't be hard to beat) then Nokia may be able to make a come back. 

All in all Nokia need to do more events like this to build up a community, they need to be a little more confident in their approach and need to be a little more open with their numbers and their plans.

In terms of actual device, hardware - Winner, design could do with some work, but it's not bad, but the camera, hdmi, usb stuff is just unique. Software - a lot of work needs to be done just to make it feel more natural / intuitive. Toolset, definately heading in the right direction with Qt from what I've seen *although not played with it yet*. 

NOTES FROM THE EVENT [Largely for my own reference, but you may find it useful too]:

Series 40 - Touch
Symbian - Smartphones - QT
Meego - Expensive devices

Doesn't appear to parse JSON

Device Anywhere style stuff

Operator Billing - 60 / 40 otherwise apps charged at 70 / 30 [Nokia still make a loss on some billing at the 60 / 40 split]

Old phones need to download Qt

Meego - Nokia + Intel [Android clone?]

N900 - Meego installable Small portrait ratio

Web - Qt is recommended

Web - Nokia Web Runtime [Old before HTML5] and the Nokia browser is rubbish / slow

Can create JS hooks <\- Qt supports symbian & Meego [WRT doesn't]

OpenGLES 2.0 on all iOS / Android / Symbian

Qt SDK 1.1 <\- Preview [buggy] but best 

www.forumnokia.com <\- Full dev offering

Qt Quicl no default widgets

Mouse = Touch Event [Multitouch work+]

Qt Quick - JS - 6 Months

Qt Heavily tested backwards compatible

Permissions - Clients [need signing installer]

Permissions - Ovi Filtering? - Manual?

Permissions - Required?

Limited Qt Updates 3.1, 3.2, 500 -> No Ovi store by default [Like RIM!]

Qt - Memory issues on old devices

Just target symbian 3+

Qt-labs#1 <\- Freenode

Qt-Symbian

Qt-Quick

Use Qt Quick project 

setMaxHeap 

Symbian 3 - Error msg

Indexing - terrible 

English - Worldwide 
American English - None 

Languages - Need to match 

[Select all devices supported to get through the store easier]

Orig Photo: [https://flic.kr/p/agsrCc](https://flic.kr/p/agsrCc)