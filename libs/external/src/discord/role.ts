import {None, Option} from 'funfix-core';
import {List} from 'immutable';
import {DiscordRoleTag, RoleTagJsonSerializer} from './role-tag';
import {JsonBuilder, JsonSerializer, parseBoolean, parseListSerialized, parseNumber, parseString} from '@ffk/lib-util';
import {
	colorKey,
	hoistKey,
	idKey,
	managedKey,
	mentionableKey,
	nameKey,
	permissionsKey,
	positionKey,
	tagsKey
} from './json-keys';

export class DiscordRole {

	constructor(
		readonly id: Option<string> = None,
		readonly name: Option<string> = None,
		readonly color: Option<number> = None,
		readonly hoist: Option<boolean> = None,
		readonly position: Option<number> = None,
		readonly permissions: Option<string> = None,
		readonly managed: Option<boolean> = None,
		readonly mentionable: Option<boolean> = None,
		readonly tags: List<DiscordRoleTag> = List(),
	) {
	}

	public getColor(): Option<number> {
		return this.color;
	}

	public getHoist(): Option<boolean> {
		return this.hoist;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getManaged(): Option<boolean> {
		return this.managed;
	}

	public getMentionable(): Option<boolean> {
		return this.mentionable;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getPermissions(): Option<string> {
		return this.permissions;
	}

	public getPosition(): Option<number> {
		return this.position;
	}

	public getTags(): List<DiscordRoleTag> {
		return this.tags;
	}

}

export class RoleJsonSerializer extends JsonSerializer<DiscordRole> {

	static instance: RoleJsonSerializer = new RoleJsonSerializer();

	fromJson(json: any): DiscordRole {
		return new DiscordRole(
			parseString(json[idKey]),
			parseString(json[nameKey]),
			parseNumber(json[colorKey]),
			parseBoolean(json[hoistKey]),
			parseNumber(json[positionKey]),
			parseString(json[permissionsKey]),
			parseBoolean(json[managedKey]),
			parseBoolean(json[mentionableKey]),
			parseListSerialized(json[tagsKey], RoleTagJsonSerializer.instance),
		);
	}

	toJson(value: DiscordRole, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getName(), nameKey)
			.addOptional(value.getColor(), colorKey)
			.addOptional(value.getHoist(), hoistKey)
			.addOptional(value.getPosition(), positionKey)
			.addOptional(value.getPermissions(), permissionsKey)
			.addOptional(value.getManaged(), managedKey)
			.addOptional(value.getMentionable(), mentionableKey)
			.addIterableSerialized(value.getTags(), tagsKey, RoleTagJsonSerializer.instance)
			.build();
	}

}