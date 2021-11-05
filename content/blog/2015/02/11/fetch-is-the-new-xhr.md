---
title: "Fetch is the new XHR"
excerpt: "Fetch is a simpler way of getting resources in Javascript compared to XHR. This post is just a brain dump of how to use fetch to make requests."
mainImage: "/images/blog/2015/2015-09-17/fetch.jpg"
primaryColor: "#787986"
date: "2015-02-11T11:11:07-08:00"
updatedOn: "2015-02-11T11:11:07-08:00"
slug: "fetch-is-the-new-xhr"
---

# Fetch is the new XHR

fetch(), defined in the [Fetch API](https://fetch.spec.whatwg.org/), is a new API which allows you to make requests similar to XHR's, but has a simpler / friendly API. The Fetch API is available in [service workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) today and in the global space (a.k.a in the normal  Chrome window) if you enable the [Experimental Web Platform Features in chrome://flags](chrome://flags/#enable-experimental-web-platform-features).

After getting asked about how to make an XHR for push notifications from service worker, I realised I had never attempted to view the contents of a fetch request, so did a little mucking around and put together a few examples (largely for my own peace of mind).

# Plain Old Get Request

Request a url, get a response, happy days.

```javascript
fetch('https://gauntface.com')
.then(function(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: '   response.status);
    return;
  }

  // Examine the text in the response
  response.text().then(function(responseText) {
    console.log(responseText);
  });
})
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});
```

We start by checking the response status is 200 before examining the text of the response (assuming the response is text). Because the response of a fetch request is a stream, the [text() method consumes the stream](https://fetch.spec.whatwg.org/#dom-body-text), hence the promise.

If you run this from any page that isn't on the origin 'https://gauntface.com', then an error will be thrown, "Failed to fetch".

# TypeError: Failed to fetch

This is hands down, one of the **worst** error messages I've ever seen.

![TypeError, Yuck. Shiver.](/images/blog/2015/02/11/shivers.gif "200")

What does "TypeError" mean?
Why did it fail to fetch?
Why do you hate me?
TELL ME!?!?!?

*cough*

What this is "trying" to drive at, is that the requested asset is not on the same origin as the site that's requested it and the server isn't returning the CORs headers.

You can overcome this issue by setting the **mode** of the request to **no-cors**. This basically tell's the browser that it's still ok to get the asset despite the server not supporting CORs, _however_, the response type will be opaque for these responses, meaning you won't be able to examine the response, resulting in no idea of the status or the content of the response.

```javascript
fetch('https://gauntface.com', {'mode': 'no-cors'})
.then(function(response) {
  if (response.type === 'opaque') {
    console.log('Received a response, but it\'s opaque so can\'t examine it');

    // Do something with the response (i.e. cache it for offline support)
    return;
  }

  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: '   response.status);
    return;
  }

  // Examine the text in the response
  response.text().then(function(responseText) {
    console.log(responseText);
  });
})
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});
```

If you do have CORs enabled, it acts pretty similar to a **basic** response on your origin, except the type is **cors** and the headers you can access through the response is limited. You can check the headers with something along the lines of:

```javascript
fetch('https://some-cors-enabled-site.com/')
.then(function(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: '   response.status);
    return;
  }

  if (response.type === 'opaque') {
    console.log('Received a response, but it\'s opaque so can\'t examine it');
    return;
  }

  // Print out the headers
  response.headers.forEach(function(key, value){
    console.log('key, value = '   key   ', '   value);
  });
})
.catch(function(err) {
  console.log('Fetch Error :-S ', err);
});
```

Running the above code on the same origin will give you all the headers with the request, running it from a different origin will reduce the headers, you can [view the list of headers that will be available here](https://fetch.spec.whatwg.org/#concept-filtered-response-cors). H/T to [@annevk](https://twitter.com/annevk) for pointing this out.

# POST Request

I've only loosely tested this with [requestb.in](http://requestb.in/) (which by the way is pretty awesome).

You just need to define a method and body for the request.

```javascript
fetch('http://requestb.in/1m9rwsc1', {'mode': 'no-cors', 'method': 'POST', 'body': 'foo=bar&lorem=ipsum'})
.then(function(response) {
  if (response.type === 'opaque') {
    console.log('Received a response, but it\'s opaque so can\'t examine it');
    return;
  }

  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: '   response.status);
    return;
  }

  // Examine the text in the response
  response.text().then(function(responseText) {
    console.log(responseText);
  });
})
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});
```

# Cancelling a Fetch Request

At the moment there is no way to cancel a fetch, this is currently being discussed [on this Github Issue](https://github.com/whatwg/fetch/issues/20). H/T [@jaffathecake](https://twitter.com/jaffathecake) for this link and reviewing this post.

# Polyfill

Github has a Polyfill for fetch - how cool is that. H/T [@Nexii](https://twitter.com/Nexii) for pointing this out.

[https://github.com/github/fetch](https://github.com/github/fetch)

# C'est Fini

That's all folks, if I come up against any other oddities or useful things for fetch I'll add them here.

Orig. Photo: [https://flic.kr/p/e4Yg3f](https://flic.kr/p/e4Yg3f)