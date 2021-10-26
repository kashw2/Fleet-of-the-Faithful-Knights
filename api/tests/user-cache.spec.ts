import {Ballot, User} from "@kashw2/lib-ts";
import {BallotCache} from "../src/db/caches/ballot-cache";
import {List} from "immutable";
import {Option} from "funfix-core";
import {UserCache} from "../src/db/caches/user-cache";

describe('User Cache', () => {
    it('should add', () => {
        const users = List.of(
            new User(),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const result = cache.add(new User(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const newCache = new UserCache(cache.remove(0));
        const result = newCache.getByUserId('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const newCache = new UserCache(cache.concat(List.of(new User(Option.of('abc123')))));
        const result = newCache.getByUserId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const newCache = new UserCache(cache.update(List.of(new User(Option.of('abc123')))));
        const result = newCache.getByUserId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const newCache = new UserCache(cache.set(0, new User(Option.of('abc123'))));
        const result = newCache.getByUserId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const users = List.of(
            new User(Option.of('123abc')),
            new User(),
            new User(),
        );
        const cache = new UserCache(users);
        const result = cache.getByUserId('123abc');
        expect(result.isRight()).toBe(true);
    });
});