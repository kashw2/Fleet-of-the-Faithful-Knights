import {None, Option, Some} from 'funfix-core';
import moment from 'moment';
import {List, Set} from 'immutable';
import {JsonSerializer} from './json-serializer';

export function parseString(s: unknown): Option<string> {
  return Option.of(s)
    .flatMap(v => {
      switch (typeof v) {
        case 'number':
          return Option.of(v)
            .filter(x => !isNaN(x) && isFinite(x))
            .map(x => x.toString());
        case 'boolean':
          return Option.of(v)
            .map(x => `${x}`);
        case 'string':
          return Option.of(v);
        default:
          return None;
      }
    });
}

function parseIterableSerialized<T>(i: unknown, serializer: JsonSerializer<T>): ReadonlyArray<T> {
  return parseIterable(i)
    .map(v => serializer.fromJson(v));
}

function parseIterable(i: unknown): ReadonlyArray<any> {
  // As of now we only expect iterables to come into this function as an array
  // As such we can assume it is always an array
  return Option.of(i)
    .filter(v => v instanceof Array)
    .map(v => v as ReadonlyArray<any>)
    .getOrElse([]);
}

export function parseListSerialized<A>(i: unknown, serializer: JsonSerializer<A>): List<A> {
  return List(parseIterableSerialized(i, serializer));
}

export function parseSetSerialized<A>(i: unknown, serializer: JsonSerializer<A>): Set<A> {
  return Set(parseIterableSerialized(i, serializer));
}

export function parseList(i: unknown): List<any> {
  return List(parseIterable(i));
}

export function parseSet(i: unknown): Set<any> {
  return Set(parseIterable(i));
}

export function parseDate(v: unknown): Option<moment.Moment> {
  return Option.of(v)
    .flatMap(d => {
      switch (typeof d) {
        case 'number':
        case 'string':
          return Option.of(d)
            .map(x => moment(x));
        default:
          return None;
      }
    });
}

export function parseBoolean(v: unknown): Option<boolean> {
  return Option.of(v)
    .flatMap(b => {
      switch (typeof b) {
        case 'number':
          return Option.of(b).contains(1) ? Option.of(true) : Option.of(false);
        case 'string':
          return Option.of(b).exists(x => x === 'true' || x === 'false')
            ? Option.of(b).contains('true') ? Some(true) : Some(false)
            : None;
        case 'boolean':
          return Option.of(b).contains(true) ? Some(true) : Some(false);
        default:
          return None;
      }
    });
}

export function parseNumber(v: unknown): Option<number> {
  return Option.of(v)
    .flatMap(n => {
      switch (typeof n) {
        case 'string':
          return Option.of(n)
            .filter(x => !isNaN(+x))
            .map(x => +x);
        case 'number':
          return Option.of(n)
            .filter(x => !isNaN(x));
        case 'boolean':
          return Option.of(n).contains(true) ? Some(1) : Some(0);
        default:
          return None;
      }
    });
}
