---
title: "Building Mobile Cordova Apps with Web Starter Kit"
excerpt: "Web Starter Kit is an opinionated set of tools to help developers get started with development as quickly as possible. This post will cover how you can integrate Web Starter Kit with Cordova apps."
mainImage: "/images/blog/2014/07/16/web-starter-kit-keyart.jpg"
primaryColor: "#659bf3"
date: "2014-07-16T15:38:06-07:00"
updatedOn: "2014-07-16T15:38:06-07:00"
slug: "building-mobile-cordova-apps-with-web-starter-kit"
---

# Building Mobile Cordova Apps with Web Starter Kit

If you have no idea what [Web Starter Kit](https://developers.google.com/web/starter-kit/) is, the simple overview is that it's a set of opinionated tools that can help you get up and running with web development best practices for a new project. Including a build process, browser sync, live reloading and all sorts of other goodies.

I won't cover all the features of Web Starter Kit here, but check out the [Web Starter Kit site](https://developers.google.com/web/starter-kit/) for more info.

# Cordova Set-Up & Install

Cordova set-up is nice and simple.

Start by installing the [cordova-cli](https://github.com/apache/cordova-cli):

```bash
npm install -g cordova
```

Create a brand spanking new project with the command:

```bash
cordova create <Project Directory Name> <Package Name> <Project Name>
```

Example:

```bash
cordova create my-project com.gauntface.myproject.cordova "My Project"
```

Then add your platforms of choice (in this case Android).

```bash
cd my-project
cordova platform add android
```

Our project directory will now look like this.

![Directory Structure of a New Cordova Project](/images/blog/2014/07/16/directory-structure-for-new-cordova-project.jpg "800")

Your Cordova project is ready to go, congrats :)

If you want, you can run an emulator with the following command:

```bash
cordova emulate android
```

Or run on a real device with:

```bash
cordova run android
```

![Cordova App on a Nexus 5](/images/blog/2014/07/16/cordova-app-runnning-on-android.png "800")

# Grab Web Starter Kit

To add Web Starter Kit (WSK) into our Cordova app, we need to grab a version of it.

You can grab a copy of Web Starter Kit from here: [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/).

This will give you a download button to get a zip of all the files you need.

Extract the zip and copy the resulting folder into the root of your Cordova Project.

![Cordova Project Structure with Web Start Kit](/images/blog/2014/07/16/cordova-project-directory-structure-with-web-starter-kit.jpg "800")

Obviously you can leave the filename as is, but I'm going to rename it to plain old *web-starter-kit*.

We now have _**hooks**_, _**platforms**_, _**plugins**_, _**www**_ & _**web-starter-kit**_ directories in our project.

# Building Web Starter Kit

There are a few commands you need to run before Web Starter Kit is good to go.

First install the dependencies from NPM.

```bash
cd web-starter-kit
npm install
```

You can check everything is working by starting up the server for Web Starter Kit.

```bash
gulp serve
```

# Let's Make Cordova and Web Starter Kit Play Nice

The flow we want here is:

- We run the cordova command to build the Cordova app and run it on an emulator or Android device
- The Cordova project builds the Web Starter Kit project before doing this, which will build a version of the site into the _dist_ directory
- We then copy the contents of the _dist_ directory into _www_.

This can all be achieved with the magic of Cordvoa Hooks - Oh yes my friends.

## Cordova Hooks

Create a directory named _**before_prepare**_ in the hooks directory. This is a directory Cordova knows to check for script files and run them before packaging up the native apps.

```bash
cd ../hooks/
mkdir before_prepare
```

Next up, create a file in the **`before_prepare`** directory named **`wsk_build_copy_script.sh`** and add the following to the file.

```bash
#!/bin/bash

echo "Building Web Starter Kit Project.";
cd ./web-starter-kit/;
gulp;

cd ../;

echo "Deleting files in ./www";
rm -rf ./www/*;

echo "Copying files from ./web-starter-kit/dist to ./www";
cp -r ./web-starter-kit/dist/* ./www/;
```

Next we need to make sure that the script is executable.

```bash
chmod +x ./before_prepare/wsk_build_copy_script.sh
```

Then check it runs and doesn't throw any errors:

```bash
./before_prepare/wsk_build_copy_script.sh
```

From now on, whenever you run your project on a device or emulator, this script will execute, ensuring you have the newest version of your app built.

One last thing to check so we know we're all good.

```bash
cordova run android
```

![Web Starter Kit on Nexus 5 via a Cordova App](/images/blog/2014/07/16/web-starter-kit-running-on-android-with-cordova.png "800")

# Cordova.js

Cordova's tools will actually add _cordova.js_ to the projects www directory when building the app, so when you want to use any of Cordova's features, you just need to reference the _cordova.js_ script in the head of your html page.

```html
<script src="/cordova.js" type="text/javascript"></script>
```
C'est fini.