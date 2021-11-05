---
title: "Web Development on Maverick Meerkat"
excerpt: "Getting Ubuntu Maverick Meerkat set up for Web Development with an Apache Server."
mainImage: "/images/blog/2014/06/16/4595771286-33fe96a4db-o.jpg"
primaryColor: "#848474"
date: "2010-11-07T19:13:42-08:00"
updatedOn: "2010-11-07T19:13:42-08:00"
slug: "web-development-on-maverick-meerkat"
---

# Web Development on Maverick Meerkat

A new Ubuntu, a new update to my web development environment how-to, so lets get down to business.

I do a fair bit of web development for free lance work, project work and personal sites. Each time I upgrade my Ubuntu Distro I like to do a clean installation rather than upgrade which means settings up apache on my machine, but each time I forget about how I created my set-up. This is where I'm going to dump my knowledge of doing things, mostly for me, but some of you lovely people might find it a bit useful :-)

## Installing LAMP

Simply run these commands:

```bash
sudo apt-get install tasksel
```

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
    AllowOverride All
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

To make these changes take effect, just use the following command

```bash
sudo /etc/init.d/networking restart
```

## Enable the Site

```bash
sudo a2ensite gauntface
```

```bash
sudo /etc/init.d/apache2
```

To make these changes take effect run the command 'sudo /etc/init.d/apache2 restart'

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

## Setting Up PHP Error Messages

The default php error message setting, which now treats your install as a production install rather than a development install – Good for some, bad for others so here’s the simple fix.

Open a terminal and type in the command:

```bash
sudo gedit /etc/php5/apache2/php.ini
```

*Find the file with command: find / -name php.ini

In this file have a little hunt around for ‘display_errors’: Then change:

```
display_errors = Off
```

to

```
display_errors = On
```

Save and close gedit. Done.

Note: Big thanks to [@NPerry](http://www.twitter.com/NPerry) for his comment on AllowOverride All (Makes more sense than None)

Orig Photo: [https://flic.kr/p/817wFY](https://flic.kr/p/817wFY)