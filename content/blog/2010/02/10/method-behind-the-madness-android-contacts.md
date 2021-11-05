---
title: "Method behind the madness -  Android Contacts"
excerpt: "The ContactsContract in Android is an unusual mash up of API's to access the contacts list on a device."
mainImage: "/images/blog/2014/06/29/7021093981-ba90d18061-o.jpg"
primaryColor: "#3679ba"
date: "2010-02-10T21:56:00-08:00"
updatedOn: "2010-02-10T21:56:00-08:00"
slug: "method-behind-the-madness-android-contacts"
---

# Method behind the madness -  Android Contacts

In the 2.0 release of Android the Contacts api changed, and boy do I mean changed.

The thing is if you read through the documentation it's near impossible to differentiate the difference between ContactsContract.Contacts and RawContacts and then Entity and Data. But there is a reasoning behind all of this and I'm going to attempt to illustrate it with a little image, while this isn't accurate I just thought it might help some of you get to grip a bit with the differences. 

![Graph of contact data](/images/blog/2010/02/AndroidContacts.png "300")

The idea is that if you have several sources for contacts, they can be added as RawContacts and then the Android Platform can make a pass over them and link the contacts together.

There are good and bad sides to this, we get the feature that all our contacts from all aspects of the internet are connected in one place, the bad thing about this is that Google seems to of failed in offering a suitable and reliable way to manipulate these contacts. Now I admit this is understandable as it's only going to confuse the phone and could end up with some bad situations in theory, but there are valid uses.

I'm sure I'll work out a nice way to achieve what I want with the Contacts api, but in the mean time anyone wanting some implementation details please read through this great blog post on all things Contact-y.

[http://www.c99.org/2010/01/23/writing-an-android-sync-provider-part-2/](http://www.c99.org/2010/01/23/writing-an-android-sync-provider-part-2/)

Orig. Photo: [https://flic.kr/p/bGqWCv](https://flic.kr/p/bGqWCv)