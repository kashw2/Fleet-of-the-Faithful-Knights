import {Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {User} from "../../../../../core/src";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
  ) {
  }

  canUserViewVoteSection(group: string): boolean {
    return this.getUserGroup()
      .map(g => GroupUtils.isGroupHigher(g, group))
      .getOrElse(false);
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  goToAdminPage(): void {
    this.viewStateService.setPageIndex(4);
  }

  goToProfilePage(): void {
    this.viewStateService.setPageIndex(1);
  }

  goToVotesPage(type: string): void {
    this.viewStateService.setPageIndex(2);
    this.viewStateService.setVotePageType(type);
  }

  isLoggedIn(): boolean {
    return this.userStateService
      .isLoggedIn();
  }

  ngOnInit(): void {
  }

}
