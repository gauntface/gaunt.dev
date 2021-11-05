---
title: "Arduino Fun Times"
excerpt: "Brief notes of playing with Arduino"
mainImage: "/images/blog/2014/06/16/6052455554-61b54422d4-o.jpg"
primaryColor: "#5b8bae"
date: "2011-03-12T16:26:53-08:00"
updatedOn: "2011-03-12T16:26:53-08:00"
slug: "arduino-fun-times"
---

# Arduino Fun Times

Nan over at Mubaloo bought an Arduino for everyone to have a little play with, so now here is my experience of working with the Arduino Uno.

**Step 1:** Go get the IDE - <http://arduino.cc/en/Main/Software>

**Step 2:** The download for linux doesn't come in an deb, so you can add a menu entry by right clicking Applications > Edit Menu, then set the Name and comment accordingly, the command just needs to be on <Directory to Arduino IDE>/arduino

I set the logo image to image below.

![Arduino Logo](/images/blog/2011/03/menu_logo.png "200")

**Step 3:** The IDE requires some library files, so you need to run the following command:

```bash
sudo apt-get install avr-libc gcc-avr
```

After installing these bits I was able to write, compile and load my first sketch to the board and everything worked as expected :)

Orig Photo: [https://flic.kr/p/adQqaY](https://flic.kr/p/adQqaY)