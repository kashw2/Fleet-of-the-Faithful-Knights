import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {UserService} from "../../service/user.service";
import {Option} from "funfix-core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    readonly navigationService: NavigationService,
    readonly userService: UserService,
    ) { }

  getUserAvatar(): Option<string> {
    return this.userService
      .getUser()
      .flatMap(u => u.getFormedDiscordAvatar());
  }

  ngOnInit(): void {
  }

}
