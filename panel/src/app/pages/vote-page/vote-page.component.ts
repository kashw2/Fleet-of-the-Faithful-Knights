import {Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {Vote} from "../../../../../core/src/models/vote";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";
import {Candidate} from "../../../../../core/src/models/candidate";
import {OptionUtils, User} from "../../../../../core/src";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {List, Set} from "immutable";
import {Voter} from "../../../../../core/src/models/voter";

@Component({
  selector: "app-vote-page",
  templateUrl: "./vote-page.component.html",
  styleUrls: ["./vote-page.component.scss"]
})
export class VotePageComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
    private notificationService: NotificationService,
    private ffkApi: FfkApiService,
  ) {
  }

  canAffirm(): boolean {
    if (this.isKnightVote() && !this.hasVotePassed()) {
      return Option.map2(this.getVoteGroup(), this.getUserGroup(), (vg, ug) => {
        return GroupUtils.isGroupHigher(ug, vg)
          && this.getVoters()
            .filter(v => v.didAffirm())
            .size < 5;
      }).getOrElse(false)
    }
    if (this.isSergeantVote() && !this.hasVotePassed()) {
      return Option.map2(this.getVoteGroup(), this.getUserGroup(), (vg, ug) => {
        return GroupUtils.isGroupHigher(ug, vg)
          && this.getVoters()
            .filter(v => v.didAffirm())
            .size < 4;
      }).getOrElse(false);
    }
    return Option.map2(this.getVoteGroup(), this.getUserGroup(), (vg, ug) => {
      return GroupUtils.isGroupHigher(ug, vg)
        && this.getVoters()
          .filter(v => v.didAffirm())
          .size < 4;
    }).getOrElse(false)
  }

  canDeny(): boolean {
    if (this.isKnightVote() && !this.hasVotePassed()) {
      return this.getVoters()
        .filter(v => v.didDeny())
        .size < 4;
    }
    if (this.isSergeantVote() && !this.hasVotePassed()) {
      return this.getVoters()
        .filter(v => v.didDeny())
        .size < 4;
    }
    return this.getVoters()
      .filter(v => v.didDeny())
      .size < 4;
  }

  private getCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getCandidateAvatar(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getAvatar());
  }

  getCandidateGroup(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getGroup());
  }

  getCandidateMembershipDate(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getMemberSince())
      .map(d => MomentUtils.formatString(d, "DMYHM"));
  }

  getCandidateName(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  private getSponsor(): Option<User> {
    return this.getVote()
      .flatMap(v => v.getSponsor());
  }

  getSponsorUsername(): Option<string> {
    return this.getSponsor()
      .flatMap(s => s.getUsername());
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  getUserId(): Option<number> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  private getVote(): Option<Vote> {
    return this.viewStateService
      .getSelectedVote()
  }

  getVoteGroup(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getGroup());
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .flatMap(v => v.getId());
  }

  getVoteNotes(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getNotes());
  }

  getVoters(): Set<Voter> {
    return this.getVote()
      .map(v => v.getVoters())
      .getOrElse(Set());
  }

  hasVotePassed(): boolean {
    return this.getVote()
      .map(v => v.hasPassed())
      .getOrElse(false);
  }

  isDemotion(): boolean {
    return OptionUtils.exists2(this.getCandidateGroup(), this.getVoteGroup(), (cg, vg) => {
      return GroupUtils.isGroupLower(vg, cg);
    })
  }

  isKnightVote(): boolean {
    return this.getVote()
      .exists(v => v.shouldBeInKnightVoting())
  }

  isPromotion(): boolean {
    return OptionUtils.exists2(this.getCandidateGroup(), this.getVoteGroup(), (cg, vg) => {
      return GroupUtils.isGroupHigher(vg, cg);
    })
  }

  isSergeantVote(): boolean {
    return this.getVote()
      .exists(v => v.shouldBeInSergeantVoting())
  }

  ngOnInit(): void {
  }

  submitVoteResponse(response: "Y" | "N"): void {
    Option.map2(this.getUserId(), this.getVoteId(), async (uid, vid) => {
      const res = await this.ffkApi.writeResponse(vid, response);
      this.notificationService.showNotificationBasedOnEither(res, "Vote Submitted");
    })
  }

}
