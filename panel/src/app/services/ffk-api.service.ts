import {Injectable} from "@angular/core";
import {List} from "immutable";
import {FfkApi} from "../../../../core/src/misc/ffk-api";
import {News} from "../../../../core/src/models/news";
import {Vote} from "../../../../core/src/models/vote";
import {environment} from "../../environments/environment";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  constructor(private notificationService: NotificationService) {
    super(environment.FFK_API_ADDRESS, environment.FFK_API_TOKEN);
  }

  async getNews(): Promise<List<News>> {
    const news = await this.getAllNews();
    if (news.isLeft()) {
      return this.notificationService.showFailureNotificationAndRecoverList(news);
    }
    return news.get();
  }

  async getVotesByStatus(userId: number, status: boolean = false): Promise<List<Vote>> {
    const votes = await this.getAllVotesByStatus(userId, status);
    if (votes.isLeft()) {
      return this.notificationService.showFailureNotificationAndRecoverList(votes);
    }
    return votes.get();
  }

  async getVotesByUser(userId: number): Promise<List<Vote>> {
    const votes = await this.getAllVotesByUser(userId);
    if (votes.isLeft()) {
      return this.notificationService.showFailureNotificationAndRecoverList(votes);
    }
    return votes.get();
  }

}
