import axios from "axios";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {User, UserJsonSerializer} from "..";
import {Candidate, CandidateJsonSerializer} from "../models/candidate";
import {News, NewsJsonSerializer} from "../models/news";
import {Vote, VoteJsonSerializer} from "../models/vote";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "./discord-api";

export class FfkApi {

    constructor(
        private address: string,
        private apiToken: string = process.env.FFK_API_TOKEN!,
    ) {

    }

    getAllCandidates(): Promise<Either<string, List<Candidate>>> {
        return axios.get(this.getHostUrl().concat(`/candidates`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(CandidateJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    getAllNews(): Promise<Either<string, List<News>>> {
        return axios.get(this.getHostUrl().concat(`/news`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(NewsJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    getAllVotes(): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat("/votes"), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    getAllVotesByStatus(userId: number, status: boolean): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat(`/votes/passed/${userId}?passed=${status}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(x.data)))
            .catch(x => Left(x));
    }

    getAllVotesByUser(userId: number): Promise<Either<string, List<Vote>>> {
        return axios.get(this.getHostUrl().concat(`/votes/user/${userId}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    private getApiToken(): string {
        return this.apiToken;
    }

    private getHostUrl(): string {
        return this.address;
    }

    getUserById(id: number): Promise<Either<string, User>> {
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

    getUserByUsername(username: string): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/users/username/${username}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    getUsersByGroup(group: string): Promise<Either<string, User>> {
        return axios.get(this.getHostUrl().concat(`/users/${group}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    getVoteById(voteId: number): Promise<Either<string, Vote>> {
        return axios.get(this.getHostUrl().concat(`/vote/${voteId}`), {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(VoteJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    loginUser(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return axios.get(this.getHostUrl().concat(`/user/profile?code=${code}`), {
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

    writeVote(vote: Vote): Promise<Either<string, number>> {
        return axios.post(this.getHostUrl().concat("/vote/write"), {
            vote: VoteJsonSerializer.instance.toJsonImpl(vote),
        }, {
            headers: {
                "X-Api-Token": this.getApiToken(),
            },
        })
            .then(x => Right(x.data))
            .catch(x => Left(x));
    }

}
