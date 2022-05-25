---
title: "Linux and a Bluetooth Dongle"
excerpt: "Bluetooth and Linux have never been great friends, but an Asus dongle has given me hope."
mainImage: "/images/blog/2022/2022-05-25/john-smit-Mc5EwlPC3zA-unsplash.jpg"
mainImageAlt: 
date: "2022-05-25T13:00:00-07:00"
updatedOn: "2022-05-25T13:00:00-07:00"
---

# Linux and a Bluetooth Dongle

My and my partner have started sharing our office space, and I decided
to get some Airpod Pros to help reduce some of the background noise.

The Airpods are great, but my computer has always struggled with Bluetooth
headphones.

I figured I'd try and find a Linux friendly Bluetooth adapter to see
if I could get something working.

The [ASUS USB-BT500](https://www.amazon.com/dp/B08DFBNG7F) has drivers
for Linux, so I figured I'd give it a shot. The drivers didn't install
for me, however, I don't believe they are needed; the only thing I had
to do was disable the built-in Bluetooth, which then forced my computer
to use the dongle.

## Setup Guide

This guide is for anyone wanting to use this dongle (and it's also for me
when I update my OS).

1. We need to find out what your current Bluetooth device is. Running
   `lsusb` should show you the info we'll need to disable your built-in
   adapter. For me, it was listed as:

   ```
   Bus 001 Device 005: ID 0b05:185c ASUSTek Computer, Inc. Bluetooth Radio
   ```

   This output contains the vendor and product IDs `0b05` & `185c`. We'll need these
   for the next step.
1. Block the built-in device from being used by your machine using
   a `udev` rule.

   Run `sudo -H nano /etc/udev/rules.d/81-bluetooth-hci.rules`

   ```
   SUBSYSTEM=="usb", ATTRS{idVendor}=="<Vendor ID>", ATTRS{idProduct}=="<Product ID>", ATTR{authorized}="0"
   ```

   For me, this would be:

   ```
   SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", ATTRS{idProduct}=="185c", ATTR{authorized}="0"
   ```
1.  Reboot your machine, plug-in your new USB dongle, and you should be good to go.

### References

This guide is a culmination of these to stack exchange questions:
- [AskUbuntu](https://askubuntu.com/questions/898881/deactivate-internal-bluetooth-adapter-while-leaving-usb-dongle-online)
- [Unix](https://unix.stackexchange.com/questions/314373/permanently-disable-built-in-bluetooth-and-use-usb)
