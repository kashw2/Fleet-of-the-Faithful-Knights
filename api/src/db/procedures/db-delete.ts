import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {
    Group,
    GroupJsonSerializer,
    Permission,
    PermissionJsonSerializer,
    User,
    UserJsonSerializer,
    UserPermissionMapping, UserPermissionMappingJsonSerializer
} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbDelete {

    constructor(private requests: DbRequest) {
    }

    deleteGroup(groupId: string): Promise<Either<string, Group>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteGroup', List.of(`@GroupId = ${groupId}`), GroupJsonSerializer.instance);
    }

    deletePermission(permissionId: string): Promise<Either<string, Permission>> {
        return this.requests.sendRequestSerialized('ssp_json_DeletePermission', List.of(`@PermissionId = ${permissionId}`), PermissionJsonSerializer.instance);
    }

    deleteUser(userId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteUser', List.of(`@UserId = ${userId}`), UserJsonSerializer.instance);
    }

    deleteUserPermissionMapping(mappingId: string): Promise<Either<string, UserPermissionMapping>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteUserPermissionMapping', List.of(`@MappingId = ${mappingId}`), UserPermissionMappingJsonSerializer.instance);
    }

}
