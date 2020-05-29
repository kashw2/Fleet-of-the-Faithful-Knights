import {Injectable} from "@angular/core";
import {None, Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../core/src";
import {News} from "../../../../core/src/models/news";
import {Vote} from "../../../../core/src/models/vote";

@Injectable({
  providedIn: "root",
})
export class UserStateService {

  constructor(private cookieService: CookieService) {
  }

  news: BehaviorSubject<List<News>> = new BehaviorSubject<List<News>>(List());
  user: BehaviorSubject<Option<User>> = new BehaviorSubject<Option<User>>(None);
  votes: BehaviorSubject<List<Vote>> = new BehaviorSubject<List<Vote>>(List());

  getCookieToken(): string {
    return this.cookieService.get("token");
  }

  getNews(): List<News> {
    return this.news
      .getValue();
  }

  getUser(): Option<User> {
    return this.user
      .getValue();
  }

  getVotes(): List<Vote> {
    return this.votes
      .getValue();
  }

  isCookieSet(): boolean {
    return this.cookieService.check("token");
  }

  isLoggedIn(): boolean {
    return this.getUser()
      .nonEmpty();
  }

}
