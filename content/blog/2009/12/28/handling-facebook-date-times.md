---
title: "Handling Facebook Date/Times"
excerpt: "Facebook has some weird defaults for date, so here is a short and sweet guide on how to handle them"
mainImage: "/images/blog/2014/06/30/1717899661-5e8fb0f10a-o.jpg"
primaryColor: "#9e9e97"
date: "2009-12-28T16:19:32-08:00"
updatedOn: "2009-12-28T16:19:32-08:00"
slug: "handling-facebook-date-times"
---

# Handling Facebook Date/Times

![Facebook Logo](/images/blog/2009/12/logo_facebook.jpg "300")

Today I was playing around with the facebook api and needed to extract the date and time for each event. When you look at the value from the api call, you get something along the lines of:

1262028000

For the date of the event from the facebook event page, is 28th Dec 09 11:20, so what is the result above all about? Well it's [Unix Epoch Time](http://en.wikipedia.org/wiki/Unix_time#Definition) representation of the time, however the wonderful folks of facebook convert the time into pacific time, before then converting it to Unix Epoch time. So in php to extract the date/time in your local time zone do the following:

```php
date_default_timezone_set('America/Los_Angeles');
$startDate = date('d m Y H:i', $eventInfo['start_time']);
```

and this will give you a time like this:

28 12 2009 11:20

I can't take any of the credit for this, all of it has to go marc2003 over at [forums.overclockers.co.uk](http://forums.overclockers.co.uk/showthread.php?t=18095238).

Anyone looking for more info on handling facebook events api I strongly recommend this site - <http://www.phpeveryday.com/articles/Facebook-Programming-API-Events-P852.html>
