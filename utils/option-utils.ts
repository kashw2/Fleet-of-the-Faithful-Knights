import {None, Option, Some} from "funfix-core";
import {Moment} from "moment";
import {JsonSerializer} from "../models/json-serializer";

export class OptionUtils {

    static parseBoolean(v: boolean): Option<boolean> {
        return Option.of(v);
    }

    static parseMoment(v: Moment): Option<Moment> {
        return Option.of(v);
    }

    static parseNumber(v: unknown): Option<number> {
        if (v === undefined) {
            return None;
        }
        if (typeof v !== "number") {
            return None;
        }
        return Some(+v);
    }

    static parseSerialised<A, B extends A>(v: any, serialiser: JsonSerializer<A>): Option<A> {
        return Option.of(serialiser.fromJson(v));
    }

    static parseString(v: string): Option<string> {
        return Option.of(v);
    }

}
