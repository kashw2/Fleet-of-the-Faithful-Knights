import {List} from "immutable";

export class Cache<A> {

    constructor(private values: List<A> = List<A>()) {
    }

    private getValues(): List<A> {
        return this.values;
    }

    size(): number {
        return this.getValues()
            .size;
    }

    update(list: List<A>): List<A> {
        return this.values = this.values.clear().concat(list);
    }

    /**
     * Allows concatenation into the cache in O(n) + O(1) time.
     *
     * O(n) for iteration through list
     * O(1) for insert
     *
     * O(n) + O(1) due to the fact that in a LinkedList you need to Access an element before you can insert
     */
    concat(values: List<A>): List<A> {
        this.values = this.values.concat(values);
        return this.values;
    }

    /**
     * Allows for addition of a single element into the cache in O(n) + O(1) time.
     *
     * Inserts a value into the List by iterating over the values in the list until it gets to the last and makes the next value
     * the input param to the method.
     */
    add(value: A): List<A> {
        this.values = this.values.insert(this.size + 1, value);
        return this.values;
    }

}
