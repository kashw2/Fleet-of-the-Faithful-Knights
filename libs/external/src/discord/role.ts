import {None, Option} from "funfix-core";
import {List} from "immutable";
import {RoleTag, RoleTagJsonSerializer} from "./role-tag";
import {JsonBuilder, JsonSerializer} from "@ffk/lib-util";
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
} from "./json-keys";

export class Role {

    constructor(
        readonly id: Option<string> = None,
        readonly name: Option<string> = None,
        readonly color: Option<number> = None,
        readonly hoist: Option<boolean> = None,
        readonly position: Option<number> = None,
        readonly permissions: Option<string> = None,
        readonly managed: Option<boolean> = None,
        readonly mentionable: Option<boolean> = None,
        readonly tags: List<RoleTag> = List(),
    ) {
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getName(): Option<string> {
        return this.name;
    }

    public getColor(): Option<number> {
        return this.color;
    }

    public getHoist(): Option<boolean> {
        return this.hoist;
    }

    public getPosition(): Option<number> {
        return this.position;
    }

    public getPermissions(): Option<string> {
        return this.permissions;
    }

    public getManaged(): Option<boolean> {
        return this.managed;
    }

    public getMentionable(): Option<boolean> {
        return this.mentionable;
    }

    public getTags(): List<RoleTag> {
        return this.tags
    }

}

export class RoleJsonSerializer extends JsonSerializer<Role> {

    static instance: RoleJsonSerializer = new RoleJsonSerializer();

    fromJson(json: any): Role {
        return new Role();
    }

    toJson(value: Role, builder: JsonBuilder): object {
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