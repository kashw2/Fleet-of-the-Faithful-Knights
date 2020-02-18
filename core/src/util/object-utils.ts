import {Either, Left, None, Option, Right} from "funfix-core";
import {IRecordSet} from "mssql";

/**
 * getJsonFromRecordSet()
 *
 * Given a Recordset probably returned from a Db query/procedure
 * Return an object that doesn't have be manipulated to access data correctly
 * Function will probably evolve overtime, this is it in it's barebones state
 *
 */
export function getJsonFromRecordSet(rs: any): Either<string, IRecordSet<any>> {
    if (!rs || rs === '{}') {
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
