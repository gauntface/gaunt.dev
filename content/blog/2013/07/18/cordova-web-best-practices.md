---
title: "Cordova + Web Best Practices"
excerpt: "In this post I'll cover how you can hook Yeoman and Cordova together so you get the benefits from Yeoman with the ease of deployment from Cordova."
mainImage: "/images/blog/2014/05/24/yeoman-cordova-2.jpg"
primaryColor: "#55aca0"
date: "2013-07-18T08:32:00-07:00"
updatedOn: "2013-07-18T08:32:00-07:00"
slug: "cordova-web-best-practices"
---

# Cordova + Web Best Practices

<hr />

<strong>Note:</strong> There is a new version of this guide on my site which takes into account changes in the Cordova-CLI and Yeoman.

[Cordova + Web Best Practices v2.0](/blog/2014/02/05/cordova-web-best-practices-v2-0/)

<hr />

Those of you who have tried [Cordova](http://cordova.apache.org/) / [PhoneGap](http://phonegap.com/), will know that it's not always easy to manage your web content along side the native platform projects.

Historically, you've had to create your own Android, iOS, ... projects and then wrangle them to work with Cordova's libraries. Once you've managed that, it's up to you to decide how you add the web parts of your app to each platform.

This improved after the Cordova team released a [command line interface (cordova-cli)](https://github.com/apache/cordova-cli), which addresses a number of these problems. The new approach to starting a Cordova project is to use the CLI to scaffold out the project structure. This results in everything living under one directory and then gives you a set of simple commands to add support for platforms, start emulators, install on devices and copy content from a _www_ directory into each native platform.

The missing piece to this? A structure and workflow for your web application. This is where [Yeoman](http://yeoman.io/) comes in, you can use a generator to scaffold out a web application and [Grunt](http://gruntjs.com/) to run a number of useful tasks, which will implement some of the web's best practices, without any extra effort.

To get a basic set-up of a new Cordova project with Yeoman, follow these steps.

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

![Cordova Project Structure](/images/blog/2013/07/Cordova-Project-Structure.png)

Then add your platforms of choice (in this case Android).

```bash
cd my-project
cordova platform add android`
```

You'll now have a Cordova project ready to go, congrats :)

If you want, you can run an emulator with the following command:

```bash
cordova emulate android
```

![Android Emulator Running Cordova App](/images/blog/2013/07/Cordova-Emulator.png)

## Set-Up Yeoman

This part of the guide will use Yeoman's default generator ([webapp generator](https://github.com/yeoman/generator-webapp)), however the changes needed to get everything to play nicely, should apply to other [generators](http://yeoman.io/generators.html) as well.

To keep a clean directory structure within the Cordova project, we'll want to add a directory at the root of the project for Yeoman.

```bash
mkdir yeoman
```

So we now have _merges_, _platforms_, _plugins_, _www_ & _yeoman_ directories in our project.

Next, lets run through our yeoman generator as normal

```bash
cd yeoman
yo webapp
```

![Yeoman WebApp Terminal](/images/blog/2013/07/Yeoman-WebApp-Terminal.png)

Go through all the Yeoman prompts and once this is done, copy the _config.xml_ file from the _www_ directory over to _yeoman/app_.

[In the long term, I hope the location of the config.xml file will change - I can't see the why it would need to stay in _www_]

```
cp ../www/config.xml ./app/config.xml
```

The next step is to get Yeoman to build into the _www_ directory, so let's change the _dist_ location:

#### Before

```javascript
// configurable paths
var yeomanConfig = {
  app: 'app',
  dist: 'dist',
};
```

#### After

```javascript
// configurable paths
var yeomanConfig = {
  app: 'app',
  dist: '../www',
};
```

Since _dist_ is now outside of the Yeoman directory, we need to make sure the clean task can clean directories outside of it's current directory

#### Before

```javascript
clean: {  
	dist: {    
		files: [{      
			dot: true,
			src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
		}]  
	},
	server: '.tmp'
},
```

#### After

```javascript
clean: {
  options: {force: true},
  dist: {
    files: [{
      dot: true,
      src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
    }]
  },
  server: '.tmp'
},
```

The final step is to make sure the config.xml file is copied over to the _www_ directory whenever we perform a build, so lets add the xml file extension to the copy task

#### Before

```javascript
// Put files not handled in other tasks here
copy: {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'images/{,*/}*.{webp,gif}',
        'styles/fonts/*'
      ]
    }
.......
```

#### After

```javascript
// Put files not handled in other tasks here
copy: {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,png,txt,xml}',
        '.htaccess',
        'images/{,*/}*.{webp,gif}',
        'styles/fonts/*'
      ]
    }
.......
```

Now whenever you run grunt build, it’ll go through the build steps and load the appropriate files into the www directory.

Meaning a full project compile cycle is, build with Yeoman, then build with Cordova for the relevant platform.

```bash
grunt build && cordova run android
```

Cordova’s tools will actually add cordova.js to the projects root directory, so when you want to use some of Cordova’s features, you just need to reference cordova.js in your html page.

![Screenshot of End Result of Yeoman + Cordova](/images/blog/2013/07/Yeoman-End-Output.png)

## Fin.

This is by no means a perfect workflow, ideally you’d have a single tool control the entire build process, but this is a huge leap forward from any previous workflows I’ve had while working with Cordova.

![Yeoman Heart's Cordova](/images/blog/2013/07/Yeoman-Heart-Cordova.png)

Orig. Photo: <https://dribbble.com/shots/1519899-Free-Polygonal-Low-Poly-Background-Texture-11?list=tags&tag=freebie&offset=10>