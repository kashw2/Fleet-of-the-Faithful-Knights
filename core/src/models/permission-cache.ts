import {List} from "immutable";
import {Permission} from "./permission";
import {Either} from "funfix-core";
import {EitherUtils} from "..";

export class PermissionCache {

    constructor(private permissions: List<Permission>) {
    }

    getPermissions(): List<Permission> {
        return this.permissions;
    }

    getPermissionsEither(): Either<string, List<Permission>> {
        return EitherUtils.liftEither(this.getPermissions(), "No permissions in permission cache");
    }

}
