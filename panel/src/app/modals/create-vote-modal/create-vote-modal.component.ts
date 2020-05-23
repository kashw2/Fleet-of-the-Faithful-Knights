import {Component, Input, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {MDBModalRef} from "angular-bootstrap-md";
import {None, Option, Some} from "funfix-core";
import {List, Set} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {fromEvent} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
import {idKey, User} from "../../../../../core/src";
import {Candidate, CandidateJsonSerializer} from "../../../../../core/src/models/candidate";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {AppState} from "../../store/state/app-state";

@Component({
  selector: "app-create-vote-modal",
  templateUrl: "./create-vote-modal.component.html",
  styleUrls: ["./create-vote-modal.component.scss"],
})
export class CreateVoteModalComponent implements OnInit {

  constructor(
    private modalRef: MDBModalRef,
    private cookieService: CookieService,
    private ffkApi: FfkApiService,
    private notificationService: NotificationService,
    private store: Store<AppState>,
  ) {
    this.store.select("user")
      .subscribe(user => this.user = Option.of(user));
  }

  candidate: Candidate;
  candidates: List<Candidate> = List();
  candidateName: string;
  candidatePromotionGroup: string;
  user: Option<User> = None;
  voteNotes: string;

  private buildVote(): Vote {
    return new Vote(
      None,
      this.getUser(),
      Some(this.candidate),
      Some(this.candidatePromotionGroup),
      Some(this.voteNotes),
    );
  }

  getCandidates(): List<Candidate> {
    return this.candidates;
  }

  getUser(): Option<User> {
    return this.user;
  }

  hideModal(): void {
    this.modalRef.hide();
  }

  ngOnInit(): void {
  }

  submitVote(): void {
    this.ffkApi.writeVoteForUser(this.buildVote());
    this.modalRef.hide();
  }

}
