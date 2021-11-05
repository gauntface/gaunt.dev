---
title: "WebView in the Developer Preview of L"
excerpt: "The WebView has been updated in the preview release of L and brings with it some new web platform features."
mainImage: "/images/blog/2014/07/02/pupreandroid-outline.jpg"
primaryColor: "#ac7cd4"
date: "2014-07-02T21:04:32-07:00"
updatedOn: "2014-07-02T21:04:32-07:00"
slug: "webview-in-the-developer-preview-of-l"
---

# WebView in the Developer Preview of L

The WebView in the Android Developer Preview of L has once again received an update, this time to Chromium M36 and brings with it some new web platform features.

If you haven't been following the WebView updates since the KitKat release everything you need to know is right here in this video.

<iframe width="560" height="315" src="//www.youtube.com/embed/0tH-KHvifMk" frameborder="0" allowfullscreen></iframe>

## Text Sizing in KK MR2 and Above

In the KitKat MR2 release, where the WebView was updated to M33, one small but important change was made to the way the fonts are sized inside the WebView. In KK MR2 and above the font size takes into account the platforms text sizing.

Looking at an example, the normal font would look something along the lines of:

![Gauntface.co.uk with normal font inside a WebView](/images/blog/2014/07/01/normal-font-nexus-5.png "400")

However, if you go to *Settings > Display > Font size* and select _Large_ or _Huge_, you'll get the following:

![Gauntface.co.uk with large font inside a WebView](/images/blog/2014/07/01/large-font-nexus-5.png "400")

A few people have asked how to switch this behaviour off as it's playing havoc with their layouts and the solution is to use  [setTextZoom()](http://developer.android.com/reference/android/webkit/WebSettings.html#setTextZoom(int)) with a value of 100.

```java
webview.getSettings().setTextZoom(100);
```

Please bare in mind that these users have **opted in** to having larger text on their device, chances are they'll want it for browsing your WebView's content as well....just saying.

## New Permissions Model in the WebView

In the [Developer Preview of L](http://developer.android.com/preview/index.html) the WebView team enabled WebRTC, WebAudio and WebGL.

Any scenario where you'd see a permission dialog in a browser (i.e. access to camera or microphone) will require the use of some new [WebChromeClient](http://developer.android.com/reference/android/webkit/WebChromeClient.html) API's to handle permission requests in the WebView.

**Warning**: These API's are only available in the L developer preview release and **may very well change** in the final version of L.

Let's look at some rough examples and use cases of these new API's.

If you have an application where you want to authorize certain permissions for specific domains, then you can use the _preauthorizePermission_ method. At the moment this doesn't work in the preview of L, but it'll be useful for this common use case.

```java
webview.preauthorizePermission(Uri.parse("http://mywebsite.com/"), PermissionRequest.RESOURCE_AUDIO_CAPTURE | PermissionRequest.RESOURCE_VIDEO_CAPTURE);
```

If you're implementing a browser type application, then you'll want to look at implementing the _onPermissionRequest_ callback, which is called whenever a permission would normally show up in Chrome.

The way you implement this is like so:

```java
webview.setWebChromeClient(new WebChromeClient() {
  @Override
  public void onPermissionRequest(PermissionRequest request) {
    // Show a grant or deny dialog to the user

    // On accept or deny call
    // request.grant(request.getResources())
    // or
    // request.deny()
  }
});
```

The _request.grant()_ method takes a set of permissions you wish to grant. This caters to scenarios where you may want to allow some permissions requested but not all.

The final thing you need to consider for these permissions is including the appropriate Android permissions. The camera permission from the WebView requires the  _android.permission.CAMERA_ permission, for accessing audio from the microphone we need _android.permission.RECORD_AUDIO_ and finally for hooking up the volume controls we need _android.permission.MODIFY_AUDIO_SETTINGS_ (Useful in WebRTC).

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

You can find a working WebRTC sample on the [Chromium WebView Samples Github Repo](https://github.com/GoogleChrome/chromium-webview-samples) which uses the permission model.

![Sample of WebRTC Running in the Android L Preview WebView](/images/blog/2014/07/02/webrtc-in-webview-sample.png "400")