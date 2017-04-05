import Promise = require('any-promise')

export interface NextFunction {
  (err: Error): void
}

export interface Handler <T, U> {
  (req: T, res: U, next: NextFunction): any
}

export interface ErrorHandler <T, U> {
  (err: Error, req: T, res: U, next: NextFunction): any
}

function handle (result: any, next: NextFunction) {
  if (result && typeof result.then === 'function') {
    return result.then(undefined, function (err: Error) {
      return next(err || new Error('Promise was rejected with a falsy value'))
    })
  }

  return result
}

export function wrap <T, U> (fn: Handler<T, U>): Handler<T, U>
export function wrap <T, U> (fn: ErrorHandler<T, U>): ErrorHandler<T, U>
export function wrap <T, U> (fn: Handler<T, U> | ErrorHandler<T, U>): Handler<T, U> | ErrorHandler<T, U> {
  if (fn.length === 4) {
    return function (err: Error, req: T, res: U, next: NextFunction): any {
      return handle((fn as ErrorHandler<T, U>)(err, req, res, next), next)
    }
  }

  return function (req: T, res: U, next: NextFunction): any {
    return handle((fn as Handler<T, U>)(req, res, next), next)
  }
}
