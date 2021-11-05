---
title: "MapView with Widgets Android"
excerpt: "I recently had a scenario where I needed to have an interactive map pin on Android and this is how I did it."
mainImage: "/images/blog/2014/06/29/3047558085-7bc57aa707-o.jpg"
primaryColor: "#9dae96"
date: "2010-01-04T23:38:55-08:00"
updatedOn: "2010-01-04T23:38:55-08:00"
slug: "mapview-with-widgets-android"
---

# MapView with Widgets Android

This phased me for quite sometime, how do I use a widget like a button, or a view as an overlay?

I asked on the Google Groups, got a great reply from Mark Murphy, and he explained about how you can use relative layouts to add views on top of the map view and set x, y coordinates and use z ordering.

I started to think about what the MapView was, then a quick look at the API and bam, addView.

So here's how you add a view to a MapView and I'm sure you can add buttons to it etc

```java
LinearLayout v = (LinearLayout) View.inflate(getApplicationContext(), R.layout.markerlayout, null);
TextView markerTextView = (TextView) v.findViewById(R.id.MarkerTextView);
markerTextView.setText("Example Text");
_mapView.addView(v, 0,
  new MapView.LayoutParams(
    ViewGroup.LayoutParams.WRAP_CONTENT,
    ViewGroup.LayoutParams.WRAP_CONTENT,
    new GeoPoint((int) (latitudeVariable * 1E6), (int) (longitudeVariable * 1E6)),
    MapView.LayoutParams.BOTTOM_CENTER
  )
);
```

The LayoutParams is the key to defining where the marker view is kept in relation to the map.

Enjoy!

Orig. Photo: [https://flic.kr/p/5DiwQV](https://flic.kr/p/5DiwQV)