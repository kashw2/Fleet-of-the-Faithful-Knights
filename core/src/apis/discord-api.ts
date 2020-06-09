import {Api} from "../models/api";
import {Url} from "../models/url";
import {Either, Left} from "funfix-core";
import {EitherUtils} from "..";
import {DiscordGuild, DiscordGuildJsonSerializer} from "../models/discord/discord-guild";
import {DiscordGuildMember, DiscordGuildMemberJsonSerializer} from "../models/discord/discord-guild-member";
import {List} from "immutable";
import {DiscordUser, DiscordUserJsonSerilaizer} from "../models/discord/discord-user";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "../models/discord/discord-oauth-response";
import * as querystring from "querystring";

export class DiscordApi {

    public static instance: DiscordApi = new DiscordApi();

    private api: Api = new Api(Url.buildFromUri(this.getDiscordApiUrl()));

    getCurrentUser(accessToken: string): Promise<Either<string, DiscordUser>> {
        return this.api.sendRequestSerialized(
            "/users/@me",
            DiscordUserJsonSerilaizer.instance,
            {Authorization: `Bearer ${accessToken}`},
            "GET",
        );
    }

    private getDiscordApiUrl(): string {
        return "https://discordapp.com/api";
    }

    private getDiscordPanelBotToken(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_BOT_TOKEN!, "FFK_DISCORD_PANEL_BOT_TOKEN is not defined");
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
        if (this.getDiscordPanelBotToken().isRight()) {
            return {
                Authorization: `Bot ${this.getDiscordPanelBotToken().get()}`,
            }
        }
        throw new Error(this.getDiscordPanelBotToken().value);
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
        if (this.getRedirectUrl().isRight()) {
            if (this.getPanelClientId().isRight()) {
                if (this.getPanelClientSecret().isRight()) {
                    return this.api.sendRequestSerialized(
                        "/oauth2/token",
                        DiscordOAuthResponseJsonSerializer.instance,
                        {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        "POST",
                        (this.getOAuthPayload(code)),
                    );
                }
                return Promise.resolve(Left(this.getPanelClientSecret().value));
            }
            return Promise.resolve(Left(this.getPanelClientId().value));
        }
        return Promise.resolve(Left(this.getRedirectUrl().value));
    }

    getOAuthPayload(code: string): string {
        return querystring.encode({
            client_id: this.getPanelClientId().get(),
            client_secret: this.getPanelClientSecret().get(),
            grant_type: "authorization_code",
            code,
            redirect_uri: this.getRedirectUrl().get(),
            scope: "identify guilds",
        })
    }

    private getPanelClientId(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISOCRD_PANEL_CLIENT_ID!, "FFK_DISOCRD_PANEL_CLIENT_ID is undefined");
    }

    private getPanelClientSecret(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_SECRET!, "FFK_DISCORD_PANEL_SECRET is undefined");
    }

    private getRedirectUrl(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_PANEL_ADDRESS!, "FFK_PANEL_ADDRESS is undefined");
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
