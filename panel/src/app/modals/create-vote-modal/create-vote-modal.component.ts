import {Component, OnInit} from "@angular/core";
import {MDBModalRef} from "angular-bootstrap-md";
import {None, Some} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {fromEvent} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
import {idKey, User, UserJsonSerializer} from "../../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";

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
  ) {
  }

  candidateName: string;
  candidatePromotionGroup: string;
  user: User;
  voteNotes: string;

  private buildVote(): Vote {
    return new Vote(
      None,
      Some(this.getUser()),
      Some(this.candidateName),
      Some(this.candidatePromotionGroup),
      Some(this.voteNotes),
      List(),
      None,
    );
  }

  getUser(): User {
    return this.user;
  }

  private getUserToken(): string {
    return this.cookieService.get("token");
  }

  ngOnInit(): void {
    this.ffkApi.read.getUserByToken(this.getUserToken())
      .subscribe(x => this.user = UserJsonSerializer.instance.fromJson(x));
  }

  submitVote(event): void {
    fromEvent(event.target, "click")
      .pipe(debounceTime(500))
      .pipe(x => this.ffkApi.write.writeVote(VoteJsonSerializer.instance.toJsonImpl(this.buildVote())))
      .pipe(tap(this.modalRef.hide))
      .subscribe(x => this.notificationService.showSuccessNotification(`Vote ${x[idKey]} successfully created`, "Success", 2350));
  }

}
