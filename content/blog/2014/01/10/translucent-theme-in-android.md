---
title: "Translucent Theme in Android"
excerpt: |
  In Android KitKat you have the ability to have a translucent theme in your app so you can style notification bar and navigation bar.

  We'll look at a basic example for doing this.
mainImage: "/images/blog/2014/05/24/kitkat.jpg"
primaryColor: "#c49e51"
date: "2014-01-10T14:37:45-08:00"
updatedOn: "2014-01-10T14:37:45-08:00"
slug: "translucent-theme-in-android"
---

# Translucent Theme in Android

![Non Translucent and Translucent Android ActionBar](/images/blog/2014/01/device-2014-01-10-1.png "605")

One of the new features in KitKat is the Translucent UI, where you have the ability to sit behind status and navigation bars, meaning you can have the subtle change shown above (left side is normal, right side is the translucent version).

NOTE: This application is just me playing around with some stuff, so please look past the awful UI

# The How

To get going you need to set the following properties in your theme:

###### values-19 > styles.xml

```java
<item name="android:windowTranslucentStatus">true</item>
<item name="android:windowTranslucentNavigation">true</item>
```

Now the interesting thing is what you end up with when you use this. Everything is behind the ActionBar. Hmmmmm.

![Initial Translucent Setting of Android App - Broken](/images/blog/2014/01/device-2014-01-10-120346vjggjgjgj.png "1024")

So let's step through how we fix this.

# Fit System Window

The first thing you'll find on [stackoverflow](http://stackoverflow.com) for this is to set the _[fitsSystemWindows](http://developer.android.com/reference/android/view/View.html#attr_android:fitsSystemWindows)_ attribute on your layout. Now using the [Heirachy Viewer](http://developer.android.com/tools/debugging/debugging-ui.html) in _monitor_ I ended up making the following changes in my layout.

## Altering the activity_main.xml

When I created this project, I was using Android Studio's rather helpful templates to create an application using [AppCompat](http://developer.android.com/tools/support-library/features.html#v7-appcompat) and a [NavigationDrawer](http://developer.android.com/design/patterns/navigation-drawer.html).

_activity_main.xml_ originally looked like:

```xml
<android.support.v4.widget.DrawerLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"     android:id="@+id/drawer_layout" android:layout_width="match_parent"
  android:layout_height="match_parent"
  tools:context="co.uk.gauntface.android.webviewbrowser.MainActivity">

  <FrameLayout
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />

  <fragment
    android:id="@+id/navigation_drawer"
    android:layout_width="@dimen/navigation_drawer_width" android:layout_height="match_parent"
    android:layout_gravity="start"
    android:name="co.uk.gauntface.android.webviewbrowser.NavigationDrawerFragment" />
</android.support.v4.widget.DrawerLayout>
```

The problem with applying _fitsSystemWindows_ in this is that the NavigationDrawer will change how it acts, it'll still overlay behind the ActionBar although the main content will be below the ActionBar and above the navigation bar at the bottom.

The trick is wrap the navigation draw with a FrameLayout and apply the _fitsSystemWindows_ to that.

```xml
<FrameLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:fitsSystemWindows="true"
  tools:context="co.uk.gauntface.android.webviewbrowser.MainActivity">

  <android.support.v4.widget.DrawerLayout
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
      android:id="@+id/container"
      android:layout_width="match_parent"
      android:layout_height="match_parent" />

    <fragment
      android:id="@+id/navigation_drawer"
      android:layout_width="@dimen/navigation_drawer_width"
      android:layout_height="match_parent"
      android:layout_gravity="start"
      android:name="co.uk.gauntface.android.webviewbrowser.NavigationDrawerFragment" />

  </android.support.v4.widget.DrawerLayout>

</FrameLayout>
```

This will give us the following layout.

![Example Screenshot of Devices with fitsSystemWindows](/images/blog/2014/01/device-2014-01-10-120346vjggjgjgvvvvvj.png "1024")

## Add Some Color

To change the color of the status bar I just set the windowBackground attribute in my theme.

```xml
<item name="android:windowBackground">@color/window_bg</item>
```

![Screenshot with background color](/images/blog/2014/01/device-2014-01-10-135355.png "605")

Now I’d love to have a transparent navigation bar and if I could get the height of the navigation bar reliably, I would actually use that space for part of my UI and add padding to shift touchable elements at the bottom of my UI. But since I can’t find the height, that space is useless to me, hence a quick switch of the navigation bar to black with:

```xml
<item name="android:windowTranslucentNavigation">false</item>
```

## Fin.

![Screenshot of finished result](/images/blog/2014/01/device-2014-01-10-135834.png "605")
