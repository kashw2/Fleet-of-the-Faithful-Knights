import {Set} from 'immutable';
import * as moment from 'moment';
import {JsonBuilder, JsonSerializer, parseDate, parseSet, parseString} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {
	avatarKey,
	discordDiscriminatorKey,
	discordIdKey,
	groupKey,
	idKey,
	localeKey,
	memberSinceKey,
	permissionsKey,
	usernameKey
} from '../misc/json-keys';

export class User {

	constructor(
		private id: Option<string> = None,
		private username: Option<string> = None,
		private locale: Option<string> = None,
		private avatar: Option<string> = None,
		private discordId: Option<string> = None,
		private discordDiscriminator: Option<string> = None,
		private group: Option<string> = None,
		private permissions: Set<string> = Set(), // TODO: Make this Set<Enum>
		private memberSince: Option<moment.Moment> = None,
	) {
	}

	public getAvatar(): Option<string> {
		return this.avatar;
	}

	public getDiscordDiscriminator(): Option<string> {
		return this.discordDiscriminator;
	}

	public getDiscordId(): Option<string> {
		return this.discordId;
	}

	public getGroup(): Option<string> {
		return this.group;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getLocale(): Option<string> {
		return this.locale;
	}

	public getMemberSince(): Option<moment.Moment> {
		return this.memberSince;
	}

	public getPermissions(): Set<string> {
		return this.permissions;
	}

	public getUsername(): Option<string> {
		return this.username;
	}

}

export class UserJsonSerializer extends JsonSerializer<User> {

	static instance: UserJsonSerializer = new UserJsonSerializer();

	fromJson(json: any): User {
		return new User(
			parseString(json[idKey]),
			parseString(json[usernameKey]),
			parseString(json[localeKey]),
			parseString(json[avatarKey]),
			parseString(json[discordIdKey]),
			parseString(json[discordDiscriminatorKey]),
			parseString(json[groupKey]),
			parseSet(json[permissionsKey]),
			parseDate(json[memberSinceKey]),
		);
	}

	toJson(value: User, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getUsername(), usernameKey)
			.addOptional(value.getLocale(), localeKey)
			.addOptional(value.getAvatar(), avatarKey)
			.addOptional(value.getDiscordId(), discordIdKey)
			.addOptional(value.getDiscordDiscriminator(), discordDiscriminatorKey)
			.addOptional(value.getGroup(), groupKey)
			.addIterable(value.getPermissions(), permissionsKey)
			.addOptionalDate(value.getMemberSince(), memberSinceKey)
			.build();
	}
}