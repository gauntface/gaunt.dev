---
title: "Android ListView with Rounded Corners and Highlighting"
excerpt: "If you need to add rounded corners to the top and bottom elements of a list view then look no further."
mainImage: "/images/blog/2014/06/15/4847848101-b680e3fc2e-o.jpg"
primaryColor: "#7ca6a8"
date: "2012-03-04T22:21:27-08:00"
updatedOn: "2012-03-04T22:21:27-08:00"
slug: "android-listview-with-rounded-corners-and-highlighting"
---

# Android ListView with Rounded Corners and Highlighting 

![Facebook Sync Contact Screenshot](/images/blog/2012/03/fbsync_mid_screenshot.png "350") 

I've just been asked for a helping hand about how to have a ListView with rounded corners, so here's the solution. 

In Android it's fairly trivial to have a ListView with rounded corners on the first and last element. The problems comes when you want to be able to highlight the view, whether that be via press or with a focus. 

The solution is nice and simple, the highlight applied by the system can be removed by setting the ListSelector color to transparent 

`android:listSelector="#00000000"`

If you want to see what's behind the ListView, do the same with the background color 

`android:background="#00000000"`

Finally, remove the footer divider 

`android:footerDividersEnabled="false"`

Then in the background drawable of the list item, ensure it handles states to cope with being pressed and focused (same as you would do with a Button).
