---
title: "Android Losing It's Edge?"
excerpt: "As Android starts to take on new versions and news devices, is it starting to lose the very thing that made it a joy to develop for?"
mainImage: "/images/blog/2014/06/30/8538679708-906ab6a815-o.jpg"
primaryColor: "#a2b222"
date: "2009-12-09T22:28:05-08:00"
updatedOn: "2009-12-09T22:28:05-08:00"
slug: "android-losing-it-s-edge"
---

# Android Losing It's Edge? 

After attending one of the Google Developer days in London, I couldn't help but think that Android is going down a bit of a bad road, taking away some of the simplistic things that made it such a perfect platform to develop for.

So in the good old days of Android, you downloaded a single SDK and everything worked, now you have to download it, and then run an application inside the SDK to install the required versions of code (which actually wasn't all that obvious to me when I needed a new install of the SDK). But as the day progressed and I got to play with a load of devices, you quickly see that the OS versions on each device become a big problem.

Say I want to develop for HTC Tattoo, but want to also let my app run on the HTC Hero (HTC Hero = V 1.5, Tattoo = V 1.6), I should develop for 1.5 right? Wrong. I should be developing for 1.6, then setting the min SDK to 3 (or the equivalent for 1.5) and then set target version as 4 (or the equivalent for 1.6). Is it just me or is that a little bit backward? I appreciate the reasoning behind this, since you need to let the phone know the app is suitable for devices with smaller screens. But is this really the best way to do it? Maybe it's just me but this seems really counter intuitive. 

But this problem falls back to the simple fact that we are developing for a number of different Android versions and hence a number of different SDK's. So my one app should be developed in 1.6, but set the min sdk version to 1.5 to cover those devices, then test on 3 different screens, then test on 2.0 and perhaps 2.0 with 3 different screens? 2.1 anyone? get the picture?

And no you can't assume backwards compatability, so for example, I developed Wheres My Contacts for Android 1.6 however in 2.0 the contacts API changed, hence my app doesn't work on the 2.0 platform. Now I would of really liked it if the market saw I require access to read and write to the phonebook contacts, but also saw that it was built for 1.6 and not targeted at 2.0, as what happens with the HTC Tattoo because of the screen size.

So we're already seeing a little bit of inconsistency within Android, let alone the differences in the mobile devices themselves etc.

I think the whole point of this ramble is that the beauty of Android was it's an open platform that phones would use and we could just develop for the latest version end of, Google release new update, we get said update, good times. By handset manufacturers chopping and changing the versions between handsets, an app developer has his work tripled (atm for 1.5, 1.6, 2.0) but this is only going to get worse as time goes by. The Android engineers acknowledged there is some fragmentation and are trying to prevent but there is alot to overcome.

Phone manufacturers are introducing custom interfaces, but aren't keeping them up to date with Android, then even if they could, we have to rely on the network providers to release the update after they've customised it and started an over the air update (OTA). OTA is probably the most irritating thing ever, people in the same part of the country getting updates weeks before others, but even then, it takes months to release an update, from the manufacturer to the end user.

The network operators need to stay out of this and stick with what they're good at, leave the handset manufacturers to release the updates, and then the handset manufacturers need a more efficient way to update. This way a developer can stick to one version, and hence one SDK. End users can then stick with one market to get all the apps all the time, if your on 1.5 I'm sure there are apps you are missing that people on 1.6 are enjoying.

Finally just to throw an extra little comment, I reckon the people over at HTC throw some bits of Android 1.6 into their HTC Sense version 1.5 of Android - I've only noticed it with wireless support, but could it lead to problem later on down the line?

I'm sure a big company like Google can discuss this and fix some of these issues, at the end of the day, all manufacturers want their handsets to be successful, by releasing an Android device I'm guessing they are edging their bets on Android making them successful, but Android's success relies as much on developers as it does the platform itself (or does it, is Google apps enough?). If it is developers then manufacturers need to make their life's easier by staying up to date.

End.

Orig. Photo: [https://flic.kr/p/e1wXZE](https://flic.kr/p/e1wXZE)