import {Injectable} from "@angular/core";
import {None, Option} from "funfix-core";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../core/src";

@Injectable({
  providedIn: "root",
})
export class UserStateService {

  constructor(private cookieService: CookieService) {
  }

  user: BehaviorSubject<Option<User>> = new BehaviorSubject(None);

  getCookieToken(): string {
    return this.cookieService.get("token");
  }

  getUser(): Option<User> {
    return this.user
      .getValue();
  }

  isCookieSet(): boolean {
    return this.cookieService.check("token");
  }

  isLoggedIn(): boolean {
    return this.getUser()
      .nonEmpty();
  }

}
