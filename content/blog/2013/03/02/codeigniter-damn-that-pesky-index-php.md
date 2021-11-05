---
title: "CodeIgniter - Damn that pesky index.php"
excerpt: "Quick notes on how to remove the CodeIgniter index.php from the urls when hosted on an Apache server."
mainImage: "/images/blog/2014/05/24/codeigniter.jpg"
primaryColor: "null"
date: "2013-03-02T19:35:36-08:00"
updatedOn: "2013-03-02T19:35:36-08:00"
slug: "codeigniter-damn-that-pesky-index-php"
---

# CodeIgniter - Damn that pesky index.php

This is largely for self reference, but is useful if you are just starting to look at CodeIgniter.

Firstly, everything has an index.php in front of the URL parameters. For example, I might want to have www.gauntface.co.uk/apps/ which would show all the apps I've worked on. Unfortunately this needs to be www.gauntface.co.uk/index.php. To remove that annoying blighter, we start our journey at the codeigniter docs <http://ellislab.com/codeigniter/user-guide/general/urls.html>.

The .htaccess file holds all the power (of course it does). However things to note.

  1.  If you want images, css, js etc to be ignored by this rewrite rule, trust me you will, then ensure you add the correct path to the second line. Mine currently looks like this:

      ```
      RewriteCond $1 !^(index.php|images|css|js|robots.txt)
      ```
  2.  You need to have the Rewrite module enabled. This can be easily achieved via the commands

      ```bash
      sudo a2enmod rewrite' && 'sudo /etc/init.d/apache2 restart
      ```

Orig. Photo: <http://graphicburger.com/seamless-polygon-backgrounds-vol2/>