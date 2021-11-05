---
title: "Raspberry Pi <3 Node"
excerpt: "I love Node for it's hackability. While I'm not entirely sure it will work with the electronics on a Pi, it's a safe bet for a quick and dirty web server."
mainImage: "/images/blog/2014/08/28/7223008454-955fbf0274-k.jpg"
primaryColor: "#4e85d9"
date: "2014-08-28T23:15:05-07:00"
updatedOn: "2014-08-28T23:15:05-07:00"
slug: "raspberry-pi-3-node"
---

# Raspberry Pi <3 Node

I remember trying to get Node to run on the Pi when I first got one and it really wasn't a fun journey, things seem to have changed (or my Google-foo has gotten better) and it's dead simple.

# Install Node and NPM

Best guide was from [Adafruit](https://learn.adafruit.com/raspberry-pi-hosting-node-red/setting-up-node-dot-js). These deb's are actually more up to date than the Pi builds available of the official NodeJS site.

For the basic guide:

```bash
sudo apt-get update
sudo apt-get upgrade

sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb

sudo dpkg -i node_latest_armhf.deb

node -v
```

# Setup hostname for Pi

Once you have NodeJS installed (with NPM which installs with it), the obvious next thing is to build a server. I already had something super basic up and running and I wanted to access it locally on my network.

On the Pi itself I could access my Node site with http://localhost:3000/. I could even access this on computers on the local network by using the Raspberry Pi's IP address (For example http://192.168.0.xxx:3000).

What would be better is if I could have a URL like: http://myrpi/ and everything just started to work.

This is where the lovely gentleman that is <a href="http://petelepage.com/">Pete LePage</a> helped me by telling me to install the avahi-daemon and then pointed out that I can access my sites with whatever is in the /etc/hosts file followed by *.local*.

Let's step through this and get it running.

1.  First install the daemon, which basically broadcasts the host on the local network.

    ```bash
    sudo apt-get install avahi-daemon
    ```

2. Set a name in the /etc/hosts file, lets say myrpi.

    1.  First open up the file to edit

        ```bash
        sudo nano /etc/hosts
        ```

    2.  At the bottom of our */etc/hosts/* file add the following.

        ```bash
        127.0.1.1        myrpi
        ```

    This is simply an IP address that can be used to define the hostname for the machine.

    3. Press *Ctrl+x* and then press *y* to save the file and exit nano.

3. Ensure your Node server is running something, and if so, try out your URL in a browser by typing *http://myrpi.local:3000/*. If anything goes wrong, try rebooting your Pi.

One side note of this. In my router I can define a hostname for each attached device, if I set the hostname to 'myrpi' I don't actually need to type in the *.local* part of the URL, in fact *http://myrpi:3000* is all that is needed.

# No Port Number & Start on Boot

The next thing I wanted to do was have the Node server start up whenever I started up the Raspberry Pi. I did this by adding a script to */etc/init.d/* which basically starts the Node server using [forever](https://github.com/nodejitsu/forever).

For those new to *forever* it's basically an node app which given a seperate Node script to run, it will start the script and run it forever, restarting it if it ever crashes.

To do this, the steps are as follows.

## Install forever globally.

Install forever globally so that scripts can access it anywhere on the pi, you do this with the -g command.

```bash
sudo npm install -g forever
```

## Create Your Startup Script

I ended up using something similar to the script below, I try and explain each part afterwards.

```
### BEGIN INIT INFO
# Provides:              <name-of-script>
# Required-Start:    $remote_fs $named $syslog
# Required-Stop:     $remote_fs $named $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: <Short Description>
# Description:       <Longer Description>
### END INIT INFO

#!/bin/bash

PATH=$PATH:/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
NODESCRIPT=<Path to Script>

case "$1" in
  start)
    # The -A indicates, adding of this rule
    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    sudo -u pi forever start $NODESCRIPT/cli.js
    ;;
  stop)
    sudo -u pi forever stop $NODESCRIPT/cli.js
    # The -D indicates, deleting of this rule
    sudo iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    ;;
  *)

  echo "Usage: /etc/init.d/<name-of-script> {start|stop}"
  exit 1
  ;;
esac
exit 0
```

### The LSB Section

The *BEGIN INIT INFO* to *END INIT INFO* is essentially a specific format for init scripts which Debian looks for. I think it's used for dependency management.

You can find out more info [on LSB Init Scripts on this page](https://wiki.debian.org/LSBInitScripts) if you're curious.

```
### BEGIN INIT INFO
# Provides:              <name-of-script>
# Required-Start:    $remote_fs $named $syslog
# Required-Stop:     $remote_fs $named $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: <Short Description>
# Description:       <Longer Description>
### END INIT INFO
```

### Bash and Variables

The second section declares the script as a bash script and appends some directories to the *$PATH * the script executes in and I also define the path of the Node script I want to run as *$NODESCRIPT*.

```bash
#!/bin/bash

PATH=$PATH:/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
NODESCRIPT=<Path to Script>
```

### Script Start

The script is designed to run with the command *sudo /etc/init.d/my-script start* or *sudo /etc/init.d/my-script stop*. In the next bit of the script we take the first variable from the command line, in this case it will be the *start* or *stop* text and if it's start we add two rules to the *iptables* and then start our Node script with *sudo forever start $NODESCRIPT/cli.js*.

There are a few things to step through for start.

1. The *iptables* commands are the thing which makes requests on port 80, redirect to port 3000. What this means is when I type *http://myrpi.local/* the request will arrive at the Pi on port 80, this rule then redirect from port 80 to port 3000. The reason we have two is because we need to do it for both ethernet and wifi connections. You might be able to cut this down into one.

    If your router supports it, you can forward port 80 to port 3000 and avoid having to do any of this.

2. I've run the forever script with *sudo -u pi*. The reason I've done this, is otherwise forever starts the scripts under some unknown user, meaning I can't then stop the forever task reliably. If I use *sudo -u pi*, I can always run the stop command under pi, which has access to the forever task and can hence, stop it.

```
case "$1" in
  start)
    # The -A indicates, adding of this rule
    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    sudo -u pi forever start $NODESCRIPT/cli.js
    ;;
```

### The Final Step to Stop the Server

To stop the server, we do the reverse of the above. We stop the forever task and remove the iptable entries.

```
stop)
  sudo -u pi forever stop $NODESCRIPT/cli.js
  # The -D indicates, deleting of this rule
  sudo iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
  sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3000
  ;;
*)
```

The final bit of the script (shown below), simply prints out a message if you don't add a start or stop to the end of the command.

```
echo "Usage: /etc/init.d/<name-of-script> {start|stop}"
exit 1
```
## Moment of Truth

Check everything runs from the command line, no startup yet.

Save your script to */etc/init.d/<startup-scrtipt-name>.sh* and make sure it's executable.

```bash
sudo chmod u+x /etc/init.d/<startup-scrtipt-name>.sh
```

Then try to start the server with the script.

```bash
sudo /etc/init.d/<startup-scrtipt-name>.sh start
```

If everything works as expect, test stopping the server.

```bash
sudo /etc/init.d/<startup-scrtipt-name>.sh stop
```

Everything will hopefully stop as you'd expect and now you can *sudo reboot* and shortly after booting, you'll see your server start working.

# Setup for DynDNS Usage

After I got through all this, I really wanted to setup Dynamic DNS, originally I thought I wasn't bothered.

I went with [noip.com](http://www.noip.com/), you just need to set up a host and then configure some way of updating them with
Port Forwarding: https://www.namecheap.com/support/knowledgebase/article.aspx/9356/11/how-to-configure-a-ddwrt-router

Orig. Image: [https://flic.kr/p/c1gNLw](https://flic.kr/p/c1gNLw)