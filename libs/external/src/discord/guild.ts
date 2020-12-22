import {None, Option} from 'funfix-core';
import {List, Set} from 'immutable';
import {Moment} from 'moment';
import {Emoji, EmojiJsonSerializer} from './emoji';
import {Role, RoleJsonSerializer} from './role';
import {VoiceState, VoiceStateJsonSerializer} from './voice-state';
import {GuildMember, GuildMemberJsonSerializer} from './guild-member';
import {Channel, ChannelJsonSerializer} from './channel';
import {Presence, PresenceJsonSerializer} from './presence';
import {
	JsonBuilder,
	JsonSerializer,
	parseBoolean, parseDate, parseListSerialized,
	parseNumber,
	parseSet,
	parseSetSerialized,
	parseString
} from '@ffk/lib-util';
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

export class Guild {

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
		readonly roles: Set<Role> = Set(),
		readonly emojis: Set<Emoji> = Set(),
		readonly features: Set<string> = Set(),
		readonly mfaLevel: Option<number> = None,
		readonly applicationId: Option<string> = None,
		readonly systemChannelId: Option<string> = None,
		readonly systemChannelFlags: Option<number> = None,
		readonly rulesChannelId: Option<string> = None,
		readonly joinedAt: Option<Moment> = None,
		readonly large: Option<boolean> = None,
		readonly unavailable: Option<boolean> = None,
		readonly memberCount: Option<number> = None,
		readonly voiceStates: List<VoiceState> = List(),
		readonly members: Set<GuildMember> = Set(),
		readonly channels: Set<Channel> = Set(),
		readonly presences: Set<Presence> = Set(),
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

	public getId(): Option<string> {
		return this.id;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getIcon(): Option<string> {
		return this.icon;
	}

	public getIconHash(): Option<string> {
		return this.iconHash;
	}

	public getSplash(): Option<string> {
		return this.splash;
	}

	public getDiscoverySplash(): Option<string> {
		return this.discoverySplash;
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

	public getRegion(): Option<string> {
		return this.region;
	}

	public getAfkChannelId(): Option<string> {
		return this.afkChannelId;
	}

	public getAfkTimeout(): Option<number> {
		return this.afkTimeout;
	}

	public getWidgetEnabled(): Option<boolean> {
		return this.widgetEnabled;
	}

	public getWidgetChannelId(): Option<string> {
		return this.widgetChannelId;
	}

	public getVerificationLevel(): Option<number> {
		return this.verificationLevel;
	}

	public getDefaultMessageNotifications(): Option<number> {
		return this.defaultMessageNotifications;
	}

	public getExplicitContentFilter(): Option<number> {
		return this.explicitContentFilter;
	}

	public getRoles(): Set<Role> {
		return this.roles;
	}

	public getEmojis(): Set<Emoji> {
		return this.emojis;
	}

	public getFeatures(): Set<string> {
		return this.features;
	}

	public getMfaLevel(): Option<number> {
		return this.mfaLevel;
	}

	public getApplicationId(): Option<string> {
		return this.applicationId;
	}

	public getSystemChannelId(): Option<string> {
		return this.systemChannelId;
	}

	public getSystemChannelFlags(): Option<number> {
		return this.systemChannelFlags;
	}

	public getRulesChannelId(): Option<string> {
		return this.rulesChannelId;
	}

	public getJoinedAt(): Option<Moment> {
		return this.joinedAt;
	}

	public getLarge(): Option<boolean> {
		return this.large;
	}

	public getUnavailable(): Option<boolean> {
		return this.unavailable;
	}

	public getMemberCount(): Option<number> {
		return this.memberCount;
	}

	public getVoiceStates(): List<VoiceState> {
		return this.voiceStates;
	}

	public getMembers(): Set<GuildMember> {
		return this.members;
	}

	public getChannels(): Set<Channel> {
		return this.channels;
	}

	public getPresences(): Set<Presence> {
		return this.presences;
	}

	public getMaxPresences(): Option<number> {
		return this.maxPresences;
	}

	public getMaxMembers(): Option<number> {
		return this.maxMembers;
	}

	public getVanityUrlCode(): Option<string> {
		return this.vanityUrlCode;
	}

	public getDescriptions(): Option<string> {
		return this.descriptions;
	}

	public getBanner(): Option<string> {
		return this.banner;
	}

	public getPremiumTier(): Option<number> {
		return this.premiumTier;
	}

	public getPremiumSubscriptionCount(): Option<number> {
		return this.premiumSubscriptionCount;
	}

	public getPreferredLocale(): Option<string> {
		return this.preferredLocale;
	}

	public getPublicUpdatesChannelId(): Option<string> {
		return this.publicUpdatesChannelId;
	}

	public getMaxVideoChannelCount(): Option<number> {
		return this.maxVideoChannelCount;
	}

	public getApproximatePresenceCount(): Option<number> {
		return this.approximatePresenceCount;
	}

}

export class GuildJsonSerializer extends JsonSerializer<Guild> {

	static instance: GuildJsonSerializer = new GuildJsonSerializer();

	fromJson(json: any): Guild {
		return new Guild(
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
			parseSetSerialized(json[rolesKey], RoleJsonSerializer.instance),
			parseSetSerialized(json[emojiKey], EmojiJsonSerializer.instance),
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
			parseListSerialized(json[voiceStatesKey], VoiceStateJsonSerializer.instance),
			parseSetSerialized(json[membersKey], GuildMemberJsonSerializer.instance),
			parseSetSerialized(json[channelsKey], ChannelJsonSerializer.instance),
			parseSetSerialized(json[presencesKey], PresenceJsonSerializer.instance),
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

	toJson(value: Guild, builder: JsonBuilder): Record<string, any> {
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
			.addIterableSerialized(value.getRoles(), rolesKey, RoleJsonSerializer.instance)
			.addIterableSerialized(value.getEmojis(), emojiKey, EmojiJsonSerializer.instance)
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
			.addIterableSerialized(value.getVoiceStates(), voiceStatesKey, VoiceStateJsonSerializer.instance)
			.addIterableSerialized(value.getMembers(), membersKey, GuildMemberJsonSerializer.instance)
			.addIterableSerialized(value.getChannels(), channelsKey, ChannelJsonSerializer.instance)
			.addIterableSerialized(value.getPresences(), presencesKey, PresenceJsonSerializer.instance)
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