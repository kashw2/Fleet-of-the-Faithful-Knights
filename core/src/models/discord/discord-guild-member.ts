import {None, Option, Some} from "funfix-core";
import {Set} from "immutable";
import {
    joinedAtKey,
    JsonBuilder,
    parseSerialized,
    parseSet,
    parseString,
    rolesKey,
    SimpleJsonSerializer,
    userKey,
} from "../..";
import {GroupUtils} from "../../util/group-utils";
import {DiscordUser, DiscordUserJsonSerilaizer} from "./discord-user";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuildMember {

    constructor(
        readonly user: Option<DiscordUser> = None,
        readonly roles: Set<string> = Set(),
        readonly joinedAt: Option<string> = None,
    ) {
    }

    getJoinedAt(): Option<string> {
        return this.joinedAt;
    }

    getRoles(): Set<string> {
        return this.roles;
    }

    getRolesSortedHierarchy(): Set<string> {
        if (GroupUtils.containsNonGuestRoles(this.getRoles())) {
            return this.getRoles().filterNot(role => !GroupUtils.isNonGuestRole(role))
                .map(x => GroupUtils.getGroupNameFromDiscordRoleId(x));
        }
        return this.getRoles()
            .map(role => GroupUtils.getGroupNameFromDiscordRoleId(role));
    }

    getUser(): Option<DiscordUser> {
        return this.user;
    }

    private hasGuestRole(): boolean {
        return this.getRoles()
            .contains("Guest");
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
            Set.of(role),
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
            parseSet(json[rolesKey]),
            parseString(json[joinedAtKey]),
        );
    }

    toJson(value: DiscordGuildMember, builder: JsonBuilder): object {
        return builder.addOptionalSerialized(value.getUser(), userKey, DiscordUserJsonSerilaizer.instance)
            .addSet(value.getRoles(), rolesKey)
            .addOptional(value.getJoinedAt(), joinedAtKey)
            .build();
    }

}
