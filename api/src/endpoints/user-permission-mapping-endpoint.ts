import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Request, Response} from "express";
import {permissionIdKey, User} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";

export class UserPermissionMappingEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/user/:id/permission/mapping');
    }

    private getUserId(req: Request): Either<string, string> {
        return ApiUtils.parseUrlStringParam(req, 'id');
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
                return false;
        }
    }

    read(req: Request): Promise<Either<string, any>> {
        // TODO: Fix this, it's disgusting
        return EitherUtils.sequence(this.getRequestUser(req)
            .flatMap(u => EitherUtils.toEither(u.getId(), 'User does not have an Id'))
            .map(uid => this.db.procedures.read.readUserPermissionMappings(uid)))
            .then(v => v.map(x => x.map(p => p[permissionIdKey])));
    }

}