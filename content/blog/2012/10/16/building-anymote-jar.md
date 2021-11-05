---
title: "Building Anymote jar"
excerpt: "The Anymote library for Google TV had a few issues when I tried to build it, so for anyone else trying to do the same, this might have a few helpful tips on getting there."
mainImage: "/images/blog/2014/06/15/google-tv-remote-app-icon.jpg"
primaryColor: "#277ce7"
date: "2012-10-16T15:28:58-07:00"
updatedOn: "2012-10-16T15:28:58-07:00"
slug: "building-anymote-jar"
---

# Building Anymote jar

I started digging around in the Anymote protocol and a few things popped up regarding how to build everything and start using the latest and greatest stuff. So here's a brief guide on how to get going with it.

### Step 1: We need protobuf jar

Protocol Buffers are an efficient way of encoding structured data and serializing / deserializing the info.

The Main URL you need is: <http://code.google.com/p/protobuf/> this has all the information you need for getting standard with it. On OS X Mountain Lion I got this up and running with the tar.gz file and doing as the read me says which is just the following commands:

```bash
./configure
make
make check
sudo make install
```

With that all done, I need to make the JAR file, this was slightly less obvious, but if you change directory into the java directory, you'll find find another read me file. In here it explains that to make a JAR, you must run

```
mvn package
```

But the current version of the anymote protocol uses the lite version of an older version of the protocol buffers, so to do the same here we simply run:

```
mvn package -P lite
```

We have the first step complete, if you look in _$PROTOBUF_DIRECTORY/java/target_ you'll find a jar titled something along the lines of: _protobuf-java-$VERSION_NUMBER-lite.jar_

### Step 2: Creating our anymote.jar

To use anymote in our applications, we'll want to add a jar for anymote. To start with go and grab the Anymote protocol code from here: <http://code.google.com/p/anymote-protocol/>

Now drag your protocol buffer jar into _$ANYMOTE_PROTOCOL_DIRECTORY/java/jar/_ and delete any other old protocol buffer jars in the file.

Next change directory to the java file in your terminal and run make. This will use the protocol buffer lib to compile the _ $ANYMOTE_PROTOCOL_DIRECTORY/keycodes_ and remote proto files and generate a anymote.jar in the java folder.

### Step 3: Add the anymote.jar to your project and ...

...be awesome :)
