import {Cache} from "../src/db/caches/cache";
import {List} from "immutable";

describe('Cache', () => {
    it('should add', () => {
        const cache = new Cache(List.of());
        const result = cache.add(1);
        expect(result).toEqual(List.of<number>(1));
    });
    it('should remove', () => {
        const cache = new Cache(List.of(1));
        const result = cache.remove(0);
        expect(result).toEqual(List());
    });
    it('should abide semigroup', () => {
        const cache = new Cache(List.of(1));
        const result = cache.concat(List.of(2)).toArray();
        expect(result).toEqual([1, 2]);
    });
    it('should update', () => {
        const cache = new Cache(List.of(1));
        const result = cache.update(List.of(2));
        expect(result).toEqual(List.of(2));
    });
    it('should clear', () => {
        const cache = new Cache(List.of(1));
        const result = cache.clear();
        expect(result).toBe(List());
    });
    it('should set', () => {
        const cache = new Cache(List.of(1));
        const result = cache.set(0, 2);
        expect(result).toEqual(List.of(2));
    });
});