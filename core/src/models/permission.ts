import {JsonBuilder} from "../misc/json-builder";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {None, Option} from "funfix-core";
import {parseNumber, parseString} from "../util/object-utils";
import {descriptionKey, idKey, labelKey} from "../misc/json-keys";

// This is just an Enum tbh
export class Permission {

    constructor(
        readonly id: Option<number> = None,
        readonly label: Option<string> = None,
        readonly description: Option<string> = None,
    ) {
    }

    public getDescription(): Option<string> {
        return this.description;
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
            parseString(json[descriptionKey]),
        );
    }

    toJson(value: Permission, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getLabel(), labelKey)
            .addOptional(value.getDescription(), descriptionKey)
            .build();
    }

}
