import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {UserService} from "../../service/user.service";
import {Option} from "funfix-core";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
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

  signIn(): void {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=607005043043860521&permissions=0&redirect_uri=${encodeURIComponent(environment.DISCORD_REDIRECT_URI)}&response_type=code&scope=identify%20guilds%20bot`;
  }

}
