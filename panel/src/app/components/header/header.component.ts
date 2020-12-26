import {Component, Input, OnInit} from '@angular/core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Set} from 'immutable';
import {Option, Some} from 'funfix-core';
import { None } from 'funfix-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  @Input() brandImage: Option<string> = None;

  @Input() brandImageRedirectUrl: Option<string> = None;

  @Input() hyperlinkMap: Set<HyperlinkMap> = this.getDefault();

  getHyperlinkMap(): Set<HyperlinkMap> {
    return this.hyperlinkMap;
  }

  getDefault(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Panel'), Some('panel'), None),
      new HyperlinkMap(Some('Profile'), Some('profile'), None),
    );
  }

  ngOnInit(): void {
  }

}
