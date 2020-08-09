import {Injectable} from "@angular/core";
import {List} from "immutable";
import {DiscordMessage, DiscordUser} from "@ffk/lib-ts";
import {Either} from "funfix-core";
import {DiscordApi} from "../../../../core/src/apis/discord-api";

@Injectable({
  providedIn: "root"
})
export class DiscordApiService extends DiscordApi {

  constructor() {
    super();
  }

  isAuthorUser(author: DiscordUser, userId: string): boolean {
    return author.getId().contains(userId);
  }

  // TODO: Fix the method params, have a check in place for match type?
  async listChannelMessageByDiscordUser(channelId: string, userId: string, discriminator: string = "1337"): Promise<Either<string, List<DiscordMessage>>> {
    const messages = await this.listChannelMessages(channelId);
    return messages.map(channels => channels.filter(x => x.getAuthor().map(user => user.getId().contains(userId))))
  }

}
