---
title: "Arachnidlabs Minishift and Ubuntu / Pi"
excerpt: "The Minishift by Arachnidlabs is this crazy awesome little pixel screen that you can use to display text or what not."
mainImage: "/images/blog/2015/2015-09-17/arachnidlabs-main.png"
primaryColor: ""
date: "2015-03-24T20:22:43-07:00"
updatedOn: "2015-03-24T20:22:43-07:00"
slug: "arachnidlabs-minishift-and-ubuntu-pi"
---

# Arachnidlabs Minishift and Ubuntu / Pi

I was mucking around with the the [Arachnidlabs minishift](http://www.arachnidlabs.com/minishift/) and ran into a few things I wanted to note down for my own sanity.

<iframe src="https://www.youtube.com/embed/DGM5Mnr_MeA?controls=2&modestbranding=1&showinfo=0" frameborder="0" allowfullscreen></iframe>

# udev Rules on Ubuntu

One thing I quickly hit was the inability to run any of the minishift python code on my machine without *sudo*, which originally freaked me and took a while to dig around with.

In the end I had to add a udev rule, which I did like so:

```bash
sudo nano /etc/udev/rules.d/10-local.rules
```

I added the following to the file:

```bash
# Arachnid Labs Minishift
ATTRS{idVendor}=="04d8", ATTRS{idProduct}=="f517", GROUP="<My USERNAME>"
```

For anyone curious, I got the idVendor and idProduct by running `usb-devices` and finding the following info:

```bash
usb-devices

.........

T:  Bus=03 Lev=01 Prnt=01 Port=03 Cnt=03 Dev#= 13 Spd=12  MxCh= 0
D:  Ver= 2.00 Cls=00(>ifc ) Sub=00 Prot=00 MxPS= 8 #Cfgs=  1
P:  Vendor=04d8 ProdID=f517 Rev=00.02
S:  Manufacturer=﻿Arachnid Labs Ltd
S:  Product=﻿USB - SPI Interface 1.0
S:  SerialNumber=0000230218
C:  #Ifs= 1 Cfg#= 1 Atr=80 MxPwr=500mA
I:  If#= 0 Alt= 0 #EPs= 2 Cls=03(HID  ) Sub=00 Prot=00 Driver=usbhid

.........
```

Notice the bits on the third line of the output.

After this I had to restart udev which you can do with:

```bash
sudo /etc/init.d/udev restart
```

Finally unplug and re-plug in the minishift and you're good to go.

# Mega Basic Python

I stole some of the code from the minishift library which starts a server to create a really simple python script to use the minishift.

```python
import minishift
import time
import itertools
import sys

# width is 8 * Number of Minishifts
width = 72
vid, pid = 0x04d8, 0xf517
ms = None
try:
    ms = minishift.Minishift(minishift.MCP2210Interface(vid, pid), width)
except:
    print "Unable to find the minishift device"
    print "    - Please ensure it's connected"
    print "    - Please ensure you have the right permissions to access it"
    sys.exit()

def clear():
    ms.canvas.write_text(0, "")
    ms.update()
    return

def staticText( str ):
    ms.canvas.write_text(0, str)
    ms.update()
    return

def scrollingText(text, interval, times):
    canvas = minishift.Canvas()
    canvas.write_text(0, text)

    for i in range(times) if times else itertools.count():
        for col in canvas.scroll():
            ms.update(col)
            time.sleep(interval)

    # Scroll the text off the screen
    canvas = minishift.Canvas()
    canvas[width - 1] = 0
    for col in canvas.scroll():
        ms.update(col)
        time.sleep(interval)

clear()
#staticText("static test")
scrollingText("This is a message that's far too long for a display.", 0.05, 2)
```

# Getting it to work with Pi

Next step was to get this working with the Raspberry Pi, which means installing all the relevant bits and adding the same udev rule.

```bash
sudo apt-get install -y python-pip python-dev libusb-1.0-0-dev libudev-dev
sudo pip install cython
sudo pip install minishift-python
```