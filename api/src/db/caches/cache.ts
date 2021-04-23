import {List} from "immutable";

export class Cache<A> {

    constructor(private values: List<A> = List<A>()) {
    }

    private getValues(): List<A> {
        return this.values;
    }

    update(list: List<A>): List<A> {
        return this.values = this.values.clear().concat(list);
    }

}
