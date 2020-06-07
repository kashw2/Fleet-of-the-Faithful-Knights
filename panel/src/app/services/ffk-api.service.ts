import {Injectable} from "@angular/core";
import {Either, Left, Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../../core/src";
import {DiscordOAuthResponse} from "../../../../core/src/misc/discord-api";
import {FfkApi} from "../../../../core/src/misc/ffk-api";
import {News} from "../../../../core/src/models/news";
import {Vote} from "../../../../core/src/models/vote";
import {environment} from "../../environments/environment";
import {Candidate} from "../../../../core/src/models/candidate";
import {Comment, CommentJsonSerializer} from "../../../../core/src/models/comment";

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  constructor(private cookieService: CookieService) {
    super(environment.FFK_API_ADDRESS, environment.FFK_API_TOKEN);
  }

  getAllNews(): Promise<Either<string, List<News>>> {
    return this.listNews();
  }

  getAllVotes(): Promise<Either<string, List<Vote>>> {
    return this.listVotes();
  }

  getAllCandidates(): Promise<Either<string, List<Candidate>>> {
    return this.listCandidates();
  }

  async loginOrRegisterUser(code: string): Promise<Either<string, User>> {
    const response = await this.logUserIn(code);
    if (response.isLeft()) {
      return Left(response.value);
    }
    const token = response.map(x => x.getAccessToken().get());
    if (token.isLeft()) {
      return Left(token.value);
    }
    this.cookieService.set("token", token.get(), 999999999);
    return this.getUserByToken(token.get());
  }

  writeCandidateVote(vote: Vote): Promise<Either<string, number>> {
    return this.writeVote(vote);
  }

  writeVoteComment(comment: Comment, voteId: number): Promise<Either<string, number>> {
    return this.writeComment(comment, voteId);
  }

  wrtieVoteResponse(voteId: number, userId: number, response: string): Promise<Either<string, number>> {
    return this.writeResponse(voteId, userId, response)
  }

}
