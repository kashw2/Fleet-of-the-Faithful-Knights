import {List} from 'immutable';
import {DiscordActivity, ActivityJsonSerializer} from './activity';
import {DiscordClientStatus, ClientStatusJsonSerializer} from './client-status';
import {JsonBuilder, JsonSerializer, parseListSerialized, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {DiscordUser, UserJsonSerializer} from './user';
import {activitiesKey, clientStatusKey, guildIdKey, statusKey, userKey} from './json-keys';

export class DiscordPresence {

	constructor(
		readonly user: Option<DiscordUser> = None,
		readonly guildId: Option<string> = None,
		readonly status: Option<string> = None,
		readonly activities: List<DiscordActivity> = List(),
		readonly clientStatus: Option<DiscordClientStatus> = None,
	) {
	}

	public getActivities(): List<DiscordActivity> {
		return this.activities;
	}

	public getClientStatus(): Option<DiscordClientStatus> {
		return this.clientStatus;
	}

	public getGuildId(): Option<string> {
		return this.guildId;
	}

	public getStatus(): Option<string> {
		return this.status;
	}

	public getUser(): Option<DiscordUser> {
		return this.user;
	}

}

export class PresenceJsonSerializer extends JsonSerializer<DiscordPresence> {

	static instance: PresenceJsonSerializer = new PresenceJsonSerializer();

	fromJson(json: any): DiscordPresence {
		return new DiscordPresence(
			UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseString(json[guildIdKey]),
			parseString(json[statusKey]),
			parseListSerialized(json[activitiesKey], ActivityJsonSerializer.instance),
			ClientStatusJsonSerializer.instance.fromJsonImpl(json[clientStatusKey]),
		);
	}

	toJson(value: DiscordPresence, builder: JsonBuilder): Record<string, any> {
		return builder.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
			.addOptional(value.getGuildId(), guildIdKey)
			.addOptional(value.getStatus(), statusKey)
			.addIterableSerialized(value.getActivities(), activitiesKey, ActivityJsonSerializer.instance)
			.addOptionalSerialized(value.getClientStatus(), clientStatusKey, ClientStatusJsonSerializer.instance)
			.build();
	}

}