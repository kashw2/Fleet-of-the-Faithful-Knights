import {JsonBuilder} from './json-builder';
import {Option} from 'funfix-core';
import {Collection, List} from 'immutable';
import {OptionUtils} from './option-utils';

export abstract class JsonSerializer<A> {

	abstract fromJson(json: any): A;

	fromJsonArray<B>(objs: List<object>): List<A> {
		return OptionUtils.flattenList(objs.map(v => Option.of(v)))
			.map(v => this.fromJson(v));

	}

	public fromJsonImpl(json: any): Option<A> {
		return Option.of(json)
			.filter(v => typeof v !== 'object')
			.filter(v => v !== {})
			.map(v => this.fromJson(v));
	}

	abstract toJson(value: A, builder: JsonBuilder): Record<string, any>;

	public toJsonArray(values: Collection<any, A>, builder: JsonBuilder): Collection<any, Record<string, any>> {
		return values.map(v => this.toJson(v, builder));
	}

	toJsonString(value: A): string {
		return JSON.stringify(this.toJson(value, new JsonBuilder()));
	}

}