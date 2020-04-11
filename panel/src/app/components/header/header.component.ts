import {Component, OnInit} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
  ) {
  }

  isLoggedIn(): boolean {
    return this.cookieService.check("token");
  }

  ngOnInit(): void {
    return;
  }

}
