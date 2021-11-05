---
title: "A New Love For NodeJS"
excerpt: |
  After playing with NodeJS for a few months I have to say I'm pretty damn impressed.
  
  Notes on why I like it so much and any concerns I have.
mainImage: "/images/blog/2014/06/15/4582201683-4800ac4913-o-copy.jpg"
primaryColor: "#b73a29"
date: "2012-03-01T21:32:33-08:00"
updatedOn: "2012-03-01T21:32:33-08:00"
slug: "a-new-love-for-nodejs"
---

# A New Love For NodeJS 

I've been working with NodeJS for the past couple of months and I have to say . . . . it is incredible. 

I've been using it for building a restful JSON API and been amazed out how simple it was to pick and getting running with. Reasons for my loving it: 

  * God damn that NPM is awesome. Having a set up for installing and maintain plugin's is fantastic, speeds up development and gives the platform a sense of maturity. My tip would be to use the NPM with a dependency list (package.json) It'll help if there is a team of dev's working on the project and will remind you of what is needed. Plus, a quick "npm install" will grab all the plugin's needed and you can even enter in min and max version numbers of each one.
  * The NodeJS framework is amazingly simple yet effective to organise your javascript files in a sane way (something I've always struggled with in the past)
  * It's javascript. I'm slowly growing a love for javascript. I've often found it easy to do things wrong and only ever found it possible to use for small chunks of functionality, rather than treat it as a full programming language. However having the NodeJS framework has swiftly altered my train of thought with this.
  * The number of people using it is growing . . . . fast.
  * Powerful and easy endpoint management. It is so easy to have something along the lines of '/MyAwesomeEndPoint/:user;/:action;/:object;/' and catch that with '/MyAwesomeEndPoint/sudo/make/sandwich' => request.params.[user, action, object]
  
The one thing I would love to see happen as a result of NodeJS, is an IDE or plugin for an existing IDE, which integrates JSLint and auto-complete into the development cycle out of the box. JSLint is a great safety net to catch some of those pesky things you can trip up from time to time is js, especially if you're fairly new to javascript. 

Memory management. It's not a sexy topic, I know, but I've never looked into how javascript manages memory, I have only understood that is has garbage collection. This is probably one of the few instances where I've seen hefty pieces of javascript code running and because of the simple 'require' method, it's easy to pull a chain of modules and I'd be interested to learn the memory allocation of that as a result. I think that this comes down, A.) Not investing the time to learn these things B.) Not having played with it enough to find out where I've abused a part of NodeJS, which will later improve my knowledge of it's internal working. 

Docs . . . . . the weird weird docs. I think this is an issue which comes from my background of Mobile platforms having a fairly hefty supply of documentation where as NodeJS, I get the impression it's so new and moving so fast that docs aren't really going to be maintained or have the best amount of time invested into making them more accessible. Fortunately there are plenty of articles on the web, but still. 

Finally, you can get default installs of NodeJS on hosted systems, similar to just grabbing a LAMP stack from a web host. My suggestion is Heroku, you can sign up, for free, without entering a credit card and while the tools are bare bones does everything you need to get going. The developer docs are simple and targeted at getting you from joining to development as fast as possible. But I get the impression NodeJS  is happy in the cloud (which is good) but not so hot if you want it for a personal site or blog on a cheap, fixed priced host. One day though.... 

The future for me is getting NodeJS working as a full blown web server for displaying HTML content as well as JSON data etc. coming from a single endpoint working with a nice development environment for HTML templating.

Orig Photo: [https://flic.kr/p/7YUYVi](https://flic.kr/p/7YUYVi)