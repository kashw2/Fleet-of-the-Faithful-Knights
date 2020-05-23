import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {User} from "../../../../../core/src";
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
  ) {
    this.user = store.select("user");
  }

  user: Observable<User>;

  async ngOnInit(): Promise<void> {
    // If user is already logged in, take them to the profile page.
    if (this.cookieService.check("token")) {
      console.log("Already authenticated");
      this.router.navigate(["/profile"]);
      return;
    }
    const response = await this.ffkApi.loginUser(this.location.path().split("?code=")[1]);
    response.getAccessToken()
      .map(async token => {
        this.cookieService.set("token", token, 365);
        console.log(`Client - Server handshake authenticated, assigned token: ${token}`);
        this.store.dispatch(new AddUserAction(await this.ffkApi.getUserByToken(token)));
        this.ffkApi.getUserByToken(token);
        this.router.navigate(["/profile"]);
      });
  }

}
