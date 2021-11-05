---
title: "Proximity Alerts in Android"
excerpt: "Getting proximity alerts to work in Android involves a little bit of black magic, as noted here."
mainImage: "/images/blog/2014/06/29/11194772464-80fe47026b-o.jpg"
primaryColor: "#77afcd"
date: "2010-01-04T23:24:07-08:00"
updatedOn: "2010-01-04T23:24:07-08:00"
slug: "proximity-alerts-in-android"
---

# Proximity Alerts in Android

I've spent probably the best part of a couple of days attempting to get Proximity Alerts working in Android. There are a large number of Google Group threads, all leading to essentially someone saying it still doesn't work. There was one or two that had working solutions, or some who managed to get it working to a certain degree.

I managed to get a working implementation of proximity alerts by combining the information from a number of threads, this is just a guide through what I learnt and should get you up and running with your own alerts.

Just for the record, I need to learn a great deal more about Intent Filters and Broadcast Receivers as my knowledge of them is fairly vague, so please correct me in the comments if I say anything wrong, or should be implementing things differently.

Lets start of with the basic intent action:

```java
public class EventsMapping extends MapActivity {
  // Proximity Alerts
  private String proximityIntentAction = new String("co.uk.gauntface.android.wheresmycontacts.PROXIMITY_ALERT");
```

This is simply a string I have made up to signify the action of an intent is a proximity alert action (i.e. this identifies the intent as a proximity alert). The usual convention for naming the intent actions is com.some.package.action.ACTION_NAME, notice the action before the action name. This then needs to be applied to an intent filter, which is then applied to a broadcast receiver. This can be done in the AndroidManifest.xml file, however I didn't have any luck this way (told you I needed to do some learning) so for now I can only show how to achieve this in code.

In your Activity:

```java
IntentFilter intentFilter = new IntentFilter(proximityIntentAction);
registerReceiver(new ProximityAlert(), intentFilter);
```

ProximityAlert Class:

```java
public class ProximityAlert extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.v("SomeTag","Proximity Alert Intent Received");
  }
}
```

It's worth noting at this point that you only need one broadcast receiver for a number of proximity alerts, since one receiver will pick up any number of intents fired off defined by the intent filter. We've got the broadcast receiver with the intent filter applied to it. Now lets define out proximity alerts function.

```java
private void setProximityAlert(double lat, double lon, final long eventID, int requestCode) {
  // 100 meter radius
  float radius = 100f;
  // Expiration is 10 Minutes
  long expiration = 600000;

  LocationManager locManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
  Intent intent = new Intent(proximityIntentAction);
  PendingIntent pendingIntent = PendingIntent.getBroadcast(getApplicationContext(), requestCode, intent, PendingIntent.FLAG_CANCEL_CURRENT);
  locManager.addProximityAlert(lat, lon, radius, expiration, pendingIntent);
}
```

Breaking this down, you obviously set radius and expiration to anything you wish, expiration = -1 will mean the alert will never expire. We get the LocationManager as shown, the intent is just an intent using your action string I previously mentioned. In my example I added an extra item, now in the Google Groups there was quite a bit of talk about needing to apply a different extra to the intent, this isn't necessary, however the VERY IMPORTANT THING to getting multiple proximity alerts working is in the request code in the PendingIntent.getBroadcast. In the java docs for pending intents, it says "Private request code for the sender (currently not used)." So one would assume it doesn't matter, Wrong, it's extremely important. You need to send a different request code for each proximity alert so the location manager can identify each of the pending intents as different, otherwise (I think) it caches them and treats them the same, meaning all proximity alerts will have the same extra data (or at least that's what I found).

So I hope that helps someone, if I have missed anything out let me know, I know my naming for these classes is poor, but I was working on some coursework and refactoring was bottom of the list I'm afraid.

Do as I say, not as I do.

UPDATE: I've just made a full example of the code here - [http://blog.gauntface.co.uk/2010/12/28/how-to-multiple-proximity-alerts-in-android/](http://blog.gauntface.co.uk/2010/12/28/how-to-multiple-proximity-alerts-in-android/)

Orig. Photo: [https://flic.kr/p/i4f8Qm](https://flic.kr/p/i4f8Qm)