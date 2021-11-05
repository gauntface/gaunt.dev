---
title: "Why is Open Source Software Documentation Bad?"
excerpt: "Is documentation one of the key things holding back open source software?"
mainImage: "/images/blog/2014/06/22/8574509123-3846af95a8-o.jpg"
primaryColor: "#e9c430"
date: "2010-04-22T22:12:06-07:00"
updatedOn: "2010-04-22T22:12:06-07:00"
slug: "why-is-open-source-software-documentation-bad"
---

# Why is Open Source Software Documentation Bad? 

I've just gotten off the IRC of the #ubuntu-tweakers room on irc.freenode.net and we were having a full-blown discussion on why there is this huge barrier to entry with open source software.

The main area's that we all agreed on were the following: 

  1. The programmer doesn't know the tools which are used
  2. The programmer is lost the minute they get into the code

and one thing I'd tag onto that is: 

  1. Where the hell is everything? (Bug tracker, info on commiting patches, stuff I should know but you haven't told me about so I can't even know I should know it, let alone then finding information on it)

Let's look at an example of an open source program, Gnome-Do for instance ([http://do.davebsd.com/development.shtml](http://do.davebsd.com/development.shtml)).

We can see, development has a link at the top - so far so good - [http://do.davebsd.com/development.shtml](http://do.davebsd.com/development.shtml)

There is a wealth of information there, Mono, links to the mono site, it's in C# with a link to the wikipedia page on it, I have links to irc and even the developers blogs and twitter feeds. Then we have a link to launchpad.

Now I've never used launchpad in my life, it's a daunting tool, to say the least.

Don't get me wrong, I know it has everything you could want in a development platform. But all I wanted to do was download the source, install the relevant packages and tools to get developing and then start building a plugin or change to gnome-do.

What's actually happened: 

  1. I've been sent on a wild goose chase to learn about Mono, what is relevant to Gnome-Do specifically? I don't know, so your guess is as good as mine.
  2. I've been sent to a wikipedia page for C# which I imagine is the last place I'd want to look for on programming info.
  3. Been told they use launchpad and then that is it in terms of repo etc.
  4. Remember the things I should know but don't know I should know them? Well what happens if I add something, what do I do? Should launchpad have this info? should their project site have it?
  
Jono Bacon mentions alot of the time about - opportunistic programming and how Quickly enables that, and he's totally right, it's easy to knock up a program in many cases, that just scratches a little itch. But what happens if you don't want opportunistic programming starting from scratch, but in some other projects code? Is this even possible?

This is in no way a dig at gnome-do (honestly I love your guys work and I can bet if I went in the irc these questions would be answered). It's just I've looked at your development site before when I started programming and I got lost very quickly.

The main point I'm trying to get at, is does open source, think enough about the people who want to get involved but can't, because of this seemingly high barrier?

I think the following would of changed things for the Gnome-Do example:
 
  1. Instead of a link to the Mono Documentation, perhaps just a small documentation, explaining how to install, set-up, create new projects and import projects, rather than the mono page itself (Which at the end of the day may have this information, but it's mixed in with the advertising stuff and how do I know what's relevant to just getting a move on).
  2. instead of a C# link to a page just about C# why not another documentation on just getting started with C# including (again) how to install, set-up and use C# (including the relevant links to documentation and useful/key links)
  3. A video on how to use Launchpad, what everything is, and where to find everything
  4. Documentation directly relevant to the project (This is the bit I will never expect to happen, I'll explain why in a bit)

Basically, relevant documentation, that just tells me, how to get moving. I don't care about the in's and out's I just want to go, same as Quickly, you don't care what Quickly does to build your app, you just care that it starts to work. Everything else you can work out, as and when you need to.

The video of Launchpad, because I simple don't want to read a whole set of docs on it, it's far too much info to take in, from just text, it would be easier and far more pleasant through a video format.

Now the final comment, why do I think a project wouldn't produce documentation for new-comers, because it's a lot of effort. I've developed in small teams, and the last thing you want to do is comment stuff - it's boring. But there must be some way of getting across the structure of an app right? I mean, I downloaded the VLC Media Player source, and I couldn't find where a play function was, the code was so foreign to me, yet if I had their file structure drawn in a graph format, I would probably be able to follow exactly where I should of been looking. But again this requires someone to do it, but would it take long for an experienced developer to scan in a drawn picture of a program structure?

As for the main documentation for tools etc, I might take some of the doc's written for the Ubuntu Tweakers community and turn it into something suited for projects to simply link to.

This is obviously my own point of view and I have no doubt someone will disagree with me every step of the way, and if that is the case then please comment because I do find this a really interesting topic.

Orig Photo: [https://flic.kr/p/e4GAQc](https://flic.kr/p/e4GAQc)