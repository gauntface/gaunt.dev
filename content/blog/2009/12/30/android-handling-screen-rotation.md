---
title: "Android - Handling Screen Rotation"
excerpt: "If you really need to handle screen rotation then here is a short guide on how to do it."
mainImage: "/images/blog/2014/06/30/14140812009-90a9e718fc-o.jpg"
primaryColor: "#949494"
date: "2009-12-30T18:31:47-08:00"
updatedOn: "2009-12-30T18:31:47-08:00"
slug: "android-handling-screen-rotation"
---

# Android - Handling Screen Rotation

Word of warning before we start, this goes against the recommended Android UI Design Guidelines and should only be used when you are certain it is appropriate.

To handle screen rotations such that your activity doesn't get destroyed and restarted do the following:

  1.  In your AndroidManifest.xml file go to the Application tab (Assuming you are in Eclipse, Manual programmers can still use this info, but will need to work out the corresponding xml), then under Application Nodes select the Activity you want to stop the rotations on, on the right hand side under "Attributes for <Class Name> (Activity)" scroll down to  Screen Orientation and set it to portrait or landscape.
  2.  Then in the same section set config changes to "orientation|keyboardHidden"
  3.  Now back in your class add the following function and you'll be good to go.

      ```java
      // Handle Screen Orientation (Stop Activity being killed and re-started)
      @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
      }
      ```

Orig. Photo: [https://flic.kr/p/nxzmKB](https://flic.kr/p/nxzmKB)