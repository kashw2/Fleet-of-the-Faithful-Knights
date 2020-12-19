import {None, Option, Some} from "funfix-core";

export function parseString(s: unknown): Option<string> {
    switch (typeof s) {
        case "bigint":
            return Option.of(s)
                .filter(v => isNaN(Number(v)) && isFinite(Number(v)))
                .map(v => v.toString());
        case "number":
            return Option.of(s)
                .filter(v => isNaN(v) && isFinite(v))
                .map(v => v.toString());
        case "boolean":
            return Option.of(s)
                .map(v => `${v}`);
        case "string":
            return Option.of(s);
        default:
            return None;
    }
}

export function parseBoolean(b: unknown): Option<boolean> {
    switch (typeof b) {
        case "number":
            return Option.of(b).contains(1) ? Some(true) : Some(false);
        case "bigint":
            return Option.of(Number(b)).contains(1) ? Some(true) : Some(false);
        case "string":
            return Option.of(b).contains('true') ? Some(true) : Some(false);
        case "boolean":
            return Option.of(b).contains(true) ? Some(true) : Some(false);
        default:
            return None;
    }
}

export function parseNumber(n: unknown): Option<number> {
    switch (typeof n) {
        case "string":
            return Option.of(n)
                .filter(v => !isNaN(+v))
                .map(v => +v);
        case "number":
            return Option.of(n)
                .filter(v => !isNaN(v));
        case "bigint":
            return Option.of(Number(n));
        case "boolean":
            return Option.of(n).contains(true) ? Some(1) : Some(0);
        default:
            return None;
    }
}