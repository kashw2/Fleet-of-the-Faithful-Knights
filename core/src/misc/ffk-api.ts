import {Either, Left, Right} from "funfix-core";
import {EitherUtils, User, UserJsonSerializer} from "..";
import * as axios from "axios";
import {News, NewsJsonSerializer} from "../models/news";
import {List} from "immutable";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "./discord-api";

export class FfkApi {

    constructor() {
        // There's probably better ways we can handle this
        if (FfkApi.getHostUrl().isLeft()) {
            throw new Error(FfkApi.getHostUrl().value);
        }
    }

    static getHostUrl(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_API_ADDRESS!, 'FFK_API_ADDRESS is empty');
    }

    static getUsersByGroup(group: string): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/users/${group}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getUserById(id: number): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/user/id/${id}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getUserByUsername(username: string): Promise<Either<string, User>> {
        return axios.default.get(this.getHostUrl().get().concat(`/users/username/${username}`))
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

    static getAllNews(): Promise<Either<string, List<News>>> {
        return axios.default.get(this.getHostUrl().get().concat(`/news`))
            .then(x => Right(NewsJsonSerializer.instance.fromJsonArray(List(x.data))))
            .catch(x => Left(x));
    }

    static loginUser(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return axios.default.get(this.getHostUrl().get().concat(`/user/login?code=${code}`))
            .then(x => Right(DiscordOAuthResponseJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

}
