import {List} from "immutable";
import {match} from "assert";
import {VoteJsonSerializer} from "@kashw2/lib-ts";

export class Cache<A> {

    constructor(private values: List<A> = List<A>()) {
    }

    size: number = this.getValues().size;

    static apply<A>(values: List<A> = List<A>()): Cache<A> {
        return new Cache<A>(values);
    }

    /**
     * Allows addition of an element to the Cache.
     *
     * Time Complexity: O(n)
     */
    add(value: A): List<A> {
        console.time('Cache (Add)');
        this.values = this.values.insert(this.size + 1, value);
        console.timeEnd('Cache (Add)');
        return this.values;
    }

    /**
     * Allows for the concatination of values into the cache.
     *
     * Time Complexity: O(1)
     *
     * @alias append
     */
    concat(values: List<A>): List<A> {
        console.time('Cache (Concat)');
        this.values = this.values.concat(values);
        console.timeEnd('Cache (Concat)');
        return this.values;
    }

    private getValues(): List<A> {
        return this.values;
    }


    /**
     * Sets the value at a given index in the List
     *
     * Time Complexity: O(n) + O(1)
     */
    set(index: number, value: A): List<A> {
        console.time('Cache (Set)');
        this.values = this.values.set(index, value);
        console.timeEnd('Cache (Set)');
        return this.values;
    }

    /**
     * Sets the value in the List using a predicate match to determine index in List to set.
     *
     * Time Complexity: O(n) + O(1)
     */
    setIn(value: A, matcher: (v: A) => boolean): List<A> {
        console.time('Cache (SetIn)');
        this.values = this.values.set(this.values.findIndex(v => matcher(v)), value);
        console.timeEnd('Cache (SetIn)');
        return this.values;
    }

    /**
     * Allows for updating the values inside of the Cache.
     * This method does not perform a transformation internally, instead it is assumed that the input has already
     * has a transformation applied to it, this is to keep this method as quick and unopinionated as possible
     *
     * Time Complexity: O(1) + O(1)
     */
    update(list: List<A>): List<A> {
        console.time('Cache (Update)');
        this.values = this.values.clear().concat(list);
        console.timeEnd('Cache (Update)');
        return this.values;
    }

}
