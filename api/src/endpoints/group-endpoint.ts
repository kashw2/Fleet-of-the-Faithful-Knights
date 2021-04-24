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
        return ApiUtils.parseStringQueryParam(req, 'group_id');
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        return true;
    }

    read(req: Request): Promise<Either<string, any>> {
        if (this.getGroupId(req).isLeft()) {
            return Promise.resolve(EitherUtils.liftEither(GroupJsonSerializer.instance.toJsonArray(this.db.cache.groups.getGroups().toArray()), "Groups cache is empty"))
        }
        return Promise.resolve(this.getGroupId(req)
            .flatMap(gid => this.db.cache.groups.getGroupsById(gid)))
            .then(v => v.map(x => GroupJsonSerializer.instance.toJsonImpl(x)));
    }

    update(req: Request): Promise<Either<string, any>> {
        return super.update(req);
    }

}
