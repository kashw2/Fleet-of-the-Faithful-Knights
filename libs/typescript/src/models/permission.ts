import {None, Option} from "funfix-core";
import {JsonBuilder, JsonSerializer, parseString} from "@kashw2/lib-util";
import {idKey, labelKey} from "../misc/json-keys";

export class Permission {

  constructor(
    private id: Option<string> = None,
    private label: Option<string> = None,
  ) {
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getLabel(): Option<string> {
    return this.label;
  }

}

export class PermissionJsonSerializer extends JsonSerializer<Permission> {

  static instance: PermissionJsonSerializer = new PermissionJsonSerializer();

  fromJson(json: any): Permission {
    return new Permission(
      parseString(json[idKey]),
      parseString(json[labelKey]),
    );
  }

  toJson(value: Permission, builder: JsonBuilder): Record<string, any> {
    return builder.addOptional(value.getId(), idKey)
      .addOptional(value.getLabel(), labelKey)
      .build();
  }

}
