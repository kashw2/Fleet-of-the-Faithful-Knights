import {Component, OnInit} from "@angular/core";
import {FfkApiService} from "../../services/ffk-api.service";
import {UserStateService} from "../../services/user-state.service";
import {NotificationService} from "../../services/notification.service";
import {Option, Some} from "funfix-core";
import {GroupUtils, User} from "../../../../../core/src";
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

  canViewSpecificAdminPanel(specifier: string): boolean {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .exists(g => GroupUtils.isGroupHigher(g, specifier))
  }

  getSelectedAdminPanelIndex(): Option<number> {
    return this.viewStateService
      .getSelectedAdminPanelIndex();
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

  isViewingDeveloperPanel(): boolean {
    return this.getSelectedAdminPanelIndex()
      .contains(0);
  }

  isViewingKnightPanel(): boolean {
    return this.getSelectedAdminPanelIndex()
      .contains(2);
  }

  isViewingSergeantPanel(): boolean {
    return this.getSelectedAdminPanelIndex()
      .contains(3);
  }

  isViewingSpecialPanel(): boolean {
    return this.getSelectedAdminPanelIndex()
      .contains(1);
  }

  ngOnInit(): void {
    this.populateUsers();
    this.populatePermissions();
  }

  private async populatePermissions(): Promise<void> {
    const permissions = await this.ffkApiService.listPermissions();
    this.notificationService.showNotificationBasedOnEitherEffector(permissions, values => `Loaded ${values.size} Permissions`)
      .map(ps => this.userStateService.permissions.next(ps));
  }

  private async populateUsers(): Promise<void> {
    const users = await this.ffkApiService.listUsers();
    this.notificationService.showNotificationBasedOnEitherEffector(users, values => `Loaded ${values.size} Users`)
      .map(us => this.userStateService.users.next(us));
  }

  updateSelectedAdminPanelIndex(panelIndex: number): void {
    this.viewStateService.selectedAdminPanelViewIndex.next(Some(panelIndex));
  }

  updateUser(user: User): void {
    this.viewStateService.selectedUser.next(Some(user));
  }

}
