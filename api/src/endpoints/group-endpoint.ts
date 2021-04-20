import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";

export class GroupEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/group');
    }

    create(req: Request): Promise<Either<string, any>> {
        return super.create(req);
    }

    delete(req: Request): Promise<Either<string, any>> {
        return super.delete(req);
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        return false;
    }

    read(req: Request): Promise<Either<string, any>> {
        return super.read(req);
    }

    update(req: Request): Promise<Either<string, any>> {
        return super.update(req);
    }

}
