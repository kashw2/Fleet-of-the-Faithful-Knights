import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {tokenKey} from "../../../../../core/src";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private cookieService: CookieService,
    private notificationService: NotificationService,
  ) {
  }

  isLoggedIn(): boolean {
    return this.cookieService.check("token");
  }

  ngOnInit(): void {
    if (!this.cookieService.check("token")) {
      this.http.get("http://localhost:8080".concat(`/user/register?code=${this.location.path().split("?code=")[1]}`))
        .subscribe(x => {
          // Set a cookie for 1 year
          this.cookieService.set("token", x[tokenKey], 365);
          if (this.cookieService.check("token")) {
          console.log(`Client - Server handshake authenticated, assigned token: ${x[tokenKey]}`);
          this.notificationService.showSuccessNotification("Handshake authenticated", "Success", 2000);

          } else {
            this.notificationService.showFailureNotification("Handshake was unobtainable");
          }
          return;
        });
    } else {
      console.log(`Client - Server handshake authenticated, assigned token ${this.cookieService.get("token")}`);
      this.notificationService.showSuccessNotification("Handshake authenticated", "Success", 2000);
      return;
    }
  }

}
