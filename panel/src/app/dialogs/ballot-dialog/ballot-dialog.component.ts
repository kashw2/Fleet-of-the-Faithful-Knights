import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {None, Option, Some} from "funfix-core";
import {Ballot, Vote} from "@kashw2/lib-ts";
import {OptionUtils} from "@kashw2/lib-util";
import {UserService} from "../../service/user.service";
import moment from "moment";
import {FfkApiService} from "../../service/ffk-api.service";
import {ToastService} from "../../service/toast.service";
import {VoteService} from "../../service/vote.service";

@Component({
  selector: 'app-ballot-dialog',
  templateUrl: './ballot-dialog.component.html',
  styleUrls: ['./ballot-dialog.component.scss']
})
export class BallotDialogComponent implements OnInit {

  constructor(
    private userService: UserService,
    readonly dialogRef: MatDialogRef<BallotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly vote: Option<Vote>,
    private ffkApiService: FfkApiService,
    private toastService: ToastService,
    private voteService: VoteService,
  ) {
  }

  canAffirm(): boolean {
    return this.isVotableByUserGroup()
      && this.vote.exists(v => v.getBallots().size < 4);
  }

  canDeny(): boolean {
    return this.isVotableByUserGroup()
      && this.vote.exists(v => v.getBallots().size < 4);
  }

  canVeto(): boolean {
    return this.isVotableByUserGroup()
      && this.vote.exists(v => v.getBallots().size < 4);
  }

  castBallot(
    type: number,
    description: string,
  ): void {
    const ballot = new Ballot(
      None,
      this.userService.getUser(),
      Option.of(description),
      Option.of(type),
      Some(moment()),
      Some(moment()),
    );
    this.getVoteId()
      .map(vid => this.toastService.showSequenceFuture(
        this.ffkApiService.writeBallot(ballot, vid),
        'Ballot Submitted',
        'Error',
        'Success',
      ))
      .forEach(() => this.voteService.setSelectedVote(this.voteService.getSelectedVote().map(v => v.withBallot(ballot))));
    this.dialogRef.close();
  }

  getCandidateUsername(): Option<string> {
    return this.vote.flatMap(v => v.getCandidateUsername());
  }

  private getVoteId(): Option<string> {
    return this.vote.flatMap(v => v.getId());
  }

  isVotableByUserGroup(): boolean {
    return OptionUtils.exists2(
      this.userService.getUser(),
      this.vote.flatMap(v => v.getPromotionGroup()),
      (u, vG) => u.getGroup().exists(uG => uG.isHigher(vG))
    );
  }

  ngOnInit(): void {
  }

}
