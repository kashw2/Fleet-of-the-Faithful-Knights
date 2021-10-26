import {Ballot, Vote} from "@kashw2/lib-ts";
import {BallotCache} from "../src/db/caches/ballot-cache";
import {List} from "immutable";
import {Option} from "funfix-core";
import {VoteCache} from "../src/db/caches/vote-cache";

describe('Vote Cache', () => {
    it('should add', () => {
        const votes = List.of(
            new Vote(),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const result = cache.add(new Vote(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const newCache = new VoteCache(cache.remove(0));
        const result = newCache.getByVoteId('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const newCache = new VoteCache(cache.concat(List.of(new Vote(Option.of('abc123')))));
        const result = newCache.getByVoteId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const newCache = new VoteCache(cache.update(List.of(new Vote(Option.of('abc123')))));
        const result = newCache.getByVoteId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const newCache = new VoteCache(cache.set(0, new Vote(Option.of('abc123'))));
        const result = newCache.getByVoteId('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const votes = List.of(
            new Vote(Option.of('123abc')),
            new Vote(),
            new Vote(),
        );
        const cache = new VoteCache(votes);
        const result = cache.getByVoteId('123abc');
        expect(result.isRight()).toBe(true);
    });
});