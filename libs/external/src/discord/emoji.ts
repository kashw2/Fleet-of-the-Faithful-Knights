import {None, Option} from 'funfix-core';
import {Set} from 'immutable';
import {User, UserJsonSerializer} from './user';
import {JsonBuilder, JsonSerializer, parseBoolean, parseSet, parseString} from '@ffk/lib-util';
import {animatedKey, availableKey, idKey, managedKey, nameKey, requireColonsKey, rolesKey, userKey} from './json-keys';

export class Emoji {

	constructor(
		readonly id: Option<string> = None,
		readonly name: Option<string> = None,
		readonly roles: Set<string> = Set(),
		readonly user: Option<User> = None,
		readonly requireColons: Option<boolean> = None,
		readonly managed: Option<boolean> = None,
		readonly animated: Option<boolean> = None,
		readonly available: Option<boolean> = None,
	) {
	}

	public getAvailable(): Option<boolean> {
		return this.available;
	}

	public getAnimated(): Option<boolean> {
		return this.animated;
	}

	public getManaged(): Option<boolean> {
		return this.managed;
	}

	public getRequireColons(): Option<boolean> {
		return this.requireColons;
	}

	public getUser(): Option<User> {
		return this.user;
	}

	public getRoles(): Set<string> {
		return this.roles;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getId(): Option<string> {
		return this.id;
	}

}

export class EmojiJsonSerializer extends JsonSerializer<Emoji> {

	static instance: EmojiJsonSerializer = new EmojiJsonSerializer();

	fromJson(json: any): Emoji {
		return new Emoji(
			parseString(json[idKey]),
			parseString(json[nameKey]),
			parseSet(json[rolesKey]),
			UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
			parseBoolean(json[requireColonsKey]),
			parseBoolean(json[managedKey]),
			parseBoolean(json[animatedKey]),
			parseBoolean(json[availableKey]),
		);
	}

	toJson(value: Emoji, builder: JsonBuilder): object {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getName(), nameKey)
			.addIterable(value.getRoles(), rolesKey)
			.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
			.addOptional(value.getRequireColons(), requireColonsKey)
			.addOptional(value.getManaged(), managedKey)
			.addOptional(value.getAnimated(), animatedKey)
			.addOptional(value.getAvailable(), availableKey)
			.build();
	}

}