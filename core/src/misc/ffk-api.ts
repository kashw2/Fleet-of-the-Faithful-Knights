import * as axios from "axios";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, User, UserJsonSerializer} from "..";
import {News, NewsJsonSerializer} from "../models/news";
import {Vote, VoteJsonSerializer} from "../models/vote";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "./discord-api";

export class FfkApi {

    constructor() {
        // There's probably better ways we can handle this
        if (FfkApi.getHostUrl().isLeft()) {
            throw new Error(FfkApi.getHostUrl().value);
        }
    }

    static getAllNews(): Promise<Either<string, List<News>>> {
        return axios.default.get(this.getHostUrl().get().concat(`/news`))
            .then(x => Right(NewsJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    static getAllVotes(): Promise<Either<string, List<Vote>>> {
        return axios.default.get(this.getHostUrl().get().concat("/votes"))
            .then(x => Right(VoteJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    static getHostUrl(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_API_ADDRESS!, "FFK_API_ADDRESS is empty");
    }

    static getUserById(id: number): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/user/id/${id}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getUserByToken(token: string): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/user/token/${token}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getUserByUsername(username: string): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/users/username/${username}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getUsersByGroup(group: string): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/users/${group}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getVoteById(voteId: number): Promise<Either<string, Vote>> {
        return axios.default.get(this.getHostUrl().get().concat(`/vote/${voteId}`))
            .then(x => Right(VoteJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static loginUser(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return axios.default.get(this.getHostUrl().get().concat(`/user/profile?code=${code}`))
            .then(x => Right(DiscordOAuthResponseJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

}
