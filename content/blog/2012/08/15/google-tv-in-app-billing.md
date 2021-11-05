---
title: "Google TV + In App Billing"
excerpt: "Google TV needs a few tweaks to the standard In App Billing example for Android to get it working."
mainImage: "/images/blog/2014/06/15/3302646512-caf444ea65-o.jpg"
primaryColor: "#65767a"
date: "2012-08-15T14:54:38-07:00"
updatedOn: "2012-08-15T14:54:38-07:00"
slug: "google-tv-in-app-billing"
---

# Google TV + In App Billing

The other day I was asked a few questions regarding In-App billing on Google TV and since it was the first time I'd looked into this, I thought I'd share a few details on what was needed to get things working.

I started off with the stock Android example, which you can find here: <http://developer.android.com/guide/google/play/billing/billing_integrate.html#billing-download>

Installing this directly on TV quickly threw up some issues.

The first problem was suggesting that GTV didn't support billing (The exact error, in case your were wondering, was _RESULT_BILLING_UNAVAILABLE_ ). I was puzzled as to why this was the case and the error wasn't particularly helpful, but I tried changing the API_VERSION to 1. That was the ticket.

The reason for this change, Google TV doesn't currently* support subscription billing (see the asterisks on info regarding this matter), so it makes sense that API_VERSION 2 would cause an error.

So onwards and upwards, but alas we run into issues as soon as we come to buying some goodies.

The error I was receiving was _INTERNAL_SERVICE_ERROR_, again not such a useful piece of info. Again a little head scratching and we come back back to the previous issue. If GTV only supports in-app billing, there is no need to define an _ITEM_TYPE_. Remove this and you get to the next stage. Hurrah.

At this point you'll want to export a signed version of your application, upload it to the Play Store, then install this APK onto your device '_adb install <Directory to Signed APK>_'. At this stage its worth reading the testing page, this will give you info on this as well as how to set up test accounts so you don't get charged.

However, if you're like me. you might see another error from Google Play, "This version of the application is not configured for Market billing. Check the Help Centre for more information.". This doesn't necessarily mean you have done something wrong. I had this problem and it seemed to be that Play hadn't quite updated with the product ID's or the APK I had uploaded. I left it for 24 hours and then I was good to go.

*Now all of this will hopefully be avoidable once the native Google Play store is released for Google TV, which was one of our announcements at this years Google I/O and should be released by the end of the summer. This will support subscription billing and should work with the Android in app billing example straight out the box.

### Changes to Source Code

Changes to make to makeRequestBundle in  BillingService.java:

```java
protected Bundle makeRequestBundle(String method) {
  Bundle request = new Bundle();
  request.putString(Consts.BILLING_REQUEST_METHOD, method);
  request.putInt(Consts.BILLING_REQUEST_API_VERSION, 1);
  request.putString(Consts.BILLING_REQUEST_PACKAGE_NAME, getPackageName());
  return request;
}
```

Changes to make to run in BillingService.java:

```java
@Override
protected long run() throws RemoteException {
  Bundle request = makeRequestBundle("REQUEST_PURCHASE");
  request.putString(Consts.BILLING_REQUEST_ITEM_ID, mProductId);

  //TODO: Filter out for API_VERSION < 2 only
  //request.putString(Consts.BILLING_REQUEST_ITEM_TYPE, mProductType);

  // Note that the developer payload is optional.
  if (mDeveloperPayload != null) {
    request.putString(Consts.BILLING_REQUEST_DEVELOPER_PAYLOAD, mDeveloperPayload);
  }
  Bundle response = mService.sendBillingRequest(request);
  PendingIntent pendingIntent = response.getParcelable(Consts.BILLING_RESPONSE_PURCHASE_INTENT);

  if (pendingIntent == null) {
    Log.e(TAG, "Error with requestPurchase");
    return Consts.BILLING_RESPONSE_INVALID_REQUEST_ID;
  }

  Intent intent = new Intent();
  ResponseHandler.buyPageIntentResponse(pendingIntent, intent);
  long value = response.getLong(Consts.BILLING_RESPONSE_REQUEST_ID, Consts.BILLING_RESPONSE_INVALID_REQUEST_ID);

  return value;
}
```

Orig Photo: [https://flic.kr/p/62QVKf](https://flic.kr/p/62QVKf)