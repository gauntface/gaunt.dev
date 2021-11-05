---
title: "Lucid Lynx Web Development"
excerpt: "In Lucid Lynx the Apache / PHP version has changed so need to enable display_errors to display PHP errors in the browser."
mainImage: "/images/blog/2014/06/22/4628277592-ddd81f9a4b-o.jpg"
primaryColor: "#d264a9"
date: "2010-07-07T18:58:04-07:00"
updatedOn: "2010-07-07T18:58:04-07:00"
slug: "lucid-lynx-web-development"
---

# Lucid Lynx Web Development 

I've been upgrading ALOT of my computers and virtualised machines to Ubuntu Lucid Lynx and the web development for them is pretty much the same.

The only difference is the default php error message setting, which know treats your install as a production install rather than a development install - Good for some, bad for others so here's the simple fix.

Open a terminal and type in the command:

`sudo gedit /etc/php5/apache2/php.ini`

*Find the file with command: find / -name php.ini

In this file have a little hunt around for 'display_errors':

Then change: 

*display_errors = Off*

to

*display_errors = On*

Save and close gedit. Done.

Orig. Photo: [https://flic.kr/p/83Z8Fw](https://flic.kr/p/83Z8Fw)