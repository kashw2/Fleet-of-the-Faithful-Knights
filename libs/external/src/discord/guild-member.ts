import {None, Option} from 'funfix-core';
import {DiscordUser, UserJsonSerializer} from './user';
import {Set} from 'immutable';
import * as moment from 'moment';
import {JsonBuilder, JsonSerializer, parseBoolean, parseDate, parseSet, parseString} from '@kashw2/lib-util';
import {deafKey, joinedAtKey, muteKey, nickKey, pendingKey, premiumSinceKey, rolesKey, userKey} from './json-keys';

export class DiscordGuildMember {

	constructor(
		readonly user: Option<DiscordUser> = None,
		readonly nick: Option<string> = None,
		readonly roles: Set<string> = Set(),
		readonly joinedAt: Option<moment.Moment> = None,
		readonly premiumSince: Option<moment.Moment> = None,
		readonly deaf: Option<boolean> = None,
		readonly mute: Option<boolean> = None,
		readonly pending: Option<boolean> = None
	) {
	}

	public getDeaf(): Option<boolean> {
		return this.deaf;
	}

	public getJoinedAt(): Option<moment.Moment> {
		return this.joinedAt;
	}

	public getMute(): Option<boolean> {
		return this.mute;
	}

	public getNick(): Option<string> {
		return this.nick;
	}

	public getPending(): Option<boolean> {
		return this.pending;
	}

	public getPremiumSince(): Option<moment.Moment> {
		return this.premiumSince;
	}

	public getRoles(): Set<string> {
		return this.roles;
	}

	public getUser(): Option<DiscordUser> {
		return this.user;
	}

}

export class GuildMemberJsonSerializer extends JsonSerializer<DiscordGuildMember> {

	static instance: GuildMemberJsonSerializer = new GuildMemberJsonSerializer();

	fromJson(json: any): DiscordGuildMember {
		return new DiscordGuildMember(
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

	toJson(value: DiscordGuildMember, builder: JsonBuilder): Record<string, any> {
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
