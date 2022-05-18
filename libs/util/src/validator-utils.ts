import {Either, Left, Right} from 'funfix-core';

export function validateString(s: string, f: (s: string) => boolean): Either<string, string> {
  return f(s) ? Right(s) : Left('String validation failed');
}

export function validateMaxLength(s: unknown, maxLength: number): Either<string, string> {
  switch (typeof s) {
    case 'number':
      return s.toString().length < maxLength ? Right(s.toString()) : Left('Number is over max length');
    case 'string':
      return s.length < maxLength ? Right(s) : Left('String is over max length');
    default:
      return Left('Unknown type submitted for validation');
  }
}
