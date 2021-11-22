import {OptionUtils} from "../src";
import {Left, None, Option, Right, Some} from "funfix-core";
import {List, Set} from "immutable";

describe('Option Utils', () => {
    it('should pass exists2', () => {
        const result = OptionUtils.exists2(Option.of(true), Option.of(false), (a, b) => {
            return a && !b;
        });
        expect(result).toBeTrue();
    });
    it('should fail exists2', () => {
        const result = OptionUtils.exists2(Option.of(true), None, (a, b) => {
            return a && !b;
        });
        expect(result).toBeFalse();
    });
    it('should naturally transform to collection', () => {
        const collection = List.of(Option.of(1));
        const result = OptionUtils.flattenCollection(collection).toArray();
       expect(result).toEqual([1]);
    });
    it('should naturally transform to list', () => {
        const collection = List.of(Option.of(1));
        const result = OptionUtils.flattenList(collection).toArray();
        expect(result).toEqual([1]);
    });
    it('should naturally transform to set', () => {
        const collection = Set.of(Option.of(1));
        const result = OptionUtils.flattenSet(collection).toArray();
        expect(result).toEqual([1]);
    });
    it('should naturally transform to either', () => {
        const result = OptionUtils.toEither(Option.of(1), 'not 1');
        expect(result).toEqual(Right(1));
    });
    it('should not naturally transform to either', () => {
        const result = OptionUtils.toEither(None, 'not 1');
        expect(result).toEqual(Left('not 1'));
    });
    it('should transform varargs to list', () => {
        const result = OptionUtils.toList(Option.of(1), Option.of(2), Option.of(3)).toArray();
        expect(result).toEqual([1, 2, 3]);
    });
    it('should transform varargs to set', () => {
        const result = OptionUtils.toSet(Option.of(1), Option.of(2), Option.of(3)).toArray();
        expect(result).toEqual([1, 2, 3]);
    });
    it('should create option if predicate is true', () => {
        const result = OptionUtils.when(Some(1).nonEmpty(), () => {
            return 2;
        });
        expect(result).toEqual(Some(2));
    });
});