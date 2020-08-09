import {Option} from "funfix-core";
import {List, Set} from "immutable";
import {SimpleJsonSerializer} from "./simple-json-serializer";

export class JsonBuilder {

    constructor(private object: object = {}) {
    }

    add<T>(value: any, key: string): JsonBuilder {
        // @ts-ignore
        this.object[key] = value;
        return new JsonBuilder(this.object);
    }

    addList<T>(values: List<T>, key: string): JsonBuilder {
        if (!values.isEmpty()) {
            // @ts-ignore
            values.map((value, iteration) => this.object[key][iteration] = value);
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    addListSerialized<T>(values: List<T>, key: string, serializer: SimpleJsonSerializer<T>): JsonBuilder {
        if (!values.isEmpty()) {
            // @ts-ignore
            this.object[key] = serializer.toJsonArray(values);
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    addOptional(value: Option<any>, key: string): JsonBuilder {
        if (!value.isEmpty()) {
            // @ts-ignore
            this.object[key] = value.get();
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    addOptionalSerialized<T>(value: Option<T>, key: string, serializer: SimpleJsonSerializer<T>): JsonBuilder {
        if (!value.isEmpty()) {
            // @ts-ignore
            this.object[key] = serializer.toJsonImpl(value.get());
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    addSerialized<T>(value: any, key: string, serializer: SimpleJsonSerializer<T>): JsonBuilder {
        // @ts-ignore
        this.object[key] = serializer.fromJson(value);
        return new JsonBuilder(this.object);
    }

    addSet<T>(values: Set<T>, key: string): JsonBuilder {
        if (!values.isEmpty()) {
            // @ts-ignore
            values.map((value, iteration) => this.object[key][iteration] = value);
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    addSetSerialized<T>(values: Set<T>, key: string, serializer: SimpleJsonSerializer<T>): JsonBuilder {
        if (!values.isEmpty()) {
            // @ts-ignore
            this.object[key] = serializer.toJsonArray(values);
            return new JsonBuilder(this.object);
        }
        return new JsonBuilder(this.object);
    }

    build(): object {
        return this.object;
    }

}
