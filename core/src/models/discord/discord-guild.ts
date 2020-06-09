import {None, Option} from "funfix-core";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {parseNumber, parseString} from "../../util/object-utils";
import {approximateMemberCountKey, idKey, nameKey} from "../../misc/json-keys";
import {JsonBuilder} from "../../misc/json-builder";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuild {

    constructor(
        readonly id: Option<string> = None,
        readonly name: Option<string> = None,
        readonly memberCount: Option<number> = None,
    ) {
    }

    getApproximateMemberCount(): Option<number> {
        return this.memberCount;
    }

    getId(): Option<string> {
        return this.id;
    }

    getName(): Option<string> {
        return this.name;
    }

}

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuildJsonSerializer extends SimpleJsonSerializer<DiscordGuild> {

    static instance: DiscordGuildJsonSerializer = new DiscordGuildJsonSerializer();

    fromJson(json: any): DiscordGuild {
        return new DiscordGuild(
            parseString(json[idKey]),
            parseString(json[nameKey]),
            parseNumber(json[approximateMemberCountKey]),
        );
    }

    toJson(value: DiscordGuild, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptional(value.getName(), nameKey)
            .addOptional(value.getApproximateMemberCount(), approximateMemberCountKey)
            .build();
    }

}
