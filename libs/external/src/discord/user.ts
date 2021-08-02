import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseBoolean, parseNumber, parseString} from '@kashw2/lib-util';
import {
	botKey,
	discriminatorKey,
	emailKey,
	flagsKey,
	idKey,
	localeKey,
	mfaEnabledKey,
	premiumTypeKey,
	publicFlagsKey,
	systemKey,
	usernameKey,
	verifiedKey
} from './json-keys';
import {avatarKey} from "@kashw2/lib-ts";

export class DiscordUser {

	constructor(
		readonly id: Option<string> = None,
		readonly username: Option<string> = None,
		readonly discriminator: Option<string> = None,
		readonly avatar: Option<string> = None,
		readonly bot: Option<boolean> = None,
		readonly system: Option<boolean> = None,
		readonly mfaEnabled: Option<boolean> = None,
		readonly locale: Option<string> = None,
		readonly verified: Option<boolean> = None,
		readonly email: Option<string> = None,
		readonly flags: Option<string> = None, // TODO: Implement Flags
		readonly premiumType: Option<number> = None,
		readonly publicFlags: Option<string> = None // TODO: Implement Flags
	) {
	}

	public getAvatar(): Option<string> {
		return this.avatar;
	}

	public getBot(): Option<boolean> {
		return this.bot;
	}

	public getDiscriminator(): Option<string> {
		return this.discriminator;
	}

	public getEmail(): Option<string> {
		return this.email;
	}

	public getFlags(): Option<string> {
		return this.flags;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getLocale(): Option<string> {
		return this.locale;
	}

	public getMfaEnabled(): Option<boolean> {
		return this.mfaEnabled;
	}

	public getPremiumType(): Option<number> {
		return this.premiumType;
	}

	public getPublicFlags(): Option<string> {
		return this.publicFlags;
	}

	public getSystem(): Option<boolean> {
		return this.system;
	}

	public getUsername(): Option<string> {
		return this.username;
	}

	public getVerified(): Option<boolean> {
		return this.verified;
	}

}

export class DiscordUserJsonSerializer extends JsonSerializer<DiscordUser> {

	static instance: DiscordUserJsonSerializer = new DiscordUserJsonSerializer();

	fromJson(json: any): DiscordUser {
		return new DiscordUser(
			parseString(json[idKey]),
			parseString(json[usernameKey]),
			parseString(json[discriminatorKey]),
			parseString(json[avatarKey]),
			parseBoolean(json[botKey]),
			parseBoolean(json[systemKey]),
			parseBoolean(json[mfaEnabledKey]),
			parseString(json[localeKey]),
			parseBoolean(json[verifiedKey]),
			parseString(json[emailKey]),
			parseString(json[flagsKey]),
			parseNumber(json[premiumTypeKey]),
			parseString(json[publicFlagsKey]),
		);
	}

	toJson(value: DiscordUser, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getUsername(), usernameKey)
			.addOptional(value.getDiscriminator(), discriminatorKey)
			.addOptional(value.getAvatar(), avatarKey)
			.addOptional(value.getBot(), botKey)
			.addOptional(value.getSystem(), systemKey)
			.addOptional(value.getMfaEnabled(), mfaEnabledKey)
			.addOptional(value.getLocale(), localeKey)
			.addOptional(value.getVerified(), verifiedKey)
			.addOptional(value.getEmail(), emailKey)
			.addOptional(value.getFlags(), flagsKey)
			.addOptional(value.getPremiumType(), premiumTypeKey)
			.addOptional(value.getPublicFlags(), publicFlagsKey)
			.build();
	}

}
