import {Candidate} from "@kashw2/lib-ts";
import {List} from "immutable";
import {Option} from "funfix";
import {CandidateCache} from "../src/db/caches/candidate-cache";

describe('Candidate Cache', () => {
    it('should add', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const result = cache.add(new Candidate(Option.of('123abc')));
        expect(result.get(3)?.getId().get()).toEqual('123abc');
    });
    it('should remove', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const newCache = new CandidateCache(cache.remove(0));
        const result = newCache.getCandidateById('123abc');
        expect(result.isLeft()).toBe(true);
    });
    it('should abide semigroup', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const newCache = new CandidateCache(cache.concat(List.of(new Candidate(Option.of('abc123')))));
        const result = newCache.getCandidateById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should update', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const newCache = new CandidateCache(cache.update(List.of(new Candidate(Option.of('abc123')))));
        const result = newCache.getCandidateById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should clear', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const result = cache.clear();
        expect(result.size).toBe(0);
    });
    it('should set', () => {
        const candidates = List.of(
            new Candidate(),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const newCache = new CandidateCache(cache.set(0, new Candidate(Option.of('abc123'))));
        const result = newCache.getCandidateById('abc123');
        expect(result.isRight()).toBe(true);
    });
    it('should read', () => {
        const candidates = List.of(
            new Candidate(Option.of('123abc')),
            new Candidate(),
            new Candidate(),
        );
        const cache = new CandidateCache(candidates);
        const result = cache.getCandidateById('123abc');
        expect(result.isRight()).toBe(true);
    });
});