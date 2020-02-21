import {JsonBuilder} from "./json-builder";

export abstract class SimpleJsonSerializer<T> {

    abstract fromJson(json: any): T;

    toJson(value: T): object {
        return this.toJsonImpl(value, new JsonBuilder({}));
    }

    abstract toJsonImpl(value: T, builder: JsonBuilder): object;

}
