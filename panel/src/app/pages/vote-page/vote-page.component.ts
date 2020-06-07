import {Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {Vote} from "../../../../../core/src/models/vote";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";
import {Candidate} from "../../../../../core/src/models/candidate";
import {OptionUtils, User} from "../../../../../core/src";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";

@Component({
  selector: "app-vote-page",
  templateUrl: "./vote-page.component.html",
  styleUrls: ["./vote-page.component.scss"]
})
export class VotePageComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
  ) {
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

  isDemotion(): boolean {
    return OptionUtils.exists2(this.getCandidateGroup(), this.getVoteGroup(), (cg, vg) => {
      return GroupUtils.isGroupLower(vg, cg);
    })
  }

  isPromotion(): boolean {
    return OptionUtils.exists2(this.getCandidateGroup(), this.getVoteGroup(), (cg, vg) => {
      return GroupUtils.isGroupHigher(vg, cg);
    })
  }

  ngOnInit(): void {
  }

}
