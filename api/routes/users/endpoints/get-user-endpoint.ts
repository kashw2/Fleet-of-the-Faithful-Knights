import {Request, Response} from "express";
import {Either} from "funfix-core";
import {OptionUtils, passwordKey, PostEndpoint, RouterUtil, User, usernameKey} from "../../../../core";
import {Database} from "../../../database/db";

export class GetUserEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/user");
    }

    canAccess(user: User): boolean {
        return true;
    }

    private getPassword(req: Request): Either<string, string> {
        return RouterUtil.parseStringBodyParam(passwordKey, req);
    }

    private getUsername(req: Request): Either<string, string> {
        return RouterUtil.parseStringBodyParam(usernameKey, req);
    }

    runRequest(req: Request, res: Response): void {
        Either.map2(this.getUsername(req), this.getPassword(req), async (username, password) => {
            this.db.procedures.getUser(username, password)
                .then(u => {
                    // TODO: Clean this up and do it correctly
                    u.map(id => res.send(this.db.cache.users.getByIdEither(OptionUtils.parseNumber(id).get())));
                    RouterUtil.sendResult(u, res);
                });
        });
    }

}
