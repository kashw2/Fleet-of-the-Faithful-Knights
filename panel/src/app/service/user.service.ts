import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {None, Option, Some} from 'funfix-core';
import {Group, Permission, User} from '@kashw2/lib-ts';
import {Set} from 'immutable';
import * as moment from 'moment';
import {StarCitizenOrganisation, StarCitizenUser} from '@kashw2/lib-external';
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toastService: ToastService) {
  }

  private user: BehaviorSubject<Option<User>> = new BehaviorSubject<Option<User>>(this.getDefaultUser());

  asObs(): Observable<Option<User>> {
    return this.user;
  }

  clear(): void {
    return this.user.next(None);
  }

  private getDefaultUser(): Option<User> {
    return Option.of(
      new User(
        Some('95edfb05-7808-44c5-992a-aba763a7203f'),
        Some('Keanu'),
        Some('en_US'),
        Some('https://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic-2.jpg'),
        Some('178140794555727872'),
        Some('#7219'),
        Some(new Group(
          Some('0'),
          Some('Developer'),
          Some('#RAIN'),
          Some(12)
          ),
        ),
        Set.of(
          new Permission(
            Some('1'),
            Some('CREATE_GROUP'),
          )
        ),
        Some(moment()),
        Some(new StarCitizenUser(
          Some('123456'),
          Some('ImSledged'),
          Some('ImSledged'),
          Some('ImSledged'),
          Some(moment()),
          Some('Queensland, Australia'),
          Some('English'),
          Some('https://github.com/kashw2/'),
          Some('I\'m a Developer for the Fleet of the Faithful Knights'),
          Set.of(
            new StarCitizenOrganisation(
              Some('FFK'),
              Some('Fleet of the Faithful Knights'),
              Some(true),
              Some('Knight'),
              Some(5),
              Some('Organization'),
              Some('English'),
              Some('Social'),
              Some(true),
              Some('Security'),
              Some(false),
              Some('Regular'),
              Some(false),
            ),
          ),
        )),
      ),
    );
  }

  getUser(): Option<User> {
    if (this.user.getValue().isEmpty()) {
      this.toastService.show(
        'Not Logged In',
        "Error",
      );
      return None;
    }
    this.toastService.show('Logged In', "Success");
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
