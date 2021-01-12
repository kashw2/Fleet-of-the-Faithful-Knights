import {JsonBuilder, JsonSerializer, parseDate, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {User, UserJsonSerializer} from './user';
import * as moment from 'moment';
import {createdKey, idKey, modifiedKey, responseKey, voterKey} from '../misc/json-keys';

export class Ballot {

	constructor(
		private id: Option<string> = None,
		private voter: Option<User> = None,
		private response: Option<string> = None,
		private created: Option<moment.Moment> = None,
		private modified: Option<moment.Moment> = None,
	) {
	}

	public getCreated(): Option<moment.Moment> {
		return this.created;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getModified(): Option<moment.Moment> {
		return this.modified;
	}

	public getResponse(): Option<string> {
		return this.response;
	}

	public getVoter(): Option<User> {
		return this.voter;
	}

}

export class BallotJsonSerializer extends JsonSerializer<Ballot> {

	static instance: BallotJsonSerializer = new BallotJsonSerializer();

	fromJson(json: any): Ballot {
		return new Ballot(
			parseString(json[idKey]),
			UserJsonSerializer.instance.fromJsonImpl(json[voterKey]),
			parseString(json[responseKey]),
			parseDate(json[createdKey]),
			parseDate(json[modifiedKey]),
		);
	}

	toJson(value: Ballot, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptionalSerialized(value.getVoter(), voterKey, UserJsonSerializer.instance)
			.addOptional(value.getResponse(), responseKey)
			.addOptional(value.getCreated(), createdKey)
			.addOptional(value.getModified(), modifiedKey)
			.build();
	}

}