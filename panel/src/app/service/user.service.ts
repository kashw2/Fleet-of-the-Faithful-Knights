import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {None, Option} from 'funfix-core';
import {User} from '@kashw2/lib-ts';
import {ToastService} from "./toast.service";
import {FfkApiService} from "./ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private ffkApiService: FfkApiService,
    private toastService: ToastService,
  ) {
    this.ffkApiService.getUser()
      .then(u => {
        if (u.isLeft()) {
          this.toastService.show(
            u.value,
            "Error",
          );
          return;
        }

        /**
         * TODO: There seems to be a bug here where either the API is returning a new User if one isn't found
         * or our sendRequest is funky somewhere and is returning a new User if it doesn't find one in the API.
         *
         * This means we only know if the user that came back is authentic if we check for a username or some other field
         */
        u.toOption()
          .flatMap(v => v.getUsername())
          .fold(
            (left: void) => this.toastService.show("Unable to Authenticate", "Error"),
            (username) => {
              this.toastService.show(`Welcome ${username}`, "Success");
              this.setUser(u.toOption());
            }
          );
      });
  }

  private user: BehaviorSubject<Option<User>> = new BehaviorSubject<Option<User>>(None);

  asObs(): Observable<Option<User>> {
    return this.user;
  }

  clear(): void {
    return this.user.next(None);
  }

  getUser(): Option<User> {
    return this.user.getValue();
  }

  setUser(user: Option<User>): Option<User> {
    if (user.isEmpty() || this.getUser().equals(user)) {
      return this.getUser();
    }
    this.user.next(user);
    return user;
  }

}
