---
title: "New version of gauntface.com"
excerpt: "An overview of the stack used for the latest version of gauntface.com, which includes Hugo, AWS, GitHub actions, and a Go program."
mainImage: "/images/blog/2020/2020-05-01/begin-cup.jpg"
mainImageAlt: Coffee cup with "begin" written on it.
date: "2020-05-01T12:00:00-07:00"
updatedOn: "2020-05-01T12:00:00-07:00"
---

# New version of gauntface.com

There is a general cadence for me to change my site once every year or two, either because I
get tired of the look of it, or the stack is just not working for me.

## Old stack

The previous version of my site was using a custom-built static site generator, and I bailed on
it because I was starting to want features that were common in all other static site generators
and I couldn't justify the work.

The reason I had built the generator was because I had this idea of templates being able to define the CSS and JS they needed, and as part of the template generation, the CSS and JS would be added based on the templates used. The templating library I created worked well enough, but there were enough rough edges of the static site generator that it was a "death by a thousand papercuts" kind of feeling.

The other details of the tech I used:

- Hosted on [Netlify](https://www.netlify.com/)
- [Custom static site generator](https://github.com/gauntface/hopin-static-site)
- Markdown for content
- [Gulp](https://gulpjs.com/) for asset compilation & minification
- [Typescript](https://www.typescriptlang.org/) for in page JS
- [PostCSS](https://postcss.org/) for styles

## New stack

The new stack has some old and new in it and the biggest driver for the change was to switch to
a widely used static site generator, which resulted in:

- ✨ Hosting on [AWS](https://aws.amazon.com/)
- ✨ [Hugo](https://gohugo.io/) for static site generation
- ✨ Custom scripts from ["go-html-asset-manager"](https://github.com/gauntface/go-html-asset-manager) 
    for production builds
- 👌 Markdown for content
- 👌 [Gulp](https://gulpjs.com/) for asset compilation & minification
- 👌 [Typescript](https://www.typescriptlang.org/) for in page JS
- 👌 [PostCSS](https://postcss.org/) for styles

That's three new (✨) things and a bunch of tools I've stuck with (👌).

I stuck with markdown, Gulp, Typescript, and PostCSS because they all work for me without any issues.

Now, why the changes?

### AWS for hosting

A desire to learn AWS drove the move from Netlify. Netlify has a fantastic feature set and 
I'd still recommend it to folks if they haven't tried it. (I may go back once I get a feel for
the average cost of AWS).

AWS Hosting is simple, store the site in an S3 bucket with Cloudfront for the CDN, you 
can [learn more in this post](/blog/2020/static-site-hosting-on-aws/).

The deployment of the site is managed by 
[a GitHub Action](https://github.com/gauntface/gauntface.com/blob/master/.github/workflows/publish.yml)
so I didn't lose the auto-deploy feature that Netlify provided.

### Hugo for site generation

After working in golang for the past few years, I wanted to try [Hugo](https://gohugo.io/); I'd heard nothing but good things about it, so why not.

The performance of Hugo is fantastic. My site builds in < 3s containing ~150 posts and the dev 
server can update individual pages in < 200ms.

[Theming in Hugo](https://gohugo.io/hugo-modules/theme-components/) has been fun to work with 
because you can apply more than one theme, which I'm using to have a "base" theme and a site 
specific theme. The base theme includes common partials, layouts, etc. used by multiple sites
and the site-specific theme adds partials and layouts for this site, falling back to the base
theme where appropriate.

### Custom script: go-html-asset-manager

`go-html-asset-manager` is a Go program I created to help optimize my site without
needing to change the content or tying myself to Hugo for site generation.

Some of the operations it performs:

- Generates multiple sizes and types of images
- Replaces `img` tags to `picture` elements
- Wraps iframes in `div`s to maintain aspect ratio
- Replaces YouTube iframes with a still frame and load the iframe asynchronously
    - H/T to [@addyosmani](https://twitter.com/addyosmani) for showing my 
        [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)
- Adds CSS & JS

A lot of these operations are simple translations. The injection of the CSS & JS is probably the
most quirky part of my site.

During a dev build of my site the `go-html-asset-manager` script isn't used, instead 
one of my themes adds **all* of the CS and JS files.

The template looks a little like this:

```go
{{- define "base-load-dev-assets-dir" -}}
  {{- range (readDir $.dir) -}}
    // Add file to the rendered template if it's a CSS or JS file
  {{- end -}}
{{- end -}}

{{ if (not (eq hugo.Environment "production")) }}
  {{ range (slice "/themes" "/static") }}
    {{ if (fileExists .) }}
      {{ template "base-load-dev-assets-dir" (dict "dir" .) }}
    {{ end }}    
  {{ end }}
{{ end }}  
```

This will add `<script src="<file>">` and `<link rel="stylesheet" href="<file>">` to
the `head` of the rendered page. The approach is great for local development, just adding a CSS 
or JS file ends up being loaded on every page. It is the worst thing to do for performance,
illustrated in the video below, where I throttle the network connection.

<iframe src="https://player.vimeo.com/video/414996851" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

~19s for DOM content loaded and ~33s for the page to fully load.

In production build of my site no styles or scripts are added to the pages, it is
left up to `go-html-asset-manager` to add the assets and it does in the following
way.

1. For each HTML file,  the script generates a set of "keys" consisting of HTML tags, class names 
    , and attribute keys.
1.  It searches for CSS and JS files and categorizes them based on the file names format:
    1. `<key>.<css | js>`: Files that match a key without a suffix are inlined in the page, wrapped in `<style>` or `<script>` tag.
    1. `<key>-sync.<css | js>`: Blocking assets have the `-sync` suffix added as `<script>` or `<link>` tags.
    1. `<key>-async.<css | js>`: These files are added to the body of the page and loaded asynchronously. For Javascript files, this relies on `async defer`
        attributes. CSS is loaded asynchronously by Javascript.
    1. `<key>-preload.<css | js>`: Will add a `link` tag with `rel="preload"`.

This naming convention for files has worked out well. I stick to a 
[BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
naming convention for classes and just looking at my files I can tell what is going
to happen to a page.

Pages have excellent performance when run through page speed and dev tools:

<iframe src="https://player.vimeo.com/video/414998702" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

~2s for DOM content loaded and ~7s for the page to fully load.

The **good part** of `go-html-asset-manager` is that the content and themes remain
simple, and the final site is performant, plus this tool is agnostic to the site generator used to generate the initial HTML.

The **bad part** of `go-html-asset-manager` is that some of the mutations can cause differences
in the final appearance. For example, wrapping iframes to ensure a 4:3 or 16:9 aspect ratio
can be different from the development builds, which show the iframe added to the markdown file.

## What next

Overall I've been pleased with this setup, and it's made it easy to improve the
performance of my site in a consistent way.

I don't have too much planned for the current set up outside of improving the development of
style guides for my themes, which are still a little iffy to develop.