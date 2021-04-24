import {JsonBuilder} from './json-builder';
import {Option} from 'funfix-core';
import {Collection, List} from 'immutable';
import {OptionUtils} from './option-utils';

export abstract class JsonSerializer<A> {

    abstract fromJson(json: any): A;

    public fromJsonArray<B>(objs: List<object>): List<A> {
        return OptionUtils.flattenList(objs.map(v => Option.of(v)))
            .map(v => this.fromJson(v));

    }

    public fromJsonImpl(json: any): Option<A> {
        return Option.of(json)
            .filter(v => typeof v === 'object')
            .filter(v => v !== {})
            .map(v => this.fromJson(v));
    }

    public fromJsonString(json: string): A {
        return this.fromJson(JSON.parse(json));
    }

    abstract toJson(value: A, builder: JsonBuilder): Record<string, any>;

    public toJsonArray(values: Collection<any, A>, builder: JsonBuilder): Collection<any, Record<string, any>> {
        return values.map(v => this.toJson(v, builder));
    }

    public toJsonArrayImpl(value: Collection<any, A>): any {
        return value.map(v => this.toJsonImpl(v));
    }

    public toJsonImpl(value: A): any {
        return this.toJson(value, new JsonBuilder());
    }

    toJsonString(value: A): string {
        return JSON.stringify(this.toJson(value, new JsonBuilder()));
    }

}
