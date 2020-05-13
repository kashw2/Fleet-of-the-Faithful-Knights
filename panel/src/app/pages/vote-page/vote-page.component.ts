import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {MDBModalService} from "angular-bootstrap-md";
import {None, Option, Some} from "funfix-core";
import {Set} from "immutable";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../../core/src";
import {Candidate} from "../../../../../core/src/models/candidate";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {AppState} from "../../store/state/app-state";

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
  ) {
    route.paramMap.subscribe(params => this.voteId = Option.of(+params.get("id")!));
    this.store.select("user").subscribe(user => this.user = Option.of(user));
  }

  selectedTab: BehaviorSubject<Option<number>> = new BehaviorSubject(Some(0));

  user: Option<User> = None;

  vote: Option<Vote> = None;

  voteId: Option<number> = None;

  canVote(): boolean {
    return true;
  }

  getUser(): Option<User> {
    return this.user;
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

  getVoters(): Set<User> {
    return this.getVote()
      .map(v => v.getVoters())
      .getOrElse(Set());
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
    this.voteId.map(vid => {
      this.ffkApi.read.getVoteById(vid)
        .subscribe(v => this.vote = Option.of(VoteJsonSerializer.instance.fromJson(v)));
    });
  }

  setSelectedTab(tabId: number): void {
    this.selectedTab.next(Some(tabId));
  }

  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
