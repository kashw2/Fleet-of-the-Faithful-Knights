import {None, Option} from 'funfix-core';
import {List, Set} from 'immutable';
import * as moment from 'moment';
import {DiscordEmoji, DiscordEmojiJsonSerializer} from './emoji';
import {DiscordRole, DiscordRoleJsonSerializer} from './role';
import {DiscordVoiceState, DiscordVoiceStateJsonSerializer} from './voice-state';
import {DiscordGuildMember, DiscordGuildMemberJsonSerializer} from './guild-member';
import {DiscordChannel, DiscordChannelJsonSerializer} from './channel';
import {DiscordPresence, DiscordPresenceJsonSerializer} from './presence';
import {
	JsonBuilder,
	JsonSerializer,
	parseBoolean, parseDate, parseListSerialized,
	parseNumber,
	parseSet,
	parseSetSerialized,
	parseString
} from '@kashw2/lib-util';
import {
	afkChannelIdKey,
	afkTimeoutKey, applicationIdKey,
	approximatePresenceCountKey,
	bannerKey,
	channelsKey,
	defaultMessageNotificationsKey,
	descriptionsKey,
	discoverySplashKey,
	emojiKey,
	explicitContentFilterKey,
	featuresKey,
	iconHashKey,
	iconKey,
	idKey,
	joinedAtKey,
	largeKey,
	maxMembersKey,
	maxPresencesKey,
	maxVideoChannelCountKey,
	memberCountKey,
	membersKey,
	mfaLevelKey,
	nameKey,
	ownerIdKey,
	ownerKey,
	permissionsKey,
	preferredLocaleKey,
	premiumSubscriptionCountKey,
	premiumTierKey,
	presencesKey,
	publicUpdatesChannelIdKey,
	regionKey,
	rolesKey,
	rulesChannelIdKey,
	splashKey,
	systemChannelFlagsKey,
	systemChannelIdKey,
	unavailableKey,
	vanityUrlCodeKey,
	verificationLevelKey,
	voiceStatesKey,
	widgetChannelIdKey,
	widgetEnabledKey
} from './json-keys';

export class DiscordGuild {

	constructor(
		readonly id: Option<string> = None,
		readonly name: Option<string> = None,
		readonly icon: Option<string> = None,
		readonly iconHash: Option<string> = None,
		readonly splash: Option<string> = None,
		readonly discoverySplash: Option<string> = None,
		readonly owner: Option<boolean> = None,
		readonly ownerId: Option<string> = None,
		readonly permissions: Option<string> = None,
		readonly region: Option<string> = None,
		readonly afkChannelId: Option<string> = None,
		readonly afkTimeout: Option<number> = None,
		readonly widgetEnabled: Option<boolean> = None,
		readonly widgetChannelId: Option<string> = None,
		readonly verificationLevel: Option<number> = None,
		readonly defaultMessageNotifications: Option<number> = None,
		readonly explicitContentFilter: Option<number> = None,
		readonly roles: Set<DiscordRole> = Set(),
		readonly emojis: Set<DiscordEmoji> = Set(),
		readonly features: Set<string> = Set(),
		readonly mfaLevel: Option<number> = None,
		readonly applicationId: Option<string> = None,
		readonly systemChannelId: Option<string> = None,
		readonly systemChannelFlags: Option<number> = None,
		readonly rulesChannelId: Option<string> = None,
		readonly joinedAt: Option<moment.Moment> = None,
		readonly large: Option<boolean> = None,
		readonly unavailable: Option<boolean> = None,
		readonly memberCount: Option<number> = None,
		readonly voiceStates: List<DiscordVoiceState> = List(),
		readonly members: Set<DiscordGuildMember> = Set(),
		readonly channels: Set<DiscordChannel> = Set(),
		readonly presences: Set<DiscordPresence> = Set(),
		readonly maxPresences: Option<number> = None,
		readonly maxMembers: Option<number> = None,
		readonly vanityUrlCode: Option<string> = None,
		readonly descriptions: Option<string> = None,
		readonly banner: Option<string> = None,
		readonly premiumTier: Option<number> = None,
		readonly premiumSubscriptionCount: Option<number> = None,
		readonly preferredLocale: Option<string> = None,
		readonly publicUpdatesChannelId: Option<string> = None,
		readonly maxVideoChannelCount: Option<number> = None,
		readonly approximatePresenceCount: Option<number> = None,
	) {
	}

	public getAfkChannelId(): Option<string> {
		return this.afkChannelId;
	}

	public getAfkTimeout(): Option<number> {
		return this.afkTimeout;
	}

	public getApplicationId(): Option<string> {
		return this.applicationId;
	}

