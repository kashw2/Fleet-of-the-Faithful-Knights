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

    abstract toJsonImpl(value: T, builder: JsonBuilder): object;

}
