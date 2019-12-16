import {Client, ClientUserSettings, DMChannel, Presence, Snowflake, User} from "discord.js";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";

export class Manager {

    constructor(readonly client: Client) {
    }

    getClient(): Client {
        return this.client;
    }

    getClientAvatar(): string {
        return this.getClient()
            .user
            .avatar;
    }

    getClientAvatarHref(): string {
        return this.getClient()
            .user
            .avatarURL;
    }

    getClientBlocked(): List<User> {
        return List(
            this.getClient()
                .user
                .blocked
                .values(),
        );
    }

    getClientCreatedAt(): Date {
        return this.getClient()
            .user
            .createdAt;
    }

    getClientCreationTimestamp(): number {
        return this.getClient()
            .user
            .createdTimestamp;
    }

    getClientDefaultAvatarHref(): string {
        return this.getClient()
            .user
            .defaultAvatarURL;
    }

    getClientDiscriminator(): string {
        return this.getClient()
            .user
            .discriminator;
    }

    getClientDisplayAvatarHref(): string {
        return this.getClient()
            .user
            .displayAvatarURL;
    }

    getClientEmail(): any {
        return this.getClient()
            .user
            .email;
    }

    getClientFriends(): List<User> {
        return List(
            this.getClient()
                .user
                .friends
                .values(),
        );
    }

    getClientId(): Snowflake {
        return this.getClient()
            .user
            .id;
    }

    getClientNote(): any {
        return this.getClient()
            .user
            .note;
    }

    getClientPresence(): Presence {
        return this.getClient()
            .user
            .presence;
    }

    getClientSettings(): ClientUserSettings {
        return this.getClient()
            .user
            .settings;
    }

    getClientTag(): string {
        return this.getClient()
            .user
            .tag;
    }

    getClientToken(): string {
        return this.getClient()
            .token;
    }

    getClientUsername(): string {
        return this.getClient()
            .user
            .username;
    }

    getDmChannel(): DMChannel {
        return this.getClient()
            .user
            .dmChannel;
    }

    getLastMessageId(): string {
        return this.getClient()
            .user
            .lastMessageID;
    }

    async getPremiumSince(): Promise<Either<string, Date>> {
        if (this.isClientPremium()) {
            const profile = await this.getClient()
                .user
                .fetchProfile();
            return Right(profile.premiumSince);
        }
        return Promise.resolve(Left("User is not Premium"));
    }

    isBot(): boolean {
        return this.getClient()
            .user
            .bot;
    }

    isClientMfaEnabled(): boolean {
        return this.getClient()
            .user
            .mfaEnabled;
    }

    isClientOnMobile(): boolean {
        return this.getClient()
            .user
            .mobile;
    }

    isClientPremium(): boolean {
        return this.getClient()
            .user
            .premium;
    }

    isClientVerified(): boolean {
        return this.getClient()
            .user
            .verified;
    }

}
