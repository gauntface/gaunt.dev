---
title: "Using Android Headset Buttons (Earphone Buttons)"
excerpt: "Some snippets on how to use the buttons on an Android headset inside your app."
mainImage: "/images/blog/2014/06/22/6147907607-4945de2ea3-o.jpg"
primaryColor: "#b4bcb4"
date: "2010-04-14T13:54:34-07:00"
updatedOn: "2010-04-14T13:54:34-07:00"
slug: "using-android-headset-buttons-earphone-buttons"
---

# Using Android Headset Buttons (Earphone Buttons)

Hey'all

I needed to get access to the button presses on the earphone buttons that are built into the earphones that come with the Nexus One (Also with the G1 I think?) and I found it a tad harder than I expected, largely because I expected someone else of done it already for me.

So anyway, here we go in terms of how to get you up an running.

In your main activity you need to register a Broadcast Receiver:

```java
HardButtonReceiver buttonReceiver = new HardButtonReceiver();
IntentFilter iF = new IntentFilter(Intent.ACTION_MEDIA_BUTTON);
iF.setPriority(IntentFilter.SYSTEM_HIGH_PRIORITY);
registerReceiver(buttonReceiver, iF);
```

We set the priority to high for the intent filter so we gain first dibs on the button press, otherwise the media player application might be the first application to detect the press and then drop the receiver, this will hence cause your broadcast receiver to appear as though it's not working.

Now that we've set that up, we need something to catch the broadcasted intents.

```java
public class HardButtonReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    Log.v("TestApp", "Button press received");
    abortBroadcast();
    KeyEvent key = (KeyEvent) intent.getParcelableExtra(Intent.EXTRA_KEY_EVENT);
    if(key.getAction() == KeyEvent.ACTION_UP) {
      int keycode = key.getKeyCode();
      if(keycode == KeyEvent.KEYCODE_MEDIA_NEXT) {
        Log.d("TestApp", "Next Pressed");
      } else if(keycode == KeyEvent.KEYCODE_MEDIA_PREVIOUS) {
        Log.d("TestApp", "Previous pressed");
      } else if(keycode == KeyEvent.KEYCODE_HEADSETHOOK) {
        Log.d("TestApp", "Head Set Hook pressed");
      }
    }
  }
}
```

And that is all there is to it, for more information it might be worth looking at this thread:

[http://groups.google.com/group/android-developers/browse_thread/thread/81e7fadd7f0b64fb/54d82fcdb0c01540](http://groups.google.com/group/android-developers/browse_thread/thread/81e7fadd7f0b64fb/54d82fcdb0c01540)

UPDATE: I've uploaded a full example on my github page, for details see:

[http://blog.gauntface.co.uk/2011/02/13/android-headset-full-example/](http://blog.gauntface.co.uk/2011/02/13/android-headset-full-example/)

Orig Photo: [https://flic.kr/p/angCK2](https://flic.kr/p/angCK2)