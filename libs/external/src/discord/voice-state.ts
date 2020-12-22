import {None, Option} from 'funfix-core';
import {GuildMember, GuildMemberJsonSerializer} from './guild-member';
import {JsonBuilder, JsonSerializer, parseBoolean, parseString} from '@ffk/lib-util';
import {
	channelIdKey,
	deafKey,
	guildIdKey,
	memberKey,
	muteKey,
	selfDeafKey,
	selfMuteKey,
	selfStreamKey,
	selfVideoKey,
	sessionIdKey,
	suppressKey,
	userIdKey
} from './json-keys';

export class VoiceState {

	constructor(
		readonly guildId: Option<string> = None,
		readonly channelId: Option<string> = None,
		readonly userId: Option<string> = None,
		readonly member: Option<GuildMember> = None,
		readonly sessionId: Option<string> = None,
		readonly deaf: Option<boolean> = None,
		readonly mute: Option<boolean> = None,
		readonly selfDeaf: Option<boolean> = None,
		readonly selfMute: Option<boolean> = None,
		readonly selfStream: Option<boolean> = None,
		readonly selfVideo: Option<boolean> = None,
		readonly suppress: Option<boolean> = None,
	) {
	}

	public getGuildId(): Option<string> {
		return this.guildId;
	}

	public getChannelId(): Option<string> {
		return this.channelId;
	}

	public getUserId(): Option<string> {
		return this.userId;
	}

	public getMember(): Option<GuildMember> {
		return this.member;
	}

	public getSessionId(): Option<string> {
		return this.sessionId;
	}

	public getDeaf(): Option<boolean> {
		return this.deaf;
	}

	public getMute(): Option<boolean> {
		return this.mute;
	}

	public getSelfDeaf(): Option<boolean> {
		return this.selfDeaf;
	}

	public getSelfMute(): Option<boolean> {
		return this.selfMute;
	}

	public getSelfStream(): Option<boolean> {
		return this.selfStream;
	}

	public getSelfVideo(): Option<boolean> {
		return this.selfVideo;
	}

	public getSuppress(): Option<boolean> {
		return this.suppress;
	}

}

export class VoiceStateJsonSerializer extends JsonSerializer<VoiceState> {

	static instance: VoiceStateJsonSerializer = new VoiceStateJsonSerializer();

	fromJson(json: any): VoiceState {
		return new VoiceState(
			parseString(json[guildIdKey]),
			parseString(json[channelIdKey]),
			parseString(json[userIdKey]),
			GuildMemberJsonSerializer.instance.fromJsonImpl(json[memberKey]),
			parseString(json[sessionIdKey]),
			parseBoolean(json[deafKey]),
			parseBoolean(json[muteKey]),
			parseBoolean(json[selfDeafKey]),
			parseBoolean(json[selfMuteKey]),
			parseBoolean(json[selfStreamKey]),
			parseBoolean(json[selfVideoKey]),
			parseBoolean(json[suppressKey]),
		);
	}

	toJson(value: VoiceState, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getGuildId(), guildIdKey)
			.addOptional(value.getChannelId(), channelIdKey)
			.addOptional(value.getUserId(), userIdKey)
			.addOptionalSerialized(value.getMember(), memberKey, GuildMemberJsonSerializer.instance)
			.addOptional(value.getSessionId(), sessionIdKey)
			.addOptional(value.getDeaf(), deafKey)
			.addOptional(value.getMute(), muteKey)
			.addOptional(value.getSelfDeaf(), selfDeafKey)
			.addOptional(value.getSelfMute(), selfMuteKey)
			.addOptional(value.getSelfStream(), selfStreamKey)
			.addOptional(value.getSelfVideo(), selfVideoKey)
			.addOptional(value.getSuppress(), suppressKey)
			.build();
	}

}