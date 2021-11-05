---
title: "Raspberry Pi Adventure - Day 1"
excerpt: |
  First evening playing around with the Raspberry Pi and they always say you should blog about new things.
  
  Hardware, Raspbian and Wifi are all the exciting things covered.
mainImage: "/images/blog/2014/05/24/img-20140109-232051.jpg"
primaryColor: "#1d120f"
date: "2014-01-10T00:04:24-08:00"
updatedOn: "2014-01-10T00:04:24-08:00"
slug: "raspberry-pi-adventure-day-1"
---

# Raspberry Pi Adventure - Day 1 

![Raspberry Pi in Wooden PiBow Case Close Up](/images/blog/2014/01/IMG_20140109_232116.jpg "1024") 

They say when you start doing something new, you should blog about it. 

Hence my on-going log of Raspberry Pi use and development. 

The goal of this is to basically serve as a home server, nothing heavy, but anything that feels like it is for use when I'm in house and want a quick link to my router or NAS, avoiding the IP address remembering step. 

Hopefully it'll go to control lights and heating etc. 

# The Hardware

## Raspberry Pi

![Raspberry Pi in Wooden PiBow Case](/images/blog/2014/01/IMG_20140109_232053.jpg "1024") 

[In a PiBow Case](http://shop.pimoroni.com/products/pibow-timber)

### Keyboard & Mouse

![Logitech Keyboard and Mouse](/images/blog/2014/01/IMG_20140109_232027.jpg "1024") 

I had this lying around from Google TV usage, but would seriously recommend, it works out of the box. 

### Wireless Adapter

![Maplins Wireless USB Adapter](/images/blog/2014/01/IMG_20140109_231903.jpg "1024") 

I ended up going for [this USB Adapter](http://www.maplin.co.uk/p/maplin-single-band-n150-nano-usb-network-adapter-a71lb) from Maplins because I was walking past and it's all they had in the store. Wish I had waited to get the [Edimax from Amazon](http://www.amazon.co.uk/Edimax-EW-7811UN-150Mbps-Wireless-Adapter/dp/B003MTTJOY). Anyway this one from Maplins works without too much hassle (More Info Below). 

# Raspbian

The easiest way to get going with a Raspberry Pi is to get [Noobs](http://www.raspberrypi.org/archives/4100) \- Install it on an SD Card, plug that in and away you go. 

# Getting Wifi Working

Firstly, run _lsusb_: 

The output for my wifi adapter is: 

`Bus 001 Device 005: ID 148f:5370 Ralink Technology, Corp. RT3570 Wireless Adapter` 

The easiest way I found to get this working was to install _wicd-curses_. 

`sudo apt-get install wicd-gtk wicd-curses` 

Originally when I first tried _wicd-gtk_, I couldn't get it working and had to install _wicd-curses_. But it now seems like I might need both since the gtk version is the UI and perhaps _wicd-curses_ has some additional dependencies. 

Open _wicd_ by 

`Menu > Other > Wicd` 

Connecting to a hidden network is a tad weird, you have to go to: 

`Network (Top left) > Find a hidden network` 

Enter the ESSID, then the wireless networks will display, but if you reboot your pi then the hidden network should appear in wicd when you start it up. 

`sudo reboot` 

After the reboot, you should see a _<hidden>_ network. You still need to go to _Network > Find a hidden network_ and retype the network SSID, otherwise it won't connect. 

When you find the network you want to connect to you need to select properties to enter the security information and then click _Connect_. 

You should now be done :) 

# Update Yo' Stuff

Get nice and up to date 

`sudo apt-get update && sudo apt-get upgrade` 

These commands simply do the following 

  1. _update_: Update all the package info in the package manager
  2. _upgrade_: Perform upgrades for any packages which are out of date

Next Step: VNC
