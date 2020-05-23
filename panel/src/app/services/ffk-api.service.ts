import {Injectable} from "@angular/core";
import {List} from "immutable";
import {OptionUtils, User} from "../../../../core/src";
import {DiscordOAuthResponse} from "../../../../core/src/misc/discord-api";
import {FfkApi} from "../../../../core/src/misc/ffk-api";
import {Candidate} from "../../../../core/src/models/candidate";
import {Comment} from "../../../../core/src/models/comment";
import {News} from "../../../../core/src/models/news";
import {Vote} from "../../../../core/src/models/vote";
import {environment} from "../../environments/environment";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  // TODO: Fix this class

  constructor(private notificationService: NotificationService) {
    super(environment.FFK_API_ADDRESS, environment.FFK_API_TOKEN);
  }

  async getCandidates(): Promise<List<Candidate>> {
    const candidates = await this.getAllCandidates();
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(candidates, "Successfully loaded candidates"));
  }

  async getNews(): Promise<List<News>> {
    const news = await this.getAllNews();
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(news, "Successfully loaded news"));
  }

  async getUserByToken(token: string): Promise<User> {
    const user =  await this.getUserFromToken(token);
    return this.notificationService.showNotificationBasedOnEither(user, "Successfully loaded user")
      .filter(x => !x.isEmpty())
      .get();
  }

  async getVoteById(voteId: number): Promise<Vote> {
    const vote = await this.getVoteFromId(voteId);
    return this.notificationService.showNotificationBasedOnEither(vote, "Successfully loaded vote")
      .filter(x => !x.isEmpty())
      .get();
  }

  async getVotes(): Promise<List<Vote>> {
    const votes = await this.getAllVotes();
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(votes, "Successfully loader votes"));
  }

  async getVotesByStatus(userId: number, status: boolean = false): Promise<List<Vote>> {
    const votes = await this.getAllVotesByStatus(userId, status);
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(votes, "Successfully loaded votes"));
  }

  async getVotesByType(type: string): Promise<List<Vote>> {
    const votes = await this.getAllVotesByType(type);
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(votes, "Successfully loaded votes"));
  }

  async getVotesByUser(userId: number): Promise<List<Vote>> {
    const votes = await this.getAllVotesByUser(userId);
    return OptionUtils.toList(this.notificationService.showNotificationBasedOnEither(votes, "Successfully loaded user votes"));
  }

  async loginUser(code: string): Promise<DiscordOAuthResponse> {
    const response = await this.logUserIn(code);
    return this.notificationService.showNotificationBasedOnEither(response, "Handshake authenticated")
      .filter(x => x.isUseful())
      .get();
  }

  async writeVoteComment(comment: Comment, voteId: number): Promise<number> {
    const response = await this.writeComment(comment, voteId);
    return this.notificationService.showNotificationBaseOnEitherEffector(response, value => `Successfully wrote comment ${value}`)
      // Lol
      .getOrElse(NaN);
  }

  async writeVoteForUser(vote: Vote): Promise<number> {
    const response = await this.writeVote(vote);
    return this.notificationService.showNotificationBaseOnEitherEffector(response, (value) => `Successfully wrote vote ${value}`)
      // Lol
      .getOrElse(NaN);
  }

  async writeVoteResponse(voteId: number, userId: number, char: string): Promise<number> {
    const response = await this.writeResponse(voteId, userId, char);
    return this.notificationService.showNotificationBaseOnEitherEffector(response, (value) => `Successfully wrote response ${value}`)
      // Lol
      .getOrElse(NaN);
  }

}
