import {JsonBuilder} from "./json-builder";

export abstract class JsonSerializer<A> {

    abstract fromJson(json: any): A;

    abstract toJson(value: A, builder: JsonBuilder): object;

}