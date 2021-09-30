import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Option} from "funfix-core";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly user: any,
  ) { }

  getAvatar(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getFormedDiscordAvatar());
  }

  getGroupName(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getLabel());
  }

  getMemberSince(): Option<Date> {
    return this.getUser()
      .flatMap(u => u.getMemberSince())
      .map(m => m.toDate());
  }

  private getUser(): Option<User> {
    return UserJsonSerializer.instance.fromJsonImpl(this.user);
  }

  getUsername(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getUsername());
  }

  ngOnInit(): void {
  }

}
