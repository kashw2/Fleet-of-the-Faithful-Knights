import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {None, Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../../../core/src";
import {News, NewsJsonSerializer} from "../../../../../core/src/models/news";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {AppState} from "../../store/state/app-state";

@Component({
  selector: "app-profile.page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private ffkApi: FfkApiService,
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private notificationService: NotificationService,
    private store: Store<AppState>,
  ) {
    this.store.select("user")
      .subscribe(user => this.user = Option.of(user));
  }

  news: List<News> = List();
  passedVotes: List<Vote> = List();

  user: Option<User> = None;
  votes: List<Vote> = List();

  getAvatarUrl(): Option<string> {
    return this.getUser()
      .flatMap(x => x.getAvatar());
  }

  getGroup(): Option<string> {
    return this.getUser()
      .flatMap(x => x.getGroup());
  }

  getLastVotes(amount: number): List<Vote> {
    return this.getVotes()
      .takeLast(amount);
  }

  getMemberSince(): Option<string> {
    return this.getUser()
      .flatMap(x => x.getMemberSince())
      .map(s => MomentUtils.formatString(s, "DMY"));
  }

  getNews(): List<News> {
    return this.news.take(3);
  }

  getUser(): Option<User> {
    return this.user;
  }

  getUserId(): Option<number> {
    return this.getUser()
      .flatMap(x => x.getId());
  }

  getUsername(): Option<string> {
    return this.getUser()
      .flatMap(x => x.getUsername());
  }

  getUserPassedVoteCount(): number {
    return this.passedVotes.size;
  }

  private getUserToken(): string {
    return this.cookieService.get("token");
  }

  getUserVoteCount(): number {
    return this.votes.size;
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  ngOnInit(): void {
    this.getUser()
      .flatMap(u => u.getId())
      .map(uid => {
        this.ffkApi.read.getVotesByUser(uid)
          .subscribe(votes => this.votes = this.votes.concat(VoteJsonSerializer.instance.fromObjectToList(votes)));
        this.ffkApi.read.getVoteByStatus(uid, "true")
          .subscribe(votes => this.passedVotes = this.passedVotes.concat(VoteJsonSerializer.instance.fromObjectToList(votes)));
      });
    this.ffkApi.read.getNews()
      .subscribe(news => this.news = this.news.concat(NewsJsonSerializer.instance.fromObjectToList(news)));
  }

  // TODO: Put this in a util class or something
  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
