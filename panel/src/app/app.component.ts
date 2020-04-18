import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {UserJsonSerializer} from "../../../core/src";
import {FfkApiService} from "./services/ffk-api.service";
import {NotificationService} from "./services/notification.service";
import {AddUserAction} from "./store/actions/user-action";
import {AppState} from "./store/state/app-state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private cookieService: CookieService,
    private notificationService: NotificationService,
    private ffkApi: FfkApiService,
    private store: Store<AppState>,
  ) {
  }

  title = "FFK Voting Panel";

  ngOnInit(): void {
    if (this.cookieService.check("token")) {
      const token = this.cookieService.get("token");
      this.ffkApi.read.getUserByToken(token)
        .subscribe(user => this.store.dispatch(new AddUserAction(UserJsonSerializer.instance.fromJson(user))));
    }
  }

}
