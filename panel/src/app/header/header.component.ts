import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  isLoggedIn(): boolean {
    return true;
  }

  ngOnInit() {
  }

}
