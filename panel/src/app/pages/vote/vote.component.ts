import {Component, OnInit} from '@angular/core';
import {VoteService} from "../../service/vote.service";
import {Option} from "funfix-core";
import {Ballot} from "@kashw2/lib-ts";
import {Set} from 'immutable';
import {UserService} from "../../service/user.service";
import {OptionUtils} from "@kashw2/lib-util";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(
    readonly voteService: VoteService,
    private userService: UserService,
  ) {
  }

  canAffirm(): boolean {
    return this.isVotableByUserGroup()
      && this.voteService.getSelectedVote()
        .exists(v => v.getBallots().size < 4);
  }

  canDeny(): boolean {
    return this.isVotableByUserGroup()
      && this.voteService.getSelectedVote()
        .exists(v => v.getBallots().size < 4);
  }

  canVeto(): boolean {
    return this.isVotableByUserGroup()
      && this.voteService.getSelectedVote()
        .exists(v => v.getBallots().size < 4);
  }

  getBallots(): Set<Ballot> {
    return this.voteService
      .getSelectedVote()
      .map(v => v.getBallots())
      .getOrElse(Set());
  }

  getCandidateAvatar(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getCandidate())
      .flatMap(v => v.getAvatar());
  }

  getCandidateDiscordId(): Option<string> {
    return this.voteService
      .getSelectedVote()
      .flatMap(v => v.getCandidate())
      .flatMap(c => c.getDiscordId());
  }

  getCandidateGroup(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getCandidateGroupName());
  }

  getCandidatePromotionGroup(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getPromotionGroupName());
  }

  getCandidateUsername(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getCandidateUsername());
  }

  getFormattedCandidateAvatar(): Option<string> {
    return Option.map2(
      this.getCandidateDiscordId(),
      this.getCandidateAvatar(),
      (did, avatar) => `https://cdn.discordapp.com/avatars/${did}/${avatar}.png`,
    );
  }

  getVoteDescription(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getDescription());
  }

  isVotableByUserGroup(): boolean {
    return OptionUtils.exists2(
      this.userService.getUser(),
      this.voteService.getSelectedVote().flatMap(v => v.getPromotionGroup()),
      (u, vG) => u.getGroup().exists(uG => uG.isHigher(vG))
    );
  }

  ngOnInit(): void {
  }

}
