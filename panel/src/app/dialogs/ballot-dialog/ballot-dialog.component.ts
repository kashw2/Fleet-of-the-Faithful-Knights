import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Option} from "funfix-core";
import {Vote} from "@kashw2/lib-ts";
import {OptionUtils} from "@kashw2/lib-util";
import {UserService} from "../../service/user.service";

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

  castBallot(type: string): void {
    this.dialogRef.close();
  }

  getCandidateUsername(): Option<string> {
    return this.vote.flatMap(v => v.getCandidateUsername());
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
