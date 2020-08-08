import {None, Option, Some} from "funfix-core";
import {Map} from "immutable";
import {parseNumber, parseString} from "../util/object-utils";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {idKey, labelKey, valueKey} from "../misc/json-keys";
import {JsonBuilder} from "../misc/json-builder";
import {OptionUtils} from "../util/option-utils";


/**
 * Pretty much an EnumMap
 * Slight unorthodox implementation of an EnumMap.
 */

export class Enum {

    constructor(
        readonly id: Option<number> = None,
        readonly label: Option<any> = None,
        readonly value: Option<string> = None,
    ) {
    }

    public buildEnum(
        id: Option<number>,
        label: Option<string>,
        value: Option<string>,
    ): Enum {
        return new Enum(id, label, value);
    }

    public buildEnumEffector(
        id: Option<number>,
        label: Option<string>,
        value: string,
        effector: (v: string) => Option<any>,
    ): Enum {
        return this.buildEnum(id, label, effector(value))
    }

    public fromMap(map: Map<string, string>): Enum {
        return map.reduce((red, value, label) => this.buildEnum(this.getId(), Some(label), Some(value)))
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getLabel(): Option<string> {
        return this.label;
    }

    public getValue(): Option<string> {
        return this.value;
    }

    public isEmpty(): boolean {
        return this.getValue()
            .isEmpty();
    }

    public isEqual(other: Enum, equityTester: (v: string) => boolean): boolean {
        return OptionUtils.exists2(this.getValue(), other.getValue(), equityTester);
    }

    public isUseful(): boolean {
        return !this.isEmpty() && this.getLabel().nonEmpty();
    }

    public merge(other: Enum): Enum {
        return this.buildEnum(this.getId(), this.getLabel(), other.getValue())
    }

    public nonEmpty(): boolean {
        return this.getValue()
            .nonEmpty();
    }

    public toMap(): Map<string, string> {
       return Option.map2(this.getLabel(), this.getValue(), (label, value) => {
            return Map<string, string>().set(label, value);
        }).getOrElse(Map<string, string>())
    }

}

export class EnumJsonSerializer extends SimpleJsonSerializer<Enum> {

    static instance: EnumJsonSerializer = new EnumJsonSerializer();

    fromJson(json: any): Enum {
        return new Enum(
            parseNumber(json[idKey]),
            parseString(json[labelKey]),
            parseString(json[valueKey]),
        );
    }

    toJson(value: Enum, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getLabel(), labelKey)
            .addOptional(value.getValue(), valueKey)
            .build();
    }

}
