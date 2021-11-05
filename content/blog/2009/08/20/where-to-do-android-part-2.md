---
title: "Where-To-Do : Android (Part 2)"
excerpt: "Second part to the building of Where-To-Do."
mainImage: "/images/blog/2014/06/30/183842413-271f9a1a86-o.jpg"
primaryColor: "#a98e5c"
date: "2009-08-20T19:16:43-07:00"
updatedOn: "2009-08-20T19:16:43-07:00"
slug: "where-to-do-android-part-2"
---

# Where-To-Do : Android (Part 2)

What I'm going to do now is begin setting up some more of the basic layout of the app to get it looking roughly how I want, so here are some of the things I wanted to achieve.

  1. Fullscreen or no title bar
  2. Tiled background
  3. Add in the buttons on the top menu

## Fullscreen

To get the fullscreen view I went into the AndroidManifest.xml file, then under the 'Application' tab I set the theme for the main activity to @android:style/Theme.Black.NoTitleBar. This sets the app to open in fullscreen but without the title bar at the top of the app which is set by default. If you want to take up the entire screen then you should use

`@android:style/Theme.Black.NoTitleBar.Fullscreen`

This removes the notification bar.

## Tiled Background

Now I already had an image I put together that could be tiled, but you can't use a 9 patch PNG as this stretches the image, not tile it. So to get it to tile you have to create an xml file in your res/drawable folder and add the following code:

`<bitmap xmlns:android="http://schemas.android.com/apk/res/android"     android:src="@drawable/wood_bg"     android:tileMode="repeat" />`

Obviously you will want to change wood_bg to your own image. Now the problem, you may find you get this error - "Could not find the drawable resource matching value . . ." after chatting with another developer about this issue (romainguy), a fix of using @+drawable is incorrect, while it works, it shouldn't, so for this reason we'll have to add this into our code to prevent any possible bugs.

Right, so on our layout I set the background to nothing so it's just black. Then in our onCreate method, I called setUpUI() as I want to seperate any UI changes from computational code. Then to add and tile a background the code in setUpUI is:

```java
/**  * Set up any UI elements  */
private void setUpUI() {
  // Add tiling background
  View backgroundLayout = findViewById(R.id.backgroundLayout);
  BitmapDrawable bgImage = (BitmapDrawable) this.getResources().getDrawable(R.drawable.wood_bg);
  bgImage.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
  backgroundLayout.setBackgroundDrawable(bgImage);
}
```

This means we now have:

![Screenshot-Android Emulator](/images/blog/2009/08/Screenshot-Android-Emulator.png)

## Adding some more touches

To get the notpad to work I converted it to a 9-patch png and set up a layout to position correctly. By setting up a LinearLayout to have a vertical orientation I can add a menu layout at the top and a list layout on the bottom to contain the to-do items.

The menu I laid out using a RelativeLayout, the reason for this is because this type of layout allows you to fix elements to other element edges. So for example, to get a sort button to align to the right edge of the notepad I set the "Layout align parent right" to true.

Then for the other buttons where I want them to be on the left hand side of the screen, but right of each other I simply set the left most button to "Layout align parent left" property to true, then the other buttons I set the "Layout right of" property to @id/SelectAllBtn and @id/SelectWeekBtn. As you can probably work out these are the ID's of the buttons I'm using.

This then gives us the layout I had in the first part of this tutorial

![Where-To-Do Screenshot Part 2](/images/blog/2009/08/Screenshot-Android-Emulator-stdAndroid1.55554.png)

Now I admit that the button colour is pretty pants, but this is a tiny tweak I can make later on and it won't upset any future code so doesn't need doing at any particular point.

Hopefully you'll start to see it's not too hard to take the standard Android elements and use them to make attractive and unique UI's.

The next part of these 'tutorials' will focus more on the coding of the list view and hopefully the database :-)

As always comments and questions are welcome.

p.s. if anyone reads this and has an Android device and would be willing to test out the apk please comment and I'll e-mail you, I can't afford an Android device at the moment so some testers would be great

Orig. Photo: [https://flic.kr/p/hfeWM](https://flic.kr/p/hfeWM)