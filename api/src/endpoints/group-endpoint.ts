import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Group, GroupJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class GroupEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/group');
    }

    create(req: Request): Future<object | string> {
        return Future.of(() => {
            return EitherUtils.sequence(this.validate(req)
                .map(v => {
                    this.db.cache.groups.add(v);
                    return this.db.procedures.insert.insertGroup(v)(this.getRequestUsername(req));
                }));
        }).flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? GroupJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    delete(req: Request): Future<object | string> {
        return Future.of(() => EitherUtils.sequence(this.getGroupId(req).map(gid => this.db.procedures.delete.deleteGroup(gid))))
            .flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? GroupJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    doesRequireAuthentication = (req: Request) => true;

    private getGroup(req: Request): Either<string, Group> {
        return ApiUtils.parseBodyParamSerialized(req, 'group', GroupJsonSerializer.instance);
    }

    private getGroupId(req: Request): Either<string, string> {
        return ApiUtils.parseStringQueryParam(req, 'group_id');
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

    read(req: Request): Future<object | string> {
        if (this.getGroupId(req).isRight()) {
            return Future.of(() => this.getGroupId(req).flatMap(gid => this.db.cache.groups.getGroupsById(gid)))
                .map(v => v.isRight() ? GroupJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
        }
        return Future.of(() => EitherUtils.liftEither(this.db.cache.groups.getGroups(), "Group cache is empty"))
            .map(v => v.isRight() ? GroupJsonSerializer.instance.toJsonArray(v.get().toArray()) : v.value);
    }

    update(req: Request): Future<object | string> {
        return Future.of(() => EitherUtils.sequence(this.validate(req).map(g => this.db.procedures.update.updateGroup(g)(this.getRequestUsername(req)))))
            .flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? GroupJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    private validate(req: Request): Either<string, Group> {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return this.getGroup(req)
                    .filterOrElse(g => g.getLabel().nonEmpty(), () => 'Group must have a label');
            case 'PUT':
                return this.getGroup(req)
                    .filterOrElse(g => g.getId().nonEmpty(), () => 'Group must have an Id');
            default:
                return this.getGroup(req);
        }
    }

}
