---
title: "Working on Android Ubuntu One"
excerpt: "Some notes from working on the Ubuntu One Android App"
mainImage: "/images/blog/2014/06/16/4429941637-a487835188-o.jpg"
primaryColor: "#7c345c"
date: "2011-03-23T21:40:19-07:00"
updatedOn: "2011-03-23T21:40:19-07:00"
slug: "working-on-android-ubuntu-one"
---

# Working on Android Ubuntu One 

Note to self: 

Pull using bazaar, the command is 

`bzr branch lp:ubuntuone-android-files` 

Karni: 'you hack, you do': 

`bzr commit -m "what have you done"` 

`bzr push lp:~gauntface/ubuntuone-android-files/the-branch-name-you-like` 

if you add new files (such as drawables, resources, etc), you need to do (before you do bzr commit): 

`bzr add` 

Also, right after you bzr branch, you have to run the setup bash script, which downloads the necessary libs. If not, you'll have to setup ssh key with launchpad, and tell bzr who you are with: 

`bzr whoami <fill here>` 

Ubuntu One Features List: [https://wiki.ubuntu.com/mkarnicki/u1f](https://wiki.ubuntu.com/mkarnicki/u1f)

Orig Photo: [https://flic.kr/p/7KsBj6](https://flic.kr/p/7KsBj6)