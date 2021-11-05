---
title: "D-Pad Navigation in a Web App 2.0"
excerpt: |
  Adding support for D-Pad navigation is much harder than it should be for a web application.

  I've taken some of the best bits of a sample application written for Google TV and generalised it to hopefully help others add in D-Pad support by including some additional class names and tabindexes to your HTML.
mainImage: "/images/blog/2014/07/11/8004856128-1a22b73f3a-o.jpg"
primaryColor: "#1a3e47"
date: "2014-01-14T15:27:34-08:00"
updatedOn: "2014-01-14T15:27:34-08:00"
slug: "d-pad-navigation-in-a-web-app-2-0"
---

# D-Pad Navigation in a Web App 2.0

A little over a year ago I wrote [D-Pad Navigation in a Web App](http://blog.gauntface.co.uk/2012/12/28/d-pad-navigation-in-a-web-app/). The biggest problem was it required a lot of work to get things going, so I spent a few days rewriting some of the logic into a more friendly, generic library.

<https://github.com/gauntface/dpad-navigation>

To support D-Pad navigation with this library, you need to do the following:

  1.  Download the library's javascript file from here: <https://raw.github.com/gauntface/dpad-navigation/master/build/dpad-nav-lib.min.js>

  2.  Import the javascript file into your page:

        ```html
      <script src="./scripts/dpad-nav-lib.min.js" />
        ```

  3.  Add a **tabindex** and class name **dpad-focusable** for any element you want to be focusable.

      For Example:

        ```html
      <div class="grid-item dpad-focusable" tabindex="0">
        <img class="thumb" src="./images/thumbs/thumb01.jpg" />
        <div class="title">Item 1</div>
      </div>
        ```

  4.  Apply styling in your css for the **focus** pseudo class.

        ```css
      .grid-item:focus {
        outline: none;
        background-color: rgb(149, 165, 166);
      }
        ```

  5.  Apply styling for when the user clicks on a focused element via the **clickdown** class.

      ```css
      .grid-item.clickdown {
        background-color: rgb(189, 195, 199);
      }
      ```

You should now be supporting D-Pad navigation.

# onFocus Behaviour

Once an element receives focus, you can use the focus event to scroll it into view or perform some other action.

```javascript
element.addEventListener('focus', function(e) {
  console.log('Element Focused');
}, true);
```

# onClick Behaviour

When you want to detect when an element is clicked, you use the normal click event.

```javascript
element.addEventListener('click', function() {
  console.log('Element Clicked');
}, true);
```

# Gotcha's

## Adding and Removing Elements

The way the library works is that on page load or page resize, it will calculate the graph of where each nodes closest neighbours are, based purely on each elements position in the viewport.

What the library does not do, is recalculate the graph if you add or remove elements. To support this, you need to update the elements in the graph and their connections, which is done by calling:

```javascript
window.dpadFocusController.reset();
```

## _Tabindex_ and Browser Focus

With the _tabindex_ property you can determine the order in which a view is focused when you hit the tab key. The ordering is ignored by this library, tabindex is needed to ensure the browser allows an element to gain focus, however the order will still be applied if you hit tab on the keyboard.

## Debugging

There is a debug option to display lines which indicate the link between each node.

```javascript
window.dpadFocusController.toggleDebugMode();
```

![D-Pad Navigation Library in Debug Mode](/images/blog/2014/01/Google-TV-Stuff.png "860")

# Be Gentle...

This is a first attempt at the library and I've only created simplistic tests so if you give it a go, please post issues and feature requests here: <https://github.com/gauntface/dpad-navigation/issues>.

And one last thing, pull requests are more than welcome :)

Orig Photo: [https://flic.kr/p/dcmYQQ](https://flic.kr/p/dcmYQQ)