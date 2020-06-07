import {Component, OnInit} from "@angular/core";
import {ViewStateService} from "../../services/view-state.service";
import {None, Option, Some} from "funfix-core";
import {Vote} from "../../../../../core/src/models/vote";
import {UserStateService} from "../../services/user-state.service";
import {List} from "immutable";
import {Comment} from "../../../../../core/src/models/comment";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";
import {BehaviorSubject} from "rxjs";
import {FfkApiService} from "../../services/ffk-api.service";
import {User} from "../../../../../core/src";
import {NotificationService} from "../../services/notification.service";
import {Candidate} from "../../../../../core/src/models/candidate";

@Component({
  selector: "app-candidate-extra-info-container",
  templateUrl: "./candidate-extra-info-container.component.html",
  styleUrls: ["./candidate-extra-info-container.component.scss"]
})
export class CandidateExtraInfoContainerComponent implements OnInit {

  constructor(
    private viewStateService: ViewStateService,
    private userStateService: UserStateService,
    private notificationService: NotificationService,
    private ffkApi: FfkApiService,
  ) {
  }

  comment: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  authorExtractor = (c: Comment) => c.getUsername();

  dateExtractor = (c: Comment) => c.getCreatedDate().map(d => MomentUtils.formatString(d, "DMYHM"));

  getCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getCandidateExtraInfoViewIndex(): Option<number> {
    return this.viewStateService
      .getSelectedCandidateExtraInfoViewIndex();
  }

  getCandidateUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getComment(): Option<string> {
    return this.comment
      .getValue();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getVote(): Option<Vote> {
    return this.viewStateService.getSelectedVote();
  }

  getVoteComments(): List<Comment> {
    return this.getVote()
      .map(v => v.getComments())
      .getOrElse(List());
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .flatMap(v => v.getId());
  }

  isCommentSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(1);
  }

  isDiscordSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(2);
  }

  isStarCitizenSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(3);
  }

  messageExtractor = (c: Comment) => c.getContent();

  ngOnInit(): void {
  }

  setCandidateExtraInfoViewIndex(index: number): void {
    this.viewStateService.setSelectedCandidateExtraInfoViewIndex(index);
  }

  updateComment(event): void {
    this.comment.next(Some(event.target.value));
  }

  writeComment(): void {
    Option.map4(
      this.getComment(),
      this.getUser(),
      this.getVoteId(),
      this.getCandidateUsername(),
      async (comment, user, vid, candidate) => {
      const vote = await this.ffkApi.writeVoteComment(Comment.forCommentWriting(comment, user), vid);
      this.notificationService.showNotificationBaseOnEitherEffector(vote, () => `Successfully Commented On ${candidate}'s Vote`);
    });
  }

}
