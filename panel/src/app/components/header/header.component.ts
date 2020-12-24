import {Component, Input, OnInit} from '@angular/core';
import {User} from '@ffk/lib-ts';
import {Set} from 'immutable';
import {None, Some} from 'funfix-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // getDefault(): Set<HyperlinkMap> {
  //   return Set.of(
  //     new HyperlinkMap(Some('Panel'), Some('panel'), Some(true)),
  //     new HyperlinkMap(Some('Profile'), Some('profile'), Some(false)),
  //   )
  // }
  //
  // @Input() navigationLinks: Set<HyperlinkMap> = Set();

  constructor() {
    new User();
  }

  ngOnInit(): void {
  }

}
