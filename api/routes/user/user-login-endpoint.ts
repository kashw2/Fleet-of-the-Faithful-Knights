import {Request, Response} from "express";
import {Database} from "../../db/database";
import {GetRoute} from "../get-route";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "../../../core/src";
import {DiscordAccessTokenJsonSerializer, DiscordApi} from "../../../core/src/misc/discord-api";

export class UserLoginEndpoint extends GetRoute {

    constructor(private db: Database) {
        super('/user/login');
    }

    private getResponseCode(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromQuery(req, 'code');
    }

    private getPanelClientId(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_DISOCRD_PANEL_CLIENT_ID!, 'FFK_DISOCRD_PANEL_CLIENT_ID is empty');
    }

    private getPanelClientSecret(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_PANEL_SECRET!, 'FFK_PANEL_SECRET is empty');
    }

    private getPanelAddress(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_PANEL_ADDRESS!, 'FFK_PANEL_ADDRESS is empty');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        Either.map3(this.getResponseCode(req), this.getPanelClientId(), this.getPanelClientSecret(), async (code, pid, pcs) => {
            ApiUtils.sendSerializedResponse(await DiscordApi.getAccessToken(pid, pcs, code), DiscordAccessTokenJsonSerializer.instance, res);
        });
    }

}
