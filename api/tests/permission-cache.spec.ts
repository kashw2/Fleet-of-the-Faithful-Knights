import {Ballot, Permission} from "@kashw2/lib-ts";
import {List} from "immutable";
import {Option} from "funfix";
import {PermissionCache} from "../src/db/caches/permission-cache";

describe('Permission Cache', () => {
    it('should add', () => {
        const permissions = List.of(
            new Permission(),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const result = cache.add(new Permission(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const newCache = new PermissionCache(cache.remove(0));
        const result = newCache.getByPermissionId('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const newCache = new PermissionCache(cache.concat(List.of(new Permission(Option.of('abc123')))));
        const result = newCache.getByPermissionId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const newCache = new PermissionCache(cache.update(List.of(new Permission(Option.of('abc123')))));
        const result = newCache.getByPermissionId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const newCache = new PermissionCache(cache.set(0, new Permission(Option.of('abc123'))));
        const result = newCache.getByPermissionId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const permissions = List.of(
            new Permission(Option.of('123abc')),
            new Permission(),
            new Permission(),
        );
        const cache = new PermissionCache(permissions);
        const result = cache.getByPermissionId('123abc');
        expect(result.isRight()).toBe(true);
    });
});