---
title: "Admob Android App Update"
excerpt: |
  An update to the Android Admob App.
  
  Screenshots and changes inside.
mainImage: "/images/blog/2014/06/16/452245099-829fa7013d-o.jpg"
primaryColor: "#ad2528"
date: "2010-12-01T21:20:34-08:00"
updatedOn: "2010-12-01T21:20:34-08:00"
slug: "admob-android-app-update"
---

# Admob Android App Update 

Since the release of Facebook Sync I have found that I want to keep track of my Admob Revenue and to be honest the website isn't too bad both on the phone and on a standard browser, but what I really want is a simple widget and an app with a nice interface if I want more info, so after noticing they've released an API I went about writing an Admob application.

So far I've been quite happy with the results (especially considering how little time I've actually spent (a few hours here and there when ever I can), but what I've really been trying to do is focus in the details, the little things that may go unnoticed but make it a little bit nicer for the user.

The aim of this blog post is for me to a.) Show what I've done so far b.) Get some initial feedback and c.) Point out things others may overlook in app development. 

### The Login Screen

Exciting stuff I know, but there is just a couple of minor details to take note of.

The first thing is the customisation of the widigets, thats the EditText fields (Username and Password), Checkbox (Remember Me) and the Button (Login). Now this screen took a fairly long time to design and set up because I was setting up the Theme.xml and Style.xml so afterwards it would filter throughout the application so I didn't have do anything in any of the layouts (really recommend devs use Themes and Styles, you'll thank me later). 

Anyway I think some people may go against me changing the default EditText field, my main issue is that the system edit text is different for every version of Android and I'm really shooting for a nice, simple, fluid UI, hence all the custom components.

I've also put a 'Gaunt Face' badge to the left of the application, the reason behind this is because I want to build up a bit of a brand for quality apps and I want to know what you guys think of this, I don't think it's particularly obtrusive and the key is just to get people to notice it if they download more than one of my apps (which I hope they will). 

![The Login Screen of the Admob andoird app (portrait)](/images/blog/2010/11/Login-Screen-Portrait.png)

Second point to make (this is one of those really minor things I was talking about), but look at the keyboard, notice the key left of the space bar? It's an @ symbol - OMG Hold the press, it's really tiny but I have used a number of app's where the username is an e-mail and they DON'T set the keyboard like this, it's so minor but bugs me quite a bit. Google put in the option, so use it :) 

![Showing the use of the at symbol in the Admob App](/images/blog/2010/11/Login-Keyboard-at-Symbol.png)

Like any good layout, it should work in both portrait and landscape. 

![Showing the Login Screen for Admob in Landscape](/images/blog/2010/12/Login-Screen-Landscape-e1291235473541.png)

### What I'm Referring to as, the Dashboard

Next is the dashboard or home screen or . . . the first screen you see when you log in.

The aim for this screen is to tell you what you want to know, which is how much money you've made today, how much you've earned in the past month and let you see all that is relation to what you've earned in the past 2 days [ it also say hi to you too :) ]. 

![The Dashboard of the Admob application](/images/blog/2010/12/Dashboard-Portrait.png)

The little things to note are, the action bar at the top with the refresh bar, when you hit refresh, the arrows turn into a loading image, which means NO dialog popping up and blocking the screen (I hate those, in fact I'm not a fan of the dialogs as a whole, as you'll see in a bit). The hi message also has a nice little pop out animation on start up as well.

What I need to do with this screen is figure out how to handle large values above each bar in the chart. I was considering the following: 

$999.99 -> $999.99 

$999,999.99 -> $999.9k 

$999,999,999.99 -> $999.9m 

(Anything greater I won't show) 

Not sure if I like that or not and I'm not convince that those values could be displayed on all the devices (low dpi, medium dpi and high dpi) or not, but at the moment, that's what I'm thinking. 

A quick shot of it in landscape, this is just a little bit of a shuffle about to use the space a little better. 

![The Android Admob Application Dashboard in Landscape](/images/blog/2010/12/Dashboard-Landscape-e1291236292870.png)

### Application List

Then we have a list screen so you can see all of you're applications, here's both portrait and landscape. I don't have much to say about this screen, it's fairly simple and the only thing dev's should consider is insuring the list view cache color hint is set to an appropriate color to avoid any nasty side effects when scrolling (and remove the dividers if you need to). 

![A List of a Users Admob Adverts in Android Application](/images/blog/2010/12/Apps-List-Portrait.png)

![The Users Advert List in Landscape](/images/blog/2010/12/Apps-List-Landscape-e1291236636346.png)

### App Summary

Nearly at the end, this screen is still in very early stages, but here we go. The summary screen for an app, this covers the same content you can have access to on the website (Revenue, eCPM, Requests etc). At the moment it is only showing a line graph, but I am intending on adding more data underneath the graph in a simple linear layout (one value after the other). Each section can be accessed by scrolling the bar of buttons and clicking on your required one or by swiping the entire screen left or right, which will cause a similar behaviour to the stock News and Weather app. 

I only got the graph working last night so need to check some of the data, but the idea is the portrait graph has 7 days worth of data (which is meant to be shown as below). 

![The Summary Screen for Admob Revenue](/images/blog/2010/12/Summary-View-Landscape.png)

Then when in landscape the graph will enlarge and show 30 days worth of data (there will be a small graphic to indication to the user about this behaviour). 

![The Admob App's Landscape Graph](/images/blog/2010/12/Summary-View-Landscape1.png)

### Dialog Boxes - GGGgggrrrrRRRrrrr

Lastly ....... I hate the default dialog box, I mean ...... really hate it ...... so I customised mine: 

![Admob Dialog Box in the Android App](/images/blog/2010/12/Dialog-Box.png)

Some may think it looks worse and if you do then let me know, if you like it let me know, I personally don’t like it and have therefore acted on it.

### Fin.

That’s it for now, I’m continuing development for it, finishing off the web services (it’s not paginated yet) and finish off the summary screen, but hopefully I’ll be able to release a beta of it sometime soon.

One thing I would really like input on is the app icon, I personally don’t like the one I’ve come up with, can any suggest anything better or alteration I could make to this one?

![Admob Beta App Icon on the Launcher](/images/blog/2010/12/App-Icon.png)

Orig Photo: [https://flic.kr/p/FXSHi](https://flic.kr/p/FXSHi)