import {Injectable} from "@angular/core";
import {Either, Left} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {FfkApi, User} from "../../../../core/src";
import {News} from "../../../../core/src/models/news";
import {Vote} from "../../../../core/src/models/vote";
import {environment} from "../../environments/environment";
import {Candidate} from "../../../../core/src/models/candidate";
import {Comment} from "../../../../core/src/models/comment";

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  constructor(private cookieService: CookieService) {
    super();
  }

  async loginOrRegisterUser(code: string): Promise<Either<string, User>> {
    const response = await this.writeUser(code);
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

}
