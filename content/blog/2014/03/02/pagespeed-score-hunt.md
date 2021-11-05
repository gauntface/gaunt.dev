---
title: "Pagespeed Score Hunt"
excerpt: |
  Ever wondered what you could do to improve your sites page load time?

  PageSpeed Insights is a tool which highlights any problem areas on your site and this is how I got my score up to 100/100.
mainImage: "/images/blog/2014/05/24/internet-stability.jpg"
primaryColor: "#4187ba"
date: "2014-03-02T21:49:40-08:00"
updatedOn: "2014-03-02T21:49:40-08:00"
slug: "pagespeed-score-hunt"
---

# Pagespeed Score Hunt

For those who aren't aware of [PageSpeed insights](https://developers.google.com/speed/pagespeed/insights/), it's a service which will allow you to figure out where you could optimise the load time of your site and well worth checking out <https://developers.google.com/speed/pagespeed/insights/>.

# IO Byte

For Google I/O 2014 I put together a video covering a lot of these details, with useful Grunt and Gulp tasks to achieve certain tasks.

If you're more of a video fan then give this a go, otherwise if you prefer a read, then skip on ahead :)

<iframe width="560" height="315" src="//www.youtube.com/embed/pNKnhBIVj4w" frameborder="0" allowfullscreen></iframe>

# Without Conscious Effort

Without doing anything to improve my [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) score, I was sitting at 89/100 for desktop and 83/100 for mobile. Two things to note here:

  1. This isn't a finished site (it's barely even a site) so may degrade as soon as the content grows
  2. The only reason I'm looking at it early is to try and automate as much as possible for the rest of the development process

Let's look at the issues on desktop, see how I can fix them (if I can), and then see how that affects the mobile score.

# Desktop Issues

## Leverage Browser Caching

