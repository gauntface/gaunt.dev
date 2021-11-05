---
title: "Thoughts on Mobile Projection + Mobile Eye"
excerpt: |
  A look back on my thesis at University on the "Mobile Eye" project.
  
  The idea of projecting on the world around you manipulating and annotating it with useful information.
mainImage: "/images/blog/2014/06/15/386508456-9861e6653b-o.jpg"
primaryColor: "#6cd7e2"
date: "2012-03-25T22:00:21-07:00"
updatedOn: "2012-03-25T22:00:21-07:00"
slug: "thoughts-on-mobile-projection-mobile-eye"
---

# Thoughts on Mobile Projection + Mobile Eye 

![Mobile Eye Projection Shot](/images/blog/2012/03/4543458986_41cc430491_z.jpg) 

It's been a few years since I finished my Masters in Computer Science at the University of Bristol. My final project was "Mobile Eye", a thesis project exploring mobile projection techniques and interactions. 

There were two things I discovered when beginning the project, mobile projection is fairly new, very niche and the majority of work undertaken was using old platforms / hardware because of output flexibility rather than platform capabilities. 

My interest in this area was sparked by the Sixth Sense concept video: 

<iframe width="560" height="315" src="//www.youtube.com/embed/nZ-VjUKAsao" frameborder="0" allowfullscreen></iframe>

This post was then kicked off after I found a similar research piece undertaken by Microsoft using some of the technology from the Kinect:

<iframe width="853" height="480" src="//www.youtube.com/embed/WLoMecZ80BQ" frameborder="0" allowfullscreen></iframe>

This research is fantastic. No doubt about it. My question is whether a user would like to interact with such a system. Perhaps if projection improves to work well outside of low light environments and the interaction methods improve. But for me I've always seen these projection systems as a much more passive tool, creating a ubiquitous environment for the user.

This was the premise of Mobile Eye. How feasible was it for a system to look around at it's environment, spot things to gain extra information useful to the wearer and then if it has an area, safe for projection, continue to do project this content.

The challenges with this were:

  1. Identifying the safe patch to project
  2. Identifying an object and then getting additional information
  3. Finding enough information about the surface to perform appropriate keystone transformation of the projected information

I created a simple algorithm for selecting safe patches within a scene, something which I had hoped would lead to existing research, but turns out not many people are looking for methods to find nothing. To identify an object I used a binary for an algorithm called FabMap. This was recommended by the researcher who was the co-founder of Plink. The final step I struggled with. There has been a great deal more research in this area, however getting a working implementation finished in time wasn't possible, although the initial steps were complete to project a square with four corner dots which could be used indicate the angle and distance of the surface. Although the use of a Kinect like device would speed this up by pushing the processing onto hardware. 

I hope that some of my research is of interest to some people in this space, although it may already be somewhat redundant (two years is a long old time in technology ;).)

Below is the full 55 page thesis paper. Enjoy.

[Mobile Eye - Matthew Gaunt on Scribed](http://www.scribd.com/doc/86679610)

<iframe class="scribd_iframe_embed" src="//www.scribd.com/embeds/86679610/content?start_page=1&view_mode=scroll&show_recommendations=true" data-auto-height="false" data-aspect-ratio="undefined" scrolling="no" id="doc_6729" frameborder="0"></iframe>

Orig Photo: [https://flic.kr/p/A9XuU](https://flic.kr/p/A9XuU)