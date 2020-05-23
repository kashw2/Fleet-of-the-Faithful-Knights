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
    private cookieService: CookieService,
    private ffkApi: FfkApiService,
    private store: Store<AppState>,
  ) {
  }

  title = "FFK Voting Panel";

  async ngOnInit(): Promise<void> {
    if (this.cookieService.check("token")) {
      const token = this.cookieService.get("token");
      this.store.dispatch(new AddUserAction(await this.ffkApi.getUserByToken(token)));
    }
  }

}
