import {Option} from "funfix-core";
import {List} from "immutable";
import {Moment} from "moment";

export abstract class JsonSerializer<A> {

    abstract fromJson(obj: any): A ;

    abstract toJson(value: A, builder: JsonBuilder): JsonBuilder;

    toJsonImpl(value: A): any {
        return this.toJson(value, new JsonBuilder()).build();
    }

}

export class JsonBuilder {

    private object: any = {};

    addList(key: string, list: List<any>): JsonBuilder {
        if (!list.isEmpty()) {
            this.object[key] = list.toArray();
        }
        return this;
    }

    addOptional(key: string, value: Option<number | string | boolean>): JsonBuilder {
        if (value.nonEmpty()) {
            value.forEach(v => this.addValue(key, v));
        }
        return this;
    }

    addOptionalMoment(key: string, value: Option<Moment>): JsonBuilder {
        value.map(x => {
            this.object[key] = x;
        });
        return this;
    }

    addOptionalSerialized<A, B, D extends B>(key: string, value: Option<A>, serializer: JsonSerializer<B>): JsonBuilder {
        if (value.nonEmpty()) {
            value.forEach(v => {
                const object = serializer.fromJson(v);
                if (JSON.stringify(object) !== "{}") {
                    this.object[key] = object;
                }
            });
        }
        return this;
    }

    addValue(key: string, value: number | string | boolean): JsonBuilder {
        this.object[key] = value;
        return this;
    }

    build(): object {
        return this.object;
    }

}
