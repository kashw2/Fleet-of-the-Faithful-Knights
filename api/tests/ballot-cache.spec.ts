import {Ballot} from "@kashw2/lib-ts";
import {BallotCache} from "../src/db/caches/ballot-cache";
import {List} from "immutable";
import {Option} from "funfix-core";

describe('Ballot Cache', () => {
    it('should add', () => {
        const ballots = List.of(
            new Ballot(),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const result = cache.add(new Ballot(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const newCache = new BallotCache(cache.remove(0));
        const result = newCache.getBallotById('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const newCache = new BallotCache(cache.concat(List.of(new Ballot(Option.of('abc123')))));
        const result = newCache.getBallotById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const newCache = new BallotCache(cache.update(List.of(new Ballot(Option.of('abc123')))));
        const result = newCache.getBallotById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const newCache = new BallotCache(cache.set(0, new Ballot(Option.of('abc123'))));
        const result = newCache.getBallotById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const ballots = List.of(
            new Ballot(Option.of('123abc')),
            new Ballot(),
            new Ballot(),
        );
        const cache = new BallotCache(ballots);
        const result = cache.getBallotById('123abc');
        expect(result.isRight()).toBe(true);
    });
});