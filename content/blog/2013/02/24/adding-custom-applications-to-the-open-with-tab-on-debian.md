---
title: "Adding Custom Applications to the \"Open With” Tab on Debian"
excerpt: |
  I wanted to get Sublime to show up in my menu of applications in Debian.

  Find out how I did it and use it for any of your own apps.
mainImage: "/images/blog/2014/05/24/debian.jpg"
primaryColor: "#e98989"
date: "2013-02-24T20:21:00-08:00"
updatedOn: "2013-02-24T20:21:00-08:00"
slug: "adding-custom-applications-to-the-open-with-tab-on-debian"
---

# Adding Custom Applications to the “Open With” Tab on Debian

![Sublime as Default Editor](/images/blog/2013/02/Screenshot-from-2013-02-24-201716.png "380")

I'm a big fan of Sublime text editor, but since it doesn't have an installer for Linux, I can't set it as the default application for certain files.

I finally did some digging and found the solution.

  1.  Open the Main Menu application (if it's not available you'll need to download it):

      ```bash
      sudo apt-get install alacarte
      ```
  2. In Main Menu, set up Sublime as a normal application, but in the _Command_ field, add ' _%U'_ to the end

      ```bash
      sublime %U
      ```

Orig. Photo: <http://graphicburger.com/5-wrinkled-poster-backgrounds/>