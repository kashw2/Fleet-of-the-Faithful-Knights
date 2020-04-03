import {Option} from "funfix-core";
import {avatarKey, discriminatorKey, groupIdKey, JsonBuilder, SimpleJsonSerializer, User, usernameKey} from "../..";
import {MiscUtil} from "../../util/misc-util";
import {DiscordGuildMember} from "../discord/discord-guild-member";

export class DbUser {

    constructor(
        readonly username: string,
        readonly discriminator: string,
        readonly groupId: number,
        readonly avatar: string,
    ) {
    }

    static fromDiscordGuildMember(guildMember: DiscordGuildMember): Option<DbUser> {
        return Option.map3(
            guildMember.getUser().flatMap(u => u.getUsername()),
            guildMember.getUser().flatMap(u => u.getDiscriminator()),
            guildMember.getUser().flatMap(u => u.getAvatar()),
            (username, discriminator, avatar) => {
                return new DbUser(
                    username,
                    discriminator,
                    MiscUtil.getGroupIdFromName(MiscUtil.getGroupNameFromDiscordRoleId(guildMember.getRoles().first())),
                    avatar,
                );
            },
        );
    }

    static fromUser(user: User): Option<DbUser> {
        return Option.map4(
            user.getUsername(),
            user.getDiscriminator(),
            user.getGroup(),
            user.getAvatar(),
            (username, discriminator, group, avatar) => {
                return new DbUser(
                    username,
                    discriminator,
                    MiscUtil.getGroupIdFromName(MiscUtil.parseGroup(group)),
                    avatar,
                );
            },
        );
    }

    getAvatar(): string {
        return this.avatar;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    getGroupId(): number {
        return this.groupId;
    }

    getUsername(): string {
        return this.username;
    }

}

export class DbUserJsonSerializer extends SimpleJsonSerializer<DbUser> {

    static instance: DbUserJsonSerializer = new DbUserJsonSerializer();

    fromJson(json: any): DbUser {
        throw new Error("Db classes are read only");
    }

    toJsonImpl(value: DbUser, builder: JsonBuilder): object {
        return builder.add(value.getUsername(), usernameKey)
            .add(value.getDiscriminator(), discriminatorKey)
            .add(value.getAvatar(), avatarKey)
            .add(value.getGroupId(), groupIdKey)
            .build();
    }

}
