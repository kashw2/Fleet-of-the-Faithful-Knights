import {JsonBuilder} from "./json-builder";

export abstract class SimpleJsonSerializer<T> {

    abstract fromJson(json: any): T;

    abstract toJson(value: T, builder: JsonBuilder): object;

}
