import {Component, Input, OnInit} from '@angular/core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Set} from 'immutable';
import {None, Option} from 'funfix-core';
import {User} from '@kashw2/lib-ts';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(readonly navigationService: NavigationService) {
  }

  @Input() brandImage: Option<string> = None;

  @Input() brandImageRedirectUrl: Option<string> = None;

  @Input() capitalise: Option<boolean> = None;

  @Input() hyperlinkMap: Set<HyperlinkMap> = Set();

  @Input() user: Option<User> = None;

  getBrandImage(): Option<string> {
    return this.brandImage;
  }

  getBrandImageRedirectUrl(): Option<string> {
    return this.brandImageRedirectUrl;
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return this.hyperlinkMap;
  }

  getUser(): Option<User> {
    return this.user;
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

  shouldCapitalise(): boolean {
    return this.capitalise.contains(true);
  }

}
