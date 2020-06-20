import {JsonBuilder} from "../misc/json-builder";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {None, Option} from "funfix-core";
import {parseNumber, parseString} from "../util/object-utils";
import {idKey, labelKey} from "../misc/json-keys";

// This is just an Enum tbh
export class Permission {

    constructor(
        private id: Option<number> = None,
        private label: Option<string> = None
    ) {
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getLabel(): Option<string> {
        return this.label;
    }

}

export class PermissionJsonSerializer extends SimpleJsonSerializer<Permission> {

    static instance: PermissionJsonSerializer = new PermissionJsonSerializer();

    fromJson(json: any): Permission {
        return new Permission(
            parseNumber(json[idKey]),
            parseString(json[labelKey]),
        );
    }

    toJson(value: Permission, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getLabel(), labelKey)
            .build();
    }

}
