import {None, Option} from "funfix-core";
import {JsonBuilder, JsonSerializer, parseString} from "@kashw2/lib-util";
import {idKey, userIdKey, permissionIdKey} from "../misc/json-keys";

export class UserPermissionMapping {

    constructor(
        private id: Option<string> = None,
        private userId: Option<string> = None,
        private permissionId: Option<string> = None,
    ) {
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getPermissionId(): Option<string> {
        return this.permissionId;
    }

    public getUserId(): Option<string> {
        return this.userId;
    }

}

export class UserPermissionMappingJsonSerializer extends JsonSerializer<UserPermissionMapping> {

    static instance: UserPermissionMappingJsonSerializer = new UserPermissionMappingJsonSerializer();

    fromJson(json: any): UserPermissionMapping {
        return new UserPermissionMapping(
            parseString(json[idKey]),
            parseString(json[userIdKey]),
            parseString(json[permissionIdKey]),
        );
    }

    toJson(value: UserPermissionMapping, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getUserId(), userIdKey)
            .addOptional(value.getPermissionId(), permissionIdKey)
            .build();
    }

}