import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "..";
import {Vote} from "./vote";

export class VoteCache {

    constructor(private votes: List<Vote>) {
    }

    getById(id: number): Vote {
        return this.getVotes()
            .get(id)!;
    }

    getByIdEither(id: number): Either<string, Vote> {
        return EitherUtils.liftEither(this.getById(id), `Vote ${id} does not exist in cache`);
    }

    getByUserId(userId: number): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes()
                .filter(v => v.getSponsor().flatMap(s => s.getId()).contains(userId)),
            `No votes by ${userId} found in cache`,
        );
    }

    getCAAVotes(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes().filter(v => v.isCAAVote()),
            "No CAA votes found",
        );
    }

    getFailedVotes(): List<Vote> {
        return this.getVotes()
            .filter(v => v.getStatus().contains(false));
    }

    getFailedVotesByUser(userId: number): List<Vote> {
        return this.getFailedVotes()
            .filter(v => v.getSponsor().flatMap(u => u.getId()).contains(userId));
    }

    getFailedVotesByUserEither(userId: number): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getFailedVotesByUser(userId), `User ${userId} has no failed votes`);
    }

    getFailedVotesEither(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getFailedVotes(), "No failed votes exist in the cache");
    }

    getFirst(): Vote {
        return this.getVotes()
            .first();
    }

    getKnightVotes(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes().filter(v => v.shouldBeInKnightVoting()),
            "No Knight votes found",
        );
    }

    getLast(): Vote {
        return this.getVotes()
            .last();
    }

    getPassedVotes(): List<Vote> {
        return this.getVotes()
            .filter(v => v.getStatus().contains(true));
    }

    getPassedVotesByUser(userId: number): List<Vote> {
        return this.getPassedVotes()
            .filter(v => v.getSponsor().flatMap(u => u.getId()).contains(userId));
    }

    getPassedVotesByUserEither(userId: number): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getPassedVotesByUser(userId), `User ${userId} has no passed votes`);
    }

    getPassedVotesEither(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getPassedVotes(), "No passed votes exist in the cache");
    }

    getSergeantFirstClassVotes(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes().filter(v => v.isSergeantFirstClassVote()),
            "No Sergeant First Class votes found",
        );
    }

    getSergeantVotes(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes().filter(v => v.isSergeantVote()),
            "No Sergeant votes found",
        );
    }

    getSquireVotes(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(
            this.getVotes().filter(v => v.isSquireVote()),
            "No Squire votes found",
        );
    }

    private getVotes(): List<Vote> {
        return this.votes;
    }

    getVotesEither(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getVotes(), "No votes in vote cache");
    }

}
