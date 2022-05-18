import {Cache} from "./cache";
import {Permission} from "@kashw2/lib-ts";
import {List, Map} from "immutable";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Option} from "funfix-core";

export class PermissionCache extends Cache<Permission> {

  constructor(private permissions: List<Permission> = List()) {
    super(permissions);
  }

  private byId: Map<string, Permission> = CollectionUtils.buildKeyedMap(this.getPermissions(), (p) => p.getId());

  getByPermissionId(permissionId: string): Either<string, Permission> {
    return EitherUtils.toEither(Option.of(this.byId.get(permissionId)), `Permission with id ${permissionId} does not exist`);
  }

  getPermissions(): List<Permission> {
    return super.getValues();
  }

}
