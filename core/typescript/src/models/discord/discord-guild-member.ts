import {None, Option, Some} from "funfix-core";
import {Set} from "immutable";
import {DiscordUser, DiscordUserJsonSerilaizer} from "./discord-user";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {JsonBuilder} from "../../misc/json-builder";
import {parseSerialized, parseString, parseSet} from "../../util/object-utils";
import {joinedAtKey, nicknameKey, rolesKey, userKey} from "../../misc/json-keys";
import {GroupUtils} from "../../util/group-utils";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordGuildMember {

    constructor(
        readonly user: Option<DiscordUser> = None,
        readonly nickname: Option<string> = None,
        readonly roles: Set<string> = Set(),
        readonly joinedAt: Option<string> = None,
    ) {
    }

    getJoinedAt(): Option<string> {
        return this.joinedAt;
    }

    getNickname(): Option<string> {
        return this.nickname;
    }

    getRoles(): Set<string> {
        return this.roles;
    }

    getRolesSortedHierarchy(): Set<string> {
        if (GroupUtils.containsNonGuestRoles(this.getRoles())) {
            return this.getRoles()
                .filter(role => GroupUtils.isInRoleHierarchy(role, "DISCORD"))
                .map(x => GroupUtils.getGroupNameFromDiscordRoleId(x))
                // TODO: Investigate using GroupUtils methods here.
                .sort((now, previous) => {
                    if (GroupUtils.isGroupHigher(now, previous)) {
                        return 1;
                    }
                    if (GroupUtils.isGroupLower(now, previous)) {
                        return -1;
                    }
                    return 0;
                })
        }
        return this.getRoles()
            .map(role => GroupUtils.getGroupNameFromDiscordRoleId(role));
    }

    getUser(): Option<DiscordUser> {
        return this.user;
    }

    withDiscordUserLocale(user: DiscordUser): DiscordGuildMember {
        return new DiscordGuildMember(
            this.getUser().flatMap(u => Some(user)),
            this.getNickname(),
            this.getRoles(),
            this.getJoinedAt(),
        );
    }

    withRole(role: string): DiscordGuildMember {
        return new DiscordGuildMember(
            this.getUser(),
            this.getNickname(),
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
            parseString(json[nicknameKey]),
            parseSet(json[rolesKey]),
            parseString(json[joinedAtKey]),
        );
    }

    toJson(value: DiscordGuildMember, builder: JsonBuilder): object {
        return builder.addOptionalSerialized(value.getUser(), userKey, DiscordUserJsonSerilaizer.instance)
            .addOptional(value.getNickname(), nicknameKey)
            .addSet(value.getRoles(), rolesKey)
            .addOptional(value.getJoinedAt(), joinedAtKey)
            .build();
    }

}
