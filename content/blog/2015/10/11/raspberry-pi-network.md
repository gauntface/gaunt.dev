---
title: "Raspberry Pi Network"
excerpt: "Been having some problems with my Raspberry Pi's Wifi and found two things that seem to have tremendously."
mainImage: "/images/blog/2015/2015-10-11/berries-4.jpg"
primaryColor: ""
date: "2015-10-11T20:57:32-07:00"
updatedOn: "2015-10-11T20:57:32-07:00"
slug: "raspberry-pi-network"
---

# Raspberry Pi Network

I've just got something super minimal, but actually useful working on my Pi. It's a node server serving up a web page that toggles a button that switches an [Energenie Plug](https://energenie4u.co.uk/catalogue/category/Raspberry-Pi-Accessories) on and off.

One of the problems I've been having is that Raspberry Pi  keeps losing connection to the Wifi network. Here are the two things I've done to fix the problem.

## Wifi Disconnects / Dies / Sleeps

If you are using one of the [Edimax USB Wifi Dongles](http://www.amazon.co.uk/Edimax-EW-7811UN-150Mbps-Wireless-Adapter/dp/B003MTTJOY), you may find that after a while the Wifi just dies / disconnects. Turns out it's sleeping due to some power saving settings that are defined out of the box

You can fix this by following the [instructions from Adafruit] (https://learn.adafruit.com/adafruits-raspberry-pi-lesson-3-network-setup/test-and-configure#fixing-wifi-dropout-issues) which are outlined below.

1.  Create and edit a new file */etc/modprobe.d/8192cu.conf*

    ```bash
    sudo nano /etc/modprobe.d/8192cu.conf
    ```

1.  Paste the following:

    ```bash
    # Disable power saving
    options 8192cu rtw_power_mgnt=0 rtw_enusbss=1 rtw_ips_mode=1
    ```

1. Reboot with `sudo reboot`, **skip this** if you intend to follow the next step as well.

## Wifi Doesn't Reconnect

All was well with the above tweak, but after a few days, either the internet or my router died and the Pi never came back online.

That is when I stumbled on [this Stackoverflow post](http://raspberrypi.stackexchange.com/questions/4120/how-to-automatically-reconnect-wifi).

The most popular solution is the one I went with (i.e. not the selected answer) and it's worked perfectly so far - although there are some reports that it messes with Ethernet, so be warned.

```bash
sudo mv /etc/ifplugd/action.d/ifupdown /etc/ifplugd/action.d/ifupdown.original
sudo cp /etc/wpa_supplicant/ifupdown.sh /etc/ifplugd/action.d/ifupdown
sudo reboot
```

This replaces an existing script with one provided by the wpa\_supplicant package. Presumably, the wpa\_supplicant script is more aggressive in terms of reconnecting to a wifi network should it go offline.