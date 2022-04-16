import {Group} from "@kashw2/lib-ts";
import {List} from "immutable";
import {Option} from "funfix";
import {GroupCache} from "../src/db/caches/group-cache";

describe('Group Cache', () => {
    it('should add', () => {
        const groups = List.of(
            new Group(),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const result = cache.add(new Group(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const groups = List.of(
            new Group(),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const newCache = new GroupCache(cache.remove(0));
        const result = newCache.getGroupsById('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const groups = List.of(
            new Group(Option.of('123abc')),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const newCache = new GroupCache(cache.concat(List.of(new Group(Option.of('abc123')))));
        const result = newCache.getGroupsById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const groups = List.of(
            new Group(Option.of('123abc')),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const newCache = new GroupCache(cache.update(List.of(new Group(Option.of('abc123')))));
        const result = newCache.getGroupsById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const groups = List.of(
            new Group(Option.of('123abc')),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const groups = List.of(
            new Group(Option.of('123abc')),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const newCache = new GroupCache(cache.set(0, new Group(Option.of('abc123'))));
        const result = newCache.getGroupsById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const groups = List.of(
            new Group(Option.of('123abc')),
            new Group(),
            new Group(),
        );
        const cache = new GroupCache(groups);
        const result = cache.getGroupsById('123abc');
        expect(result.isRight()).toBe(true);
    });
});