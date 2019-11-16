import {None, Option, Some} from "funfix-core";
import {Moment} from "moment";
import {JsonSerializer} from "..";

export class OptionUtils {

    static parseBoolean(v: unknown): Option<boolean> {
        return Option.of(v)
            .flatMap(x => {
                if (typeof x !== "boolean") {
                    return None;
                }
                return Some(x);
            });
    }

    static parseMoment(v: Moment): Option<Moment> {
        return Option.of(v);
    }

    static parseNumber(v: unknown): Option<number> {
       return Option.of(v)
            .flatMap(x => {
                if (typeof x !== "number" || undefined) {
                    return None;
                }
                return Some(x);
            });
    }

    static parseSerialised<A, B extends A>(v: any, serialiser: JsonSerializer<A>): Option<A> {
        return Option.of(serialiser.toType(v));
    }

    static parseString(v: unknown): Option<string> {
        return Option.of(v)
            .flatMap(x => {
                if (typeof x !== "string") {
                    return None;
                }
                return Some(x);
            });
    }

}
