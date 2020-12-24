import {JsonBuilder} from './json-builder';
import {Option} from 'funfix-core';
import {Collection} from 'immutable';

export abstract class JsonSerializer<A> {

	abstract fromJson(json: any): A;

	public fromJsonArray(json: Collection<any, any>): Collection<any, A> {
		return json.map(v => this.fromJson(v));
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

}