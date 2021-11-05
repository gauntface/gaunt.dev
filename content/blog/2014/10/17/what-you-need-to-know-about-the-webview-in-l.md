---
title: "What You Need to Know About the WebView in L"
excerpt: "The WebView in Lollipop has been updated to M37 and comes with some new API's and alterations to some behaviours. I've noted them down just in case."
mainImage: "/images/blog/2014/10/17/lollipop-2200.png"
primaryColor: "#f11431"
date: "2014-10-17T19:25:26-07:00"
updatedOn: "2014-10-17T19:25:26-07:00"
slug: "what-you-need-to-know-about-the-webview-in-l"
---

# What You Need to Know About the WebView in L

# WebView Updated via Play Store

![OMG Reaction Gif](/images/blog/2014/10/17/tumblr-lm11bt4oak1qe6xr2.gif)

With the L release, the WebView can be updated by the Play Store, this is a huge achievement!

# Major New Features

![WebRTC in the WebView](/images/blog/2014/10/17/328932a7-4adf-4e9a-8542-cc16ed01b963.png "400")

The following features are now supported in the latest WebView:

1. WebRTC ([Full Sample Here](https://github.com/GoogleChrome/chromium-webview-samples/tree/master/webrtc-example))
2. WebAudio
3. WebGL
4. Native support for all web components APIs

# Subtle Behaviour Changes

There are a few things that have changed which aren't obvious at first.

1.  Using wrap_contents has always caused the WebView to ignore [viewport meta tags](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/set-the-viewport?hl=en), however **in L, viewports are now taken into account**.
2.  To be as secure as possible by default, **third party cookies are now off by default**. If you need to turn them on then you can do so with this little snippet of code.

    ```java
    // AppRTC requires third party cookies to work
    CookieManager cookieManager = CookieManager.getInstance();
    cookieManager.setAcceptThirdPartyCookies(mWebView, true);
    ```

3. Fullscreen video has caused a few issues where developers hadn't properly implemented the callbacks. I've put a [sample up on GitHub](https://github.com/GoogleChrome/chromium-webview-samples/tree/master/fullscreen-video-sample) to show how the callbacks can be used. This includes when to show / not show the fullscreen button based on whether the callbacks <a href="http://developer.android.com/reference/android/webkit/WebChromeClient.html#onShowCustomView(android.view.View, android.webkit.WebChromeClient.CustomViewCallback">onShowCustomView</a> and [onHideCustomView](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onHideCustomView()) have been implemented or not.

![Fullscreen Video Sample](/images/blog/2014/10/17/09894563-e134-4962-9a3a-1de11c2fbf99.png "400")

# New API's

With the release of L, there have been some additional API's added.

## Permissions

Web API's like getUserMedia(), need to have access to the devices Microphone and Camera, which means the WebView needs a permission model to grant or deny these requests.

The key new API to control this is the [onPermissionRequest() method](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onPermissionRequest(android.webkit.PermissionRequest)) in WebChromeClient.

Below is a simple example that grants any permission that comes from http://apprtc-m.appspot.com/.

```java
mWebView.setWebChromeClient(new WebChromeClient() {

    @Override
    public void onPermissionRequest(final PermissionRequest request) {
        Log.d(TAG, "onPermissionRequest");
        getActivity().runOnUiThread(new Runnable() {
            @TargetApi(Build.VERSION_CODES.L)
            @Override
            public void run() {
                if(request.getOrigin().toString().equals("https://apprtc-m.appspot.com/")) {
                    request.grant(request.getResources());
                } else {
                    request.deny();
                }
            }
        });
    }
});
```

**Note:** Your native app needs the AndroidManifest permissions before it can grant permission forward to a WebView.

The above was taken from the [WebRTC sample on GitHub](https://github.com/GoogleChrome/chromium-webview-samples/tree/master/webrtc-example).

## File Upload API

![Input File Sample App](/images/blog/2014/10/17/b6ef89db-32fd-42ee-8e6d-6c81af3a3a6a.png "400")

A long standing feature request has been for support of the input field for files.

In L, we've added the [onShowFileChooser() method](http://developer.android.com/reference/android/webkit/WebChromeClient.html#onShowFileChooser(android.webkit.WebView, android.webkit.ValueCallback<android.net.Uri[]>, android.webkit.WebChromeClient.FileChooserParams)). This gets called when an input field is clicked and you can show a file selection UI as a result of this.

You can find [a full demo application here](https://github.com/GoogleChrome/chromium-webview-samples/tree/master/input-file-example).

Below is an example implementation of the onShowFileChooser() method which sets up an Intent chooser to take a photo or get an existing image from the gallery.

```java
mWebView.setWebChromeClient(new WebChromeClient() {
  public boolean onShowFileChooser(
      WebView webView, ValueCallback<Uri[]> filePathCallback,
      WebChromeClient.FileChooserParams fileChooserParams) {

    // Double check that we don't have any existing callbacks
    if(mFilePathCallback != null) {
        mFilePathCallback.onReceiveValue(null);
    }
    mFilePathCallback = filePathCallback;

    // Set up the take picture intent
    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    if (takePictureIntent.resolveActivity(getActivity().getPackageManager()) != null) {
      // Create the File where the photo should go
      File photoFile = null;
      try {
        photoFile = createImageFile();
        takePictureIntent.putExtra("PhotoPath", mCameraPhotoPath);
      } catch (IOException ex) {
        // Error occurred while creating the File
        Log.e(TAG, "Unable to create Image File", ex);
      }

      // Continue only if the File was successfully created
      if (photoFile != null) {
        mCameraPhotoPath = "file:" + photoFile.getAbsolutePath();
        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,
            Uri.fromFile(photoFile));
      } else {
        takePictureIntent = null;
      }
    }

    // Set up the intent to get an existing image
    Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
    contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
    contentSelectionIntent.setType("image/*");

    // Set up the intents for the Intent chooser
    Intent[] intentArray;
    if(takePictureIntent != null) {
      intentArray = new Intent[]{takePictureIntent};
    } else {
      intentArray = new Intent[0];
    }

    Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
    chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
    chooserIntent.putExtra(Intent.EXTRA_TITLE, "Image Chooser");
    chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);

    startActivityForResult(chooserIntent, INPUT_FILE_REQUEST_CODE);

    return true;
  }
});
```

Notice that at the very end we call **startActivityForResult()**, this means we just need the corresponding method **onActivityResult()** where we can call the [filePathCallback.onReceiveValue()](http://developer.android.com/reference/android/webkit/ValueCallback.html) once we've finished.

```java
@Override
public void onActivityResult (int requestCode, int resultCode, Intent data) {
  if(requestCode != INPUT_FILE_REQUEST_CODE || mFilePathCallback == null) {
    super.onActivityResult(requestCode, resultCode, data);
    return;
  }

  Uri[] results = null;

  // Check that the response is a good one
  if(resultCode == Activity.RESULT_OK) {
    if(data == null) {
      // If there is not data, then we may have taken a photo
      if(mCameraPhotoPath != null) {
        results = new Uri[]{Uri.parse(mCameraPhotoPath)};
      }
    } else {
      String dataString = data.getDataString();
      if (dataString != null) {
        results = new Uri[]{Uri.parse(dataString)};
      }
    }
  }

  mFilePathCallback.onReceiveValue(results);
  mFilePathCallback = null;
  return;
}
```

You can find the [full sample on GitHub](https://github.com/GoogleChrome/chromium-webview-samples/tree/master/input-file-example).