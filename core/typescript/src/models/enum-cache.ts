import {Set} from "immutable";
import {Enum} from "./enum";
import {Either} from "funfix-core";
import {EitherUtils} from "../util/either-utils";

export class EnumCache {

    constructor(private enums: Set<Enum>) {
    }

    getEnums(): Set<Enum> {
        return this.enums;
    }

    getEnumsEither(): Either<string, Set<Enum>> {
        return EitherUtils.liftEither(this.getEnums(), "No emums in enum cache");
    }

    intersect(other: Set<Enum>): EnumCache {
        return new EnumCache(this.getEnums().intersect(other));
    }

    subtract(other: Set<Enum>): EnumCache {
        return new EnumCache(this.getEnums().subtract(other));
    }

}
