import {Either, Left, None, Option, Right, Some} from 'funfix-core';
import moment from 'moment';
import {List, Set} from 'immutable';
import {JsonSerializer} from './json-serializer';
import {IRecordSet} from "mssql";

/**
 * getJsonFromRecordSet()
 *
 * Given a Recordset probably returned from a Db query/procedure
 * Return an object that doesn't have to be manipulated to access data correctly
 * Function will probably evolve overtime, this is it in it's barebones state
 *
 */
export function getJsonFromRecordSet(rs: any): Either<string, IRecordSet<any>> {
    if (!rs || rs === "{}" || rs === []) {
        return Left("Database returned empty resultset");
    }
    return Right(rs[0]);
}

export function parseString(s: unknown): Option<string> {
    switch (typeof s) {
        case 'bigint':
            return Option.of(s)
                .filter(v => isNaN(Number(v)) && isFinite(Number(v)))
                .map(v => v.toString());
        case 'number':
            return Option.of(s)
                .filter(v => isNaN(v) && isFinite(v))
                .map(v => v.toString());
        case 'boolean':
            return Option.of(s)
                .map(v => `${v}`);
        case 'string':
            return Option.of(s);
        default:
            return None;
    }
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
        .get();
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

export function parseDate(d: unknown): Option<moment.Moment> {
    switch (typeof d) {
        case 'number':
        case 'string':
            return Option.of(d)
                .map(v => moment(v));
        default:
            return None;
    }
}

export function parseBoolean(b: unknown): Option<boolean> {
    switch (typeof b) {
        case 'number':
            return Option.of(b).contains(1) ? Some(true) : Some(false);
        case 'bigint':
            return Option.of(Number(b)).contains(1) ? Some(true) : Some(false);
        case 'string':
            return Option.of(b).exists(v => v === 'true' || v === 'false')
                ? Option.of(b).contains('true') ? Some(true) : Some(false)
                : None;
        case 'boolean':
            return Option.of(b).contains(true) ? Some(true) : Some(false);
        default:
            return None;
    }
}

export function parseNumber(n: unknown): Option<number> {
    switch (typeof n) {
        case 'string':
            return Option.of(n)
                .filter(v => !isNaN(+v))
                .map(v => +v);
        case 'number':
            return Option.of(n)
                .filter(v => !isNaN(v));
        case 'bigint':
            return Option.of(Number(n));
        case 'boolean':
            return Option.of(n).contains(true) ? Some(1) : Some(0);
        default:
            return None;
    }
}
