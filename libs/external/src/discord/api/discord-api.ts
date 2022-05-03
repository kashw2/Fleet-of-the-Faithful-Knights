import {Either} from "funfix-core";
import {DiscordToken, DiscordTokenJsonSerializer} from "../token";
import {DiscordUser, DiscordUserJsonSerializer} from "../user";
import {DiscordGuild, DiscordGuildJsonSerializer} from "../guild";
import {DiscordGuildMember, DiscordGuildMemberJsonSerializer} from "../guild-member";
import {from, Observable} from "rxjs";
import {List} from "immutable";
import {SerializedApiBase} from "@kashw2/lib-util";

export class DiscordApi extends SerializedApiBase {

    constructor(
        readonly clientId: string,
        readonly clientSecret: string,
        readonly redirectUrl: string,
        readonly botToken: string,
    ) {
        super("https://discordapp.com/api");
    }

    static getFfkGuildId(): string {
        return "539188746114039818";
    }

    /**
     * Used to get the Current User via the generated access token.
     *
     * @returns DiscordUser
     */
    getCurrentUser(accessToken: string): Observable<Either<string, DiscordUser>> {
        return from(this.sendRequestSerialized(
            'users/@me',
            "GET",
            DiscordUserJsonSerializer.instance,
            {
                Authorization: `Bearer ${accessToken}`,
            },
        ));
    }

    /**
     * Used to get guild information given the unique identifier of the guild
     *
     * @returns DiscordGuild
     */
    getGuild(guildId: string, shouldCount: boolean = true): Observable<Either<string, DiscordGuild>> {
        return from(this.sendRequestSerialized(
            `guilds/${guildId}?with_counts=${shouldCount}`,
            "GET",
            DiscordGuildJsonSerializer.instance,
            {
                Authorization: `Bot ${this.botToken}`,
            },
        ));
    }

    /**
     * Used to get a member in a Guild given a member id and a guild id. Note that a Guild Member is not the same as a
     * DiscordUser, while the models have some overlap, they can not be expected to form full version of each other.
     *
     * @returns DiscordGuildMember
     */
    getGuildMember(memberId: string, guildId: string): Observable<Either<string, DiscordGuildMember>> {
        return from(this.sendRequestSerialized(
            `guilds/${guildId}/members/${memberId}`,
            "GET",
            DiscordGuildMemberJsonSerializer.instance,
            {
                Authorization: `Bot ${this.botToken}`,
            },
        ));
    }

    /**
     * Used to list guild members given the unique identifier of the guild
     *
     * A limit can be specified with a hard max of 1000 set by Discord.
     *
     * @returns List<DiscordGuildMember>
     */
    getGuildMembers(guildId: string, limit: number = 1000): Observable<Either<string, List<DiscordGuildMember>>> {
        return from(this.sendRequestListSerialized(
            `guilds/${guildId}/members?limit=${limit}`,
            "GET",
            DiscordGuildMemberJsonSerializer.instance,
            {
                Authorization: `Bot ${this.botToken}`,
            },
        ));
    }

    /**
     * Used to return an OAuthResponse containing the Access Code for other requests.
     * Creates the foundation for usage of the Discord API
     * NOTE: OAuth is only used for non-bot/users requests
     *
     * @param code the code returned from discord to start the OAuth process
     *
     * @returns DiscordToken
     */
    getOAuth(code: string): Observable<Either<string, DiscordToken>> {
        return from(this.sendRequestSerialized(
            'oauth2/token',
            "POST",
            DiscordTokenJsonSerializer.instance,
            {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            this.getOAuthPayload(code),
        ));
    }

    private getOAuthPayload(code: string): URLSearchParams {
        return new URLSearchParams({
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': this.redirectUrl,
            'scope': 'bot identify guilds',
        });
    }

}
