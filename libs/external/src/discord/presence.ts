import {List} from 'immutable';
import {Activity, ActivityJsonSerializer} from './activity';
import {ClientStatus, ClientStatusJsonSerializer} from './client-status';
import {JsonBuilder, JsonSerializer, parseListSerialized, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {User, UserJsonSerializer} from './user';
import {activitiesKey, clientStatusKey, guildIdKey, statusKey, userKey} from './json-keys';

export class Presence {

	constructor(
		readonly user: Option<User> = None,
		readonly guildId: Option<string> = None,
		readonly status: Option<string> = None,
		readonly activities: List<Activity> = List(),
		readonly clientStatus: Option<ClientStatus> = None,
	) {
	}

	public getUser(): Option<User> {
		return this.user;
	}

	public getGuildId(): Option<string> {
		return this.guildId;
	}

	public getStatus(): Option<string> {
		return this.status;
	}

	public getActivities(): List<Activity> {
		return this.activities;
	}

	public getClientStatus(): Option<ClientStatus> {
		return this.clientStatus;
	}

}

export class PresenceJsonSerializer extends JsonSerializer<Presence> {

	static instance: PresenceJsonSerializer = new PresenceJsonSerializer();

	fromJson(json: any): Presence {
		return new Presence(
			UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseString(json[guildIdKey]),
			parseString(json[statusKey]),
			parseListSerialized(json[activitiesKey], ActivityJsonSerializer.instance),
			ClientStatusJsonSerializer.instance.fromJsonImpl(json[clientStatusKey]),
		);
	}

	toJson(value: Presence, builder: JsonBuilder): Record<string, any> {
		return builder.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
			.addOptional(value.getGuildId(), guildIdKey)
			.addOptional(value.getStatus(), statusKey)
			.addIterableSerialized(value.getActivities(), activitiesKey, ActivityJsonSerializer.instance)
			.addOptionalSerialized(value.getClientStatus(), clientStatusKey, ClientStatusJsonSerializer.instance)
			.build();
	}

}