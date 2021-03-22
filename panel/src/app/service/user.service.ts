import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Option, Some} from 'funfix-core';
import {Group, User} from '@kashw2/lib-ts';
import {Set} from 'immutable';
import * as moment from 'moment';
import {StarCitizenOrganisation, StarCitizenUser} from '@kashw2/lib-external';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: BehaviorSubject<Option<User>> = new BehaviorSubject<Option<User>>(this.getUser());

  getUser(): Option<User> {
    return Option.of(
      new User(
        Some('95edfb05-7808-44c5-992a-aba763a7203f'),
        Some('Keanu'),
        Some('en_US'),
        Some('https://www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic-2.jpg'),
        Some('178140794555727872'),
        Some('#7219'),
        Some(new Group(Some('0'), Some('Developer'), Some('#RAIN'), Some(11))),
        Set.of('CREATE_VOTE', 'READ_VOTE', 'VETO_VOTE', 'MODIFY_VOTE', 'DEVELOPER'),
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

}
