import {List} from "immutable";
import {None, Option} from "funfix-core";
import {DiscordUser, DiscordUserJsonSerilaizer} from "./discord-user";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {JsonBuilder} from "../../misc/json-builder";
import {parseBoolean, parseSerialized, parseSerializedList, parseString} from "../../util/object-utils";
import {
    authorKey,
    channelIdKey,
    contentKey,
    editedTimestampKey,
    guildIdKey,
    idKey,
    memberKey,
    mentionEveryoneKey,
    mentionRolesKey,
    mentionsKey,
    timestampKey,
    ttsKey
} from "../../misc/json-keys";
import {DiscordRole, DiscordRoleJsonSerializer} from "./discord-role";
import {DiscordGuildMember, DiscordGuildMemberJsonSerializer} from "./discord-guild-member";

// FIXME: This class doesn't contain all the properties off the full DiscordMessage class.
// https://discord.com/developers/docs/resources/channel#message-object
export class DiscordMessage {

    constructor(
        readonly id: Option<string> = None,
        readonly channelId: Option<string> = None,
        readonly guildId: Option<string> = None,
        readonly author: Option<DiscordUser> = None,
        readonly member: Option<DiscordGuildMember> = None,
        readonly content: Option<string> = None,
        readonly timestamp: Option<string> = None,
        readonly editedTimestamp: Option<string> = None,
        readonly tts: Option<boolean> = None,
        readonly mentionEveryone: Option<boolean> = None,
        readonly mentions: List<DiscordUser> = List(),
        readonly mentionRoles: List<DiscordRole> = List(),
    ) {
    }

    getAuthor(): Option<DiscordUser> {
        return this.author;
    }

    getChannelId(): Option<string> {
        return this.channelId;
    }

    getContent(): Option<string> {
        return this.content;
    }

    getEditedTimestamp(): Option<string> {
        return this.editedTimestamp;
    }

    getGuildId(): Option<string> {
        return this.guildId;
    }

    getId(): Option<string> {
        return this.id;
    }

    getMember(): Option<DiscordGuildMember> {
        return this.member;
    }

    getMentionedRoles(): List<DiscordRole> {
        return this.mentionRoles;
    }

    getMentionEveryone(): Option<boolean> {
        return this.mentionEveryone;
    }

    getMentions(): List<DiscordUser> {
        return this.mentions;
    }

    getTimestamp(): Option<string> {
        return this.timestamp;
    }

    getTts(): Option<boolean> {
        return this.tts;
    }

    isAuthoredBy(authorId: string): boolean {
        return this.getAuthor()
            .flatMap(a => a.getId())
            .contains(authorId);
    }

    isEdited(): boolean {
        return this.getEditedTimestamp().nonEmpty();
    }

    isMentioningEveryone(): boolean {
        return this.getMentionEveryone()
            .contains(true);
    }

    isTts(): boolean {
        return this.getTts()
            .contains(true);
    }

}

export class DiscordMessageJsonSerializer extends SimpleJsonSerializer<DiscordMessage> {

    static instance: DiscordMessageJsonSerializer = new DiscordMessageJsonSerializer();

    fromJson(json: any): DiscordMessage {
        return new DiscordMessage(
            parseString(json[idKey]),
            parseString(json[channelIdKey]),
            parseString(json[guildIdKey]),
            parseSerialized(json[authorKey], DiscordUserJsonSerilaizer.instance),
            parseSerialized(json[memberKey], DiscordGuildMemberJsonSerializer.instance),
            parseString(json[contentKey]),
            parseString(json[timestampKey]),
            parseString(json[editedTimestampKey]),
            parseBoolean(json[ttsKey]),
            parseBoolean(json[mentionEveryoneKey]),
            parseSerializedList(json[mentionsKey], DiscordUserJsonSerilaizer.instance),
            parseSerializedList(json[mentionRolesKey], DiscordRoleJsonSerializer.instance),
        );
    }

    toJson(value: DiscordMessage, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getChannelId(), channelIdKey)
            .addOptional(value.getGuildId(), guildIdKey)
            .addOptional(value.getAuthor(), authorKey)
            .addOptional(value.getMember(), memberKey)
            .addOptional(value.getContent(), contentKey)
            .addOptional(value.getTimestamp(), timestampKey)
            .addOptional(value.getEditedTimestamp(), editedTimestampKey)
            .addOptional(value.getTts(), ttsKey)
            .addOptional(value.getMentionEveryone(), mentionEveryoneKey)
            .addListSerialized(value.getMentions(), mentionsKey, DiscordUserJsonSerilaizer.instance)
            .addListSerialized(value.getMentionedRoles(), mentionRolesKey, DiscordRoleJsonSerializer.instance)
            .build();
    }

}
