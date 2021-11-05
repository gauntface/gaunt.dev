---
title: "Cordova + Web Best Practices v2.0"
excerpt: |
  If you're using Cordova, there is no reason to not take advantage of build tools like grunt and fewer bytes to load will still cut down load times inside your apps.

  In this article we'll look at how you can hook up grunt into the Cordova build process, meaning you have one command to build your web project, copy that over into Cordova and build the project onto your device.
mainImage: "/images/blog/2014/05/24/yeoman-cordova-copy.jpg"
primaryColor: "#d9615f"
date: "2014-02-05T21:55:42-08:00"
updatedOn: "2014-02-05T21:55:42-08:00"
slug: "cordova-web-best-practices-v2-0"
---

# Cordova + Web Best Practices v2.0

![Cordova + Yeoman](/images/blog/2013/07/Cordova-and-Yeoman.png)

My oh my doesn't time fly, a little while a go I [wrote a blog post](http://blog.gauntface.co.uk/2013/07/18/cordova-web-best-practices/) on how to get [Cordova](http://cordova.apache.org/) and [Yeoman](http://yeoman.io/) to work together bringing the best practices of the web to Cordova based applications.

Well times have changed, we've all grown a little older, a little wiser and projects have progressed, with that in mind here is the new way to get yourself set up with Cordova and Yeoman.

## Install Yeoman

If you haven't used Yeoman before, then head on over to [yeoman.io](http://yeoman.io/) and step through the "Getting Started" guide, which will get you set up with Yeoman as well as the webapp generator (a.k.a. generator-webapp).

Ultimately you just need to run the following:

```bash
npm install yo -g
```

## Cordova Set-Up & Install

Cordova set-up is nice and simple.

Start by installing the [cordova-cli](https://github.com/apache/cordova-cli):

```bash
npm install -g cordova
```

Create a brand spanking new project with the command:

```bash
cordova create <Project Directory> <Package Name> <Project Name>
```

Example:

```bash
cordova create my-project co.uk.gauntface.myproject.cordova "My Project"
```

![Cordova File Structure](/images/blog/2014/02/cordova-file-structure.png)

Then add your platforms of choice (in this case Android).

```bash
cd my-project
cordova platform add android
```

You'll now have a Cordova project ready to go, congrats :)

If you want, you can run an emulator with the following command:

```bash
cordova emulate android
```

Or run on an Android device with:

```bash
cordova run android
```

![Cordova App on a Nexus 5](/images/blog/2014/02/Cordova-App-Launch1.png "600")

## Set-Up Yeoman

This part of the guide will use Yeoman's default generator ([webapp generator](https://github.com/yeoman/generator-webapp)), however the changes needed to get everything to play nicely, should apply to other [generators](http://yeoman.io/generators.html) as well (we only tweak the gruntfile.js).

To keep a clean directory structure within the Cordova project, we'll want to add a directory at the root of the project for Yeoman.

```bash
mkdir yeoman
```

So we now have _**hooks**_, _**merges**_, _**platforms**_, _**plugins**_, _**www**_ & _**yeoman**_ directories in our project.

Next, lets run through our yeoman generator as normal

```bash
cd yeoman
yo webapp
```

![Yeoman WebApp Terminal](/images/blog/2014/02/Yeoman-Terminal-Crop.png)

Go through all the Yeoman prompts.

The next step is to get Yeoman building when we need it to and then copy the contents to the _**www**_ directory.

To do this we can take advantage of the Cordova CLI _hooks, so create a directory named _**before_prepare**_ in the hooks directory.

```bash
cd ../hooks/
mkdir before_prepare
```

Then create a file in _**before_prepare**_ with an appropriate filename like _**yeoman_build_copy_script.sh**_.

Add in the following shell script.

```bash
#!/bin/bash

echo "Building Grunt Project.";
cd ./yeoman/;
grunt build;

cd ../;

echo "Deleting files in ./www";
rm -rf ./www/*;

echo "Copying files from ./yeoman/dist to ./www";
cp -r ./yeoman/dist/* ./www/;
```

Next we need to make sure that the script is executable.

```bash
chmod +x ./hooks/before_prepare/yeoman_build_copy_script.sh
```

Then check it runs and doesn't throw any errors:

```bash
./hooks/before_prepare/yeoman_build_copy_script.sh
```

Now whenever you try to run your project on an Android device, this script will be run, ensuring you have the newest version of your app built.

```bash
cordova run android
```

![Yeoman and Cordova on Nexus 5](/images/blog/2014/02/Yeoman-and-Cordova.png "600")

Cordova's tools will actually add _cordova.js_ to the projects root directory, so when you want to use some of Cordova's features, you just need to reference _cordova.js_ in your html page.

## Fin.

With these hooks, you can have a pretty nice workflow, however it could be further improved if you could easily switch between running a local server with live reload vs a static build of the web app.

_P.S. This will also work for Chrome Mobile Apps too <https://github.com/MobileChromeApps/mobile-chrome-apps>_

![Yeoman Loves Cordova](/images/blog/2013/07/Yeoman-Heart-Cordova.png)

Orig. Photo: [https://dribbble.com/shots/1524414-Free-Polygonal-Low-Poly-Background-Texture-18?list=tags&tag=freebie&offset=3](https://dribbble.com/shots/1524414-Free-Polygonal-Low-Poly-Background-Texture-18?list=tags&tag=freebie&offset=3)