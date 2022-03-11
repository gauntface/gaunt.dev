---
title: "Cloudflare, AWS API Gateway & Custom Domains"
excerpt: "After receiving 'Not Found' errors from my Lambda function with API gateway, I was at a loss as to what was wrong. Turned out it was a Cloudflare configuration issue."
mainImage: "/images/blog/2022/2022-03-11/flare.jpg"
mainImageAlt: A monochromatic image of a personal holding up a flare with red smoke coming out of it.
date: "2022-03-11T09:57:00-07:00"
updatedOn: "2022-03-11T09:57:00-07:00"
---

# Cloudflare, AWS API Gateway & Custom Domains

I've been playing with AWS Lambda on and off for a while, using SAM to
deploy my lambda and access it through a custom domain.

Everything had been working fine until I recently changed the naming
of my API gateway and switched from a `RestAPI` to a `HttpAPI` for my
lambda functions.

My functions would work when I called them through the *Invoke URL*, however
if I tried calling the same lambda function via the *API Gateway domain name*
or via the custom domain name, I would get no response or a "Not Found" error.

```
{"message":"Not Found"}
```

Somewhere in my changes, possibly to do with the move to `HttpAPI`, the issue
was the configuration of Cloudflare.

I have my SSL/TLS set to "Flexible" because I have sites hosted via S3,
however, my API Gateway needed this to be "Full" to work.

![Cloudflare settings for SSL/TLS set to flexible](/images/blog/2022/2022-03-11/cloudflare-flexible-tls.jpg)

If you can switch your default to "Full" that may solve your problems. For
me I had to create a "Rule" in Cloudflare so that all requests to the API
Gateway would use "Full" encryption.

![Cloudflare settings showing a page rule to upgrade to full TLS](/images/blog/2022/2022-03-11/cloudflare-page-rules.jpg)

The rule I used was `focus-api*.gaunt.dev/*`, and the settings were `SSL` and
`Full`.

![Cloudflare page rule settings](/images/blog/2022/2022-03-11/cloudflare-rule-edit.jpg)
