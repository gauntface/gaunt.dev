---
title: "Raspberry Pi Over Serial USB on Ubuntu"
excerpt: "One of the biggest barriers to working with
a Raspberry Pi is working on it from a seperate computer. 
USB to Serial cables make it easy."
mainImage: "/images/blog/2019/2019-01-17/raspberry-pi-snes.jpg"
primaryColor: "#5DBCD2"
date: "2019-01-17T19:14:00-07:00"
updatedOn: "2019-01-17T19:14:00-07:00"
slug: "raspberry-pi-over-serial-usb"
---

Running commands on the Raspberry Pi over serial USB makes 
development a lot easier when starting out with a 
fresh install of Raspbian.

Worth noting, most of this guide is from the
[Adafruit Guide](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-5-using-a-console-cable/overview), 
but I had a permission issue and since I'm hoping to use
this cable a lot in the future, I decided to write a
cut down version for myself.

## Where to get a USB Serial Cable?

You can get a USB Serial Cable on [Adafruit](https://www.adafruit.com/product/954) or on [Amazon (affiliate link)](https://amzn.to/2syODDR).

## Enable Serial on Raspbian

Before you can use the cable, you'll need to enable Serial
communication which is easy to do.

Take your SD Card you intend to use in the Pi and plug
it into your computer.

Open up the `/boot/config.txt` file.

```bash
sudo nano /boot/config.txt
```

At the bottom of this file add the following:

```
enable_uart=1
```

Put the SD card back in your Pi, but don't power
it on yet.

## Installation

We'll need to use `screen` to run commands on the Pi.

```bash
sudo apt-get install screen
```

## Permissions

On Ubuntu I needed to add myself to the `dialout` group
to gain permission to access the serial port. 

```bash
sudo gpasswd --add ${USER} dialout
```

The red cable (the far right in the photo) actually
powers the Pi as well. If you want to power the Pi
via the micro USB **DO NOT USE THE RED CABLE**.

## Attach the Cables to the Pi

Attach the cables to the Pi like so:

![Raspberry Pi Serial USB Cables](/images/blog/2019/2019-01-17/serial-connections.jpg)

## Run Screen

The next step is to plug in the USB cable to your computer
and start `screen`.  This will set up a connection 
between your terminal and the serial port.

```bash
screen /dev/ttyUSB0 115200
```

With this you should see the stream of logs from the 
Pi (main be a rapid stream of text to start with).

The one thing to note, I've seen some unusual behavior
with when I plug in the USB cable and when I run screen,
but that could have also been a permissions issue.

## Exiting Screen

Cheeky FYI, to exit `screen` you need to press `ctrl + shift + d`.

## Altering the Cables

I wanted to make it so it was a little easier to plug in the cables
so I alter the crimp housing for my cables after writing this post,
you can learn more [here](/blog/2019/01/19/crimp-housing-for-makers).