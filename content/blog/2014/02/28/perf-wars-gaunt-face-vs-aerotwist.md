---
title: "Perf Wars: Gaunt Face vs Aerotwist"
excerpt: "Performant Web Apps...... The harsh world of getting 60fps for a newbie web developer."
mainImage: "/images/blog/2014/05/24/lego-war.jpg"
primaryColor: "#6c9c9c"
date: "2014-02-28T17:32:22-08:00"
updatedOn: "2014-02-28T17:32:22-08:00"
slug: "perf-wars-gaunt-face-vs-aerotwist"
---

# Perf Wars: Gaunt Face vs Aerotwist

In the not so distant past...

> The second day running where it's started off by being mocked for my poor code.
>
> — Matt Gaunt (@gauntface) [February 19, 2014](https://twitter.com/gauntface/statuses/436076818698108928)



> [@gauntface](https://twitter.com/gauntface): [@aerotwist](https://twitter.com/aerotwist) must like it as you "do all the bad things".
>
> — Chris Banes (@chrisbanes) [February 19, 2014](https://twitter.com/chrisbanes/statuses/436088063618732033)



> [@chrisbanes](https://twitter.com/chrisbanes) [@gauntface](https://twitter.com/gauntface) He’s a one-man, walking, talking, cautionary tale.
>
> — Paul Lewis (@aerotwist) [February 19, 2014](https://twitter.com/aerotwist/statuses/436095477537570817)



# ...whats that all about?

I've started work on my new site and I was figuring out what kind of components and interactions I wanted. One of the nice wins of creating my site with components first, is that testing each component can be done, without getting mixed up with other issues else where in the page.

After a few hours of coding, the initial static version of my site was ripped apart and the makeshift component library was formed.

![Component List](/images/blog/2014/02/Screenshot-from-2014-02-28-135238.png)

This is where our story begins.

# Where's the Perf?

When I started to look at the navigation drawer, there were a few unusual janks at the start and end of the animations. The video below shows the kind of animations I was trying to create.

<div class="youtube">
    <iframe src="//www.youtube.com/embed/vAYYUo4j-Vg" frameborder="0" allowfullscreen></iframe>
</div>

# That Looks Easy, so Clearly Matt is an Idiot.

## Z-Index Woes

My first attempt was the basic / quick approach. Use the _left_ CSS property to move the bar and use opacity to hide and show the background color.

Using the _left_ CSS property is generally considered bad practice as the browser can't optimise for it as well as it could do if you used _transform: translateX()_, see [Paul Irish's post on this topic](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/) if you're curious.

Once I had made that change, I wanted to check the frame rate of the animations. You can see the first version of the navigation drawer here: <http://staging.gauntface.co.uk/components/archive/v1/navdrawer>

Running the timeline, there were two issues, I had regular dips in frame rate to 30fps (Generally when animations start / end) and there were some big old paints.

![Screenshot of Chrome Timeline for the Navigation Drawer](/images/blog/2014/02/Screenshot-from-2014-02-28-150032.png "1024")

A personal pet peeve is the large clear bars in the timeline, which basically indicates that Chrome is doing something, but Chrome isn't quite sure what it is, or there is no meaningful way to show the data, so it's kind of a black box. Me being me, poked [Paul Lewis](http://aerotwist.com/) and asked if he could give me a hand at figuring out what was up. We didn't look too hard, but since the bars were largely unfilled and chrome://tracing didn't have any obvious issues, it looked like a Chrome issue, so I reached out to an engineer, asked if they could help and we got a quick answer - I was flipping a Z-Index from -1 to 2 - <https://code.google.com/p/chromium/issues/detail?id=344625>.

Now, this was clearly not a proud moment for me, it was a hack I put in the static site and I hadn't thought to properly address the z-indexing in a manageable way. At least we know now that z-index twiddling can have performance issues (and they hide quite well in the timeline).

## Got 99 Problems and the Frame Rate Ain't One

Needless to say, Mr Lewis was somewhat in shock that I had even put this in (hence the tweets). I moved on, fixed up the z-indexing issue and lo and behold I still wasn't hitting the dream 60fps. What gives?

Digging around, asking Paul what he thought. We started looking at how I had done the transitions, I optimised the little javascript I had, removed things from javascript that could be achieved in CSS, limited the scope of the CSS style changes by altering class names on individual elements rather than the body, yet the paints still lived on.

This was breaking point for me, I had enough, the web clearly wasn't up to this basic task and Paul had finished with me, clearly I had done something really nasty and hidden it thoroughly away.

Well persistent nagging meant Paul went away and produced this: [http://jsbin.com/tiyoxobe/4/](http://jsbin.com/tiyoxobe/4/quiet/). A lovely non-painting version of the drawer.

![Screenshot of Paul Lewis Demo Timeline](/images/blog/2014/02/Screenshot-of-Paul-Lewis-Demo-Timeline.png "1024")

In my head I imagine he was all like:

![Magnum P.I. gif](/images/blog/2014/02/magnum.gif "200")

## The Opacity Issue

Digging around the example, trying to figure what was different, when I spotted this little slice of insanity.

```css
opacity: 0.00001;
```

Who in their right mind does this? Well apparently [Aerotwist](http://aerotwist.com) does because he's aware of an issue which basically kicks a view out of being regarded as a composited layer if the opacity is a value of 0 or 1.

Moving swiftly along, I put this change in my page along with moving from a background color with an alpha value to a solid color and reducing the opacity from 1 to something lower. Suddenly a much happier looking graph appeared with no large paints.

![Screenshot of Timeline without Request Animation Frame](/images/blog/2014/02/Screenshot-of-Timeline-without-Request-Animation-Frame.png "1024")

# Final Thoughts

This would have sucked far more than it already had done if I hadn't pulled everything out into a component, which is why I'm pretty glad I started off with this approach and have since invested some more time in making it a bit easier to create, add and maintain components.

But this is terrifying from a web developer’s stand point (at least for me). Realistically I have nothing checking that my page is hitting 60fps as I develop and make changes, I have to specifically investigate if it’s an issue or not. If you then consider cases where it doesn’t look like it’s your fault even though it is (the z-index flip) and other cases where the sane option simply isn’t the best option for performance (i.e. opacity), it’s pretty hard to picture a 60fps world.

It feels like the web has managed to get by without anyone calling shenanigans on issues like this, hopefully that will change as the devices browsers run on are more constrained and the expectations of the web grow.

Finally: I wouldn’t recommend using the opacity hack, it’s horrible and will hopefully not be required in the short term: <https://code.google.com/p/chromium/issues/detail?id=345267>

Performance can be achieved, but it’s not easy and obviously CSS, JS and DOM needs a lot more crafting than I initially gave it credit for.

 #perfmatters

Orig. Photo: <https://flic.kr/p/ARLeo>