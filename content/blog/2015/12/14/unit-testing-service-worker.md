---
title: "Unit Testing a Service Worker"
excerpt: "Service workers can lead to some weird behaviours if edge cases are accounted for so how do you test these edge cases?"
mainImage: "/images/blog/2015/2015-12-14/sw-unit-test.jpg"
primaryColor: ""
date: "2015-12-14T13:03:03-08:00"
updatedOn: "2015-12-14T13:03:03-08:00"
slug: "unit-testing-service-worker"
---

# Unit Testing a Service Worker

After reading a few discussions on Twitter and discussing some of the pro and cons of sw-toolbox and sw-precache with [Mat Scales](https://twitter.com/wibblymat) and [Jeff Posnick](https://twitter.com/jeffposnick), I realised I had no idea of half the edge cases that exist when it comes to using SW.

In a vain attempt to note some of these down I went about writing a set of unit tests.

While the end result a set of fictitious service worker unit tests which you can find up on Github - [sw-unit-test-sample](https://github.com/GoogleChrome/sw-unit-test-sample).

People who might find this interesting:

1. Currently using SW and curious about what a test could look like
1. Curious about what edge cases exists

If you aren't in one of those groups, this may be a tedious read.

# Type of Tests

Once I started working on this a few groups of tests naturally revealed themselves.

## HTTP Cache Headers

One common example of an edge case was the use of HTTP Cache Headers and the [cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache).

When you make a fetch request from a service worker it will still make use the HTTP cache. As a result if an asset is served with a long life HTTP cache header, it's cached in the HTTP cache and then changes, the service worker won't get the latest changes.

This seems to be a common misconception.

*sidenote: Having DevTools open with caching disabled will skew your results*

## Service Worker Lifecycle

Some of the big questions I had was around how to illustrate what [sw-precache](https://github.com/GoogleChrome/sw-precache) does.

It has an insanely aggressive and well thought through caching story. The idea is that assets should be cached and not updated until a file is created or updated and new service worker is pushed. This is all possible because of the file revisioning that sw-precache adds in.

I've tried to sum up the most basic example with the following asset lists where "service worker 1" would be the first service worker a user would get and "service worker 2" would be an updated service worker the user receive on a future visit.

**Service worker 1**

```javascript
var installList = [
  '/example/file/shared/1',
  '/example/file/shared/2',
  '/example/file/upgrade/1',
  '/example/file/upgrade/2',
  '/example/file/remove/1',
  '/example/file/remove/2'
];
```

**Service worker 2**

```javascript
var installList = [
  '/example/file/shared/1',
  '/example/file/shared/2',
  '/example/file/upgrade/1',
  '/example/file/upgrade/2',
  '/example/file/new/1',
  '/example/file/new/2'
];
```

The idea of this test is that each url represents what the cache should do during the upgrade.

- /example/file/shared/*
    - These assets should not get updated, and by that I mean the service worker shouldn't even try to cache an update, this is vital if you are intending to save as much data as possible.
- /example/file/upgrade/*
    - This asset has changed between the two service workers and the cache **needs** updating.
- /example/file/{new | remove}/*
    - This is just a stupid naming convention so I can ensure that the *remove* urls are no longer cached and *new* exists only in the new cache list.

Reading this as a developer it's kind of obvious of the end goal of these URLs, but accounting for HTTP caches, file revisioning (or lack of) and being new to the service worker API, it isn't as simple as it may first seem.

This is intentionally a failing (and stupid) test in the repo to see if a library like sw-precache could account for these changes.

## HTTP Status Codes

Talking with Jake this morning I learnt that cache.addAll() will actually cache a 404 response. I thought failed requests, including 404, would cause addAll to reject. I'll hopefully get some time to add a few test cases in for this.

# How to Test

Take a lot of this with a pinch of salt in terms of what might actually be useful for you. These are fictitious examples being tested with no clear goals other than to explore different behaviours.

To the best of my knowledge there is no headless browser which supports Service Workers which means you need to run these tests in a browser with SW support (Chrome or FF Nightly). That means Mocha and Chai running in the browser. I grabbed the dependencies from Bower for this - See [.bowerrc](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/.bowerrc) and [bower.json](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/bower.json#L20).

I ended up creating a number of simple helper methods that would perform specific tasks (See: [helper-functions.js](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/front-end/scripts/helper-functions.js)). Tasks like registering a SW and wait until its installed, register a SW and wait until it's activated and get all the cached assets are here to keep the tests simple and easy to read.

The actual tests that use these methods exist in the [/tests/ directory](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/tests/test.sw.js).

Before each test there is a callback which unregisters all service workers and clears all caches.

```javascript
beforeEach(function(done) {
  Promise.all([
    SWTestHelper.unregisterAllRegistrations(),
    SWTestHelper.clearAllCaches()
  ])
  .then(() => {
    console.log('\n\n----\n\n');
    done();
  }).catch(done);
});
```

This results in a clean state at the start of each test.

## Testing Caches

Testing the contents of a cache is fairly simple since we are running our tests inside aweb  page which has access to the caches directly.

My very first attempt at testing service workers was to write an API that would create a service worker will with files in a certain format / with certain behaviours. If you look at the tests you'll see some URL's that look like the following:

```
/sw/:fileCache/:fileRev/:cacheId/:numOfAssets
```

- fileCache: defines if the file should have a long life HTTP cache header
- fileRev: determines if the files in the service worker would be given a file revision of some kind
- cacheId: just adds a number to the cache name so it's easy to access the cache
- numOfAssets: defines how many files to cache in the install step

This endpoint will then return a service worker template with a populated install list (Template is Here)[https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/sw-tmpl.js].

This meant I could toggle cache headers and file revisioning quickly. In hind sight - lot of effort for little gain, but a nice illustration of different scenarios that could arise.

Given this URL, I went about testing how the HTTP cache would affect a service worker so I register two service workers. The first warms up the HTTP cache and the second then pulls int he same assets. The cached files should all be unique, if there is a match between the caches then the HTTP cache has handled a response.

```javascript
it('should update cached assets with same file names and no cache headers.', function(done) {
  var firstCachedAssets = [];
  SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/1/3')
  .then(() => {
    return SWTestHelper.getAllCachedAssets(CACHE_NAME_1);
  })
  .then((cachedAssets) => {
    firstCachedAssets = cachedAssets;
    return SWTestHelper.installSW('/sw/no-file-cache/no-file-rev/2/3');
  })
  .then(() => {
    return SWTestHelper.getAllCachedAssets(CACHE_NAME_2);
  })
  .then((cachedAssets) => {
    var cachedAssetsKeys = Object.keys(cachedAssets);
    for (var i = 0; i < cachedAssetsKeys.length; i  ) {
      var key = cachedAssetsKeys[i];
      if (!firstCachedAssets[key]) {
        // Nothing to compare so latest cached asset must be unique
        continue;
      }

      if (cachedAssets[key] === firstCachedAssets[key]) {
        throw new Error('Two results match in text');
      }
    }
  })
  .then(() => {
    done();
  }).catch((err) => {
    done(err);
  });
});
```

The main *gotchas* this revealed when I first wrote this test are:
- You need to ensure you unregister service workers between tests. In [SWTestHelper.installSW()](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/front-end/scripts/helper-functions.js#L75) I can rely on `registration.installing` existing because I ensure that unregistering always occurs before each test.
- Opening a cache will create the cache if it doesn't exist. This meant I hit some weird scenarios where tests were passing because I was passing in the wrong cache name in the test and as a result a cache was opened with no assets. I altered [SWTestHelper.getAllCachedAssets()](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/front-end/scripts/helper-functions.js#L153) to check the cache exists and throw an error if it didn't to account for this in each test.

## Test Upgrades

One path users will experience when using a sw enabled site is a service worker update. This will likely require removing old cached assets, adding new ones, leaving some assets alone and updating others.

I had a crack at [writing one test to cover this](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/tests/test.sw.js#L369).

For this it was easier to register specific service worker files (/sw-upgrade-test-1.js & /sw-upgrade-test-2.js) and examining the resulting caches contents. This is where the urls I described earlier came in: /shared/, /upgraded/, /removed/ & /new/.

This is almost identical to the previous test except the comparison of the cached assets at the end of the test is different.

## Test Fetch Event

The second feature of service workers is test is the fetch event itself. It's easy to imagine scenarios where some URL's should always be cached and some requests that should never touch the cache.

This is where things got a tad hairy.

For a service worker to intercept a network request from a web page it needs to be controlling the page. This is ok, because from a service worker we can call [claim()](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/data/sw-fetch-test.js#L41) which will start controlling any page under the service workers scope immediately.

This worked just fine when I let the service worker control the page running the tests......but it was only file for the first test.

A problem arose when I tried to register the same service worker for a second test. "Unregistering" a service worker doesn't mean its actually dead, it just means the service worker is waiting to be killed off, not what I expected. Furthermore, registering the same service worker meant that the old service worker waiting to be killed would come back to life, which meant it never went through the install step again.

The way I got around this isn't pretty. In the tests for fetch I create an iframe and add it to the DOM (See [createNewIframe() for more info](https://github.com/GoogleChrome/sw-unit-test-sample/blob/master/front-end/scripts/helper-functions.js#L19). The URL of the iframe is then set to:

```javascript
newIframe.src = '/test-iframe/'   Math.random();
```

Where `/test-iframe/*` just returns a plain old HTML file -> it does nothing. When I register a SW in a test, I set the scope to be the same as the iframe's URL.

```javascript
var options = {scope: './'};
var iframe = document.querySelector('.js-test-iframe');
if (iframe) {
  options = {scope: iframe.contentWindow.location.pathname};
}
```

*Internet high fives to [Jake Archibald](https://twitter.com/jaffathecake) for pin-pointing this issue*

This means that when the service worker calls `claim` it won't claim the page running the tests, but instead claim the iframe. To test then test  the fetch event of a service worker, we enter another delightful hack.

```javascript
// Activate the service worker
return SWTestHelper.activateSW('/sw-fetch-test.js')
  .then(() => {
    // Call the iframes fetch event so it goes through the service worker
    return iframe.contentWindow.fetch('/echo/test-2');
  });
```

Yup. Grab the iframe, and call fetch on the contentWindow. The alternative to this would be to send messages between the parent page and the iframe to manage these fetches, but that would be messier compared to the above approach.

The extra bonus of this is there is little risk of overlapping service workers when registering and unregistering due to the random URL.

# Improvements

Things that could be improved:

- Actual tests. I can see how these types of test apply to a library, but testing an individual sites service worker is a little harder to picture.
- The fetch testing is weird enough that I'm inclined to explore finding a way to trigger a fetch event directly on the service worker rather than through fetch events in a page.
- It still needs to be run in an actual browser. I would love to be able to run these kinds of tests through something like phantom JS so they could be added to CI's like Travis.

If nothing else, this has been insanely useful for cleaning up some of my thoughts around SW. I'm still Noobish enough that I had made a number of assumptions that simply don't hold.

Hopefully this will be a stepping stone in the creation of unit tests for SW libraries.