import {Request, Response} from "express";
import {Database} from "../../db/database";
import {GetRoute} from "../get-route";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "../../../core/src";
import {DiscordOAuthResponseJsonSerializer, DiscordApi} from "../../../core/src/misc/discord-api";

export class UserLoginEndpoint extends GetRoute {

    constructor(private db: Database) {
        super('/user/register');
    }

    private getResponseCode(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromQuery(req, 'code');
    }

    private getPanelClientId(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISOCRD_PANEL_CLIENT_ID!, 'FFK_DISOCRD_PANEL_CLIENT_ID is empty');
    }

    private getPanelClientSecret(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_SECRET!, 'FFK_PANEL_SECRET is empty');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        Either.map3(this.getResponseCode(req), this.getPanelClientId(), this.getPanelClientSecret(), async (code, pid, pcs) => {
            const oAuthResponse = await DiscordApi.getOAuth(pid, pcs, code);
            oAuthResponse.map(auth => auth.getAccessToken()
                .map(async accessToken => {
                    const user = await DiscordApi.getUser(accessToken);
                    user.map(usr => usr.getId()
                        .map(async uid => {
                            const guilds  = await DiscordApi.getUserGuilds(uid, accessToken);
                            const guild = guilds.map(guildList => guildList.find(guild => guild.getId().contains('539188746114039818'))!);
                            guild.map(g => g.getId()
                                .map(async gid => {
                                    const userRoles = await DiscordApi.getGuildMember(uid, gid, accessToken);
                                    ApiUtils.sendResult(userRoles, res);
                                }))
                        }))
                })
            )
        });
    }

}
