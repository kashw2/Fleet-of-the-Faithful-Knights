import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseNumber, parseString} from '@ffk/lib-util';
import {allowKey, denyKey, idKey, typeKey} from './json-keys';

export class Overwrite {

	constructor(
		readonly id: Option<string> = None,
		readonly type: Option<number> = None,
		readonly allow: Option<string> = None,
		readonly deny: Option<string> = None,
	) {
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getType(): Option<number> {
		return this.type;
	}

	public getAllow(): Option<string> {
		return this.allow;
	}

	public getDeny(): Option<string> {
		return this.deny;
	}

}

export class OverwriteJsonSerializer extends JsonSerializer<Overwrite> {

	static instance: OverwriteJsonSerializer = new OverwriteJsonSerializer();

	fromJson(json: any): Overwrite {
		return new Overwrite(
			parseString(json[idKey]),
			parseNumber(json[typeKey]),
			parseString(json[allowKey]),
			parseString(json[denyKey]),
		);
	}

	toJson(value: Overwrite, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getType(), typeKey)
			.addOptional(value.getAllow(), allowKey)
			.addOptional(value.getDeny(), denyKey)
			.build();
	}

}