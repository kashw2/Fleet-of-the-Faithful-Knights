import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseNumber, parseString} from '@kashw2/lib-util';
import {allowKey, denyKey, idKey, typeKey} from './json-keys';

export class DiscordOverwrite {

	constructor(
		readonly id: Option<string> = None,
		readonly type: Option<number> = None,
		readonly allow: Option<string> = None,
		readonly deny: Option<string> = None,
	) {
	}

	public getAllow(): Option<string> {
		return this.allow;
	}

	public getDeny(): Option<string> {
		return this.deny;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getType(): Option<number> {
		return this.type;
	}

}

export class DiscordOverwriteJsonSerializer extends JsonSerializer<DiscordOverwrite> {

	static instance: DiscordOverwriteJsonSerializer = new DiscordOverwriteJsonSerializer();

	fromJson(json: any): DiscordOverwrite {
		return new DiscordOverwrite(
			parseString(json[idKey]),
			parseNumber(json[typeKey]),
			parseString(json[allowKey]),
			parseString(json[denyKey]),
		);
	}

	toJson(value: DiscordOverwrite, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getType(), typeKey)
			.addOptional(value.getAllow(), allowKey)
			.addOptional(value.getDeny(), denyKey)
			.build();
	}

}
