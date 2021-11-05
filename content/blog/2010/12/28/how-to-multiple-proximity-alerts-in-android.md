---
title: "How-To: Multiple Proximity Alerts in Android"
excerpt: "There is a weird little trick to getting the location proximity alerts working in Android and here it is plus some demo code on github.com."
mainImage: "/images/blog/2014/06/16/10012162166-6e611105c5-o.jpg"
primaryColor: "#b34c77"
date: "2010-12-28T16:52:19-08:00"
updatedOn: "2010-12-28T16:52:19-08:00"
slug: "how-to-multiple-proximity-alerts-in-android"
---

# How-To: Multiple Proximity Alerts in Android 

A number of people have asked me about a little snippet of code I put up at: 

[http://blog.gauntface.co.uk/2010/01/04/proximity-alerts-in-android/](http://blog.gauntface.co.uk/2010/01/04/proximity-alerts-in-android/)

Because the code was originally written for a piece of University coursework, so I needed to be careful to avoid any issues with plagiarism. Since all of that is over now, I've re-written the example into a little example project. It's by no means a full piece of code - I have only briefly tested it and I haven't included any code to remove the broadcast receivers after they've been registered.

Anyway I'm hoping this will be enough to get everyone moving in the right direction with their projects and will post comments with useful hint's / tips on alterations or things I may of missed.

Anyone looking for a slightly more detailed explanation of the code should still refer to my [original post](/2010/01/04/proximity-alerts-in-android/).

On a slight aside, I have spoken to Reto Meier about how efficient proximity alerts are in terms of when gps is used and when it isn't (i.e. if the cell tower position indicated the user couldn't be near a proximity alert, it doesn't fire up the GPS sensor). Reto indicated that proximity alerts are fairly efficient, however, it does cause the gps icon to appear in the notification bar and recommended looking at the source code for proximity alerts and altering it so the icon isn't displayed (which would make users feel more comfortable using the app and not worrying about batter life).

p.s.s. I have only tested this on a 1.6 emulator, so if you have any issues, it could be simply because it needs updating for 2.1, which I may do at some point, depending on how many need it.

Grab the full example source code here: [https://github.com/gauntface/Android-Proximity-Alerts-Example](https://github.com/gauntface/Android-Proximity-Alerts-Example)

Orig Photo: [https://flic.kr/p/gfJWZC](https://flic.kr/p/gfJWZC)