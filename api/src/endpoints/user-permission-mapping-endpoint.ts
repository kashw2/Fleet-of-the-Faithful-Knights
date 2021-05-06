import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Request, Response} from "express";
import {User, UserPermissionMapping, UserPermissionMappingJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, OptionUtils} from "@kashw2/lib-util";

export class UserPermissionMappingEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/user/:id/permission/mapping');
    }

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

    read(req: Request): Promise<Either<string, any>> {
        // TODO: See if we can make this a bit more readable
        return EitherUtils.sequence(this.getUserId(req)
            .map(uid => this.db.procedures.read.readUserPermissionMappings(uid)))
            .then(v => v.map(x => OptionUtils.flattenList(x.map(q => q.getId()))))
    }

    update(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.validate(req)
            .map(upm => this.db.procedures.update.updateUserPermissionMapping(upm)(this.getModifiedBy(req))))
            .then(v => v.map(x => UserPermissionMappingJsonSerializer.instance.toJsonImpl(x)));
    }

    private validate(req: Request): Either<string, UserPermissionMapping> {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return this.getMapping(req)
                    .filterOrElse(upm => upm.getUserId().nonEmpty(), () => 'Mapping must have a user id')
                    .filterOrElse(upm => upm.getPermissionId().nonEmpty(), () => 'Mapping must have a permission id')
            case 'PUT':
                return this.getMapping(req)
                    .filterOrElse(upm => upm.getId().nonEmpty(), () => 'Mapping must have an id')
                    .filterOrElse(upm => upm.getUserId().nonEmpty(), () => 'Mapping must have a user id')
                    .filterOrElse(upm => upm.getPermissionId().nonEmpty(), () => 'Mapping must have a permission id')
            default:
                return this.getMapping(req);
        }
    }

}