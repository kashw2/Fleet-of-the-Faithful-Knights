import {Component, OnInit} from "@angular/core";
import {FfkApiService} from "../../services/ffk-api.service";
import {UserStateService} from "../../services/user-state.service";
import {NotificationService} from "../../services/notification.service";
import {Option, Some} from "funfix-core";
import {User} from "../../../../../core/src";
import {List} from "immutable";
import {ViewStateService} from "../../services/view-state.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"]
})
export class AdminPageComponent implements OnInit {

  constructor(
    private ffkApiService: FfkApiService,
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
    private notificationService: NotificationService,
  ) {
  }

  canViewDeveloperTab(): boolean {
    return false;
    // return this.getUser()
    //   .exists(u => u.isDeveloper());
  }

  getSelectedUser(): Option<User> {
    return this.viewStateService
      .getSelectedUser();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser()
  }

  getUsername(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getUsername());
  }

  getUsers(): List<User> {
    return this.userStateService
      .getUsers()
  }

  ngOnInit(): void {
    this.populateUsers()
  }

  private async populateUsers(): Promise<void> {
    const users = await this.ffkApiService.listUsers();
    this.notificationService.showNotificationBasedOnEitherEffector(users, values => `Loaded ${values.size} Users`)
      .map(us => this.userStateService.users.next(us));
  }

  updateUser(user: User): void {
    this.viewStateService.selectedUser.next(Some(user));
  }

}
