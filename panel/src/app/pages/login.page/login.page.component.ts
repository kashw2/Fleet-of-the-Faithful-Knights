import {Component, OnInit} from "@angular/core";
import {Option, Some} from "funfix-core";
import * as moment from "moment";

@Component({
  selector: "app-login.page",
  templateUrl: "./login.page.component.html",
  styleUrls: ["./login.page.component.scss"],
})
export class LoginPageComponent implements OnInit {

  constructor() {
  }

  getAvatarUrl(): Option<string> {
    return Some("/avatars/178140794555727872/622a00e00fd648671031e604fd024619.png");
  }

  getGroup(): Option<string> {
    return Some("Developer");
  }

  getMemberSince(): Option<string> {
    return Some(moment("2020-04-04 03:05:28.8400000")
      .format("D/M/YY"));
  }

  getUsername(): Option<string> {
    return Some("Keanu");
  }

  ngOnInit(): void {
  }

}
