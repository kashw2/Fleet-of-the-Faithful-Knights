import {None, Option} from 'funfix-core';
import {List} from 'immutable';
import {JsonBuilder, JsonSerializer, parseList, parseString} from '@ffk/lib-util';
import {idKey, sizeKey} from './json-keys';

export class DiscordParty {

	constructor(
		readonly id: Option<string> = None,
		readonly size: List<number> = List(),
	) {
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getSize(): List<number> {
		return this.size;
	}

}

export class PartyJsonSerializer extends JsonSerializer<DiscordParty> {

	static instance: PartyJsonSerializer = new PartyJsonSerializer();

	fromJson(json: any): DiscordParty {
		return new DiscordParty(
			parseString(json[idKey]),
			parseList(json[sizeKey]),
		);
	}

	toJson(value: DiscordParty, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addIterable(value.getSize(), sizeKey)
			.build();
	}

}