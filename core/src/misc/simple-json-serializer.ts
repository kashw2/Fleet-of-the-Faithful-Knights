import {JsonBuilder} from "./json-builder";
import {Collection, List} from "immutable";

export abstract class SimpleJsonSerializer<T> {

    abstract fromJson(json: any): T;

    fromJsonArray(collection: Collection<number, T>): List<T> {
        return collection.map(x => this.fromJson(x))
            .toList();
    }

    toJson(value: T): object {
        return this.toJsonImpl(value, new JsonBuilder({}));
    }

    toJsonArray(collection: Collection<number, T>): object {
        return collection.map(x => this.toJson(x));
    }

    abstract toJsonImpl(value: T, builder: JsonBuilder): object;

}
