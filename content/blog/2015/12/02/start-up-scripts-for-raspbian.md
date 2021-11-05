---
title: "Start Up Scripts for Raspbian"
excerpt: "Raspbian had a update basing itself on Debian Jessie and one change that came with this is a change in the tool used for start up dependencies, this is how I'm now auto-starting a web server on a pi."
mainImage: "/images/blog/2015/2015-12-02/pi-crates.jpg"
primaryColor: "#980c23"
date: "2015-12-02T15:23:40-08:00"
updatedOn: "2015-12-02T15:23:40-08:00"
slug: "start-up-scripts-for-raspbian"
---

# Start Up Scripts for Raspbian

On older versions of Raspbian I was using [LSBInitScripts](https://wiki.debian.org/LSBInitScripts) to start a web server when my Raspberry Pi booted up.

In Debian Jessie, the use of init scripts changed to [systemd](https://wiki.debian.org/systemd), so this post covers how to get a script starting on boot.

# Systemd

In Debian Jessie, [systemd](https://wiki.debian.org/systemd) is the new boss in town and [this doc from coreos](https://coreos.com/docs/launching-containers/launching/getting-started-with-systemd/) was probably the most helpful starting off point I found.

Systemd has a specific syntax, so it's probably easiest just to give you an example systemd config file:

```
[Unit]
Description=Example Script
Before=systemd-user-sessions.service

[Service]
TimeoutStartSec=0

ExecStart=/<Full Path>/onstart.sh
Type=oneshot
RemainAfterExit=yes
User=pi

ExecStop=/<Full Path>/onstop.sh
User=pi

[Install]
WantedBy=multi-user.target
```

Let's break this down by section.

## [Unit]

The unit section allows you to define dependencies of when your service should be started (i.e. you could start your service after networking but before login).

In this example I'm saying that my service must run some time *before* the user can sign in.

```
Before=systemd-user-sessions.service
```

## [Service]

Here is where you define the command(s) you want to run. This is the section you'll be performing your work, so let's look at each parameter defined above.

### [Service] ExecStart | ExecStop

`ExecStart` and `ExecStop` can be used to run shell scripts that do your main work. In actual projects I've also defined `ExecStartPre` and `ExecStopPost` to alter IPTables, although this could be defined in your shell scripts if you preferred.

```
ExecStartPre=/sbin/iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3123
User=root

ExecStartPre=/sbin/iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3123
User=root

ExecStopPost=/sbin/iptables -t nat -D PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3123
User=root

ExecStopPost=/sbin/iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 80 -j REDIRECT --to-port 3123
User=root
```

The main thing to notice here is that **all** the executables have full paths. This is a tad annoying but forces you to be specific about what you expect to run.

If you aren't sure where a command lives, run:

```
whereis <Name of Command>
```

That's how I found out where `iptables` lives - /sbin/iptables.

### [Service] Type

The `Type=oneshot` is a little bit weird to me, but essentially I had to include this so that the systemctl (the tool that actually runs all the systemd services) would start and fully complete my ExecStart scripts. `oneshot` basically blocks systemctl from starting another secvice until your service is finished starting. I'm hoping to look into this a little later to see how to start off my service asynchronously rather than block.

### [Service] RemainAfterExit

This one is easy. If your service creates a secondary process and finishes its own execution, `systemctl` will end your service which kills the secondary process you created (at least that's what happened from what I could tell). Add `RemainAfterExit=yes` to make `systemctl` treat your service as thought it is still running, even if the main process has ended.

## [Install]

Not a clue to be honest. `systemctl` got upset when I didn't include an install section, but docs seem to suggest it's optional.

# Naming, Enabling and Testing

I saved the above in a file in my home directory and gave it a filename that ended with `.service` (`example.service`). It seemed to be convention.

To then enable / add your service to `systemd` run:

```bash
sudo systemctl enable /<Path to Service>/example.service
```

You can then test whether your service by running:

```bash
sudo systemctl start example.service
```

This will run the `ExecStart` commands.

If you hit any problems or errors, check out (this command is normally printed to the console if there is an error):

```bash
sudo systemctl status example.service -l
```

Happy Hackin'