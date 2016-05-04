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

export function wrap <T, U> (fn: Handler<T, U>): Handler<T, U>
export function wrap <T, U> (fn: ErrorHandler<T, U>): ErrorHandler<T, U>
export function wrap <T, U> (fn: Handler<T, U> | ErrorHandler<T, U>): Handler<T, U> | ErrorHandler<T, U> {
  if (fn.length === 4) {
    return function (err: Error, req: T, res: U, next: NextFunction): any {
      const result = (fn as ErrorHandler<T, U>)(err, req, res, next)

      return Promise.resolve(result).catch(err => next(err))
    }
  }

  return function (req: T, res: U, next: NextFunction): any {
    const result = (fn as Handler<T, U>)(req, res, next)

    return Promise.resolve(result).catch(err => next(err))
  }
}