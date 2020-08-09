import {Request, Response} from "express";
import {Either, Left} from "funfix-core";
import {Database} from "../../../db/database";
import {ApiUtils, EitherUtils, DbUser} from "@ffk/lib-ts";
import {UnauthenticatedGetEndpoint} from "../../../../core/src/server/unauthenticated/unauthenticated-get-endpoint";
import {DiscordApi} from "../../../../core/src/apis/discord-api";

export class UserRegisterEndpoint extends UnauthenticatedGetEndpoint {

    constructor(readonly db: Database) {
        super("/user/register");
    }

    getEndpointName(): string {
        return "Register User";
    }

    private getResponseCode(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromQuery(req, "code");
    }

    run(req: Request, res: Response): void {
        console.log("Starting User Registration");
        this.getResponseCode(req)
            .map(async code => {
                const oAuthResponse = await DiscordApi.instance.getOAuth(code);
                if (oAuthResponse.isLeft()) {
                    console.error("Unable to retrieve OAuth Response");
                    ApiUtils.sendError500(Left("Unable to retrieve OAuth Response"), res);
                    return;
                }
                EitherUtils.deepEffector(oAuthResponse, v => EitherUtils.toEither(v.getAccessToken(), "Invalid access token"))
                    .map(async token => {
                        const discordUser = await DiscordApi.instance.getCurrentUser(token);
                        if (discordUser.isLeft()) {
                            console.error("Error retrieving Discord User");
                            ApiUtils.sendError500(Left("Error retrieving Discord User"), res);
                            return;
                        }
                        return discordUser.map(user => {
                            return user.getId()
                                .map(async uid => {
                                    const discordGuild = await DiscordApi.instance.getGuild();
                                    if (discordGuild.isLeft()) {
                                        console.error("Error retrieving Discord Guild");
                                        ApiUtils.sendError500(Left("Error retrieving Discord Guild"), res);
                                        return;
                                    }
                                    return discordGuild.map(guild => {
                                        guild.getId().map(async gid => {
                                            const discordGuildMember = await DiscordApi.instance.getGuildMember(uid, gid);
                                            if (discordGuildMember.isLeft()) {
                                                console.error("Error retrieving Discord Guild Member");
                                                ApiUtils.sendError500(Left("Error retrieving Discord Guild Member"), res);
                                                return;
                                            }
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
