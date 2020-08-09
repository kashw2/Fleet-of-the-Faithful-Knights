import {Injectable} from "@angular/core";
import {None, Option} from "funfix-core";
import {List, Set} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {Candidate, DiscordMessage, Enum, News, User, Vote} from "@ffk/lib-ts";

@Injectable({
  providedIn: "root",
})
export class UserStateService {

  constructor(private cookieService: CookieService) {
  }

  candidates: BehaviorSubject<List<Candidate>> = new BehaviorSubject<List<Candidate>>(List());
  discordMessages: BehaviorSubject<List<DiscordMessage>> = new BehaviorSubject<List<DiscordMessage>>(List());
  groups: BehaviorSubject<Set<Enum>> = new BehaviorSubject<Set<Enum>>(Set());
  news: BehaviorSubject<List<News>> = new BehaviorSubject<List<News>>(List());
  permissions: BehaviorSubject<Set<Enum>> = new BehaviorSubject<Set<Enum>>(Set());
  user: BehaviorSubject<Option<User>> = new BehaviorSubject<Option<User>>(None);
  users: BehaviorSubject<List<User>> = new BehaviorSubject<List<User>>(List());
  votes: BehaviorSubject<List<Vote>> = new BehaviorSubject<List<Vote>>(List());

  getCandidates(): List<Candidate> {
    return this.candidates
      .getValue();
  }

  getCookieToken(): string {
    return this.cookieService.get("token");
  }

  getDiscordMessages(): List<DiscordMessage> {
    return this.discordMessages
      .getValue();
  }

  getGroups(): Set<Enum> {
    return this.groups
      .getValue();
  }

  getNews(): List<News> {
    return this.news
      .getValue();
  }

  getPermissions(): Set<Enum> {
    return this.permissions
      .getValue();
  }

  getUser(): Option<User> {
    return this.user
      .getValue();
  }

  getUsers(): List<User> {
    return this.users
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
