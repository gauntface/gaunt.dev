---
title: "New Site, New Approach"
excerpt: |
  In the latest redesign of my site, one of the key area's I wanted to focus on was page performance, both loading and animations.

  I ended up with a style guide and a half way decent build process for image optimisation.
mainImage: "/images/blog/2014/05/24/main-headmast.jpg"
primaryColor: "#482329"
date: "2014-02-16T22:35:57-08:00"
updatedOn: "2014-02-16T22:35:57-08:00"
slug: "new-site-new-approach"
---

# New Site, New Approach

![Gaunt Face Home Page with Full-screen Image](/images/blog/2014/02/High-Res-Image.png "605")

I've started working on a new version of my site and I'm aiming to work on a range of problems / areas where my current site sucks.

# Static Site

Originally the redesign was a static site, largely to see what I wanted the site to look like / how I the UX to behave.

After a long haul flight and a quick chat with [Paul Lewes](¨http://aerotwist.com/¨), I reached a point of diminishing returns, given my intention to move to a dynamic site, so this weekend I switched over to [Codeigniter](¨http://ellislab.com/codeigniter¨).

# Components

I made the switch to [Codeigniter](¨http://ellislab.com/codeigniter¨), largely because I want to get off of using Wordpress, but want something a little more than a static site generator. (It's also an excuse to develop a server side application).

One of the main things which came up in the discussions with Mr Lewes, was that testing the performance of components was going to be troublesome, so I wanted a clean way to explore each 'component' of my site separately, to make it easier to test performance as well as responsiveness.

This isn't a new way of thinking, but it's the first time I've gone out of my way to ensure such a high level of separation.

[beta.gauntface.co.uk/components/](http://beta.gauntface.co.uk/components/)

![Image of Component List for Website](/images/blog/2014/02/Screenshot-from-2014-02-16-220819.png)

Each component still needs a lot of testing individually as well as being tested on a whole page, but the big benefit is in code maintainability, quality and separation. Only having a small feature set to implement for each component, really helps focus and tidy as you go (instead of jamming everything into a single js file, which I find all too easy to fall into).

# Images

When I had enough component logic to implement my home page, I switched my attention to supporting some degree of responsive images.

My home page will hopefully have a full page image, the big challenge there is having a image big enough for all sizes, without requiring a huge download on all devices.

![Gaunt Face Home Page with Full-screen Image](/images/blog/2014/02/High-Res-Image.png "605")

The great thing with Codeigniter is that it has a image library already: [http://ellislab.com/codeigniter/user-guide/libraries/image_lib.html](¨http://ellislab.com/codeigniter/user-guide/libraries/image_lib.html¨)

I also came across one approach for dynamic image sizes by Jens Segers, using Codeigniters library: [http://jenssegers.be/blog/31/codeigniter-resizing-and-cropping-images-on-the-fly](¨http://jenssegers.be/blog/31/codeigniter-resizing-and-cropping-images-on-the-fly¨)

This code served heavily as the basis for my approach, the key differences are:

  1. I grouped up images into widths and heights of multiples of 50, stopping a pixel by pixel step.
  2. The file-name is checked with regular expressions and the format is slightly different (Name_100x100). Also dropped any notion of grouping (wide, long, etc). You can make any request, the value will be rounded up to a multiple of 50, cached on the disk and returned.
  3. The images are grouped into sub-directories on the server, with the original image remaining in the root directory. This is largely to help with maintenance, I can see a scenario where I need to wipe out all resizes for a certain image and this is slightly less error prone / more manageable approach (or at least I hope it will be).

![Dynamic Image Creation - Nautilus Screenshot](/images/blog/2014/02/Screenshot-from-2014-02-16-211756.png)

## Why Multiples of 50?

This is the first thing I'm likely to experiment with, I chose 50px at random, it doesn't feel to scary to have images jumping up 50px at a time, but the performance gains will be greater for 10px or 20px for the relatively low cost of hosting.

## Sass

The first issue with this approach was how I was going to use it in the web page, this is where background-image came in, but if you think I'm going to type out a load the media queries by hand, you have another thing coming.

Without further stalling, I present to you the world's most fugly [SASS](¨http://sass-lang.com/¨) mixin.

```sass
@mixin responsive-image-height-based($imageName, $imageExtension, $className, $mqHeights, $imgHeights, $pixelDensities) {
  @each $density in $pixelDensities {
    @for $i from 1 through length($mqHeights) {
      $mqHeight: nth($mqHeights, $i);
      $imgHeight: nth($imgHeights, $i);

      $densityMediaQuery: '';
      @if $density != 1 {
        $densityMediaQuery: 'and (min-resolution: #{$density}dppx)';
      }

      @media all #{$densityMediaQuery} and (min-device-height: ($mqHeight * 1px)) {
        #{$className} {
          background-image: url('#{$imageName}_#{$imgHeight}x#{$density}.#{$imageExtension}');
        }
      }
    }
  }
}

@mixin responsive-image-width-based($imageName, $imageExtension, $className, $mqWidths, $imgWidths, $pixelDensities) {
  @each $density in $pixelDensities {
    @for $i from 1 through length($mqWidths) {
      $mqWidth: nth($mqWidths, $i);
      $imgWidth: nth($imgWidths, $i);

      $densityMediaQuery: '';
      @if $density != 1 {
        $densityMediaQuery: 'and (min-resolution: #{$density}dppx)';
      }

      @media all #{$densityMediaQuery} and (min-device-width: ($mqWidth * 1px)) {
        #{$className} {
            background-image: url('#{$imageName}_#{$imgWidth}x#{$density}.#{$imageExtension}');
        }
      }
    }
  }
}
```

All in all this is a bit of a mess, I will give you that, but if you happen to be a SASS mixin guru and know of anyway to make this tidier, then please let me know (a.) It's my first attempt at writing a mixin b.) It's late on a Sunday, I can't be expected to produce anything of high quality).

What this is doing is, iterating over the values from start to end at certain intervals. For the first size, it creates a max-device-width media query, from that point onwards it creates a min-device-width media query, this means we have all the widths covered.

![Responsive Inspector Screenshot](/images/blog/2014/02/Screenshot-from-2014-02-16-211912.png)

The iterations are always increased for the image size rather than the min-device-width size, since a min-device-width of 400px, will include screen sizes 400+.

The densities are wrapping this for statement, essentially allowing us to serve images with sizes taking into account screen densities (i.e. 2x and 3x).

All of this means I can serve up images for the rough size of the device taking into account their device pixel ratio.

Happy Times.

![Difference in Pixel Density](/images/blog/2014/02/Image-Res-Article.png "1024")

## The Concerns
* This example is currently just a square image, it doesn't account for width and height (or aspect ratio). I can find out the width or height through media queries on the client side, but these can only help so much. Part of me is thinking that if I can get an image which will work for both portrait and landscape, then it should only ever be downloaded once and essentially use this as a way of validating wider or taller images, where a proportion of the image will never be seen. The other aspect of this is that there is no notion of a dominant measure, width or height, as being the value to determine the size of the square image.
* Image Compression: There is the ability to select the image quality when generating the image. I'm aware of the technique of using highly compressed images as the density gets bigger, ultimately reducing file size, while maintaining a higher quality image. I could add logic to compress the image is it gets larger or alter the file-name to include a pixel density and then compress based off of that.
* Auto-generated media queries like this lead to a lot of CSS, a negative point to reducing step size from 50px to 10px.
* Should portrait and landscape be considered in the media query.

# Next Up

What do I intend to have a stab at next, I hear you ask....

* More perf / responsiveness testing on the components (as well as enhance / add to them).
* Spend some time getting Grunt to play nice with JS and SASS linting, compilation and minification.
* Start working on the blog section to try and get off of WordPress.
* Get, Git push to deploy, up and running so I don't have to copy and paste the code over.

p.s. Tip of the day, debug Codeigniter with **log_message('error', 'Hello World');** and then just view the running log in a terminal with:

    tail -f /application/logs/your.log
