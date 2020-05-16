import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {MDBModalService} from "angular-bootstrap-md";
import {None, Option, Some} from "funfix-core";
import {List, Set} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {debounce, debounceTime} from "rxjs/operators";
import {User} from "../../../../../core/src";
import {Candidate} from "../../../../../core/src/models/candidate";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {AppState} from "../../store/state/app-state";
import {Voter} from "../../../../../core/src/models/voter";

@Component({
  selector: "app-vote-page",
  templateUrl: "./vote-page.component.html",
  styleUrls: ["./vote-page.component.scss"],
})
export class VotePageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private ffkApi: FfkApiService,
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    route.paramMap.subscribe(params => this.voteId = Option.of(+params.get("id")!));
    this.store.select("user").subscribe(user => this.user = Option.of(user));
  }

  selectedTab: BehaviorSubject<Option<number>> = new BehaviorSubject(Some(1));

  user: Option<User> = None;

  vote: Option<Vote> = None;

  voteId: Option<number> = None;

  getVoters(): Set<Voter> {
    return this.getVote()
      .map(v => v.getVoters())
      .getOrElse(Set());
  }

  canAffirm(): boolean {
    return this.getVote()
      .flatMap(v => v.getStatus())
      .contains(false)
  }

  canDeny(): boolean {
    return this.getVote()
      .flatMap(v => v.getStatus())
      .contains(false);
  }

  getCandidateGroup(): Option<string> {
    return this.getVoteCandidate()
      .flatMap(c => c.getGroup());
  }

  getCandidateMembershipDate(): Option<string> {
    return this.getVoteCandidate()
      .flatMap(c => c.getSanitizedMemberSince());
  }

  getCandidateName(): Option<string> {
    return this.getVoteCandidate()
      .flatMap(c => c.getSanitizedDiscordUsername());
  }

  getSelectedTab(): Option<number> {
    return this.selectedTab
      .getValue();
  }

  getUser(): Option<User> {
    return this.user;
  }

  getUserId(): Option<number> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  getVote(): Option<Vote> {
    return this.vote;
  }

  getVoteCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getVoteDate(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getCreatedDate());
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .flatMap(v => v.getId());
  }

  getVoteNotes(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getNotes());
  }

  getVotePromotionRole(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getGroup());
  }

  getVoteSponsor(): Option<User> {
    return this.getVote()
      .flatMap(v => v.getSponsor());
  }

  getVoteSponsorName(): Option<string> {
    return this.getVoteSponsor()
      .flatMap(s => s.getUsername());
  }

  hasVotePassed(): boolean {
    return this.getVote()
      .flatMap(v => v.getStatus())
      .getOrElse(false);
  }

  isDiscordTabSelected(): boolean {
    return this.getSelectedTab()
      .contains(2);
  }

  isStarCitizenTabSelected(): boolean {
    return this.getSelectedTab()
      .contains(3);
  }

  isTabNotSelected(): boolean {
    return this.getSelectedTab()
      .contains(0);
  }

  isVotingTabSelected(): boolean {
    return this.getSelectedTab()
      .contains(1);
  }

  ngOnInit(): void {
    if (!this.cookieService.check("token")) {
      this.router.navigate(["/profile"]);
    }
    this.voteId.map(vid => {
      this.ffkApi.read.getVoteById(vid)
        .subscribe(v => this.vote = Option.of(VoteJsonSerializer.instance.fromJson(v)));
    });
  }

  setSelectedTab(tabId: number): void {
    this.selectedTab.next(Some(tabId));
  }

  submitResponse(response: string): void {
    Option.map2(this.getUserId(), this.getVoteId(), (uid, vid) => {
      this.ffkApi.write.writeVoteResponse(vid, uid, response)
        .pipe(debounceTime(300))
        .subscribe(x => this.notificationService.showSuccessNotification("Vote submitted"));
    });
  }

  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
