---
title: "Web serial issues on Google Chrome"
description: "After trying to use web serial for a few projects and running into unhelpful issues, I finally figured out the problem."
mainImage: "/images/blog/2022/2022-08-14/jess-bailey-yiO4DpkyoDM-unsplash.jpg"
mainImageAlt: Image of a red USB-A port
date: "2022-08-14T13:00:00-07:00"
updatedOn: "2022-08-14T13:00:00-07:00"
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

```
Failed to open serial port: FILE_ERROR_ACCESS_DENIED
```

This points to a permission issue preventing Chrome from using
the device.

To solve that, we first need to figure out who has permission
to the device we are trying to access.

For example, if we wanted to use `/dev/ttyUSB0` with web serial,
we could run:

```shell
$ ls -l /dev/ttyUSB0 
crw-rw----. 1 root dialout 188, 0 Aug 14 13:18 /dev/ttyUSB0
```

This tells us that `root` is the owner and `dialout` is the group, both of which have `rw` (read/write) permissions.

To give the current user access, we need to add the user to the group, in this case `dialout`:

```shell
sudo usermod -a -G dialout $USER
```

Now that the user is part of the group, restart the machine to apply
the permissions and you should be good to go.

*H/T to the Hak5 Discord group for their help*.