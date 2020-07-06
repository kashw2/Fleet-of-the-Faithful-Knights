import {parseBoolean, parseNumber, parseString} from "../../util/object-utils";
import {colorKey, hoistKey, idKey, managedKey, mentionableKey, nameKey, permissionsKey, positionKey} from "../../misc/json-keys";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {JsonBuilder} from "../../misc/json-builder";
import {None, Option} from "funfix-core";

export class DiscordRole {

    constructor(
        readonly id: Option<string> = None,
        readonly name: Option<string> = None,
        readonly color: Option<number> = None,
        readonly hoist: Option<boolean> = None,
        readonly position: Option<number> = None,
        readonly permissions: Option<number> = None,
        readonly managed: Option<boolean> = None,
        readonly mentionable: Option<boolean> = None,
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

    public getPermissions(): Option<number> {
        return this.permissions;
    }

    public getPosition(): Option<number> {
        return this.position;
    }

    public isHoisted(): boolean {
        return this.getHoist()
            .contains(true);
    }

    public isManaged(): boolean {
        return this.getManaged()
            .contains(true);
    }

    public isMentionable(): boolean {
        return this.getMentionable()
            .contains(true);
    }

}

export class DiscordRoleJsonSerializer extends SimpleJsonSerializer<DiscordRole> {

    static instance: DiscordRoleJsonSerializer = new DiscordRoleJsonSerializer();

    fromJson(json: any): DiscordRole {
        return new DiscordRole(
            parseString(json[idKey]),
            parseString(json[nameKey]),
            parseNumber(json[colorKey]),
            parseBoolean(json[hoistKey]),
            parseNumber(json[positionKey]),
            parseNumber(json[permissionsKey]),
            parseBoolean(json[managedKey]),
            parseBoolean(json[mentionableKey]),
        );
    }

    toJson(value: DiscordRole, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getName(), nameKey)
            .addOptional(value.getColor(), colorKey)
            .addOptional(value.getHoist(), hoistKey)
            .addOptional(value.getPosition(), positionKey)
            .addOptional(value.getPermissions(), permissionsKey)
            .addOptional(value.getManaged(), managedKey)
            .addOptional(value.getMentionable(), mentionableKey)
            .build();
    }

}
