import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Option} from "funfix-core";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {FfkApiService} from "../../service/ffk-api.service";
import {UserService} from "../../service/user.service";
import {CrudLocalStorageService} from "../../service/crud.service";

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly user: any,
    private ffkApiService: FfkApiService,
    private userService: UserService,
    private crudLocalStorageService: CrudLocalStorageService,
    private dialogRef: MatDialogRef<ProfileDialogComponent>
  ) {
  }

  deleteUser(): void {
    this.getId()
      .map(id => this.ffkApiService.deleteUser(id));
    if (this.getId().equals(this.userService.getUser().flatMap(u => u.getId()))) {
      this.crudLocalStorageService.delete('discordid');
      this.userService.clear();
    }
    this.dialogRef.close();
  }

  getAvatar(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getFormedDiscordAvatar());
  }

  getGroupName(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getLabel());
  }

  getId(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getId());
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
