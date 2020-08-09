import {Component, isDevMode, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";
import {GroupUtils, User} from "@ffk/lib-ts";

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
      .exists(g => GroupUtils.isGroupHigher(g, group));
  }

  canViewAdminPanel(): boolean {
    return this.getUserGroup()
      .exists(g => GroupUtils.isGroupHigher(g, "Sergeant"));
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

  isDevMode(): boolean {
    return isDevMode();
  }

  isLoggedIn(): boolean {
    return this.userStateService
      .isLoggedIn();
  }

  isProdMode(): boolean {
    return !this.isDevMode();
  }

  ngOnInit(): void {
  }

}
