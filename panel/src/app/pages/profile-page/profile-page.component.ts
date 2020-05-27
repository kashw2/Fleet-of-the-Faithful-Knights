import {Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {List} from "immutable";
import {User} from "../../../../../core/src";
import {Vote} from "../../../../../core/src/models/vote";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {

  constructor(private userStateService: UserStateService) {
  }

  getAvatar(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getAvatar());
  }

  getGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  getId(): Option<number> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  getMemberSince(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getMemberSince())
      .map(d => MomentUtils.formatString(d, "DMYHM"));
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUsername(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getUsername());
  }

  getVotesCreated(): List<Vote> {
    return List.of(new Vote());
  }

  getVotesFailed(): List<Vote> {
    return List.of(new Vote());
  }

  getVotesPassed(): List<Vote> {
    return List.of(new Vote());
  }

  isCompanionAtArms(): boolean {
    return this.getGroup()
      .contains("Companion at Arms");
  }

  isDeveloper(): boolean {
    return this.getGroup()
      .contains("Developer");
  }

  isGrandMaster(): boolean {
    return this.getGroup()
      .contains("Grand Master");
  }

  isGuest(): boolean {
    return !this.isDeveloper()
      && !this.isGrandMaster()
      && !this.isMasterCommander()
      && !this.isKnightCommander()
      && !this.isKnightLieutenant()
      && !this.isKnight()
      && !this.isSergeantFirstClass()
      && !this.isSergeant()
      && !this.isSquire()
      && !this.isCompanionAtArms();
  }

  isKnight(): boolean {
    return this.getGroup()
      .contains("Knight");
  }

  isKnightCommander(): boolean {
    return this.getGroup()
      .contains("Knight Commander");
  }

  isKnightLieutenant(): boolean {
    return this.getGroup()
      .contains("Knight Lieutenant");
  }

  isMasterCommander(): boolean {
    return this.getGroup()
      .contains("Master Commander");
  }

  isSergeant(): boolean {
    return this.getGroup()
      .contains("Sergeant");
  }

  isSergeantFirstClass(): boolean {
    return this.getGroup()
      .contains("Sergeant First Class");
  }

  isSquire(): boolean {
    return this.getGroup()
      .contains("Squire");
  }

  ngOnInit(): void {
  }

}
