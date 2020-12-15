import {Option} from "funfix-core";
import {Collection} from "immutable";
import {JsonSerializer} from "./json-serializer";

export class JsonBuilder {

    private jsonObject: object = {};
    
    public add<A>(value: A, key: string): JsonBuilder {
        this.jsonObject[key] = value;
        return this;
    }

    public addOptionalSerializer<A>(value: Option<A>, key: string, serializer: JsonSerializer<A>): JsonBuilder {
        return value.map(v => this.addSerializable(v, key, serializer))
            .getOrElse(this);
    }

    private addSerializable<A>(value: A, key: string, serializer: JsonSerializer<A>): JsonBuilder {
        this.jsonObject[key] = serializer.toJson(value, new JsonBuilder());
        return this;
    }
    
    public addOptional<A>(value: Option<A>, key: string): JsonBuilder {
        return value.map(v => this.add(v, key))
            .getOrElse(this);
    }
    
    public addIterable<A extends Collection<any, B>, B>(value: A, key: string): JsonBuilder {
        value.forEach(v => this.jsonObject[key] += v);
        return this;
    }

    public build(): object {
        return this.jsonObject;
    }

}
