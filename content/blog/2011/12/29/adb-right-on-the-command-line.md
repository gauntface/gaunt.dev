---
title: "ADB Right on the Command Line"
excerpt: "It's helpful having all of the Android tools on the command line so that when ever you need them, you aren't hunting around for them in the IDE or trying to remember where you stashed them on your system."
mainImage: "/images/blog/2014/06/15/5695056315-25a835a3be-o.jpg"
primaryColor: "#85a44c"
date: "2011-12-29T16:50:35-08:00"
updatedOn: "2011-12-29T16:50:35-08:00"
slug: "adb-right-on-the-command-line"
---

# ADB Right on the Command Line 

Edit your ~/.profile file 

Then add something along the lines of: 

`if [ -d "/home/matt/Development-Tools/android-sdks/tools" ] ; then     PATH="/home/matt/Development-Tools/android-sdks/tools:$PATH" fi   if [ -d "/home/matt/Development-Tools/android-sdks/platform-tools" ] ; then     PATH="/home/matt/Development-Tools/android-sdks/platform-tools:$PATH" fi` 

I tried '~/Development-Tools.....' but had no luck. 

Anyway, restart your machine and jobs a good'un

Orig Photo: [https://flic.kr/p/9FfDQ8](https://flic.kr/p/9FfDQ8)