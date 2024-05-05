---
title: "Web serial issues on Google Chrome"
description: "After trying to use web serial for a few projects and running into unhelpful issues, I finally figured out the problem."
mainImage: "/images/blog/2022/2022-08-14/jess-bailey-yiO4DpkyoDM-unsplash.jpg"
mainImageAlt: Image of a red USB-A port
date: "2022-08-14T13:00:00-07:00"
updatedOn: "2024-05-05T15:43:00-07:00"
---

# Web serial issues on Google Chrome

*DISCLAIMER:* I'm currently using Fedora, other distro's may not
have the same issue or may need a different approach to fix an
issue with web serial, so
**please read the steps rather than blindly copy commamds** as
you may have a different issue.

I spent some time trying to get
[Web Serial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) working and for whatever reason I was running into issues and the errors thrown in Javascript weren't helping
to diagnose the problem.

Looking at `about://device-log` the best clue was the following error:

```text
Failed to open serial port: FILE_ERROR_ACCESS_DENIED
```

This points to a permission issue preventing Chrome from using
the device.

To solve that, we first need to figure out who has permission
to the device we are trying to access and possibly grant access
if necessary.

## Checking the group

If we wanted to use `/dev/ttyUSB0` with web serial,
we could figure out which group has access by running:

```shell
$ ls -l /dev/ttyUSB0

crw-rw----. 1 root dialout 188, 0 Aug 14 13:18 /dev/ttyUSB0
```

This tells us that `root` is the owner and `dialout` is the group, both of which have `rw` (read/write) permissions.

To fix the permission issue, we need to give the current user access by adding them
to the group from the previous command, in this case `dialout`:

```shell
sudo usermod -a -G dialout $USER
```

Now that the user is part of the group, restart the machine to apply
the permissions and you should be good to go.

## No group? Assign one

I've run into situations where the device had no group:

```shell
$ ls -l /dev/hidraw2

crw-rw----. 1 root root 241, 8 May  5 15:24 /dev/hidraw2
```

In this case, we need to add a udev rule to add this device to a group with `rw` (read/write) permissions.

To add a udev rule, we need to know the vendor and product ID for the device, so run `lsusb` and identify
the device you are trying to access:

```shell
$ lsusb

...
Bus 001 Device 016: ID 3434:06a0 Keychron Keychron Q10 Pro
...
```

The structure of this information is:

```text
Bus 001 Device 016: ID <Vendor ID>:<Product ID> <Product name>
```

So in this example, the vendor ID is `3434` and the product ID is `06a0`.

From this we can make a udev rule by creating a file `.rules` in `/etc/udev/rules.d/`.
For this post lets use `99-web-usb.rules` as the name, but using the pattern `99-*.rules`
for the file should be good.

Inside this file we'll want to add:

```text
SUBSYSTEM=="<Subsystem>", ATTRS{idVendor}=="<Vendor ID>", ATTRS{idProduct}=="<Product ID>", MODE="0660", GROUP="<Group Name>"
```

In the example above, we'd have the following rule:

```text
SUBSYSTEM=="hidraw", ATTRS{idVendor}=="3434", ATTRS{idProduct}=="06a0", MODE="0660", GROUP="plugdev"
```

**NOTE**: The subsystem in this example if "hidraw" because of the device in this example and you
can tell it's hidraw by the device name `/dev/hidraw2`. If the device was `/dev/ttyUSB0` than the
subsystem should be `SUBSYSTEM=="usb"`.

Once you'd made your udev rules file, you can apply them with `sudo udevadm control --reload-rules && sudo udevadm trigger`,
then run the `ls -l /dev/hidraw2` command again and you should see the group:

```shell
$ ls -l /dev/hidraw8

crw-rw----. 1 root plugdev 241, 8 May  5 15:37 /dev/hidraw2
```

Now you should have access (assuming you are a member of the group, if not, go to the first section of this post).

*H/T to the Hak5 Discord group for their help*.
