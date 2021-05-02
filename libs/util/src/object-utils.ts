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
    if (!rs || rs === "{}" || rs === [] || rs[0]['']) {
        return Left("Database returned empty resultset");
    }
    if (typeof rs[0][''] === "string") {
        return Right(JSON.parse(rs[0]['']));
    }
    return Right(rs[0]);
}

export function parseString(s: unknown): Option<string> {
    return Option.of(s)
        .flatMap(v => {
            switch (typeof v) {
                case 'bigint':
                    return Option.of(v)
                        .filter(x => isNaN(Number(x)) && isFinite(Number(x)))
                        .map(x => x.toString());
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

export function parseBoolean(v: unknown): Option<boolean> {
    return Option.of(v)
        .flatMap(b => {
            switch (typeof b) {
                case 'number':
                    return Option.of(b).contains(1) ? Option.of(true) : Option.of(false);
                case 'bigint':
                    return Option.of(Number(b)).contains(1) ? Some(true) : Some(false);
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
