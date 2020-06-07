import axios from "axios";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {idKey, User, UserJsonSerializer} from "..";
import {Candidate, CandidateJsonSerializer} from "../models/candidate";
import {Comment, CommentJsonSerializer} from "../models/comment";
import {News, NewsJsonSerializer} from "../models/news";
import {Vote, VoteJsonSerializer} from "../models/vote";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "../models/discord/discord-oauth-response";

export class FfkApi {

    constructor(
        private address: string,
        private apiToken: string = process.env.FFK_API_TOKEN!,
    ) {
    }

    private getApiToken(): string {
        return this.apiToken;
    }

    private getHostUrl(): string {
        return this.address;
    }

    protected getUserById(id: number): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/user/id/${id}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    getUserByToken(token: string): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/user/token/${token}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    protected getUserByUsername(username: string): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/users/username/${username}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    protected getUsersByGroup(group: string): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/users/${group}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    protected getVoteFromId(voteId: number): Promise<Either<string, Vote>> {
        return axios.get(this.getHostUrl().concat(`/vote/id/${voteId}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    protected listCandidates(): Promise<Either<string, List<Candidate>>> {
        return axios.get(this.getHostUrl().concat(`/candidates`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(CandidateJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    protected listNews(): Promise<Either<string, List<News>>> {
        return axios.get(this.getHostUrl().concat(`/news`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(NewsJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    protected listVotes(): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat("/votes"), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    protected listVotesBySponsor(sponsorId: number): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat(`/votes/sponsor/${sponsorId}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    protected listVotesByStatus(userId: number, status: boolean): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat(`/votes/passed/${userId}?passed=${status}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    protected listVotesByType(type: string): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat(`/votes/type/${type}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    protected logUserIn(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return axios.get(this.getHostUrl().concat(`/user/register?code=${code}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(DiscordOAuthResponseJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    writeCandidates(candidates: List<Candidate>): Promise<Either<string, List<any>>> {
        return axios.post(this.getHostUrl().concat("/candidates/write"), {
            candidates: CandidateJsonSerializer.instance.toJsonArray(candidates),
        }, {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(List(x.data)))
            .catch(x => Left(x));
    }

    protected writeComment(comment: Comment, voteId: number): Promise<Either<string, number>> {
        return axios.post(this.getHostUrl().concat(`/comment/write/${voteId}`), {
            comment: CommentJsonSerializer.instance.toJsonImpl(comment),
        }, {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(x.data[idKey]))
            .catch(x => Left(x));
    }

    protected writeResponse(voteId: number, userId: number, response: string): Promise<Either<string, number>> {
        return axios.get(this.getHostUrl().concat(`/vote/response/${voteId}/${userId}/${response}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(x.data[idKey]))
            .catch(x => Left(x));
    }

    protected writeVote(vote: Vote): Promise<Either<string, number>> {
        return axios.post(this.getHostUrl().concat("/vote/write"), {
            vote: VoteJsonSerializer.instance.toJsonImpl(vote),
        }, {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(x.data[idKey]))
            .catch(x => Left(x));
    }

}
