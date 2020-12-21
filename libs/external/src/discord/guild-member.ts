import {None, Option} from 'funfix-core';
import {User, UserJsonSerializer} from './user';
import {Set} from 'immutable';
import {Moment} from 'moment';
import {JsonBuilder, JsonSerializer, parseBoolean, parseDate, parseSet, parseString} from '@ffk/lib-util';
import {deafKey, joinedAtKey, muteKey, nickKey, pendingKey, premiumSinceKey, rolesKey, userKey} from './json-keys';

export class GuildMember {

	constructor(
		readonly user: Option<User> = None,
		readonly nick: Option<string> = None,
		readonly roles: Set<string> = Set(),
		readonly joinedAt: Option<Moment> = None,
		readonly premiumSince: Option<Moment> = None,
		readonly deaf: Option<boolean> = None,
		readonly mute: Option<boolean> = None,
		readonly pending: Option<boolean> = None
	) {
	}

	public getUser(): Option<User> {
		return this.user;
	}

	public getNick(): Option<string> {
		return this.nick;
	}

	public getRoles(): Set<string> {
		return this.roles;
	}

	public getJoinedAt(): Option<Moment> {
		return this.joinedAt;
	}

	public getPremiumSince(): Option<Moment> {
		return this.premiumSince;
	}

	public getDeaf(): Option<boolean> {
		return this.deaf;
	}

	public getMute(): Option<boolean> {
		return this.mute;
	}

	public getPending(): Option<boolean> {
		return this.pending;
	}

}

export class GuildMemberJsonSerializer extends JsonSerializer<GuildMember> {

	static instance: GuildMemberJsonSerializer = new GuildMemberJsonSerializer();

	fromJson(json: any): GuildMember {
		return new GuildMember(
			UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseString(json[nickKey]),
			parseSet(json[rolesKey]),
			parseDate(json[joinedAtKey]),
			parseDate(json[premiumSinceKey]),
			parseBoolean(json[deafKey]),
			parseBoolean(json[muteKey]),
			parseBoolean(json[pendingKey]),
		);
	}

	toJson(value: GuildMember, builder: JsonBuilder): object {
		return builder.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
			.addOptional(value.getNick(), nickKey)
			.addIterable(value.getRoles(), rolesKey)
			.addOptional(value.getJoinedAt(), joinedAtKey)
			.addOptionalDate(value.getPremiumSince(), premiumSinceKey)
			.addOptional(value.getDeaf(), deafKey)
			.addOptional(value.getMute(), muteKey)
			.addOptional(value.getPending(), pendingKey)
			.build();
	}

}