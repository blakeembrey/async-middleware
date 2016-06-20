import test = require('blue-tape')
import Promise = require('any-promise')
import { wrap, NextFunction } from './index'

test('async middleware', t => {
  t.test('middleware', t => {
    const m = wrap(function (req: any, res: any) {
      return Promise.reject(new Error('test'))
    })

    m({}, {}, function (err) {
      t.equal(err.message, 'test')
      t.end()
    })
  })

  t.test('error middleware', t => {
    const m = wrap(function (err: Error, req: any, res: any, next: NextFunction) {
      t.equal(err.message, 'test')
      t.end()
    })

    m(new Error('test'), {}, {}, function () {/* */})
  })

  t.test('error in error middleware', t => {
    const m = wrap(function (err: Error, req: any, res: any, next: NextFunction) {
      return Promise.reject(err)
    })

    m(new Error('test'), {}, {}, function (err) {
      t.equal(err.message, 'test')
      t.end()
    })
  })
})
