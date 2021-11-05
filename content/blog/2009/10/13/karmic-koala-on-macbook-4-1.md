---
title: "Karmic Koala on MacBook 4.1"
excerpt: "A step by step guide on how to get Ubuntu's Karmic Koala running on a MacBook 4.1"
mainImage: "/images/blog/2014/06/30/ubuntu-karmic-koala.jpg"
primaryColor: "#fbb019"
date: "2009-10-13T22:49:16-07:00"
updatedOn: "2009-10-13T22:49:16-07:00"
slug: "karmic-koala-on-macbook-4-1"
---

# Karmic Koala on MacBook 4.1 

![MacBook Ubuntu](/images/blog/2009/08/macBookUbuntu.png)

It's that time of year again when the friendly people of Ubuntu release a new version of their OS and this one is just as awesome as it's predecessors!!.

The UI has been tweaked again and is getting there, the new icons on the gnome panel are fantastic, I was tempted to even try Evolution Mail, in place of Thunderbird, just to keep the mail icon there. So here's my installation experience for you all . . . .

### Installation

I have ReFit installed on my machine to dual boot Mac OS X and Ubuntu, I formatted and installed over my old Jaunty install, (I chose Ext3, just to be on the safe side) and then at the final stage I clicked on Advanced and changed the boot loader to sda3/ where karmic was actually going to be installed.

### Update, Update, Update

Then once installed I had no problem opening it, now all you got to do is open up Synaptic package manager, click refresh, mark all upgrades and click apply. This will update a number of files including the restricted drivers. (p.s. you don't need to enabled 3rd Party Repo's they are enabled by default now)

### Wireless

Now to get wireless working go to System->Administration->Hardware Drivers and hopefully you'll see the wireless card come up (If not just restart your machine), enable it and the wireless will work without even needing to restart.

### Sound

My sound seems to work without any problems, although I need to test how it reacts with headphones and use of the mute button, which caused problems on Jaunty. However to get your microphone working, right click on the volume control on the gnome panel and select 'Sound Preferences'. Go to the 'Input' tab and for the input volume turn it right up to the top and you should see the input level move as you talk.

### Webcam

Next webcam, go here and download the Apple iSight Driver - http://www.mediafire.com/?81xtkqyttjt, then move it to your Desktop. Open a terminal (Applications->Accessories->Terminal) and type:

`cd Desktop/` `sudo apt-get install isight-firmware-tools`

Then on the dialog that opens inside the terminal select 'Yes' you have access to the driver and in the next option, delete what is currently there and type:

`/home/<Your Username>/Desktop/AppleUSBVideoSupport`

Next we need to do a little tidying up on the Mac keyboard functions and 2 finger scroll + click :-)

### Mouse

Mouse Scrolling and clicking - Oh god this is good, ready?

Go to System->Preferences->Mouse

Then under the Touchpad tab click on "Enable mouse clicks with touchpad" which does both single and double finger tap and also select "Two-finger scrolling". Done.

### Keyboard's Extra Buttons

Type in the following into your terminal:

`sudo add-apt-repository ppa:mactel-support/ppa`

`sudo apt-get install applesmc-dkms hid-dkms`

Now at the time of writing, this command gave an error message: 

`gpg: requesting key 2B97B7B8 from hkp server keyserver.ubuntu.com gpg: keyserver timed out gpg: keyserver receive failed: keyserver error`

Once fixed we should just need to type the following commands - Taken from ([https://help.ubuntu.com/community/MacBook5-1/Karmic)](https://help.ubuntu.com/community/MacBook5-1/Karmic)

`sudo apt-get install applesmc-dkms hid-dkms`

### Dual Screens

I have tried dual screens with a DVI Monitor and it didn't like being plugged in while the computer is turned on but unplugging and then re-plugging seemed to fix it and I could set it all up in System->Preferences->Display. I'm fairly confident that it'll be the same for VGA outputs. 

Then this should be all you need to be up and running with the best Ubuntu yet!

![Necropotame Koala](/images/blog/2009/10/necropotame_koala.png "500")


