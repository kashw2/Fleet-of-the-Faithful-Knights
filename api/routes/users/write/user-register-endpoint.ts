import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, OptionUtils, User} from "../../../../core/src";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";
import {DiscordApi} from "../../../../core/src/apis/discord-api";
import {DbUser} from "../../../../core/src/models/db/db-user";

export class UserRegisterEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/user/register", db);
    }

    private getResponseCode(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromQuery(req, "code");
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getResponseCode(req)
            .map(async code => {
                const oAuthResponse = await DiscordApi.instance.getOAuth(code);
                EitherUtils.deepEffector(oAuthResponse, v => EitherUtils.toEither(v.getAccessToken(), "Invalid access token"))
                    .map(async token => {
                        const discordUser = await DiscordApi.instance.getCurrentUser(token);
                        return discordUser.map(user => {
                            return user.getId()
                                .map(async uid => {
                                    const discordGuild = await DiscordApi.instance.getGuild();
                                    return discordGuild.map(guild => {
                                        guild.getId().map(async gid => {
                                            const discordGuildMember = await DiscordApi.instance.getGuildMember(uid, gid);
                                            return discordGuildMember.map(gm => {
                                                DbUser.fromDiscordGuildMember(gm.withDiscordUserLocale(user))
                                                    .map(dbUser => {
                                                        ApiUtils.sendResultPromise(this.db.procedures.insert.insertUser(dbUser), res);
                                                        this.db.cache.cacheUsers();
                                                    })
                                            })
                                        })
                                    })
                                })
                        })
                    })
            });
    }

}
