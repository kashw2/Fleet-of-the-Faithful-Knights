import {Component, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {OptionUtils, User, UserJsonSerializer} from "../../../../core";
import {LoginService} from "../../services/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }
  loggedIn: Option<User> = None;

  isLoggedIn(): boolean {
    return this.loggedIn
      .nonEmpty();
  }

  ngOnInit() {
    this.loginService.getUser()
      .subscribe(user => {
        this.loggedIn = OptionUtils.parseSerialised(user, UserJsonSerializer.instance);
    });
  }

}
