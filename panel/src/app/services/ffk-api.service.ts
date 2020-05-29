import {Injectable} from "@angular/core";
import {Either, Left} from "funfix-core";
import {User} from "../../../../core/src";
import {DiscordOAuthResponse} from "../../../../core/src/misc/discord-api";
import {FfkApi} from "../../../../core/src/misc/ffk-api";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {List} from "immutable";
import {News} from "../../../../core/src/models/news";

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  constructor(private cookieService: CookieService) {
    super(environment.FFK_API_ADDRESS, environment.FFK_API_TOKEN);
  }

  async loginOrRegisterUser(code: string): Promise<Either<string, User>> {
    const response = await this.logUserIn(code);
    console.log(response);
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

  async getAllNews(): Promise<Either<string, List<News>>> {
    const response = await this.listNews();
    return response;
  }

}
