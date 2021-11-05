---
title: "Arch Linux - Apache Sites"
excerpt: |
  Each distro seems to have slight variations on setting up a web development environment.

  Here's the notes from setting up Apache for Arch Linux.
mainImage: "/images/blog/2014/06/16/8916518089-2f93c695f7-o-copy.jpg"
primaryColor: "#0d232d"
date: "2011-07-07T20:35:33-07:00"
updatedOn: "2011-07-07T20:35:33-07:00"
slug: "arch-linux-apache-sites"
---

# Arch Linux - Apache Sites

I followed a number of steps in the arch linux LAMP guide and this is now the process for me to set up new sites:

```bash
sudo gedit /etc/httpd/conf/extra/httpd-vhosts.conf
```

Add this to the end of the file:

```xml
<VirtualHost *:80>
  ServerAdmin webmaster@localhost

  DocumentRoot "/home/matt/Sites/GauntFace/Local"
  ServerName gauntface.local.co.uk

  <Directory /home/matt/Sites/GauntFace/Local/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    allow from all
  </Directory>
</VirtualHost>
```

Then add the servername to the hosts file:

```bash
sudo gedit /etc/hosts
```

And add:

```
127.0.0.1 gauntface.local.co.uk
```

Finally restart the server and all should be well in the world:

```bash
sudo /etc/rc.d/httpd restart
```

Orig Photo: [https://flic.kr/p/ezVubv](https://flic.kr/p/ezVubv)