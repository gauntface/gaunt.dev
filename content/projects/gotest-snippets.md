---
title: "gotest Snippets"
description: "gotest-snippets is a VSCode extension that will make it a little easier to write tests in golang."
socialImg: "/images/projects/gotest-snippets/default-social.png"
githubFullName: "gauntface/gotest-snippets"
---

![Promo image for the gotest VSCode snippets extension](/images/projects/gotest-snippets/default-social.png)

[gotest-snippets](https://marketplace.visualstudio.com/items?itemName=Gauntface.gotest-snippets)
is a VSCode extension that will make it a little easier to write tests in golang by generating the majority of the boiler plate needed for common tests.

## Why?

After working in golang for several years I found myself
writing the same boilerplate over and over. This was
exacerbated when new patterns would emerge and I wanted
to update older tests.

These snippets are the ones I've grown to use regularly.

## How?

### Step 1

Download the extension from the
[VSCode marketplace here](https://marketplace.visualstudio.com/items?itemName=Gauntface.gotest-snippets).

### Step 2

Type `gotest` in a `*.go` file and VSCode should
offer you the snippets to use.

## What are the Snippets?

There are only a handful of snippets this extension
will add, all starting with the prefix `gotest`.

- **gotest**
    - Generate a table driven test
- **gotest-diff**
    - Generate a diff statement (i.e. a want/got check)
- **gotest-diffopts**
    - Generate a diff statement with options. This is equivalent to
      `gotest-diff` except it'll set up the options array.
- **gotest-main**
    - Generate a `TestMain` function with a `reset` function you can use to reset
      all global variables between tests.
- **gotest-errors**
    - Generate an error comparison.
- **gotest-errinject**
    - Generate an error to inject into test cases (useful for consistency).