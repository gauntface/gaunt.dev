---
title: "UI on the Big Screen & Android"
excerpt: "A look at the best practices for UI on TV and comparing them to what we have on Android today."
mainImage: "/images/blog/2014/06/15/5232306429-b3ec9418dc-o.jpg"
primaryColor: "#3fcae3"
date: "2012-11-14T16:55:44-08:00"
updatedOn: "2012-11-14T16:55:44-08:00"
slug: "ui-on-the-big-screen-android"
---

# UI on the Big Screen & Android

Working as part of the Google TV developer relations team means I see a lot of Google TV applications. Coming from a mobile development background means I've seen a lot of UI / UX design patterns come and go. So here is my short list of things I've seen come and go in the Android space, which are following the same trend on Google TV and give you some useful hints on how to make your good TV apps great.

## No Toast for Me

![Toasts on Google TV](/images/blog/2012/11/device-2012-11-05-163904.png)

These little guys have been around since the days of Android Cupcake. For me they are a fantastic tool for showing up information when certain tasks were done without needing to look at LogCat, but for showing information from your application, outside of the debug build? I'm not so sure. They suffer from a number of problems:

  1. Your app doesn't need to be in the foreground for a toast to show up, meaning you may well end confusing a user as to where the message is from.
  2. It's not that pretty to look at.
  3. In some cases, like the image above,  it covers up the UI, right where you don't want it to.
  4. If the information is that important to show to the user, do you really want to add a time limit to how long it is visible? Imagine telling a user their password was invalid via a Toast. If they look away from the screen for the duration of a Toast, when they eventually come back, they'll have no indication as to why they are still staring at the login screen.

#### Say no to Toast!

If you still like the simplicity of the Toast API, then why not consider using a Crouton instead? They overcome the problem of identifying which app the message came from  as well as being customisable. <https://github.com/keyboardsurfer/Crouton>

![Croutons on Google TV](/images/blog/2012/11/Crouton-device-2012-11-05-165501.png)

## Use an ActionBar

![Google Play Aciton Bar on Google TV](/images/blog/2012/11/Action-Bar-Crop-device-2012-11-05-165735.png "1024")

![YouTube Left Nav Bar on Google TV](/images/blog/2012/11/Left-Nav-Bar-Both.png "500")

Android Mobile & Tablets have strong design guidelines and I think it's fair to say that since the introduction of the UI guidelines, developers have found it useful to be steered in the right direction as far as design is concerned. The end result being users get a common user interface, reducing the time needed to learn how to use a new app.

On Google TV the Action Bar is a design pattern which applies to Mobile, Tablet and TV. As a developer you have a choice, either the default Android ActionBar or you can use the LeftNavBar. There are some interaction differences with the LeftNavBar, but the API is the same.

If you have vertical scrolling in your application, consider using the LeftNavBar since focusing on an item in the LeftNavBar can be achieved by pressing left on the D-Pad, if however you have horizontal scrolling then perhaps a stock ActionBar is more suitable. If you have no scrolling, then you my lucky friend, can pick.

<http://developer.android.com/design/patterns/actionbar.html> <https://developers.google.com/tv/android/docs/gtv_displayguide#LeftNavBar>

## Use Holo

This has a huge affect on your apps look and feel and requires little effort to implement. I've seen a few applications, which by default, don't use the Holo theme for their UI and you can tell by the look of the Dialog and the activity circle (as well as other stock widgets).

![No Holo for Maps on TV](/images/blog/2012/11/No-Holo-for-Maps-on-TVdevice-2012-11-13-164706.png "1024")

But what is causing this? Well the offending line of code in the manifest is:

```xml
android:theme="@android:style/Theme.NoTitleBar"
```

Swap this for:

```xml
android:theme="@android:style/Theme.Holo.NoActionBar"
```

You get:

![Maps on TV with Holo](/images/blog/2012/11/Maps-on-TV-with-Holo-device-2012-11-13-165520.png "1024")

That's more like it :)

If you are sitting there thinking "well this Holo theme is all good and well, but it's blue. I hate blue. My logo is the opposite of blue, what then?" Well never fear, there is a handy little tool which will generate assets colored for your application and give you a theme to go with it.

<http://android-holo-colors.com/> _Created by [Jérôme Van Der Linden](mailto:jeromevdl@android-holo-colors.com)_

Have a look here for some info on themes and some of the widgets you can use:

<http://developer.android.com/design/style/themes.html>

<http://developer.android.com/design/building-blocks/index.html>

## No Loading Dialog for Me

![Loading Dialog](/images/blog/2012/11/Loading-Dialog.png)

Ever seen this dialog?

Perhaps you've even included it within your application?

I can see why developers take this approach, it blocks the users from playing with the UI while a network request is on going, but for users it's infuriating to be blocked out and forced to wait. If you embed it into the UI, not only does it look and feel more integrated with your application, it means the user feels they still have control of the application, even if you don't offer any form of interaction.

## Finally, Use Focusing in Your App

Please add a focus state to your buttons etc.

If you use the holo-colors link above, you don't have much to do ;)

But we all like a bit of custom stuff, so if you do go down this route, then add focusing and ensure it works. If you are developing on a Tablet, then try adding a Bluetooth keyboard and using the arrows keys OR use the simulator with your computers arrow keys.

![Touch states in Android](/images/blog/2012/11/touch_feedback_states.png)

<http://developer.android.com/design/style/touch-feedback.html>

<https://developers.google.com/tv/android/docs/gtv_displayguide#NavigationFocus>

<http://developer.android.com/training/tv/optimizing-navigation-tv.html>

Orig Photo: [https://flic.kr/p/8YmWpP](https://flic.kr/p/8YmWpP)
