import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Request, Response} from "express";
import {User, UserPermissionMapping, UserPermissionMappingJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, FutureUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class UserPermissionMappingEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/user/:id/permission/mapping');
    }

    create(req: Request): Future<object> {
        return EitherUtils.sequenceFuture(this.validate(req)
            .map(upm => this.db.procedures.insert.insertUserPermissionMapping(upm)(this.getRequestUsername(req))))
            .flatMap(FutureUtils.fromEither)
            .map(v => UserPermissionMappingJsonSerializer.instance.toJsonImpl(v));

    }

    delete(req: Request): Future<object> {
        return EitherUtils.sequenceFuture(this.getMappingId(req)
            .map(mid => this.db.procedures.delete.deleteUserPermissionMapping(mid)))
            .flatMap(FutureUtils.fromEither)
            .map(v => UserPermissionMappingJsonSerializer.instance.toJsonImpl(v));
    }

    doesRequireAuthentication = (req: Request) => true;

    private getMapping(req: Request): Either<string, UserPermissionMapping> {
        return ApiUtils.parseBodyParamSerialized(req, 'mapping', UserPermissionMappingJsonSerializer.instance);
    }

    private getMappingId(req: Request): Either<string, string> {
        return this.getMapping(req)
            .flatMap(m => EitherUtils.toEither(m.getId(), 'Mapping does not have a User id'));
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

    read(req: Request): Future<object> {
        return EitherUtils.sequenceFuture(this.getUserId(req)
            .map(uid => this.db.procedures.read.readUserPermissionMappings(uid)))
            .flatMap(FutureUtils.fromEither)
            .map(v => UserPermissionMappingJsonSerializer.instance.toJsonArray(v.toArray()));
    }

    update(req: Request): Future<object> {
        return EitherUtils.sequenceFuture(this.validate(req)
            .map(upm => this.db.procedures.update.updateUserPermissionMapping(upm)(this.getRequestUsername(req))))
            .flatMap(FutureUtils.fromEither)
            .map(v => UserPermissionMappingJsonSerializer.instance.toJsonImpl(v));
    }

    private validate(req: Request): Either<string, UserPermissionMapping> {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return this.getMapping(req)
                    .filterOrElse(upm => upm.getUserId().nonEmpty(), () => 'Mapping must have a user id')
                    .filterOrElse(upm => upm.getPermissionId().nonEmpty(), () => 'Mapping must have a permission id');
            case 'PUT':
                return this.getMapping(req)
                    .filterOrElse(upm => upm.getId().nonEmpty(), () => 'Mapping must have an id')
                    .filterOrElse(upm => upm.getUserId().nonEmpty(), () => 'Mapping must have a user id')
                    .filterOrElse(upm => upm.getPermissionId().nonEmpty(), () => 'Mapping must have a permission id');
            default:
                return this.getMapping(req);
        }
    }

}