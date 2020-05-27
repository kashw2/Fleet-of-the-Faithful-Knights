import {Component, OnInit} from "@angular/core";
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

  goToProfilePage(): void {
    this.viewStateService.setPageIndex(1);
  }

  isLoggedIn(): boolean {
    return this.userStateService
      .isLoggedIn();
  }

  ngOnInit(): void {
  }

}
