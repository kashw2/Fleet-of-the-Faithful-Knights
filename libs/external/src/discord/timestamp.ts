import {None, Option} from 'funfix-core';
import * as moment from 'moment';
import {JsonBuilder, JsonSerializer, parseDate} from '@kashw2/lib-util';
import {endKey, startKey} from './json-keys';

export class DiscordTimestamp {

	constructor(
		readonly start: Option<moment.Moment> = None,
		readonly end: Option<moment.Moment> = None,
	) {
	}

	getEnd(): Option<moment.Moment> {
		return this.end;
	}

	getStart(): Option<moment.Moment> {
		return this.start;
	}

}

export class DiscordTimestampJsonSerializer extends JsonSerializer<DiscordTimestamp> {

	static instance: DiscordTimestampJsonSerializer = new DiscordTimestampJsonSerializer();

	fromJson(json: any): DiscordTimestamp {
		return new DiscordTimestamp(
			parseDate(json[startKey]),
			parseDate(json[endKey]),
		);
	}

	toJson(value: DiscordTimestamp, builder: JsonBuilder): Record<string, any> {
		return builder.addOptionalDate(value.getStart(), startKey)
			.addOptionalDate(value.getEnd(), endKey)
			.build();
	}

}
