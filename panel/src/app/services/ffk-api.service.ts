import {Injectable} from "@angular/core";
import {Either, Left} from "funfix-core";
import {CookieService} from "ngx-cookie-service";
import {FfkApi} from "../../../../core/src/apis/ffk-api";
import { User } from '@ffk/lib-ts';

@Injectable({
  providedIn: "root",
})
export class FfkApiService extends FfkApi {

  constructor(private cookieService: CookieService) {
    super();
  }

  protected getHeaders(): object {
    return {
    "X-Api-Token": this.cookieService.get("token"),
    }
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
