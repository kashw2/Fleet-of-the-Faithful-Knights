import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private cookieService: CookieService,
    private notificationService: NotificationService,
  ) {
    this.ngOnInit();
  }

  title = "FFK Voting Panel";

  ngOnInit(): void {
    if (!this.cookieService.check("token")) {
      this.notificationService.showFailureNotification("Handshake was unobtainable");
    }
  }

}
