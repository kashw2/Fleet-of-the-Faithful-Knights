import {CrudEndpoint} from "@kashw2/lib-server";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Right} from "funfix-core";
import {Database} from "../db/database";

export class UserEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/user');
    }

    async create(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.getUser(req)
            .map(u => this.db.procedures.insert.insertUser(u)(this.getRequestUsername(req))))
    }

    async delete(req: Request): Promise<Either<string, any>> {
        return super.delete(req);
    }

    private getUser(req: Request): Either<string, User> {
        return ApiUtils.parseBodyParamSerialized(req, 'user', UserJsonSerializer.instance);
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return true;
            case 'GET':
                return true;
            case 'PUT':
                return true;
            case 'DELETE':
                return true;
            default:
                ApiUtils.send401(res);
                return false;
        }
    }

    async read(req: Request): Promise<Either<string, any>> {
        return Right(req.user);
    }

    async update(req: Request): Promise<Either<string, any>> {
        return super.update(req);
    }

}
