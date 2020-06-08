import {Either, Left, None, Option, Right, Some} from "funfix-core";
import {List, Set} from "immutable";
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
            console.error(`Error parsing ${b} (unknown) to boolean`);
            return None;
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
            console.error(`Error parsing ${n} (number) to boolean`);
            return None;
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
            console.error(`Error parsing ${s} (string) to boolean`);
            return None;
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
        // @ts-ignore
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
    // @ts-ignore
    return Option.of(serializer.fromJson(t));
}

export function parseSerializedSet<T>(set: Set<T>, serializer: SimpleJsonSerializer<T>): Set<T> {
    if (Option.of(set).isEmpty()) {
        return Set();
    }
    if (set instanceof Array) {
        // @ts-ignore
        return parseSetFromArray(set as [])
            .map(s => serializer.fromJson(s));
    }
    // @ts-ignore
    return set.map(s => serializer.fromJson(s));
}

export function parseSerializedList<T>(list: List<T>, serializer: SimpleJsonSerializer<T>): List<T> {
    if (Option.of(list).isEmpty()) {
        return List();
    }
    if (list instanceof Array) {
        // @ts-ignore
        return parseListFromArray(list as [])
            .map(s => serializer.fromJson(s));
    }
    // @ts-ignore
    return list.map(s => serializer.fromJson(s));
}

export function parseListFromArray(array: []): List<any> {
    return List(array);
}

export function parseSetFromArray(array: []): Set<any> {
    return Set(array);
}

export function parseList<T>(list: T): List<T> {
    if (Option.of(list).isEmpty()) {
        return List();
    }
    if (list instanceof Array) {
        // @ts-ignore
        return parseListFromArray(list as []);
    }
    // @ts-ignore
    return List(list);
}

export function parseSet<T>(set: T): Set<any> {
    if (Option.of(set).isEmpty()) {
        return Set();
    }
    if (set instanceof Array) {
        // @ts-ignore
        return parseSetFromArray(set as []);
    }
    // @ts-ignore
    return Set(set);
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
