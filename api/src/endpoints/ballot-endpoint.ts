import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {Ballot, BallotJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class BallotEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/ballot');
    }

    create(req: Request): Future<object | string> {
        return EitherUtils.flatMap2(
            this.validate(req),
            this.getVoteId(req),
            (b, vid) => {
                return this.db.cache.votes.getByVoteId(vid)
                    .map(v => {
                        this.db.cache.votes.setIn(v.withBallot(b), x => x.getId().contains(vid));
                        return this.db.procedures.insert.insertBallot(b, vid)(this.getModifiedBy(req));
                    });
            })
            .getOrElse(Future.raise(`Failure running ${this.getEndpointName()}`))
            .map(v => v.isRight() ? BallotJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }


    doesRequireAuthentication = (req: Request) => true;

    private getBallot(req: Request): Either<string, Ballot> {
        return ApiUtils.parseBodyParamSerialized(req, 'ballot', BallotJsonSerializer.instance);
    }

    private getVoteId(req: Request): Either<string, string> {
        return ApiUtils.parseStringQueryParam(req, 'vote_id');
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return true;
            case 'GET':
                return true;
            case 'PUT':
                return true;
            case 'DELETE':
                return true;
            default:
                return false;
        }
    }

    read(req: Request): Future<object | string> {
        return Future.of(() => this.getVoteId(req).flatMap(vid => this.db.cache.ballots.getBallotById(vid)))
            .map(v => v.isRight() ? BallotJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    private validate(req: Request): Either<string, Ballot> {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return this.getBallot(req)
                    .filterOrElse(b => b.getVoterId().nonEmpty(), () => 'Ballot must have a voter id')
                    .filterOrElse(b => b.getResponse().nonEmpty(), () => 'Ballot must have a response');
            case 'PUT':
                return this.getBallot(req)
                    .filterOrElse(b => b.getVoterId().nonEmpty(), () => 'Ballot must have a voter id')
                    .filterOrElse(b => b.getResponse().nonEmpty(), () => 'Ballot must have a response');
            default:
                return this.getBallot(req);
        }
    }

}