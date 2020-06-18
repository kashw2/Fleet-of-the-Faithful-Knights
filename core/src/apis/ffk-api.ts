import {Api} from "../models/api";
import {Url} from "../models/url";
import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "../util/either-utils";
import {Candidate, CandidateJsonSerializer} from "../models/candidate";
import {Comment, CommentJsonSerializer} from "../models/comment";
import {User, UserJsonSerializer} from "../models/user";
import {Vote, VoteJsonSerializer} from "../models/vote";
import {News, NewsJsonSerializer} from "../models/news";
import {DiscordOAuthResponse, DiscordOAuthResponseJsonSerializer} from "..";

export class FfkApi {

    static instance: FfkApi = new FfkApi();

    // TODO: Make this fallback to the live url
    private api: Api = new Api(Url.buildFromUri(this.getFfkApiUrl().getOrElse("localhost:8008")));

    private getFfkApiToken(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_API_TOKEN!, "FFK_API_TOKEN is undefined");
    }

    private getFfkApiUrl(): Either<string, string> {
        return EitherUtils.liftEither(process.env.FFK_API_ADDRESS!, "FFK_API_ADDRESS is undefined");
    }

    private getHeaders(): object {
        if (this.getFfkApiToken().isRight()) {
            return {
                "X-Api-Token": this.getFfkApiToken().get(),
            };
        }
        throw new Error(this.getFfkApiToken().value);
    }

    getUserById(userId: number): Promise<Either<string, User>> {
        return this.api.sendRequestSerialized(
            `/user/id/${userId}`,
            UserJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    getUserByToken(token: string): Promise<Either<string, User>> {
        return this.api.sendRequestSerialized(
            `/user/token/${token}`,
            UserJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    getUserByUsername(username: string): Promise<Either<string, User>> {
        return this.api.sendRequestSerialized(
            `/user/username/${username}`,
            UserJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    getVoteById(voteId: number): Promise<Either<string, Vote>> {
        return this.api.sendRequestSerialized(
            `/vote/id/${voteId}`,
            VoteJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listCandidates(): Promise<Either<string, List<Candidate>>> {
        return this.api.sendRequestSerializedList(
            "/candidates",
            CandidateJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listNews(): Promise<Either<string, List<News>>> {
        return this.api.sendRequestSerializedList(
            "/news",
            NewsJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listRecentVotes(amount: number = 10): Promise<Either<string, List<Vote>>> {
        return this.api.sendRequestSerializedList(
            `/votes/recent/${amount}`,
            VoteJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listUsersByGroup(group: string): Promise<Either<string, List<User>>> {
        return this.api.sendRequestSerializedList(
            `/users/${group}`,
            UserJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    listVotes(): Promise<Either<string, List<Vote>>> {
        return this.api.sendRequestSerializedList(
            "/votes",
            VoteJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        )
    }

    listVotesBySponsor(userId: number): Promise<Either<string, List<Vote>>> {
        return this.api.sendRequestSerializedList(
            `/votes/sponsor/${userId}`,
            VoteJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    writeCandidates(candidates: List<Candidate>): Promise<Either<string, List<number>>> {
        return this.api.sendRequestNumberList(
            "/candidates/write",
            this.getHeaders(),
            "POST",
            {candidates: CandidateJsonSerializer.instance.toJsonArray(candidates)},
        );
    }

    writeComment(voteId: number, comment: Comment): Promise<Either<string, number>> {
        return this.api.sendRequestNumber(
            `/comment/write/${voteId}`,
            this.getHeaders(),
            "POST",
            {comment: CommentJsonSerializer.instance.toJsonImpl(comment)},
        );
    }

    writeResponse(
        voteId: number,
        response: string,
    ): Promise<Either<string, number>> {
        return this.api.sendRequestNumber(
            `/vote/response/${voteId}/${response}`,
            this.getHeaders(),
            "GET",
        );
    }

    writeUser(code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return this.api.sendRequestSerialized(
            `/user/register?code=${code}`,
            DiscordOAuthResponseJsonSerializer.instance,
            this.getHeaders(),
            "GET",
        );
    }

    writeVote(vote: Vote): Promise<Either<string, number>> {
        return this.api.sendRequestNumber(
            "/vote/write",
            this.getHeaders(),
            "POST",
            {vote: VoteJsonSerializer.instance.toJsonImpl(vote)},
        );
    }

}
