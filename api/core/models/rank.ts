import {None, Option} from "funfix-core";
import {idKey, nameKey} from "../keys/json-keys";
import {OptionUtils} from "../utils/option-utils";
import {JsonBuilder, JsonSerializer} from "./json-serializer";

export class Rank {

    constructor(
        readonly id: Option<number> = None,
        readonly name: Option<string> = None,
    ) {
    }

    getId(): Option<number> {
        return this.id;
    }

    getName(): Option<string> {
        return this.name;
    }

    isAdmin(): boolean {
        return this.isDeveloper()
            || this.isGrandMaster()
            || this.isMasterCommander()
            || this.isKnightCommander()
            || this.isKnightLieutenant()
            || this.isKnight();
    }

    isDeveloper(): boolean {
        return this.getName()
            .contains("Developer");
    }

    isEmpty(): boolean {
        return this.getId().isEmpty()
            && this.getName().isEmpty();
    }

    isGrandMaster(): boolean {
        return this.getName()
            .contains("Grand Master");
    }

    isKnight(): boolean {
        return this.getName()
            .contains("Knight");
    }

    isKnightCommander(): boolean {
        return this.getName()
            .contains("Knight Commander");
    }

    isKnightLieutenant(): boolean {
        return this.getName()
            .contains("Knight Lieutenant");
    }

    isMasterCommander(): boolean {
        return this.getName()
            .contains("Master Commander");
    }

    isSergeant(): boolean {
        return this.getName()
            .contains("Sergeant");
    }

    isSergeant1stClass(): boolean {
        return this.getName()
            .contains("Sergeant 1st Class");
    }

}

export class RankJsonSerializer extends JsonSerializer<Rank> {
    static instance: RankJsonSerializer = new RankJsonSerializer();

    fromJson(obj: any): Rank {
        return Option.of(new Rank(
            OptionUtils.parseNumber(obj[idKey]),
            OptionUtils.parseString(obj[nameKey]),
        )).map(x => this.toJsonImpl(x)).getOrElse(new Rank());
    }

    toJson(value: Rank, builder: JsonBuilder): JsonBuilder {
        return builder
            .addOptional(idKey, value.getId())
            .addOptional(nameKey, value.getName());
    }

    toType(obj: any = {}): Rank {
        return new Rank(
            OptionUtils.parseNumber(obj[idKey]),
            OptionUtils.parseString(obj[nameKey]),
        );
    }

}
