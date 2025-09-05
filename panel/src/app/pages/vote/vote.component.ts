import {Component, OnInit} from '@angular/core';
import {VoteService} from "../../service/vote.service";
import {Option} from "funfix-core";
import {Ballot} from "@kashw2/lib-ts";
import {Set} from 'immutable';
import {MatDialog} from "@angular/material/dialog";
import {BallotDialogComponent} from "../../dialogs/ballot-dialog/ballot-dialog.component";

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.scss'],
    standalone: false
})
export class VoteComponent implements OnInit {

  constructor(
    readonly voteService: VoteService,
    private dialog: MatDialog,
  ) {
  }

  getBallots(): Set<Ballot> {
    return this.voteService
      .getSelectedVote()
      .map(v => v.getBallots())
      .getOrElse(Set());
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
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getCandidate())
      .flatMap(c => c.getFormedDiscordAvatar());
  }

  getVoteDescription(): Option<string> {
    return this.voteService.getSelectedVote()
      .flatMap(v => v.getDescription());
  }

  hasBeenVetod(): boolean {
    return this.voteService.getSelectedVote()
      .map(v => v.getBallots())
      .getOrElse(Set<Ballot>())
      .some(b => b.getPreparedResponse().contains('Veto'));
  }

  isVotable(): boolean {
    if (this.hasBeenVetod()) {
      return false;
    }
    if (this.voteService.getSelectedVote().exists(v => v.isKnightLike())) {
      return this.voteService.getSelectedVote()
        .exists(v => v.getBallots().size < 4);
    }
    if (this.voteService.getSelectedVote().exists(v => v.isSergeantLike())) {
      return this.voteService.getSelectedVote()
        .exists(v => v.getBallots().size < 3);
    }
    return false;
  }

  ngOnInit(): void {
  }

  openBallotDialog(): void {
    this.dialog.open(BallotDialogComponent, {
      width: '350px',
      autoFocus: true,
      data: this.voteService.getSelectedVote()
    });
  }

}
