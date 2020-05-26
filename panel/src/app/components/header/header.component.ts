import {Component, OnInit} from "@angular/core";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
  ) {
  }

  isLoggedIn(): boolean {
    return this.userStateService
      .isLoggedIn();
  }

  ngOnInit(): void {
  }

}
