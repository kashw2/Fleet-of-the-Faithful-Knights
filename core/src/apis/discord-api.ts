import {
    Api,
    DiscordChannel,
    DiscordChannelJsonSerializer,
    DiscordGuild,
    DiscordGuildJsonSerializer,
    DiscordGuildMember,
    DiscordGuildMemberJsonSerializer,
    DiscordMessage,
    DiscordMessageJsonSerializer,
    DiscordOAuthResponse,
    DiscordOAuthResponseJsonSerializer,
    DiscordUser,
    DiscordUserJsonSerilaizer,
    EitherUtils,
    Url
} from "@ffk/lib-ts";
import {List} from "immutable";
import * as querystring from "querystring";
import {Either} from "funfix-core";

export class DiscordApi {

    public static instance: DiscordApi = new DiscordApi();

    private api: Api = new Api(Url.buildFromUri(this.getDiscordApiUrl()));

    static getFfkGeneralChannel(): string {
        return "539188746114039820";
    }

    getCurrentUser(accessToken: string): Promise<Either<string, DiscordUser>> {
        return this.api.sendRequestSerialized(
            "/users/@me",
            DiscordUserJsonSerilaizer.instance,
            {Authorization: `Bearer ${accessToken}`},
            "GET",
        );
    }

    private getDiscordApiUrl(): string {
        return "https://discord.com/api";
    }

    private getDiscordPanelBotToken(): string {
        const token = EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_BOT_TOKEN!, "FFK_DISCORD_PANEL_BOT_TOKEN is not defined");
        if (token.isLeft()) {
            throw token.value;
        }
        return token.get();
    }

    private getFfkGuildId(): string {
        return "539188746114039818";
    }

    getGuild(guildId: string = this.getFfkGuildId(), shouldCount: boolean = true): Promise<Either<string, DiscordGuild>> {
        return this.api.sendRequestSerialized(
            `/guilds/${guildId}?with_counts=${shouldCount}`,
            DiscordGuildJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        )
    }

    getGuildMember(memberId: string, guildId: string = this.getFfkGuildId()): Promise<Either<string, DiscordGuildMember>> {
        return this.api.sendRequestSerialized(
            `/guilds/${guildId}/members/${memberId}`,
            DiscordGuildMemberJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    private getHeaders(): object {
        return {
            Authorization: `Bot ${this.getDiscordPanelBotToken()}`,
        };
    }

    /**
     *
     * Used to return an OAuthResponse containing the Access Code for other requests.
     * Creates the foundation for usage of the Discord API
     * NOTE: OAuth is only used for non-bot/users requests
     *
     * @param code the code returned from discord to start the OAuth process
     *
     * @returns DiscordOAuthResponse
     */
    getOAuth(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return this.api.sendRequestSerialized(
            "/oauth2/token",
            DiscordOAuthResponseJsonSerializer.instance,
            {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "POST",
            this.getOAuthPayload(code),
        );
    }

    private getOAuthPayload(code: string): string {
        return querystring.encode({
            client_id: this.getPanelClientId(),
            client_secret: this.getPanelClientSecret(),
            grant_type: "authorization_code",
            code,
            redirect_uri: this.getRedirectUrl(),
            scope: "identify guilds",
        });
    }

    private getPanelClientId(): string {
        const clientId = EitherUtils.liftEither(process.env.FFK_DISOCRD_PANEL_CLIENT_ID!, "FFK_DISOCRD_PANEL_CLIENT_ID is undefined");
        if (clientId.isLeft()) {
            throw clientId.value;
        }
        return clientId.get();
    }

    private getPanelClientSecret(): string {
        const clientSecret = EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_SECRET!, "FFK_DISCORD_PANEL_SECRET is undefined");
        if (clientSecret.isLeft()) {
            throw clientSecret.value;
        }
        return clientSecret.get();
    }

    private getRedirectUrl(): string {
        // TODO: Fix this, had issues going live with env vars
        const url = EitherUtils.liftEither(process.env.FFK_PANEL_ADDRESS! || "http://4.71.159.157:80", "FFK_PANEL_ADDRESS is undefined");
        if (url.isLeft()) {
            throw url.value;
        }
        return url.get();
    }

    listChannelMessages(channelId: string): Promise<Either<string, List<DiscordMessage>>> {
        return this.api.sendRequestSerializedList(
            `/channels/${channelId}/messages`,
            DiscordMessageJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        )
    }

    listGuildChannels(guildId: string = this.getFfkGuildId()): Promise<Either<string, List<DiscordChannel>>> {
        return this.api.sendRequestSerializedList(
            `/guilds/${guildId}/channels`,
            DiscordChannelJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listGuildMembers(
        after: number = 0,
        limit: number = 1000,
        guildId: string = this.getFfkGuildId(),
    ): Promise<Either<string, List<DiscordGuildMember>>> {
        return this.api.sendRequestSerializedList(
            `/guilds/${guildId}/members?limit=${limit}&after=${after}`,
            DiscordGuildMemberJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listUserGuilds(): Promise<Either<string, List<DiscordGuild>>> {
        return this.api.sendRequestSerializedList(
            "/users/@me/guilds",
            DiscordGuildJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

}
