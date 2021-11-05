---
title: "How-To: Get GTX460 Graphics Card Working on Ubuntu (10.04)"
excerpt: "Graphics cards suck when it comes to getting them running with Ubuntu, so here's some info on setting up a GTX460 card."
mainImage: "/images/blog/2014/06/22/6478631303-fb0634d361-o.jpg"
primaryColor: "#5a504c"
date: "2010-09-26T16:36:12-07:00"
updatedOn: "2010-09-26T16:36:12-07:00"
slug: "how-to-get-gtx460-graphics-card-working-on-ubuntu-10-04"
---

# How-To: Get GTX460 Graphics Card Working on Ubuntu (10.04)

I've just upgraded my computer and with this came the multiple decisions of what to buy, followed by the nightmare of installing Windows 7 and then to be dragged into the problems Ubuntu is likely to have with up-to-date hardware.

A little part of me was hoping that Ubuntu would be able to handle it, but alas, there was a graphics card issue. However credit to Ubuntu for making everything else work out of the box (apart from the minor issue of SATA 3.0).

Anyway, to get to the point, this is how I got my GTX 460 (Gigabyte 1GB card) working under ubuntu:

1.  To start off with I needed to install the [x-update ppa](https://launchpad.net/~ubuntu-x-swat/+archive/x-updates), which can be done by going to System > Administration > Synaptic Package Manager then from the drop down menus go to Settings > Repositories > Other Software, click 'Add' and then paste in:

    ```
    ppa:ubuntu-x-swat/x-updates
    ```

2.  Close the repositories window and click reload, press mark all upgrades, and then do a search for 'nvidia-current', select this package and click apply.
3.  After this is done reboot your computer (Note: perhaps bookmark this page before you do :-P).
4.  Now go to Applications > Accesories > Terminal and run:

    ```bash
    sudo nvidia-xconfig
    ```

    This will set up and x-org conifg file for you, do one last reboot to make sure everything sticks.

5.  Run the nvidia settings program by going to Accessories > Terminal and typing:

    ```bash
    sudo nvidia-settings
    ```

![Screenshot of the NVIDIA X Server Settings Panel for Linux](/images/blog/2010/09/Screenshot-NVIDIA-X-Server-Settings.png "300")

Done, happy compizing.

Orig. Photo: [https://flic.kr/p/aSuFnH](https://flic.kr/p/aSuFnH)