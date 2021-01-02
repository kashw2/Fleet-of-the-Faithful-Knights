import {JsonBuilder, JsonSerializer, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {avatarKey, discordIdKey, discordUsernameKey, groupKey, idKey} from '../misc/json-keys';
import {Group, GroupJsonSerializer} from './group';

export class Candidate {

	constructor(
		private id: Option<string> = None,
		private discordUsername: Option<string> = None,
		private discordId: Option<string> = None,
		private avatar: Option<string> = None,
		private group: Option<Group> = None,
	) {
	}

	public getAvatar(): Option<string> {
		return this.avatar;
	}

	public getDiscordId(): Option<string> {
		return this.discordId;
	}

	public getDiscordUsername(): Option<string> {
		return this.discordUsername;
	}

	public getGroup(): Option<Group> {
		return this.group;
	}

	public getId(): Option<string> {
		return this.id;
	}

}

export class CandidateJsonSerializer extends JsonSerializer<Candidate> {

	static instance: CandidateJsonSerializer = new CandidateJsonSerializer();

	fromJson(json: any): Candidate {
		return new Candidate(
			parseString(json[idKey]),
			parseString(json[discordUsernameKey]),
			parseString(json[discordIdKey]),
			parseString(json[avatarKey]),
			GroupJsonSerializer.instance.fromJsonImpl(json[groupKey]),
		);
	}

	toJson(value: Candidate, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getDiscordUsername(), discordUsernameKey)
			.addOptional(value.getDiscordId(), discordIdKey)
			.addOptional(value.getAvatar(), avatarKey)
			.addOptionalSerialized(value.getGroup(), groupKey, GroupJsonSerializer.instance)
			.build();
	}

}