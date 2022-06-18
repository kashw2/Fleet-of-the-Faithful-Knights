import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Permission, PermissionJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, FutureUtils} from "@kashw2/lib-util";
import {Database} from "../db/database";
import {Future} from "funfix";

export class PermissionsEndpoint extends AuthenticatedCrudEndpoint {

  constructor(private db: Database) {
    super('/permission');
  }

  create(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(v => {
        this.db.cache.updatePermissions(cache => cache.add(v));
        return this.db.procedures.insert.insertPermission(v)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => PermissionJsonSerializer.instance.toJsonImpl(v));
  }

  delete(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.getPermissionId(req)
      .map(pid => {
        this.db.cache.updatePermissions(cache => cache.removeIn(p => p.getId().contains(pid)));
        return this.db.procedures.delete.deletePermission(pid);
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => PermissionJsonSerializer.instance.toJsonImpl(v));
  }

  doesRequireAuthentication = (req: Request) => true;

  private getPermission(req: Request): Either<string, Permission> {
    return ApiUtils.parseBodyParamSerialized(req, 'permission', PermissionJsonSerializer.instance);
  }

  private getPermissionId(req: Request): Either<string, string> {
    return ApiUtils.parseStringQueryParam(req, 'permission_id');
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
    if (this.getPermissionId(req).isLeft()) {
      return FutureUtils.fromEither(EitherUtils.liftEither(this.db.cache.permissions.getPermissions(), "Permission cache is empty"))
        .map(v => PermissionJsonSerializer.instance.toJsonArray(v.toArray()));
    }
    return FutureUtils.fromEither(this.getPermissionId(req))
      .map(pid => this.db.cache.permissions.getByPermissionId(pid))
      .flatMap(FutureUtils.fromEither)
      .map(v => PermissionJsonSerializer.instance.toJsonImpl(v));
  }

  update(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(p => {
        this.db.cache.updatePermissions(cache => cache.setIn(p, v => v.getId().equals(p.getId())));
        return this.db.procedures.update.updatePermission(p)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => PermissionJsonSerializer.instance.toJsonImpl(v));
  }

  private validate(req: Request): Either<string, Permission> {
    switch (this.getHTTPMethod(req)) {
      case 'POST':
        return this.getPermission(req)
          .filterOrElse(p => p.getLabel().nonEmpty(), () => 'Permission must have a label');
      case 'PUT':
        return this.getPermission(req)
          .filterOrElse(p => p.getId().nonEmpty(), () => 'Permission must have an Id');
      default:
        return this.getPermission(req);
    }
  }

}
