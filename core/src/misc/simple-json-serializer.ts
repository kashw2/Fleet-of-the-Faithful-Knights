import {JsonBuilder} from "./json-builder";
import {Collection, List} from "immutable";

export abstract class SimpleJsonSerializer<T> {

    abstract fromJson(json: any): T;

    // TODO: Explore making a fromJsonArray that takes a collection

    fromJsonArray(list: List<T>): List<T> {
        return list.map(x => this.fromJson(x));
    }

    toJson(value: T): object {
        return this.toJsonImpl(value, new JsonBuilder({}));
    }

    toJsonArray(collection: Collection<number, T>): object {
        return collection.map(x => this.toJson(x));
    }

    abstract toJsonImpl(value: T, builder: JsonBuilder): object;

}
