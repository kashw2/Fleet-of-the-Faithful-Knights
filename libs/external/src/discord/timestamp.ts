import {None, Option} from 'funfix-core';
import {Moment} from 'moment';
import {JsonBuilder, JsonSerializer, parseDate} from '@ffk/lib-util';
import {endKey, startKey} from './json-keys';

export class Timestamp {

	constructor(
		readonly start: Option<Moment> = None,
		readonly end: Option<Moment> = None,
	) {
	}

	getStart(): Option<Moment> {
		return this.start;
	}

	getEnd(): Option<Moment> {
		return this.end;
	}

}

export class TimestampJsonSerializer extends JsonSerializer<Timestamp> {

	static instance: TimestampJsonSerializer = new TimestampJsonSerializer();

	fromJson(json: any): Timestamp {
		return new Timestamp(
			parseDate(json[startKey]),
			parseDate(json[endKey]),
		);
	}

	toJson(value: Timestamp, builder: JsonBuilder): object {
		return builder.addOptionalDate(value.getStart(), startKey)
			.addOptionalDate(value.getEnd(), endKey)
			.build();
	}

}