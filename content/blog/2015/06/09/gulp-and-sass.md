---
title: "Gulp & Sass"
excerpt: "Just been toying with performance of compiling sass - some weird things I've spotted."
mainImage: "/images/blog/2015/2015-09-17/gulpandsass.jpg"
primaryColor: ""
date: "2015-06-09T16:10:49-07:00"
updatedOn: "2015-06-09T16:10:49-07:00"
slug: "gulp-and-sass"
---

# Gulp & Sass

Hopefully I'll be doing some work on the Web Fundamentals site used for hosting the Chrome team documentation.

One of the first things I wanted to tackle was styles for a few reasons:

1.) It's something I know I am going to change
2.) We currently have a ruby dependency because of Sass which I want to get rid of
3.) It's relatively simple to check if it's working, Sass goes in, CSS comes out.

Originally I started by looking at [Web Starter Kit's Gulp file](https://github.com/google/web-starter-kit/blob/master/gulpfile.js) - just to get going, then I started tinkering.

The major issue I have with WSK's (Web Start Kit) approach is that it has one task for everything, but development and final build should be different. Development is likely to need the source maps, maybe production wouldn't and development doesn't need minification.

This simple split resulted in the development version taking 1.5s to complete and the final file size was 739kb. Production took 2.39 seconds to build and producing a file size of 135kb. Two major wins - development cycle is faster and the production version is lighter.

Weirdly, adding a clean statement to remove the css files before building sped up the Sass task ever so slightly. Surprising there was much of an overhead.

One thing I want to explore is making a shared compileSassAutoprefix function make the `src` look at a directory consisting of no partials to see if this affects performance - but that requires a bigger change to the Sass structure.

```javascript
function compileSassAutoprefix(genSourceMaps) {
  return gulp.src([
      // TODO: This seems to speed up ever so slighty - maybe move imports
      // to a seperate repo to improve further by only including
      // a src of files we KNOW we want sass plugin to explore
      '!'   DIR.src.styles   '/**/_*.scss',
      DIR.src.styles   '/**/*.scss'
    ])
    .pipe(plugins.if(genSourceMaps, plugins.sourcemaps.init()))
    .pipe(plugins.sass({
      precision: 10
    })
    .on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS));
}

gulp.task('generate-dev-css', ['styles:clean'], function() {
  return compileSassAutoprefix(true)
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(DIR.build.styles))
    .pipe(plugins.size({title: 'generate-dev-css'}));
});

gulp.task('generate-prod-css', ['styles:clean'], function() {
  return compileSassAutoprefix(false)
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(gulp.dest(DIR.build.styles))
    .pipe(plugins.size({title: 'generate-css'}));
});
```