	public getApproximatePresenceCount(): Option<number> {
		return this.approximatePresenceCount;
	}

	public getBanner(): Option<string> {
		return this.banner;
	}

	public getChannels(): Set<DiscordChannel> {
		return this.channels;
	}

	public getDefaultMessageNotifications(): Option<number> {
		return this.defaultMessageNotifications;
	}

	public getDescriptions(): Option<string> {
		return this.descriptions;
	}

	public getDiscoverySplash(): Option<string> {
		return this.discoverySplash;
	}

	public getEmojis(): Set<DiscordEmoji> {
		return this.emojis;
	}

	public getExplicitContentFilter(): Option<number> {
		return this.explicitContentFilter;
	}

	public getFeatures(): Set<string> {
		return this.features;
	}

	public getIcon(): Option<string> {
		return this.icon;
	}

	public getIconHash(): Option<string> {
		return this.iconHash;
	}

	public getId(): Option<string> {
		return this.id;
	}

	public getJoinedAt(): Option<moment.Moment> {
		return this.joinedAt;
	}

	public getLarge(): Option<boolean> {
		return this.large;
	}

	public getMaxMembers(): Option<number> {
		return this.maxMembers;
	}

	public getMaxPresences(): Option<number> {
		return this.maxPresences;
	}

	public getMaxVideoChannelCount(): Option<number> {
		return this.maxVideoChannelCount;
	}

	public getMemberCount(): Option<number> {
		return this.memberCount;
	}

	public getMembers(): Set<DiscordGuildMember> {
		return this.members;
	}

	public getMfaLevel(): Option<number> {
		return this.mfaLevel;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getOwner(): Option<boolean> {
		return this.owner;
	}

	public getOwnerId(): Option<string> {
		return this.ownerId;
	}

	public getPermissions(): Option<string> {
		return this.permissions;
	}

	public getPreferredLocale(): Option<string> {
		return this.preferredLocale;
	}

	public getPremiumSubscriptionCount(): Option<number> {
		return this.premiumSubscriptionCount;
	}

	public getPremiumTier(): Option<number> {
		return this.premiumTier;
	}

	public getPresences(): Set<DiscordPresence> {
		return this.presences;
	}

	public getPublicUpdatesChannelId(): Option<string> {
		return this.publicUpdatesChannelId;
	}

	public getRegion(): Option<string> {
		return this.region;
	}

	public getRoles(): Set<DiscordRole> {
		return this.roles;
	}

	public getRulesChannelId(): Option<string> {
		return this.rulesChannelId;
	}

	public getSplash(): Option<string> {
		return this.splash;
	}

	public getSystemChannelFlags(): Option<number> {
		return this.systemChannelFlags;
	}

	public getSystemChannelId(): Option<string> {
		return this.systemChannelId;
	}

	public getUnavailable(): Option<boolean> {
		return this.unavailable;
	}

	public getVanityUrlCode(): Option<string> {
		return this.vanityUrlCode;
	}

	public getVerificationLevel(): Option<number> {
		return this.verificationLevel;
	}

	public getVoiceStates(): List<DiscordVoiceState> {
		return this.voiceStates;
	}

	public getWidgetChannelId(): Option<string> {
		return this.widgetChannelId;
	}

	public getWidgetEnabled(): Option<boolean> {
		return this.widgetEnabled;
	}

}

export class DiscordGuildJsonSerializer extends JsonSerializer<DiscordGuild> {

	static instance: DiscordGuildJsonSerializer = new DiscordGuildJsonSerializer();

