# Async Middleware

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/async-middleware.svg)](https://greenkeeper.io/)

> Wrap an asynchronous middleware (or handler) function for Express, Connect, router, etc.

## Installation

```sh
npm install async-middleware --save
```

## Usage

Wrap a middleware function using `async` and/or promises to catch errors and forward them to `next(err)`.

```js
var express = require('express')
var wrap = require('async-middleware').wrap

var app = express()

app.use(wrap(function (req, res) {
  return Promise.reject(new Error('boom!'))
}))
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/async-middleware.svg?style=flat
[npm-url]: https://npmjs.org/package/async-middleware
[downloads-image]: https://img.shields.io/npm/dm/async-middleware.svg?style=flat
[downloads-url]: https://npmjs.org/package/async-middleware
[travis-image]: https://img.shields.io/travis/blakeembrey/async-middleware.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/async-middleware
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/async-middleware.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/async-middleware?branch=master
