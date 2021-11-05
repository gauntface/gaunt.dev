---
title: "PageSpeed Quirks & Google Plus Sign In"
excerpt: "When trying to use the Google+ Sign In button on my site, I found a few difficulties at making it happy with PageSpeed Insights and put down a few notes."
mainImage: "/images/blog/2014/05/24/gplus.jpg"
primaryColor: "#8ade95"
date: "2014-03-13T21:11:29-07:00"
updatedOn: "2014-03-13T21:11:29-07:00"
slug: "pagespeed-quirks-google-plus-sign-in"
---

# PageSpeed Quirks & Google Plus Sign In

![Loading Animation](/images/blog/2014/03/be60d6ac-d4f2-426b-8797-53dd4e5a836f.png "605")

For the back-end of my blog I wanted to use Google+ sign-in so that I didn't have to bother writing any user management logic.

I stuffed in the Javascript API, debugged an issue where the oauth2 token exchange where the PHP guide was lacking information on the subtle requirement of:

```php
$this->google->setRedirectUri('postmessage');
```

Once it was up and running, I ran PageSpeed and got 85/100.

![Render Blocking JS on PageSpeed](/images/blog/2014/03/Speed-Render-Blocking-JS.png "150")

Initial thoughts: Fine, You got me, I did a bad, what is it, oh a Javascript issue, let's fix that up, so an *async* on the Javascript and I'm up to 91/100.

![No Blocking JS](/images/blog/2014/03/No-Blocking.png "150")

The oddity here was the error message.

> ## Prioritize visible content
>
> **Your page requires additional network round trips to render the above-the-fold content. For best performance, reduce the amount of HTML needed to render above-the-fold content.** The entire HTML response was not sufficient to render the above-the-fold content. This usually indicates that additional resources, loaded after HTML parsing, were required to render above-the-fold content. Prioritize visible content that is needed for rendering above-the-fold by including it directly in the HTML response.

How do you interpret this? Every page on my site loads javascript at the bottom of my page, I've then added *async* to the script to ensure the page can load without issue and I am "Prioritising Visible Content".

The reason I'm getting this error is due to my site changing UI quite heavily from it's initial state to 'Sign In' step.

## Start with Loading Animation.....

![Loading Animation](/images/blog/2014/03/be60d6ac-d4f2-426b-8797-53dd4e5a836f.png "605")

## ....If We Aren't Signed In....

![Sign In Screen](/images/blog/2014/03/c6d5ae76-11fe-4d13-a59a-4b4887ca62de.png "605")

## ....If We Are Signed In Redirect

![Add Blog](/images/blog/2014/03/9357c611-f69e-4b48-984c-4017a7e99330.png "605")

If I drop the initial loading animation, we see a different score:

![99 PageSpeed Score](/images/blog/2014/03/99-Score.png "150")

The reason [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) is picking this up is that it's creating two screenshots during the  test. One early on in the page load and one at the end, which it compares. By removing the loading animation and displaying the sign in screen, this test passes and the remaining 1 point is around the caching of the Javascript for G+ (It's 30 minutes).

# The Moral of the Story

Take [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) with a pinch of salt if you run into this kind of issue with G+ (or any other library with comparable problems). The solution is to be predictable to your users. For me the time from loading to discovering whether or not the user needs to interact is long enough that I wanted to keep the loading animation in and I don't see it as a detriment to the user experience.

Side note: This is a niche use case, most sites can auto-sign in a user and display some content until the user wishes to invest further (i.e. browse as a guest for a bit and sign-in after exploring).

Orig. Photo: <https://flic.kr/p/a28KUS>