import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseString} from '@ffk/lib-util';
import {joinKey, matchKey, spectateKey} from './json-keys';

export class DiscordSecret {

	constructor(
		readonly join: Option<string> = None,
		readonly spectate: Option<string> = None,
		readonly match: Option<string> = None,
	) {
	}

	public getJoin(): Option<string> {
		return this.join;
	}

	public getMatch(): Option<string> {
		return this.match;
	}

	public getSpectate(): Option<string> {
		return this.spectate;
	}

}

export class SecretJsonSerializer extends JsonSerializer<DiscordSecret> {

	static instance: SecretJsonSerializer = new SecretJsonSerializer();

	fromJson(json: any): DiscordSecret {
		return new DiscordSecret(
			parseString(json[joinKey]),
			parseString(json[spectateKey]),
			parseString(json[matchKey]),
		);
	}

	toJson(value: DiscordSecret, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getJoin(), joinKey)
			.addOptional(value.getSpectate(), spectateKey)
			.addOptional(value.getMatch(), matchKey)
			.build();
	}

}