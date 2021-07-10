import {DbRequest} from "../db-request";
import {
    Group,
    GroupJsonSerializer,
    Permission,
    PermissionJsonSerializer,
    User,
    UserJsonSerializer,
    UserPermissionMapping,
    UserPermissionMappingJsonSerializer,
    Vote,
    VoteJsonSerializer
} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

export class DbInsert {

    constructor(private requests: DbRequest) {
    }

    insertGroup(group: Group): (modifiedBy: string) => Promise<Either<string, Group>> {
        return (modifiedBy: string): Promise<Either<string, Group>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertGroup', List.of(`@Json = '${GroupJsonSerializer.instance.toJsonString(group)}'`, `@ModifiedBy = '${modifiedBy}'`), GroupJsonSerializer.instance)
        }
    }

    insertPermission(permission: Permission): (modifiedBy: string) => Promise<Either<string, Permission>> {
        return (modifiedBy: string): Promise<Either<string, Permission>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertPermission', List.of(`@Json = '${PermissionJsonSerializer.instance.toJsonString(permission)}'`, `@ModifiedBy = '${modifiedBy}'`), PermissionJsonSerializer.instance)
        }
    }

    insertUser(user: User): (modifiedBy: string) => Promise<Either<string, User>> {
        return (modifiedBy: string): Promise<Either<string, User>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance)
        }
    }

    insertUserPermissionMapping(userPermissionMapping: UserPermissionMapping): (modifiedBy: string) => Promise<Either<string, UserPermissionMapping>> {
        return (modifiedBy: string): Promise<Either<string, UserPermissionMapping>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertUserPermissionMapping', List.of(`@Json = '${UserPermissionMappingJsonSerializer.instance.toJsonString(userPermissionMapping)}'`, `@ModifiedBy = '${modifiedBy}'`), UserPermissionMappingJsonSerializer.instance)
        }
    }

    insertVote(vote: Vote): (modifiedBy: string) => Promise<Either<string, Vote>> {
        return (modifiedBy: string): Promise<Either<string, Vote>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertVote', List.of(`@Json = '${VoteJsonSerializer.instance.toJsonString(vote)}'`, `@ModifiedBy = '${modifiedBy}'`), VoteJsonSerializer.instance);
        }
    }

}
