import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {GroupJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";

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

    private getGroupId(req: Request): Either<string, string> {
        return ApiUtils.parseUrlStringParam(req, 'group_id');
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        return true;
    }

    read(req: Request): Promise<Either<string, any>> {
        if (this.getGroupId(req).isLeft()) {
            return Promise.resolve(EitherUtils.liftEither(GroupJsonSerializer.instance.toJsonArrayImpl(this.db.cache.groups.getGroups()), "Groups cache is empty"))
        }
        return Promise.resolve(this.getGroupId(req)
            .map(gid => this.db.cache.groups.getGroupsById(gid)));
    }

    update(req: Request): Promise<Either<string, any>> {
        return super.update(req);
    }

}
