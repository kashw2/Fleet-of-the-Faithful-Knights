import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {repeat} from "rxjs/operators";
import {User, UserJsonSerializer} from "../../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";

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
  ) {
  }
  passedVotes: List<Vote> = List();

  user: User;
  votes: List<Vote> = List();

  getAvatarUrl(): Option<string> {
    return this.user.getAvatar();
  }

  getGroup(): Option<string> {
    return this.user.getGroup();
  }

  getMemberSince(): Option<string> {
    return this.user.getMemberSince()
      .map(s => MomentUtils.formatString(s, "DMY"));
  }

  getUserId(): Option<number> {
    return this.user.getId();
  }

  getUsername(): Option<string> {
    return this.user.getUsername();
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

  getVoteDate(date: string): string {
    return MomentUtils.formatString(date, "DMYHM");
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  ngOnInit(): void {
    this.ffkApi.read.getUserByToken(this.getUserToken())
      .subscribe(user => {
        this.user = UserJsonSerializer.instance.fromJson(user);
        this.getUserId()
          .map(uid => {
            this.ffkApi.read.getVotesByUser(uid)
              .subscribe(votes => this.votes = this.votes.concat(VoteJsonSerializer.instance.fromObjectToList(votes)));
            this.ffkApi.read.getVoteByStatus(uid, "true")
              .subscribe(votes => this.passedVotes = this.passedVotes.concat(VoteJsonSerializer.instance.fromObjectToList(votes)));
          });
      });
  }

}
