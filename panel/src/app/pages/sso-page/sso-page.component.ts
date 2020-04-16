import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";
import {tokenKey, User, UserJsonSerializer} from "../../../../../core/src";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {AddUserAction} from "../../store/actions/user-action";
import {AppState} from "../../store/state/app-state";

@Component({
  selector: "app-sso-page",
  templateUrl: "./sso-page.component.html",
  styleUrls: ["./sso-page.component.scss"],
})
export class SsoPageComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private ffkApi: FfkApiService,
    private cookieService: CookieService,
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.user = store.select("user");
  }

  user: Observable<User>;

  ngOnInit(): void {
    // If user is already logged in, take them to the profile page.
    if (this.cookieService.check("token")) {
      console.log("Already authenticated");
      this.router.navigate(["/profile"]);
      return;
    }

    this.http.get("http://localhost:8080".concat(`/user/register?code=${this.location.path().split("?code=")[1]}`))
      .subscribe(o => {
        const token = o[tokenKey];
        this.cookieService.set("token", token, 365);
        console.log(`Client - Server handshake authenticated, assigned token: ${token}`);
        this.ffkApi.read.getUserByToken(token)
          .subscribe(uo => {
            this.store.dispatch(new AddUserAction(UserJsonSerializer.instance.fromJson(uo)));
            this.router.navigate(["/profile"]);
            this.notificationService.showSuccessNotification("Handshake authenticated");
          });
      });
  }

}
