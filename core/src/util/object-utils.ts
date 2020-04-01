import {Either, Left, None, Option, Right, Some} from "funfix-core";
import {IRecordSet} from "mssql";
import {SimpleJsonSerializer} from "..";
import * as moment from 'moment';
import {List} from "immutable";

/**
 * getJsonFromRecordSet()
 *
 * Given a Recordset probably returned from a Db query/procedure
 * Return an object that doesn't have be manipulated to access data correctly
 * Function will probably evolve overtime, this is it in it's barebones state
 *
 */
export function getJsonFromRecordSet(rs: any): Either<string, IRecordSet<any>> {
    if (!rs || rs === '{}' || rs === []) {
        return Left('Database returned empty resultset');
    }
    return Right(rs[0]);
}

// A lot of these functions will have to change and corrected lol

export function parseString(s: unknown): Option<string> {
    if (typeof s === "string") {
        return Option.of(s);
    }
    return None;
}

export function parseMoment(s: unknown): Option<moment.Moment> {
    switch (typeof s) {
        case "string":
            return parseMomentFromString(s);
        default:
            return None;
    }
}

function parseMomentFromString(s: string): Option<moment.Moment> {
    if (moment.isDate(s)) {
        return Some(moment(s));
    }
    return None;
}

/**
 * Converts a string with a length > 0 to an Option<number>
 * Monad[number]
 */
function parseNumberFromString(s: string): Option<number> {
    if (s.length > 0) {
        return Option.of(+s);
    }
    return None;
}

export function parseSerialized<T>(t: T, serializer: SimpleJsonSerializer<T>): Option<T> {
    return Option.of(serializer.fromJson(t));
}

// TODO: I made this at 12:23, there needs to be a Monadic variation of this.
export function parseListString(list: List<string>): List<string> {
    return list.map(x => parseString(x))
        .filter(x => x.nonEmpty())
        .map(x => x.get());
}

export function parseNumber(n: unknown): Option<number> {
    switch (typeof n) {
        case "string":
            return parseNumberFromString(n);
        case "number":
            return Option.of(n);
        default:
            return None;
    }
}
