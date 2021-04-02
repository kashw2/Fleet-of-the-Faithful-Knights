import {CrudEndpoint} from "@kashw2/lib-server";
import {User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {ApiUtils} from "@kashw2/lib-util";
import {Either} from "funfix-core";

export class UserEndpoint extends CrudEndpoint {

    constructor() {
        super('/user');
    }

    create(req: Request): Either<string, void> {
        return super.create(req);
    }

    delete(req: Request): Either<string, void> {
        return super.delete(req);
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return true;
            case 'GET':
                res.send(req.user);
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

    read(req: Request): Either<string, void> {
        return super.read(req);
    }

    update(req: Request): Either<string, void> {
        return super.update(req);
    }

}
