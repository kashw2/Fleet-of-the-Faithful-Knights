import {JsonBuilder, JsonSerializer, MomentUtils, parseDate, parseString} from '@kashw2/lib-util';
import {None, Option, Some} from 'funfix-core';
import {User, UserJsonSerializer} from './user';
import * as moment from 'moment';
import {createdKey, descriptionKey, idKey, modifiedKey, responseKey, voterKey} from '../misc/json-keys';

export class Ballot {

	constructor(
		private id: Option<string> = None,
		private voter: Option<User> = None,
		private description: Option<string> = None,
		private response: Option<string> = None,
		private created: Option<moment.Moment> = None,
		private modified: Option<moment.Moment> = None,
	) {
	}

	public getCreated(): Option<moment.Moment> {
		return this.created;
	}

	public getCreatedFormatted(format: 'DMY'): Option<string> {
		return MomentUtils.format(this.getCreated(), format);
	}

	public getDescription(): Option<string> {
		return this.description;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getModified(): Option<moment.Moment> {
		return this.modified;
	}

	public getModifiedFormatted(format: 'DMY'): Option<string> {
		return MomentUtils.format(this.getModified(), format);
	}

	public getPreparedResponse(): Option<string> {
		if (this.response.contains('Y')) {
			return Some('Affirm');
		} else if (this.response.contains('N')) {
			return Some('Deny');
		}
		return None;
	}

	public getResponse(): Option<string> {
		return this.response;
	}

	public getVoter(): Option<User> {
		return this.voter;
	}

	public getVoterId(): Option<string> {
		return this.getVoter()
			.flatMap(v => v.getId());
	}

	public getVoterUsername(): Option<string> {
		return this.getVoter()
			.flatMap(v => v.getUsername());
	}

}

export class BallotJsonSerializer extends JsonSerializer<Ballot> {

	static instance: BallotJsonSerializer = new BallotJsonSerializer();

	fromJson(json: any): Ballot {
		return new Ballot(
			parseString(json[idKey]),
			UserJsonSerializer.instance.fromJsonImpl(json[voterKey]),
			parseString(json[descriptionKey]),
			parseString(json[responseKey]),
			parseDate(json[createdKey]),
			parseDate(json[modifiedKey]),
		);
	}

	toJson(value: Ballot, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptionalSerialized(value.getVoter(), voterKey, UserJsonSerializer.instance)
			.addOptional(value.getDescription(), descriptionKey)
			.addOptional(value.getResponse(), responseKey)
			.addOptional(value.getCreated(), createdKey)
			.addOptional(value.getModified(), modifiedKey)
			.build();
	}

}
