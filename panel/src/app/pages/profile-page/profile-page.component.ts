import {Component, OnInit} from '@angular/core';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {MomentUtils} from '@ffk/lib-util';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(readonly userService: UserService) {
  }

  getBrandImage(): Option<string> {
    return Some('./assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getGroupColour(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getColour());
  }

  getGroupName(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getLabel());
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home'), Some(true)),
      new HyperlinkMap(Some('Panel'), None, None, Set.of(
        new HyperlinkMap(Some('Votes'), Some('voting/votes')),
        new HyperlinkMap(Some('Create'), Some('voting/create'))
      )),
    );
  }

  getId(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getId());
  }

  getMemberSince(): Option<string> {
    return MomentUtils.format(this.userService.getUser()
      .flatMap(u => u.getMemberSince()), 'DMY');
  }

  getPermissions(): Set<string> {
    return this.userService.getUser()
      .map(u => u.getPermissions())
      .getOrElse(Set<string>());
  }

  getUserAvatar(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getAvatar());
  }

  getUserId(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getId());
  }

  getUserName(): Option<string> {
    return this.userService.getUser()
      .flatMap(u => u.getUsername());
  }

  ngOnInit(): void {
  }

}
