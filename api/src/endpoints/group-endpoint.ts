import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Group, GroupJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, FutureUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class GroupEndpoint extends AuthenticatedCrudEndpoint {

  constructor(private db: Database) {
    super('/group');
  }

  create(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(v => {
        this.db.cache.updateGroups(cache => cache.add(v));
        return this.db.procedures.insert.insertGroup(v)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => GroupJsonSerializer.instance.toJsonImpl(v));
  }

  delete(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.getGroupId(req)
      .map(gid => {
        this.db.cache.updateGroups(cache => cache.removeIn(g => g.getId().contains(gid)));
        return this.db.procedures.delete.deleteGroup(gid);
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => GroupJsonSerializer.instance.toJsonImpl(v));
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

  read(req: Request): Future<object> {
    if (this.getGroupId(req).isLeft()) {
      return FutureUtils.fromEither(EitherUtils.liftEither(this.db.cache.groups.getGroups(), "Group cache is empty"))
        .map(v => GroupJsonSerializer.instance.toJsonArray(v.toArray()));
    }
    return FutureUtils.fromEither(this.getGroupId(req))
      .map(gid => this.db.cache.groups.getGroupsById(gid))
      .flatMap(FutureUtils.fromEither)
      .map(v => GroupJsonSerializer.instance.toJsonImpl(v));
  }

  update(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(g => {
        this.db.cache.updateGroups(cache => cache.setIn(g, x => x.getId().equals(g.getId())));
        return this.db.procedures.update.updateGroup(g)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => GroupJsonSerializer.instance.toJsonImpl(v));
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
