import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "../../../core/src";
import {DiscordApi} from "../../../core/src/misc/discord-api";
import {DbUser} from "../../../core/src/models/db/db-user";
import {Database} from "../../db/database";
import {GetRoute} from "../get-route";

export class UserRegisterEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/user/register");
    }

    private getPanelClientId(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISOCRD_PANEL_CLIENT_ID!, "FFK_DISOCRD_PANEL_CLIENT_ID is empty");
    }

    private getPanelClientSecret(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISCORD_PANEL_SECRET!, "FFK_PANEL_SECRET is empty");
    }

    private getResponseCode(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromQuery(req, "code");
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        Either.map3(this.getResponseCode(req), this.getPanelClientId(), this.getPanelClientSecret(), async (code, clientId, clientSecret) => {
            const oAuthResponse = await DiscordApi.getOAuth(clientId, clientSecret, code);
            oAuthResponse.map(auth => auth.getAccessToken()
                .map(async accessToken => {
                    const user = await DiscordApi.getUser(accessToken);
                    user.map(usr => usr.getId()
                        .map(async uid => {
                            const guilds = await DiscordApi.getUserGuilds(uid, accessToken);
                            const guild = guilds.map(guildList => guildList.find(guild => guild.getId().contains("539188746114039818"))!);
                            guild.map(g => g.getId()
                                .map(async gid => {
                                    const guildMember = await DiscordApi.getGuildMember(uid, gid, accessToken);
                                    guildMember.map(gm => {
                                        DbUser.fromDiscordGuildMember(gm)
                                            .map(dbU => this.db.procedures.insert.insertUser(dbU).then(r => ApiUtils.sendResult(r, res)));
                                    });
                                }));
                        }));
                }),
            );
        });
    }

}
