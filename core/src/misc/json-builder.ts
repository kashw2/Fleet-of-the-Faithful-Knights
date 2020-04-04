import {Option} from "funfix-core";
import {List} from "immutable";
import {SimpleJsonSerializer} from "./simple-json-serializer";

export class JsonBuilder {

    object: object = {};

    add<T>(value: any, key: string): JsonBuilder {
        // @ts-ignore
        this.object[key] = value;
        return new JsonBuilder();
    }

    // Don't know if this will work, will have to wait until i actually use it i guess
    // Possible FIXME?
    addList<T>(value: List<T>, key: string): JsonBuilder {
        if (!value.isEmpty()) {
            value.map((value, iteration) => this.object[key][iteration]);
            return new JsonBuilder();
        }
        return new JsonBuilder();
    }

    addOptional(value: Option<any>, key: string): JsonBuilder {
        if (!value.isEmpty()) {
            // @ts-ignore
            this.object[key] = value.get();
            return new JsonBuilder();
        }
        return new JsonBuilder();
    }

    addOptionalSerialized<T>(value: Option<T>, key: string, serializer: SimpleJsonSerializer<T>): JsonBuilder {
        if (!value.isEmpty()) {
            this.object[key] = serializer.toJson(value.get());
            return new JsonBuilder();
        }
        return new JsonBuilder();
    }

    build(): object {
        return this.object;
    }

}
