import { Component, OnInit } from "@angular/core";
import {List} from "immutable";
import {User} from "../../../../../core/src";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-developer-panel",
  templateUrl: "./developer-panel.component.html",
  styleUrls: ["./developer-panel.component.scss"]
})
export class DeveloperPanelComponent implements OnInit {

  constructor(private userStateService: UserStateService) { }

  getUsers(): List<User> {
    return this.userStateService
      .getUsers()
  }

  ngOnInit(): void {
  }

}