	fromJson(json: any): DiscordGuild {
		return new DiscordGuild(
			parseString(json[idKey]),
			parseString(json[nameKey]),
			parseString(json[iconKey]),
			parseString(json[iconHashKey]),
			parseString(json[splashKey]),
			parseString(json[discoverySplashKey]),
			parseBoolean(json[ownerKey]),
			parseString(json[ownerIdKey]),
			parseString(json[permissionsKey]),
			parseString(json[regionKey]),
			parseString(json[afkChannelIdKey]),
			parseNumber(json[afkTimeoutKey]),
			parseBoolean(json[widgetEnabledKey]),
			parseString(json[widgetChannelIdKey]),
			parseNumber(json[verificationLevelKey]),
			parseNumber(json[defaultMessageNotificationsKey]),
			parseNumber(json[explicitContentFilterKey]),
			parseSetSerialized(json[rolesKey], DiscordRoleJsonSerializer.instance),
			parseSetSerialized(json[emojiKey], DiscordEmojiJsonSerializer.instance),
			parseSet(json[featuresKey]),
			parseNumber(json[mfaLevelKey]),
			parseString(json[applicationIdKey]),
			parseString(json[systemChannelIdKey]),
			parseNumber(json[systemChannelFlagsKey]),
			parseString(json[rulesChannelIdKey]),
			parseDate(json[joinedAtKey]),
			parseBoolean(json[largeKey]),
			parseBoolean(json[unavailableKey]),
			parseNumber(json[memberCountKey]),
			parseListSerialized(json[voiceStatesKey], DiscordVoiceStateJsonSerializer.instance),
			parseSetSerialized(json[membersKey], DiscordGuildMemberJsonSerializer.instance),
			parseSetSerialized(json[channelsKey], DiscordChannelJsonSerializer.instance),
			parseSetSerialized(json[presencesKey], DiscordPresenceJsonSerializer.instance),
			parseNumber(json[maxPresencesKey]),
			parseNumber(json[maxMembersKey]),
			parseString(json[vanityUrlCodeKey]),
			parseString(json[descriptionsKey]),
			parseString(json[bannerKey]),
			parseNumber(json[premiumTierKey]),
			parseNumber(json[premiumSubscriptionCountKey]),
			parseString(json[preferredLocaleKey]),
			parseString(json[publicUpdatesChannelIdKey]),
			parseNumber(json[maxVideoChannelCountKey]),
			parseNumber(json[approximatePresenceCountKey]),
		);
	}

	toJson(value: DiscordGuild, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getId(), idKey)
			.addOptional(value.getName(), nameKey)
			.addOptional(value.getIcon(), iconKey)
			.addOptional(value.getIconHash(), iconHashKey)
			.addOptional(value.getSplash(), splashKey)
			.addOptional(value.getDiscoverySplash(), discoverySplashKey)
			.addOptional(value.getOwner(), ownerKey)
			.addOptional(value.getOwnerId(), ownerIdKey)
			.addOptional(value.getPermissions(), permissionsKey)
			.addOptional(value.getRegion(), regionKey)
			.addOptional(value.getAfkChannelId(), afkChannelIdKey)
			.addOptional(value.getAfkTimeout(), afkTimeoutKey)
			.addOptional(value.getWidgetEnabled(), widgetEnabledKey)
			.addOptional(value.getWidgetChannelId(), widgetChannelIdKey)
			.addOptional(value.getVerificationLevel(), verificationLevelKey)
			.addOptional(value.getDefaultMessageNotifications(), defaultMessageNotificationsKey)
			.addOptional(value.getExplicitContentFilter(), explicitContentFilterKey)
			.addIterableSerialized(value.getRoles(), rolesKey, DiscordRoleJsonSerializer.instance)
			.addIterableSerialized(value.getEmojis(), emojiKey, DiscordEmojiJsonSerializer.instance)
			.addIterable(value.getFeatures(), featuresKey)
			.addOptional(value.getApplicationId(), applicationIdKey)
			.addOptional(value.getMfaLevel(), mfaLevelKey)
			.addOptional(value.getSystemChannelId(), systemChannelIdKey)
			.addOptional(value.getSystemChannelFlags(), systemChannelFlagsKey)
			.addOptional(value.getRulesChannelId(), rulesChannelIdKey)
			.addOptionalDate(value.getJoinedAt(), joinedAtKey)
			.addOptional(value.getLarge(), largeKey)
			.addOptional(value.getUnavailable(), unavailableKey)
			.addOptional(value.getMemberCount(), memberCountKey)
			.addIterableSerialized(value.getVoiceStates(), voiceStatesKey, DiscordVoiceStateJsonSerializer.instance)
			.addIterableSerialized(value.getMembers(), membersKey, DiscordGuildMemberJsonSerializer.instance)
			.addIterableSerialized(value.getChannels(), channelsKey, DiscordChannelJsonSerializer.instance)
			.addIterableSerialized(value.getPresences(), presencesKey, DiscordPresenceJsonSerializer.instance)
			.addOptional(value.getMaxPresences(), maxPresencesKey)
			.addOptional(value.getMaxMembers(), maxMembersKey)
			.addOptional(value.getVanityUrlCode(), vanityUrlCodeKey)
			.addOptional(value.getDescriptions(), descriptionsKey)
			.addOptional(value.getBanner(), bannerKey)
			.addOptional(value.getPremiumTier(), premiumTierKey)
			.addOptional(value.getPremiumSubscriptionCount(), premiumSubscriptionCountKey)
			.addOptional(value.getPreferredLocale(), preferredLocaleKey)
			.addOptional(value.getPublicUpdatesChannelId(), publicUpdatesChannelIdKey)
			.addOptional(value.getMaxVideoChannelCount(), maxVideoChannelCountKey)
			.addOptional(value.getApproximatePresenceCount(), approximatePresenceCountKey);
	}

}
