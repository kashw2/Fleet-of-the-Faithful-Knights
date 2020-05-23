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
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(candidates, candidates => `Loaded ${candidates.size} Candidates`));
  }

  async getNews(): Promise<List<News>> {
    const news = await this.getAllNews();
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(news, articles => `Loaded ${articles.size} Articles`));
  }

  async getUserByToken(token: string): Promise<User> {
    const response = await this.getUserFromToken(token);
    return this.notificationService.showNotificationBaseOnEitherEffector(response, user => `Welcome ${user.getUsername().getOrElse("Unknown")}`)
      .filter(x => !x.isEmpty())
      .get();
  }

  async getVoteById(voteId: number): Promise<Vote> {
    const vote = await this.getVoteFromId(voteId);
    return this.notificationService.showNotificationBasedOnEither(vote, "Vote Loaded")
      .filter(x => !x.isEmpty())
      .get();
  }

  async getVotes(): Promise<List<Vote>> {
    const responses = await this.getAllVotes();
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(responses, votes => `Loaded ${votes.size} Votes`));
  }

  async getVotesByStatus(userId: number, status: boolean = false): Promise<List<Vote>> {
    const response = await this.getAllVotesByStatus(userId, status);
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(response, votes => `Loaded ${votes.size} Votes`));
  }

  async getVotesByType(type: string): Promise<List<Vote>> {
    const response = await this.getAllVotesByType(type);
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(response, votes => `Loaded ${votes.size} Votes`));
  }

  async getVotesByUser(userId: number): Promise<List<Vote>> {
    const response = await this.getAllVotesByUser(userId);
    return OptionUtils.toList(this.notificationService.showNotificationBaseOnEitherEffector(response, votes => `Loaded ${votes.size} User Votes`));
  }

  async loginUser(code: string): Promise<DiscordOAuthResponse> {
    const response = await this.logUserIn(code);
    return this.notificationService.showNotificationBasedOnEither(response, "Handshake Authenticated")
      .filter(x => x.isUseful())
      .get();
  }

  async writeVoteComment(comment: Comment, voteId: number): Promise<number> {
    const response = await this.writeComment(comment, voteId);
    return this.notificationService.showNotificationBasedOnEither(response, "Success")
      // Lol
      .getOrElse(NaN);
  }

  async writeVoteForUser(vote: Vote): Promise<number> {
    const response = await this.writeVote(vote);
    return this.notificationService.showNotificationBasedOnEither(response, "Success")
      // Lol
      .getOrElse(NaN);
  }

  async writeVoteResponse(voteId: number, userId: number, char: string): Promise<number> {
    const response = await this.writeResponse(voteId, userId, char);
    return this.notificationService.showNotificationBasedOnEither(response, "Success")
      // Lol
      .getOrElse(NaN);
  }

}
