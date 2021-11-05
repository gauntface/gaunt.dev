---
title: "'Focusing' on the Web Today"
excerpt: |
  I made the mistake of digging around and looking at how you should implement focusing in a web app.
  
  I quickly found each browser has it's own quirks and has rather different behavior compared to focusing in Android.
mainImage: "/images/blog/2014/05/24/627226315-92cea10701-o.jpg"
primaryColor: "#51515f"
date: "2013-12-09T14:50:28-08:00"
updatedOn: "2013-12-09T14:50:28-08:00"
slug: "focusing-on-the-web-today"
---

# 'Focusing' on the Web Today 

![Checkbox States Masthead](/images/blog/2013/12/Checkbox-States-Masthead.png "360") 

Adding a focus state to your UI is great for accessibility on desktop, devices requiring remote control input or phones with multiple input methods, i.e. a scroll ball. 

Some elements, most notably form fields, will add an outline when a user interacts with the element. 

![Android Button Outline Touched](/images/blog/2013/12/Android-Button-Outline-Touched.png "500") ![Android Button Outline](/images/blog/2013/12/Android-Button-Outline.png "500")

A  element during and after being touched

The outline is used to display where the focus of the page currently resides. 

To remove the outline you simply use the following CSS on the elements you wish to surpress this behaviour on: 

`outline: 0;` 

To customise the state, you can add the **:focus** pseudo class. 

`.btn:focus {     outline: 0;     color: rgb(240, 227, 255);     background-color: rgb(162, 133, 197); }` 

The final option you have to play with is the **:active:focus** pseudo classes for when we click on a focused element. 

`.btn:active:focus {     background-color: lighten(rgb(162, 133, 197), 5%); }` 

Try it out @ [labs.gauntface.co.uk/focus_ux/](http://labs.gauntface.co.uk/focus_ux/) \- press tab to navigate and space to interact with the focused element. 

## Problems with Focus

In theory focus does just work, the problems come when you consider the following: 

  * When exactly should the **:focus** state be used vs using the **:active** state?
  * Are all browsers doing the same thing with these overrides?

In the example below, the checkboxes are rendered using a sprite and have a border applied to them to make the current state clear in each step of interaction: 

  * Blue: Default state
  * Red: Active state only
  * Black: Focused state only
  * White: Focus and Active state

### Desktop Browsers

![Checkbox States Across Desktop Browsers](/images/blog/2013/12/Checkbox-States-Desktop-Browsers.png "650") 

The image above was created by clicking the checkbox with my mouse twice and recording the state changes. 

In my mind Safari is doing the correct thing here, the focus state isn’t being applied to the checkbox state, as it’s being interacted with via the mouse and the **:active** state is applied when the element is clicked. 

Firefox is at least consistent with it’s application of the :active state between presses, while Chrome and Opera are falling back to the default state during a mouse is click. 

**NOTE:** Firefox will actually only apply default and **:active** states if you click fast enough, essentially doing the same as Safari. 

### Mobile Browsers

![Checkbox States Across Mobiles Browsers](/images/blog/2013/12/Checkbox-States-Mobiles-Browsers.png "650") 

This is a set of states when touching the checkbox. 

Applying the **:active:focus** state after the first touch, is what desktop should be doing if it decides to apply the focus state. 

It still feels like Safari is doing the right thing here. Both desktop and mobile Safari follow this pattern of applying and removing the active state. When I interact with the keyboard, then follow the pattern of applying both the **:focus** and **:active** states. 

## State Differences Aside..

Let's pretend that the argument of which of these behaviours is correct was agreed upon and all browsers followed the same convention, the next question is, what elements should be given focus? 

It's hard to describe how each browser reacts to the different elements on the page and how it applies **:focus** pseudo class, so I recorded a short clip of four browsers, showing how each handles focusing. 

On each browser I hit tab to **:focus** on an element and hit space to select each focusable element. 

### tldr

  * Chrome is the only browser which will let you focus on an anchor element by default,but you can't use the space key to select the element, you have to use the enter key
  * Firefox doesn't actually apply the **:active** state when pressing the space bar on any of the focusable elements
  * Safari by default only lets you focus on input fields, but there is an option to enable focusing across all elements

## Fin.

There are a couple of things to take away from all this, today you can use the **:focus** state, but don't be surprised if there are some differences between browsers. 

Setting a state for **:active** and **:focus** should be done to highlight the change in state, but it would be wise to keep them fairly close to your overall design, in the example here, a dramatically different color was used just for focus and it's jarring on desktop, going from the purple 'focused' color to the green shades used for 'default' or 'active' state. 

Personal preference is that **:focus** state should only be applied when using hardware input. This may be a hangover from developing on Google TV, where the focus color's can be quite separate from the default colors. Android would typically go for a set of states like so: 

![Android Touch Feedback States](/images/blog/2013/12/touch_feedback_states.png "750") 

There is the option to define a **tabindex** which can be used to indicate to the browser that you want an element to be focusable. Applying this to all the elements caused Opera to match the same behaviour as Chrome (it would focus on the anchor), where as Firefox and Safari didn't change. It still seems unprecedented that a UI needs a tag to give it the ability to be focused on an element which is inherently interactive. 

Looking at [WhatWG's stance on focusing](http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#focus) it's fairly vague on the specifics of what a vendor must make focusable, as well as when the focus state should be applied (i.e. on mouse click, screen touch, keyboard tab, etc). 

The desktop and mobile browsers use of focusing for clicking and touching doesn't offer anything to the user, the main point of focus is on their mouse cursor or finger. Compare to a hardware keyboard, you can appreciate that a large change in UI would be helpful to guide the user as to where in your UI they should be focusing on. 

### For Bonus Points: What I'd Love to See States Do

The biggest problem with this is the input field - generally it's accepted that on a focus event you can show tool tips, on blur you can do error checking, but with pseudo classes and events being tied together, this wouldn't be possible in my personal preference for state behaviour.

[Full the Image Here](/images/blog/2013/12/User-Interactions-and-State-Changes.png)

![](/images/blog/2013/12/User-Interactions-and-State-Changes.png "500")

Orig. Photo: https://flic.kr/p/XqGwP