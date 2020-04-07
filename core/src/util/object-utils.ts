import {Either, Left, None, Option, Right, Some} from "funfix-core";
import {List} from "immutable";
import * as moment from "moment";
import {IRecordSet} from "mssql";
import {SimpleJsonSerializer} from "..";

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

// A lot of these functions will have to change and corrected lol

export function parseBoolean(b: unknown): Option<boolean> {
    switch (typeof b) {
        case "string":
            return parseBooleanFromString(b);
        case "number":
            return parseBooleanFromNumber(b);
        case "boolean":
            return Some(b);
        default:
            throw new Error(`Unable to parse ${b} to boolean`);
    }
}

function parseBooleanFromNumber(n: number): Option<boolean> {
    switch (n) {
        // Falsy
        case 0:
            return Some(false);
        // Truthy
        case 1:
            return Some(true);
        default:
            throw new Error(`Unable to parse ${n} to boolean`);
    }
}

function parseBooleanFromString(s: string): Option<boolean> {
    switch (s) {
        case "Y":
        case "true":
            return Some(true);
        case "N":
        case "false":
            return Some(false);
        default:
            throw new Error(`Unable to parse ${s} to boolean`);
    }
}

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
        return Some(+s);
    }
    return None;
}

export function parseSerialized<T>(t: T, serializer: SimpleJsonSerializer<T>): Option<T> {
    return Option.of(serializer.fromJson(t));
}

export function parseListFromArray(array: []): List<any> {
    return List(array);
}

// TODO: I made this at 12:23, there needs to be a Monadic variation of this.
// TODO: Expand on this
export function parseList<T>(list: T): List<T> {
    if (Option.of(list).isEmpty()) {
        return List();
    }
    if (list.constructor.name === "Array") {
        // @ts-ignore
        return parseListFromArray(list as []);
    }
    // @ts-ignore
    return List(list);
}

export function parseNumber(n: unknown): Option<number> {
    switch (typeof n) {
        case "string":
            return parseNumberFromString(n);
        case "number":
            return Some(n);
        default:
            return None;
    }
}
