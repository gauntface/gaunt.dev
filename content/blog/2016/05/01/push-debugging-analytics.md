---
title: "Push Debugging & Analytics"
excerpt: "How do you add tracking for push messaging and how do you go about debugging push notifications?"
mainImage: "/images/blog/2016/2016-05-01/push-analytics-bg-darker.jpg"
primaryColor: "#800249"
date: "2016-05-01T09:59:51-07:00"
updatedOn: "2016-05-01T09:59:51-07:00"
slug: "push-debugging-analytics"
---

# Push Debugging & Analytics

A few people have asked how do to debug push messaging and how to track stats for push messaging, like push messages received or notifications clicked?

## Debugging in the Wild.

I found an app out in the wild that had a few problems and heres how I go about spotting issues.

First thing is to open the service worker panel in DevTools, which is hidden under `DevTools > Resources > Service Workers`

![Service Worker Panel in DevTools](/images/blog/2016/2016-04-29/push-analytics-1.png "800")

You'll notice that on the screenshot above there is a handy 'Push' button, and clicking it will trigger a fake push notification (this will only do something if the service worker has implemented a `push` listener).

![Forcing a fake push tickle in Chrome](/images/blog/2016/2016-04-29/push-analytics-2.png "800")

Onto the problem site, clicking the push buttonyou can start to see errors clocking up in the console.

![Errors with Push in DevTools service worker panel](/images/blog/2016/2016-04-29/push-analytics-3.png "800")

The next step is to dig into these errors, tap the inspect button which will open up a new DevTools window, this is DevTools for the service worker.

![Opening DevTools for the Service Worker DevTools](/images/blog/2016/2016-04-29/push-analytics-4.png "800")

Click on the file / line number for the error and let's pretty print it since the javascript is on a single file. This gives us a little more information / visibility on where the problem lies.

![Formatting Minified Code in Devtools](/images/blog/2016/2016-04-29/push-analytics-5.png "800")

We can see where the code is falling over, it looks like the developer is trying to get the endpoint from the subscription object and the error is thrown because the subscription object is null.

The specific piece of code is this:

```javascript
var splitEndPointSubscription = function(subscriptionDetails) {
  var endpointURL = 'https://android.googleapis.com/gcm/send/';
  var endpoint = subscriptionDetails.endpoint;
  var subscriptionId;
  if (endpoint.indexOf(endpointURL) === 0) {
    return subscriptionId = endpoint.replace(endpointURL, '');
  }
  return subscriptionDetails.subscriptionId;
}

self.registration.pushManager.getSubscription()
.then(function(subscription) {
    ... = splitEndPointSubscription(subscription);
```

This code runs as soon as the service worker is run by the browser, this will always result in an error the first time the script is loaded simply because to subscribe a user to push, you first need to register a service worker, so the first time this runs, there can't be a subscription object.

A second issue with this code is that it checks for the GCM endpoint used in Chrome, which is fine in itself, but it falls back to returning the `subscriptionId` parameter. The `subscriptionId` was removed a long time ago in Chrome when the spec changed and was only added in Chrome. In other browsers this code will always cause an error, in other words - this will break Firefox.

I was still confused about why the subscription was null after I signed up for push and triggered a fake push, to try and get some info I ran the following snippet of code in the service workers DevTools:

```javascript
self.registration.pushManager.getSubscription().then(subscription => console.log(subscription));
```

![No Push Subscriptions in DevTools](/images/blog/2016/2016-04-29/push-analytics-6.png "800")

It's definitely null, so where did the subscription object go?