To fix this I grabbed a copy of the htaccess file from [HTML5 Boilerplate](http://html5boilerplate.com). If you haven't dug around in the htacces file before, now is the time, its full of useful tips.

This one change, gave me a big huge boost in score.

![PageSpeed Insights Score With Caching](/images/blog/2014/03/Screenshot-from-2014-03-01-104610.png)

So what exactly is in the .htaccess file which is making this magical change?

```
# ------------------------------------------------------------------------------
# | Expires headers                                                            |
# ------------------------------------------------------------------------------

# The following expires headers are set pretty far in the future. If you
# don't control versioning with filename-based cache busting, consider
# lowering the cache time for resources such as style sheets and JavaScript
# files to something like one week.

<IfModule mod_expires.c>

    ExpiresActive on
    ExpiresDefault                                      "access plus 1 month"

  # CSS
    ExpiresByType text/css                              "access plus 1 year"

  # Data interchange
    ExpiresByType application/json                      "access plus 0 seconds"
    ExpiresByType application/ld+json                   "access plus 0 seconds"
    ExpiresByType application/xml                       "access plus 0 seconds"
    ExpiresByType text/xml                              "access plus 0 seconds"

  # Favicon (cannot be renamed!) and cursor images
    ExpiresByType image/x-icon                          "access plus 1 week"

  # HTML components (HTCs)
    ExpiresByType text/x-component                      "access plus 1 month"

  # HTML
    ExpiresByType text/html                             "access plus 0 seconds"

  # JavaScript
    ExpiresByType application/javascript                "access plus 1 year"

  # Manifest files
    ExpiresByType application/x-web-app-manifest+json   "access plus 0 seconds"
    ExpiresByType text/cache-manifest                   "access plus 0 seconds"

  # Media
    ExpiresByType audio/ogg                             "access plus 1 month"
    ExpiresByType image/gif                             "access plus 1 month"
    ExpiresByType image/jpeg                            "access plus 1 month"
    ExpiresByType image/png                             "access plus 1 month"
    ExpiresByType video/mp4                             "access plus 1 month"
    ExpiresByType video/ogg                             "access plus 1 month"
    ExpiresByType video/webm                            "access plus 1 month"

  # Web feeds
    ExpiresByType application/atom+xml                  "access plus 1 hour"
    ExpiresByType application/rss+xml                   "access plus 1 hour"

  # Web fonts
    ExpiresByType application/font-woff                 "access plus 1 month"
    ExpiresByType application/vnd.ms-fontobject         "access plus 1 month"
    ExpiresByType application/x-font-ttf                "access plus 1 month"
    ExpiresByType font/opentype                         "access plus 1 month"
    ExpiresByType image/svg+xml                         "access plus 1 month"

</IfModule>
```

Each rule basically defines an expiration time depending on the file type.

The important thing to take note of is the comment on cache busting.

Ultimately you want to change the filename whenever there is a new version of a file (CSS, JS etc). The sanest way I can think of is to make use of [grunt-rev](https://github.com/cbas/grunt-rev) along with [grunt-usemin](https://github.com/yeoman/grunt-usemin) (Note: [Yeoman](http://yeoman.io/) uses this in it's default build process, plus if a better tool comes out, chances are it'll be in [Yeoman's](http://yeoman.io/) webapp generator).

The grunt-rev task can achieve this, the difficult part was getting the PHP templates to update to the new revisioned name.

I've put a few things in place to try and handle this, but it's far from pretty and needs further work. At least it's there.

## Optimise Images

I have a bit of a weird set-up with my images, I've adapted a small back-end script to resize images when requested based on the image name, see [this post for more info](/2014/02/16/new-site-new-approach/).

The main topic of concern for page speed is the compression used for these images, initially my head thought of compression as equivalent to quality, i.e. lower the quality, the file size goes down, everyone is happy. So you can imagine my surprise when my PageSpeed score started to fall as I reduced the file size.

That's when I actually took the time to read the manual for the optimizations <https://developers.google.com/speed/docs/insights/OptimizeImages>.

Compression != Quality.

Obvious when you think about it, and they suggest stripping out the meta data for your jpegs with jpegoptim.

This was a bit of a blow, my images are auto-generated on the server side such that I can throw image requests with specific name formats and the server will create the required image (i.e. attempt to be a good citizen for smaller screen devices). The problem is that with this approach, I can't strip out the meta data server side. The original images I use to resize, don't seem to benefit from stripping out meta data.

I could upload pre-sized images but the problem with this is that it still won't cover uploaded images used in a blog type scenario.

Will have to revisit.

## Eliminate Render-Blocking JS and CSS

All my javascript is at the bottom of the page, so this was exclusively an issue with the CSS, so as a quick test, I copied and pasted the css into the html.

![Pagespeed with Inlined CSS](/images/blog/2014/03/Screenshot-from-2014-03-01-170406.png)

Boom.

Using <http://www.webpagetest.org/> I had a look on the impact of this change and the results weren’t too shocking. The initial load was generally a bit faster by a small amount, where as the second reload would be ever so slightly longer (about 130ms).

Pretty much puts me on the fence regarding whether inline CSS is worth it, given the amount of caching which is then lost, which [Paul Lewis](http://aerotwist.com) pointed out to me.

## Inline SVG
This was an interesting one, I like inlining SVG as it means you can style elements with CSS if you wanted to, but the other benefit of it, is that it means one less request to your server. The obvious down side is that it makes your HTML page larger.

Back to <http://www.webpagetest.org/>, the initial load time went **down** by approximately **100-200 milliseconds** where as the repeat load had some mixed up and and downs depending on the metric, so all in all I think the trade-off is good to inline, but perhaps just play around for your use case.

## The Pointless Stat - Caching HTML

The biggest criticism of putting CSS inline is that you lose caching of the CSS file and specifically caching of shared CSS files across your site – Boooooo.

If you do have a static site however, perhaps caching the HTML is an option and if it is, then you can always switch it on and speed up the load times considerably for repeat loads. (I’m currently trialling this out to see how my site load times appear on analytics).

# Get it in your Workflow

To be honest, I am to lazy to repeatedly go back and forth on the PageSpeed site, I want to be able to hit refresh and see how my score is doing, this is where [Paul Kinlan’s](http://paul.kinlan.me) Chrome extension comes in handy: [PageSpeed Insights Checker](https://chrome.google.com/webstore/detail/pagespeed-insights-checke/mkjmodmicmpjedhoekkmafdgpocdkbna?utm_source=chrome-ntp-icon).

The one thing I would recommend is adding your own API key to the extension, just right click on the extension icon and select **Options**. Then click the **API Key** link, go to **APIs & auth** for a suitable project (I ended up just creating a new one for my site), under API’s search for **PageSpeed Insights API** and turn it on.

![Google Developer Console](/images/blog/2014/03/Screenshot-from-2014-03-01-101134.png)

Now click on **Credentials** and **Create New Key** under the **Public API Access** heading.

![Create new PageSpeed Insights API](/images/blog/2014/03/Screenshot-from-2014-03-01-101615.png)

Create a **Server Key** and just click **Create** on the following page (i.e. leave the ‘Accept requests from there server IP addresses’ box empty). You’ll now have an API key you can use with the extension which will give you a personal request limit.

![Screenshot of Developer Console with Key](/images/blog/2014/03/Screenshot-from-2014-03-01-102205.png)

Just copy and paste the API Key into the extension options and you’ll be well away!

![PageSpeed Insights Chrome Extension Working](/images/blog/2014/03/Screenshot-from-2014-03-01-102512.png)

Orig. Photo: <https://flic.kr/p/6YuriA>