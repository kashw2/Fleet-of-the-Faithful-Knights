import {Option} from 'funfix-core';
import {Collection} from 'immutable';
import {JsonSerializer} from './json-serializer';
import * as moment from 'moment';

export class JsonBuilder {

	private jsonObject: any = {};

	public add<A>(value: A, key: string): JsonBuilder {
		this.jsonObject[key] = value;
		return this;
	}

	public addIterable<A extends Collection<any, B>, B>(value: A, key: string): JsonBuilder {
		value.map(v => this.jsonObject[key] += v);
		return this;
	}

	public addIterableSerialized<A extends Collection<any, B>, B>(value: A, key: string, serializer: JsonSerializer<B>): JsonBuilder {
		value.map(v => this.addSerializable(v, key, serializer));
		return this;
	}

	public addOptional<A>(value: Option<A>, key: string): JsonBuilder {
		return value.map(v => this.add(v, key))
			.getOrElse(this);
	}

	public addOptionalDate(value: Option<moment.Moment>, key: string): JsonBuilder {
		return value.map(m => m.isValid())
			.map(m => this.add(m, key))
			.getOrElse(this);
	}

	public addOptionalSerialized<A>(value: Option<A>, key: string, serializer: JsonSerializer<A>): JsonBuilder {
		return value.map(v => this.addSerializable(v, key, serializer))
			.getOrElse(this);
	}

	private addSerializable<A>(value: A, key: string, serializer: JsonSerializer<A>): JsonBuilder {
		this.jsonObject[key] = serializer.toJson(value, new JsonBuilder());
		return this;
	}

	public build(): Record<string, any> {
		return this.jsonObject;
	}

}
