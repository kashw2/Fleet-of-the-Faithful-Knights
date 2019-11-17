import {List} from "immutable";
import {JsonSerializer} from "../models/json-serializer";

export class CollectionUtils {

    static parseIterable(v: List<any>, f: (v: List<any>) => any): List<any> {
        return f(v);
    }

    static parseIterableSerialised<A, B extends A>(v: List<any>, serialiser: JsonSerializer<A>): List<A> {
        return List.of(serialiser.fromJson(v));
    }

}
