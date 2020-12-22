import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseString} from '@ffk/lib-util';
import {joinKey, matchKey, spectateKey} from './json-keys';

export class Secret {

	constructor(
		readonly join: Option<string> = None,
		readonly spectate: Option<string> = None,
		readonly match: Option<string> = None,
	) {
	}

	public getJoin(): Option<string> {
		return this.join;
	}

	public getSpectate(): Option<string> {
		return this.spectate;
	}

	public getMatch(): Option<string> {
		return this.match;
	}

}

export class SecretJsonSerializer extends JsonSerializer<Secret> {

	static instance: SecretJsonSerializer = new SecretJsonSerializer();

	fromJson(json: any): Secret {
		return new Secret(
			parseString(json[joinKey]),
			parseString(json[spectateKey]),
			parseString(json[matchKey]),
		);
	}

	toJson(value: Secret, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getJoin(), joinKey)
			.addOptional(value.getSpectate(), spectateKey)
			.addOptional(value.getMatch(), matchKey)
			.build();
	}

}