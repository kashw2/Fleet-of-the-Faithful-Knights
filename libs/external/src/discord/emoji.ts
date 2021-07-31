import {None, Option} from 'funfix-core';
import {Set} from 'immutable';
import {DiscordUser, DiscordUserJsonSerializer} from './user';
import {JsonBuilder, JsonSerializer, parseBoolean, parseSet, parseString} from '@kashw2/lib-util';
import {animatedKey, availableKey, idKey, managedKey, nameKey, requireColonsKey, rolesKey, userKey} from './json-keys';

export class DiscordEmoji {

	constructor(
		readonly id: Option<string> = None,
		readonly name: Option<string> = None,
		readonly roles: Set<string> = Set(),
		readonly user: Option<DiscordUser> = None,
		readonly requireColons: Option<boolean> = None,
		readonly managed: Option<boolean> = None,
		readonly animated: Option<boolean> = None,
		readonly available: Option<boolean> = None,
	) {
	}

	public getAnimated(): Option<boolean> {
		return this.animated;
	}

	public getAvailable(): Option<boolean> {
		return this.available;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getManaged(): Option<boolean> {
		return this.managed;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getRequireColons(): Option<boolean> {
		return this.requireColons;
	}

	public getRoles(): Set<string> {
		return this.roles;
	}

	public getUser(): Option<DiscordUser> {
		return this.user;
	}

}

export class DiscordEmojiJsonSerializer extends JsonSerializer<DiscordEmoji> {

	static instance: DiscordEmojiJsonSerializer = new DiscordEmojiJsonSerializer();

	fromJson(json: any): DiscordEmoji {
		return new DiscordEmoji(
			parseString(json[idKey]),
			parseString(json[nameKey]),
			parseSet(json[rolesKey]),
			DiscordUserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseBoolean(json[requireColonsKey]),
			parseBoolean(json[managedKey]),
			parseBoolean(json[animatedKey]),
			parseBoolean(json[availableKey]),
		);
	}

	toJson(value: DiscordEmoji, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getName(), nameKey)
			.addIterable(value.getRoles(), rolesKey)
			.addOptionalSerialized(value.getUser(), userKey, DiscordUserJsonSerializer.instance)
			.addOptional(value.getRequireColons(), requireColonsKey)
			.addOptional(value.getManaged(), managedKey)
			.addOptional(value.getAnimated(), animatedKey)
			.addOptional(value.getAvailable(), availableKey)
			.build();
	}

}
