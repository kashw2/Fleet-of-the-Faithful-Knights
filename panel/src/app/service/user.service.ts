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
        this.toastService.show('Logged In', "Success");
        this.setUser(u.toOption())
      })
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