It turns out that the site I was looking at registers 2 service workers (silly me for only looking at the top one and ignoring the scroll bar.

![Multiple Service Workers in DevTools](/images/blog/2016/2016-04-29/push-analytics-7.png "800")

Running the same snippet in the other service workers DevTools printed out the subscription object (although it still errored on the first run).

![Push Subscriptions in DevTools](/images/blog/2016/2016-04-29/push-analytics-8.png "800")

Why two service workers are registered I'm not sure - they seem to be the same code.

But at least we now have a working push subscription (although this code will still fail on other browsers).

That's all I'm going to say on debugging with DevTools, hopefully just the steps of navigating DevTools will help you find and fix problems in your code.

The most important things you can do if hit any issues with push / service workers:

1. If you see an error, try not to brush it off, it's easy for these to mount up and cause obscure problems, especially with service workers when you start out.
1. Know your Promises!

### Side Quest: Promises

![Side Quest Dance with Adventure Time's Jake the Dog](/images/blog/2016/2016-04-29/at-jake-dancing.gif)

When you're new to promises it's super easy to get in a bit of a pickle and I've seen it happen in a few projects (I'm still finding old code from when I first started using Promises and its a mess).

If you've not read [Jake's primer on Promises](https://developers.google.com/web/fundamentals/primers/promises/), please go check it out now.

The common mistake I see, especially in push events in a service worker, is a failure to return the promise from a `fetch()` call.

```javascript
event.waitUntil(
  doSomething()
  .then(function() {
    fetch('/some/api/')
    .then(function(response) {
      return response.text();
    })
    .then(function(responseText) {
      showNotification(responseText.title, {
        body: responseText.body
      });
    });
  })
)
```

This would have two problems. Both `fetch()` and `showNotification()` could return promises and if you don't return those promises, the chain is broken. What this means is that `event.waitUntil()` will wait for the promise to finish which will done after the fetch call is made, but not after the `fetch()`o call has finished its network request. The correct way to do the above is to add returns:

```javascript
event.waitUntil(
  doSomething()
  .then(function() {
    return fetch('/some/api/')
    .then(function(response) {
      return response.text();
    })
    .then(function(responseText) {
      return showNotification(responseText.title, {
        body: responseText.body
      });
    });
  })
)
```

I put together [a small demo here](http://bit.ly/1Ww2hRb) to try and demonstrate promise chains visually, one is broken and there a two working chains. Toggle the steps using the arrows along the top and see if you can spot what is wrong and why.

The main part is that the yellow states indicate where the primary promise is waiting for another promise to finish - notice how the top section doesn't wait for `fetch()` and moves straight onto `eventEnd()`.

![Promise Chains](/images/blog/2016/2016-04-29/promise-chains.png "800")

## Analytics All the Things!

I realised I had no analytics in [simple-push-demo](https://gauntface.github.io/simple-push-demo/) and given the problem site above had issues caused by analytics lust, how would I do it?

Well the major problem I had was figuring out how to ping Google Analytics from a service worker, but thanks to the genius that is [Alex Vaghin](https://twitter.com/crhym3), he pointed me in the direction of the [Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/reference), an easy restful API.

With this I created a small method to make sending events to Analytics nice and easy, define a `trackingId` and call the `trackEvent()` method. See the [analytics.js](https://github.com/gauntface/simple-push-demo/blob/10f8cef6e4a1e3069926602fa301a295ed9d7812/src/scripts/analytics.js) and [serviceworker.js](https://github.com/gauntface/simple-push-demo/blob/10f8cef6e4a1e3069926602fa301a295ed9d7812/src/service-worker.js) files for how it's implemented and used.

![Push Subscriptions in DevTools](/images/blog/2016/2016-04-29/push-analytics-with-events.png "800")

The most important / useful feature of it is that no matter what, it should resolve the promise it returns, in other words, it will **never error**. Tracking shouldn't get in the way of the user experience or functionality of your web app, so I wanted to make sure that sending a tracker ping wouldn't cause an error and prevent a push notification being sent.

Big thanks to [Das Surma](https://twitter.com/dassurma) for spotting some sweet tidy up and for the idea of using `Promise.all()` to kick off the tracking asynchronously with showing a notification or handling a notification click.

Check it out on the [simple-push-demo](https://github.com/gauntface/simple-push-demo).
