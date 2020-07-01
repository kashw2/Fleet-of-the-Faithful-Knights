import {Component, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {List} from "immutable";
import {CandidateJsonSerializer, User} from "../../../../../core/src";
import {Candidate} from "../../../../../core/src/models/candidate";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {UserStateService} from "../../services/user-state.service";
import {MDBModalRef} from "angular-bootstrap-md";
import {BehaviorSubject} from "rxjs";
import {FfkApiService} from "../../services/ffk-api.service";
import {Vote} from "../../../../../core/src/models/vote";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: "app-create-vote-modal",
  templateUrl: "./create-vote-modal.component.html",
  styleUrls: ["./create-vote-modal.component.scss"],
})
export class CreateVoteModalComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
    private notificationService: NotificationService,
    private modalRef: MDBModalRef,
    private ffkApi: FfkApiService,
  ) {
  }

  candidate: BehaviorSubject<Option<Candidate>> = new BehaviorSubject<Option<Candidate>>(None);
  notes: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);
  promotionGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  canCreateVoteForGroup(group: string): boolean {
    return this.getUserGroup()
      .exists(g => GroupUtils.isGroupHigher(g, group));
  }

  createVote(): void {
    Option.map4(
      this.getCandidate(),
      this.getUser(),
      this.getPromotionGroup(),
      this.getNotes(),
      async (candidate, sponsor, group, notes) => {
        const vote = await this.ffkApi.writeVote(Vote.forVoteCreation(candidate, sponsor, group, notes));
        this.notificationService.showNotificationBasedOnEitherEffector(vote, value => `Created Vote ${value}`)
        this.userStateService.candidates.next(this.getCandidates().push(candidate));
      })
  }

  getCandidate(): Option<Candidate> {
    return this.candidate
      .getValue();
  }

  getCandidates(): List<Candidate> {
    return this.userStateService
      .getCandidates();
  }

  getNotes(): Option<string> {
    return this.notes
      .getValue();
  }

  getPromotionGroup(): Option<string> {
    return this.promotionGroup
      .getValue();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  hide(): void {
    return this.modalRef.hide();
  }

  ngOnInit(): void {
  }

  updateCandidate(candidate: Candidate): void {
    this.candidate.next(Option.of(candidate));
  }

  updateCandidateViaSelect(event): void {
    const candidate = this.getCandidates()
      .find(c => c.getId().contains(+event.target.selectedOptions[0].dataset.value));
    this.candidate.next(Option.of(candidate));
  }

  updateNotes(event): void {
    this.notes.next(Option.of(event.target.value));
  }

  updatePromotionGroup(event): void {
    this.promotionGroup.next(Option.of(event.target.value));
  }

}
