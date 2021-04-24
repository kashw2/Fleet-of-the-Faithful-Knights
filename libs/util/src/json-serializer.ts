import {JsonBuilder} from './json-builder';
import {Option} from "funfix-core";
import {OptionUtils} from "./option-utils";
import {Collection, List} from "immutable";

export abstract class JsonSerializer<A> {

    abstract fromJson(json: any): A;

    public fromJsonArray(obj: object[] | undefined): List<A> {
        return OptionUtils.flattenList(Option.of(obj))
            .flatMap(o => OptionUtils.flattenList(...o.map(x => this.fromJsonImpl(x))));

    }

    public fromJsonImpl(value: any): Option<A> {
        return Option.of(value)
            .map(v => this.fromJson(v));
    }

    public fromJsonString(json: string): A {
        return this.fromJson(JSON.parse(json));
    }

    abstract toJson(value: A, builder: JsonBuilder): object;

    public toJsonArray(values: A[]): object[] {
        return values.map(v => this.toJson(v, new JsonBuilder()));
    }

    public toJsonImpl(value: A): object {
        return this.toJson(value, new JsonBuilder());
    }

    public toJsonString(value: A): string {
        return JSON.stringify(this.toJson(value, new JsonBuilder()));
    }

}
