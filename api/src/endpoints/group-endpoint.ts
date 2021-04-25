import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Group, GroupJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";

export class GroupEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/group');
    }

    create(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.getGroup(req)
            .map(g => this.db.procedures.insert.insertGroup(g)(this.getRequestUsername(req))))
            .then(v => v.map(u => GroupJsonSerializer.instance.toJsonImpl(u)));
    }

    delete(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.getGroupId(req)
            .map(gid => this.db.procedures.delete.deleteGroup(gid)))
            .then(v => v.map(u => GroupJsonSerializer.instance.toJsonImpl(u)));
    }

    private getGroup(req: Request): Either<string, Group> {
        return ApiUtils.parseBodyParamSerialized(req, 'group', GroupJsonSerializer.instance);
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
