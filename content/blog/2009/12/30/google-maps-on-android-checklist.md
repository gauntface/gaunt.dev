---
title: "Google Maps on Android Checklist"
excerpt: "A quick checklist for anyone starting out with using Google Maps"
mainImage: "/images/blog/2014/06/30/2692346829-69b14eae45-o.jpg"
primaryColor: "#103499"
date: "2009-12-30T16:27:46-08:00"
updatedOn: "2009-12-30T16:27:46-08:00"
slug: "google-maps-on-android-checklist"
---

# Google Maps on Android Checklist

Your making an Android app and want to take advantage of Google Maps, you've been bashing your head against the desk attempting to work out what is going wrong.

So welcome to this little checklist of things I've forgotten to do when doing this task:

1.  Right click on your project in eclipse and go to properties. Then under Android select Google APIs with the correct platform number, click apply then Ok

2.  Open up your Android Manifest file, under the application tab scroll to the bottom and under the Application Nodes click on Add, then double click on "Uses Library", now for the name enter the following - com.google.android.maps

3.  Your activity which is going to be displaying the map isn't a plain old activity, it needs to be a MapActivity like: public class MapExample extends MapActivity

4.  Finally your map view in the layout file should look something like

    ```xml
    <com.google.android.maps.MapView android:id="@+id/mapview" android:layout_width="fill_parent" android:layout_height="fill_parent" android:clickable="true" android:apiKey="YOUR_API_KEY"/>
    ```

    Where your api key can be found by doing as mentioned on the Google Maps site -<http://code.google.com/android/maps-api-signup.html>

This should get you up and running with lots of mappy goodness.

Orig. Photo: [https://flic.kr/p/56UYUV](https://flic.kr/p/56UYUV)