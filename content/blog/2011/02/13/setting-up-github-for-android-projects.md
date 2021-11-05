---
title: "Setting Up GitHub for Android Projects"
excerpt: "What should be put into *.gitignore* as well as some other notes on using git."
mainImage: "/images/blog/2014/06/16/heisencat.jpg"
primaryColor: "#bb7867"
date: "2011-02-13T13:51:58-08:00"
updatedOn: "2011-02-13T13:51:58-08:00"
slug: "setting-up-github-for-android-projects"
---

# Setting Up GitHub for Android Projects 

This is only a little reminder for myself when I'm setting up Android Projects on GitHub. 

Firstly create the repo on GitHub which is nice and easy to do 

Secondly create the Android Project Eclipse so you have something to commit 

Then in a terminal navigate to the project directory and run 'git init' 

Next step we need to setup the gitignore file so run 'sudo gedit .gitignore' and add the two following lines 'bin/' and 'gen/' 

To make this apply to git, run the command 'git add .' this will add the gitignore file and any files not included in the gitignore file. 

Finally run git commit with a message, add the remote address and push it to git hub *As per github's instructions*.

Orig Photo: [https://octodex.github.com/heisencat/](https://octodex.github.com/heisencat/)

