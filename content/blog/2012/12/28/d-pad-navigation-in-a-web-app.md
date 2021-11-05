---
title: "D-Pad Navigation in a Web App"
excerpt: |
  The main method of input for a TV based device is the D-Pad.

  Up, Down, Left and Right.

  How should you handled this in a web app?
mainImage: "/images/blog/2014/06/15/8386216143-d1f90d1204-o.jpg"
primaryColor: "#7c8c94"
date: "2012-12-28T11:31:04-08:00"
updatedOn: "2012-12-28T11:31:04-08:00"
slug: "d-pad-navigation-in-a-web-app"
---

# D-Pad Navigation in a Web App

![Google TV Web App Native Sample](/images/blog/2012/12/Web-App-D-Pad-Navigation.png)

<hr />
<strong>Note:</strong> I've created a library to make this easier, please see this post for info - <http://blog.gauntface.co.uk/2014/01/14/quick-d-pad-navigation-in-a-web-app/>
<hr />

Anyone developing an application for any platform should consider their UI from the outset, which relies heavily on understanding how people will interact with their app.

With Google TV and indeed many other TV platforms, the main mode of navigation is the humble and well established D-Pad.

![Remote D-Pads](/images/blog/2012/12/Remote-D-Pads.png)

The real question is, how can you make your website suitable for navigation via a D-Pad?

  1. Mike Hostetler's Keyboard Navigation Plugin for jQuery - <https://github.com/mikehostetler/jquery-keynav>

    * This is really helpful to get going but can have some limitations for complex UI's

  2. Role your own solution

    * This is one hell of a leap from the first option, but I ended up taking this approach for a recent piece of sample code - [https://code.google.com/p/googletv-android-samples/](https://code.google.com/p/googletv-android-samples/source/browse/#git%2FWebAppNativePlayback%253Fstate%253Dclosed)

When creating a sample application to demonstrate how to communicate between a WebView and a native application. I used the original Google TV template and then altered it and part of the changes made, was to switch the way focusing was handled.

## Role Your Own Solution - One Approach

The approach taken was to have a controller class which would handle where the focus was and where it moved to when certain keys were pressed.

### FocusController.js

On instantiating the class, a method would bind the keyevents to the method `onKeyDown()`.

```javascript
/**
 * focusController.js
 *
 * This controller will take care of determining where the focus moves when
 * a key press or mouse movement has occurred
 *
 * @constructor
 */
function FocusController() {
    ...

    // Set up binding to listen for key presses
    $(document).bind('keydown.keycontroller',
        function(e) {
            this.onKeyDown(e);
        }.bind(this)
    );

    ...
}
```

The `onKeyDown()` method would then parse the keys and perform the relevant action (either move focus or handle the enter key).

```javascript
/**
* focusController.js
*
* On a key press this method will handle moving the focus
* @function
* @param {int} event Browser key code
*/
FocusController.prototype.onKeyDown = function (event) {
  switch(event.keyCode) {
    case 9:
      // Tab
      break;
    case 37:
      // Left
      this.moveFocus({x: -1, y: 0});
      break;
    case 38:
      // Up
      this.moveFocus({x: 0, y: 1});
      break;
    case 39:
      // Right
      this.moveFocus({x: 1, y: 0});
      break;
    case 40:
      // Down
      this.moveFocus({x: 0, y: -1});
      break;
    case 13:
      // Enter
      if(this.getCurrentlyFocusedItem()) {
          this.getCurrentlyFocusedItem().onItemClick();
      }
      break;
  }
};
```

`moveFocus()` is a fairly simple method. Given the current focused item, find the element nearest to it, in the correct direction, which is done by comparing center points between each item.

```javascript
/**
* focusController.js
*
* This will take a direction vector and move the focus to the most
* appropriate item or make no change if there are no items to move to
* @param {array} direction A direction vector [x, y]
*/
this.moveFocus = function (direction) {
    // We need an item to move down from
    // TODO: Should initialise focus if not initialised
    if(!currentlyFocusedItem) {
        return;
    }

    var minItemDistance;
    var newItem;
    var minItem;
    var minItemIndex;
    for(var i = 0; i < focusableItems.length; i++) {
        newItem = focusableItems[i];
        if(newItem == currentlyFocusedItem) {
            continue;
        }

        var itemDistance = calculateElementDistance(currentlyFocusedItem, newItem, direction);
        if(itemDistance >= 0 && (minItemDistance === undefined ||
            itemDistance < minItemDistance)) {
            minItemDistance = itemDistance;
            minItem = newItem;
            minItemIndex = i;
        }
    }

    if(minItemIndex >= 0) {
        this.handleFocusChangeToItem(minItemIndex);
    }
};
```

As you can see, when a new item is found, the `handleFocusChangeToItem()` method is called, which switches the focus state accordingly.

```javascript
/**
* focusController.js
*
* This method performs a change of focus to the item index
* @param {int} itemIndex
*/
this.handleFocusChangeToItem = function (itemIndex) {
    if(currentlyFocusedItem) {
        currentlyFocusedItem.setFocusState(false);
    }

    var focusableItem = this.getFocusableItem(itemIndex);
    focusableItem.setFocusState(true);

    currentlyFocusedItem = focusableItem;
};
```

The items considered for gaining focus are maintained in a list via two methods for adding and removing focusable items. The add method has a little extra source which manages mouse events occurring on the element.

```javascript
// focusController.js
...

    /**
    * Remove a focusable item from the controller
    * @param {FocusableItem} item The item to remove
    */
    this.removeFocusableItem = function (item) {
      for(var i = 0; i < focusableItems.length; i++) {
        if(focusableItems[i] == item) {
          focusableItems.splice(i, 1);
          return true;
        }
      }
      return false;
    };

...

/**
* This method will add a focusable item to the controller
* @function
* @param {FocusableItem} item Focusable item to be handled by this
* FocusController
*/
FocusController.prototype.addFocusableItem = function (item) {
  if(this.isFocusableItem(item)) {
    return;
  }

  var itemIndex = this.getFocusableItemCount();
  this.pushFocusableItem(item);

  // This is essentially the dom element of the focusable item
  var element = item.getElement();
  element.bind('mouseenter.keycontroller', {itemIndex: itemIndex}, function(event) {
    if(this.isMoving()) {
        return;
    }

    var itemIndex = event.data.itemIndex;
    this.handleFocusChangeToItem(itemIndex);

    event.stopPropagation();
  }.bind(this));

  element.bind('click.keycontroller', {itemIndex: itemIndex}, function(event) {
    if(this.isMoving()) {
        return;
    }

    var itemIndex = event.data.itemIndex;
    if(this.getCurrentlyFocusedItem()) {
        this.getCurrentlyFocusedItem().onItemClick();
    }
  }.bind(this));
};
```

### FocusableItem.js

This is a good point to introduce the FocusableItem class. This is intended to act as an interface which the FocusController can use to call the relevant methods on an item.

```javascript
// FocusableItem.js

// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This class is intended to be inherited by all classes which are going to
 * handle focusing on elements
 *
 * @constructor
 * @param {DOMElement} domElement The dom element to assosciate with this
 * focusable item
 */
  function FocusableItem(domElement) {
  var element = domElement;
  var focusState = false;

  /**
  * Get the focusable DOM element
  */
  this.getElement = function () {
    return element;
  };

  /**
  * Set the focus state of this item
  * @param {Boolean} isFocused
  */
  this.setFocusState = function (focus) {
    focusState = focus;
    this.onFocusStateChange(focus);
  };
}

/**
* This is a callback method when the focus state has changed
* @function
* @param {Boolean} isFocused
*/
FocusableItem.prototype.onFocusStateChange = function (isFocused) {
  // NOOP
};

/**
* Callback for when the item is clicked
* @function
*/
FocusableItem.prototype.onItemClick = function FocusableItem_onItemClick() {
  // NOOP
};
```

As you can see, it's a particularly thin interface and the main methods you need to implement are `onFocusStateChange` and `onItemClick`. An example implementation of these two methods can be seen below.

### GridFocusableItem.js

```javascript
// GridFocusableItem.js

// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

GridFocusableItem.prototype = new FocusableItem();

/**
 * This is a Focusable Grid Item. It handles the focusing and defocusing of
 * the video thumbnails.
 *
 * @constructor
 * @augments FocusableItem
 * @param {DOMElement} element The DOM element of the Focusable Item
 * @param {String} containerId Container ID of the Focusable item
 */
function GridFocusableItem(element, contId) {
  FocusableItem.call(this, element);

  var classStates = {
    focused: "grid-item-active"
  };
  var itemClickCallback = null;
  var containerId = contId;

  /**
  * Set's a callback method for when the item is clicked
  * @param {function} callback
  */
  this.setOnItemClickCallback = function (callback) {
    itemClickCallback = callback;
  };

  /**
  * Get the item click callback
  */
  this.getOnItemClickCallback = function () {
    return itemClickCallback;
  };

  /**
  * This returns an object with class names associated to each state
  */
  this.getClassStates = function () {
    return classStates;
  };

  /**
  * This is the container ID of the focusable DOM element
  */
  this.getContainerId = function () {
    return containerId;
  };
}

/**
* Callback when the objects focus state changes
* @param {Boolean} isFocused
*/
GridFocusableItem.prototype.onFocusStateChange = function(isFocused) {
  var element = this.getElement();
  if(isFocused) {
    element.addClass(this.getClassStates().focused);

    // Scroll into view
    var itemRootParent = $("#"+this.getContainerId());
    var elementWrapper = element.parent();

    var offsetAmount = elementWrapper.position().top +
    elementWrapper.outerHeight(true) -
    itemRootParent.outerHeight(true);

    if(offsetAmount > 0) {
      itemRootParent.stop().animate({
        scrollTop: itemRootParent.scrollTop() + offsetAmount
      }, 500);
    } else if(elementWrapper.position().top < 0) {
      itemRootParent.stop().animate({
        scrollTop: itemRootParent.scrollTop() + elementWrapper.position().top
      }, 500);
    }
  } else {
    element.removeClass(this.getClassStates().focused);
  }
};

/**
* Callback when the object is clicked
*/
GridFocusableItem.prototype.onItemClick = function() {
  if(this.getOnItemClickCallback()) {
    this.getOnItemClickCallback()();
  }
};
```

You can see how the GridFocusableItem class reacts to calls to `onFocusStateChange()` and `onItemClick()`.

In the `onFocusStateChange()` a class is added or removed to the DOM element, as well as scroll to the element within it's parent container. The `onItemClick()` simply executes a callback method.

## A Step Back

To bring things back into perspective, the best way to think of this is to think of a FocusableItem as nothing more than a wrapper class around a DOM element, which makes it possible to have a controller manage the state of these items.

The way I use the FocusController for adding a removing items, is to have a controller class for each section of the UI and it's these classes which will add elements to the DOM tree as well as remove them and as they do, they will need to add or remove items from the FocusController.

## Sum Up

The main advantage of this approach is the amount of control you as a developer have through the numerous methods you can override. The drawback is that it requires more set-up and management.

The down sides to this implementation is that if you have a vast amount of elements in your UI, comparing every element for the closest one isn't efficient. There is also no checks on Z-index, this should be something which can be added into the FocusController, hopefully without too much trouble in the future.

If you want to see how this all fits together, look at index.js and see where the FocusController is instantiated and used.

What do you think? If you have a different approach, let me know, if you use this approach, let me know ;)

Orig. Photo: [https://flic.kr/p/dM4xTv](https://flic.kr/p/dM4xTv)