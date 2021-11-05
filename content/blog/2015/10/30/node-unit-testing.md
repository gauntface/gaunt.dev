---
title: "Node Unit Testing"
excerpt: "I'm no expert, quite the opposite, when it comes to node unit testing. I spent some time trying to figure out how to unit test a new project and here's my rough findings so far."
mainImage: "/images/blog/2015/2015-10-30/testing.jpg"
primaryColor: ""
date: "2015-10-30T16:35:23-07:00"
updatedOn: "2015-10-30T16:35:23-07:00"
slug: "node-unit-testing"
---

# Node Unit Testing

I've recently started work on a new project
<a href="http://www.urbandictionary.com/define.php?term=on my tod">all on my tod</a> and in a vein attempt to get reassurance that what I was writing worked, I started to put together some unit tests and while it's still a little messy, I figured some may find this post helpful to skip through the early stages of "OMG, WTF, ERGH, OK, Maybe?" that I went through

## The Test Runner

There a few different options that will probably crop when you first look into unit testing. [Mocha](https://mochajs.org/) seems to be fairly well respected and after nagging [@addyo](https://twitter.com/addyo) for advice it seemed to be the best fit.

Mocha is basically the tool you run that will execute each test in order and report any errors. You can grab it through npm like so: `npm install -g mocha`.

I've ended up taking the following structure with my mocha tests:

```javascript
describe('ExampleModel', function() {
  describe('someFunctionName()', function() {
    it('should do <this thing> because of <this reason>', function() {
      // Test Code Here
      assert(true);
    });

    it('should do <this thing> because of <this reason>', function() {
      // Test Code Here
      assert(true);
    });
  });

  describe('someFunctionName()', function() {
    // Some moar tests
  });
});
```

Put this in a file in a directory called `/test/`. This way, when you run the command `mocha`, it'll find all the files in `test/` and run through each test.

The reason I group the `it()` calls inside the describe is that it's easier to parse the output from Mocha.

## Passing and Failing Tests

The next thing you'll want to do is figured out how you make a test pass or fail. You can do this with the [Node Assert module](https://nodejs.org/api/assert.html). There are alternatives to `assert`, but I tend to find choice overwhelming in the land of the web, so I stuck with assert after some brief research.

The `assert` methods I've found useful for passing or failing a test are:

```javascript
assert.doesNotThrow(function() {
  // Do something here - good for testing a constructor works correctly
});

assert.throws(function() {
  // Do something here - good when you want to test an error case
  // i.e. bad input
});
```

Beyond this I ended up needing a way to test asynchronous code (i.e. code with callbacks and promises).

The way you can do this is with a callback passed into the `it()` function, like so:

```javascript
it(
  'should return one or more results because the model is mocked to',
  function(done) {
    // Test Code Here
    var testModel = new ExampleModel();
    testModel.getSomething(function(results) {
      if (results.length > 0) {
        // Pass test
        done();
      } else {
        // Fail test
        done(new Error('No results found.'));
      }
    });
  }
);
```

With this you can probably get a good amount of testing done for simple chunks of code.

## Altering a require() Response

The thing I was struggling to do after this was plan out how to test different scenarios of a database, i.e. how code would react to having no results vs some results.

To do this I used a combination of [Proxyquire](https://github.com/thlorenz/proxyquire) and [Sinon](https://github.com/sinonjs/sinon).

Proxyquire is a really handy module that allows you to require in a module and define what should be returned in any requires inside of that file.

For example, lets say I want to test ExampleModel, a test might look like this:

```javascript
var ExampleModel = require('model/example-model.js);
var exampleModel = new ExampleModel();
exampleModel.doSomething(function() {
  done();
});
```

If inside `example-model.js` I call `var mysql = require('mysql');`, it makes sense to try and override what is returned from `require('mysql');`. This is what Proxyquire allows. A new test would look like this:

```javascript
var testMysqlDriver = getTestMysqlDriver();
var ExampleModel = proxyquire('model/example-model.js', {
  'mysql': testMysqlDriver
});
var exampleModel = new ExampleModel();
exampleModel.doSomething(function() {
  done();
});
```

Now, when `example-model.js` calls `var mysql = require('mysql');`, it'll be getting the `testMysqlDriver` allowing you to control all calls without having to change how your model is written.

## Stubbing Out Methods

The final question this raises, is what if all the methods in `mysql`, or whatever module you import, are fine to be called but you want to override one function? That's where [Sinon](https://github.com/sinonjs/sinon) comes in.

Sinon allows you to mock and / or stub out methods on objects. Say I want to override the `createConnection()` method so that it returns a valid object regardless of whether the database settings were right or not, I'd stub out that method:

```javascript
var successConnectionObject = {
  connect: function(cb) {
    cb();
  },
  end: function() { }
}

var testMysqlDriver = require('mysql');
var stub = sinon.stub(testMysqlDriver, 'createConnection');
stub.returns(successConnectionObject);

var ExampleModel = proxyquire('model/example-model.js', {
  'mysql': testMysqlDriver
});
var exampleModel = new ExampleModel();
exampleModel.doSomething(function() {
  stub.restore();
  done();
});
```

The important parts to this are the `sinon.stub()`, `stub.returns()` & `stub.restore()` methods.

`sinon.stub()` will give a Sinon stub object which you can manipulate and will assign to the method on the object you pass in.

Lastly, `stub.restore()` will remove the stub from the original object, giving you the default behaviour of the original object.



