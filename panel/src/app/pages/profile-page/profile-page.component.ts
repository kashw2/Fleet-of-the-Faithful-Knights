import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {None, Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../../../core/src";
import {News} from "../../../../../core/src/models/news";
import {Vote} from "../../../../../core/src/models/vote";
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

  getUserVoteCount(): number {
    return this.votes.size;
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  isCompanionAtArms(): boolean {
    return this.getUser()
      .map(x => x.isCompanionAtArms())
      .getOrElse(false);
  }

  isDeveloper(): boolean {
    return this.getUser()
      .map(x => x.isDeveloper())
      .getOrElse(false);
  }

  isGrandMaster(): boolean {
    return this.getUser()
      .map(x => x.isGrandMaster())
      .getOrElse(false);
  }

  isGuest(): boolean {
    return this.getUser()
      .map(x => x.isGuest())
      .getOrElse(false);
  }

  isKnight(): boolean {
    return this.getUser()
      .map(x => x.isKnight())
      .getOrElse(false);
  }

  isKnightCommander(): boolean {
    return this.getUser()
      .map(x => x.isKnightCommander())
      .getOrElse(false);
  }

  isKnightLieutenant(): boolean {
    return this.getUser()
      .map(x => x.isKnightLieutenant())
      .getOrElse(false);
  }

  isMasterCommander(): boolean {
    return this.getUser()
      .map(x => x.isMasterCommander())
      .getOrElse(false);
  }

  isSergeant(): boolean {
    return this.getUser()
      .map(x => x.isSergeant())
      .getOrElse(false);
  }

  isSergeantFirstClass(): boolean {
    return this.getUser()
      .map(x => x.isSergeantFirstClass())
      .getOrElse(false);
  }

  isSquire(): boolean {
    return this.getUser()
      .map(x => x.isSquire())
      .getOrElse(false);
  }

  async ngOnInit(): Promise<void> {
    this.store.select("user")
      .subscribe(user => {
        this.user = Option.of(user);
        this.getUser()
          .flatMap(u => u.getId())
          .map(async uid => {
            this.votes = await this.ffkApi.getVotesByUser(uid);
            this.passedVotes = await this.ffkApi.getVotesByStatus(uid, true);
          });
      });
    this.news = await this.ffkApi.getNews();
  }

  // TODO: Put this in a util class or something
  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
