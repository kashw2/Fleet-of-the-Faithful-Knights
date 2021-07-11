import {Option} from 'funfix-core';
import {Collection, List, Set} from 'immutable';
import {JsonSerializer} from './json-serializer';
import * as moment from 'moment';

export class JsonBuilder {

    private jsonObject: any = {};

    public add<A>(value: A, key: string): JsonBuilder {
        this.jsonObject[key] = value;
        return this;
    }

    public addIterable<A>(values: Collection<any, A>, key: string): JsonBuilder {
        if (!values.isEmpty()) {
            this.jsonObject[key] = values;
        }
        return this;
    }

    public addIterableSerialized<A>(values: Set<A> | List<A>, key: string, serializer: JsonSerializer<A>): JsonBuilder {
        if (!values.isEmpty()) {
            this.jsonObject[key] = serializer.toJsonArray(values.toArray());
        }
        return this;
    }

    public addOptional<A>(value: Option<A>, key: string): JsonBuilder {
        return value.map(v => this.add(v, key))
            .getOrElse(this);
    }

    public addOptionalDate(value: Option<moment.Moment>, key: string): JsonBuilder {
        return value.map(m => m.isValid())
            .map(m => this.add(m, key))
            .getOrElse(this);
    }

    public addOptionalSerialized<A>(value: Option<A>, key: string, serializer: JsonSerializer<A>): JsonBuilder {
        return value.map(v => this.addSerializable(v, key, serializer))
            .getOrElse(this);
    }

    private addSerializable<A>(value: A, key: string, serializer: JsonSerializer<A>): JsonBuilder {
        this.jsonObject[key] = serializer.toJson(value, new JsonBuilder());
        return this;
    }

    public build(): Record<string, any> {
        return this.jsonObject;
    }

}
