---
title: "Trying to do a Good Job"
excerpt: "Developing sites with backend and front end logic, build processes, preprocessors, what ever else makes it hard to keep things clean and sane. How I've reworked things."
mainImage: "/images/blog/2015/2015-09-17/trying.jpg"
primaryColor: "#6f6463"
date: "2015-01-06T18:26:23-08:00"
updatedOn: "2015-01-06T18:26:23-08:00"
slug: "trying-to-do-a-good-job"
---

# Trying to do a Good Job

We recently had a workshop with [Harry Roberts](https://twitter.com/csswizardry) (a.k.a [CSSWizardry](http://csswizardry.com/)) at the Google Office, largely with a goal of learning about better web project maintenance, hopefully helping us improve [Web Starter Kit](https://developers.google.com/web/starter-kit/).

The annoying with this workshop was the number of things that immediately made sense to do in terms of best practice, the tricks were awesome and general ethos was reassuring.

I took some of the stuff we'd learnt and started to just muck about with reworking the styles in my site.

# 1. Figure Out the Inheritance of Styles

Harry has come up with [ITCSS](http://itcss.io/) and it's a formula he's come up with over the past couple of years while developing [InuitCSS](https://github.com/csswizardry/inuit.css/). Essentially things boil down to an upside down triangle.

![ITCSS Diagram](/images/blog/2015/01/06/itcss-pyramid.png)

Harry can and will get insanely excited when he talks about this and he WILL draw a triangle on anything that he can while he talks about it.

I ended up renaming some of this stuff, just to fit with my mental model of what I was going to do.

![Matt Gaunt's Tweaked Version of ITCSS](/images/blog/2015/01/06/itcss-matt-style.png)

Settings and tools are just SASS files I pull in (things like colors, sizes and mixins), the resets are a combo of [HTML5Boilerplate and Normalize](https://gauntface.com/styleguide/view/resets/), my base is a combo of [base styles on elements](https://gauntface.com/styleguide/view/base/) and [typography on top of that](https://gauntface.com/styleguide/view/typography/). The base styles I've tried to ensure weird content doesn't break out the bounds of the page and with typography I've tried to ensure everything is sat on a baseline grid.

On that note: [http://basehold.it/](http://basehold.it/) is friggin' awesome!

Pick a page on my blog, open DevTools and in the console type `window.GauntFace.debug.toggleBaselineGrid();` to see what it looks like on the base line.

# 2. Be Happy to Refactor

Once I had done all of the above, I was clinging onto an old way of visualizing the chunks of UI my site had. In the end I just scrapped it and made my life easier by moving everything around and putting it up on [https://gauntface.com/styleguide](https://gauntface.com/styleguide). This is largely to act a personal reminder of the flow of responsibility, but it was weird my aversion to the change - change that stuff yo, it'll make life easier!!

# 3. !default Variables

Possibly one of the simplest, yet most powerful things I'd learnt from the the workshop was the use of `!default` in [Sass](http://sass-lang.com/). All of the components on the [styleguide page](https://gauntface.com/styleguide) pull in the smallest amount of dependencies as possible (both CSS and JS), the idea being they should be self contained. The problem with this is that if I define a color in the Sass file, how can I change it on a specific page, the solution is `!default`.

Originally I was defining an overrides file with values like:

```sass
$some-color: #BADA55;
```

Then in my actual Sass for the component, I would do the following:

```sass
@import "some-component/overrides"

.some-component {
  background-color: $some-color;
}
```

This is fine, it works, but its tedious, because I then have to remove the *overrides* directory (I do this with a script), then ensure I add some file that officially defines the final colors for my site. The easier solution is to do this in the component Sass:

```sass
$some-color: #BADA55 !default;

.some-component {
  background-color: $some-color;
}
```

Then anywhere I want to change the color, I can do the following:

```sass
$some-color: #C0FF33;

@import "some-component"
```

Sass will then take the original value of $some-color - in otherwise !default only uses the supplied value if nothing has been set yet.

# 5. Layouts and Trumps

The main thing I'm missing from the triangle in my styleguide page are Layouts and Trumps.

Layouts I have very few of, the home page, the blog index, blog posts and the contact page. I generally haven't wanted to define them in the styleguide (Although I could just link them up). The number of things which got componentised as a result of this was pretty surprising - ripping things out of the layout sass files to clean up the naming convention was easier if I moved it into a component in the process.

Trumps I haven't found

Orig Image: [https://flic.kr/p/ntMAe](https://flic.kr/p/ntMAe)