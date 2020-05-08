import {None, Option, Some} from "funfix-core";
import {List} from "immutable";
import {
    joinedAtKey,
    JsonBuilder,
    parseList,
    parseSerialized,
    parseString,
    rolesKey,
    SimpleJsonSerializer,
    userKey
} from "../..";
import {DiscordUser, DiscordUserJsonSerilaizer} from "./discord-user";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuildMember {

    constructor(
        readonly user: Option<DiscordUser> = None,
        readonly roles: List<string> = List(),
        readonly joinedAt: Option<string> = None,
    ) {
    }

    getJoinedAt(): Option<string> {
        return this.joinedAt;
    }

    getRoles(): List<string> {
        return this.roles;
    }

    getUser(): Option<DiscordUser> {
        return this.user;
    }

    withDiscordUserLocale(user: DiscordUser): DiscordGuildMember {
        return new DiscordGuildMember(
            this.getUser().flatMap(u => Some(user)),
            this.getRoles(),
            this.getJoinedAt(),
        );
    }

    withRole(role: string): DiscordGuildMember {
        return new DiscordGuildMember(
            this.getUser(),
            List.of(role),
            this.getJoinedAt(),
        );
    }

}

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuildMemberJsonSerializer extends SimpleJsonSerializer<DiscordGuildMember> {

    static instance: DiscordGuildMemberJsonSerializer = new DiscordGuildMemberJsonSerializer();

    fromJson(json: any): DiscordGuildMember {
        return new DiscordGuildMember(
            parseSerialized(json[userKey], DiscordUserJsonSerilaizer.instance),
            parseList(json[rolesKey]),
            parseString(json[joinedAtKey]),
        );
    }

    toJson(value: DiscordGuildMember, builder: JsonBuilder): object {
        return builder.addOptionalSerialized(value.getUser(), userKey, DiscordUserJsonSerilaizer.instance)
            .addList(value.getRoles(), rolesKey)
            .addOptional(value.getJoinedAt(), joinedAtKey)
            .build();
    }

}
