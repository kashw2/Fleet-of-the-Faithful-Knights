import {Component, OnInit} from '@angular/core';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Group, User} from '@ffk/lib-ts';
import * as moment from 'moment';
import {MomentUtils, OptionUtils} from '../../../../../libs/util';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor() {
  }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getGroupColour(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getColour());
  }

  getGroupName(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getLabel());
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home')),
      new HyperlinkMap(Some('Panel'), Some('voting-panel')),
      new HyperlinkMap(Some('Profile'), Some('profile'), Some(true),
        Set.of(
          new HyperlinkMap(Some('Account'), Some('account'), None),
          new HyperlinkMap(Some('Settings'), Some('settings'), None)
        ),
      ),
    );
  }

  getId(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  getMemberSince(): Option<string> {
    return MomentUtils.format(this.getUser()
      .flatMap(u => u.getMemberSince()), 'DMY');
  }

  getPermissions(): Set<string> {
    return this.getUser()
      .map(u => u.getPermissions())
      .getOrElse(Set<string>());
  }

  getUser(): Option<User> {
    return Option.of(
      new User(
        Some('123'),
        Some('Keanu'),
        Some('en_AU'),
        Some('https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg'),
        Some('12345'),
        Some('#1234'),
        Some(new Group(Some('1'), Some('Developer'), Some('#rain'))),
        Set.of('CREATE_VOTE', 'READ_VOTE', 'DEVELOPER', 'UPDATE_VOTE', 'PASS_VOTE'),
        Some(moment()),
      )
    );
  }

  getUserAvatar(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getAvatar());
  }

  getUserId(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  getUserName(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getUsername());
  }

  ngOnInit(): void {
  }

}
