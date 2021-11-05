---
title: "Karmic Koala Web Development Set-Up Guide"
excerpt: "I guide on setting up Ubuntu Karmic Koala for Web Development"
mainImage: "/images/blog/2014/06/30/3836656228-08d7f9b837-o.jpg"
primaryColor: "#0c0704"
date: "2009-10-15T20:18:30-07:00"
updatedOn: "2009-10-15T20:18:30-07:00"
slug: "karmic-koala-web-development-set-up-guide"
---

# Karmic Koala Web Development Set-Up Guide

I do a fair bit of web development personal projects. Each time I upgrade my Ubuntu Distro I like to do a clean installation rather than upgrade which means settings up apache on my machine, but each time I forget about how I created my set-up. This is where I'm going to dump my knowledge of doing things, mostly for me, but some of you lovely people might find it a bit useful :-)

## Installing LAMP

Simple run this command:

```bash
sudo tasksel install lamp-server
```

It'll ask for a MySQL password which you can enter and it'll sort out the rest for you (Check http://localhost/ in your browser to confirm)

## Set-Up New Site

```bash
sudo cp /etc/apache2/sites-available/default /etc/apache2/sites-available/gauntface
```

Where you can replace gauntface with any site name you want

```bash
sudo gedit /etc/apache2/sites-available/gauntface
```

This will then open up the config file for your new site, delete what is in it and replace with the following:

```xml
<VirtualHost *:80>
  ServerAdmin webmaster@localhost
  DocumentRoot /home/matt/Sites/GauntFace/Local/
  ServerName gauntface.localhost
  <Directory /home/matt/Sites/GauntFace/Local/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride None
    Order allow,deny
    allow from all
  </Directory>
</VirtualHost>
```

But replace the file directory and site name with your appropriate file. Now is probably the best time to go add your files, but also right click on it, select properties and make sure the permissions are set so everyone can have read write access to the files.

## Set Up Sub Domain

```bash
sudo gedit /etc/hosts
```

Then add in your new server name like:

```
127.0.0.1    gauntface.localhost
```

To make these changes take effect, just use the following command:

```bash
sudo /etc/init.d/networking restart
```

## Enable the Site

```bash
sudo a2ensite gauntface

sudo /etc/init.d/apache2
```

I tend to ignore any and all messages from the second command as the site tends to work anyway.

NOTE: To make these changes take effect try the command:

```bash
sudo /etc/init.d/apache2 restart
```

## MySQL Adding Databases

Load MySQL using:

```bash
mysql -u root -p
```

Then enter your password in that you entered when you installed your LAMP setup.

Then create a database with:

```
mysql> CREATE DATABASE dbName;
```

## MySQL Adding Users

```
mysql> CREATE USER '<Username>'@'localhost' IDENTIFIED BY '<Password>';

mysql> GRANT ALL PRIVILEGES ON *.* TO '<Username>'@'localhost';
```