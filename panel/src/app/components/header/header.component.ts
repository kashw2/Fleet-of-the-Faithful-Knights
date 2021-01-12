import {Component, Input, OnInit} from '@angular/core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Set} from 'immutable';
import {None, Option} from 'funfix-core';

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

  @Input() capitalise: Option<boolean> = None;

  @Input() hyperlinkMap: Set<HyperlinkMap> = Set();

  getBrandImage(): Option<string> {
    return this.brandImage;
  }

  getBrandImageRedirectUrl(): Option<string> {
    return this.brandImageRedirectUrl;
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return this.hyperlinkMap;
  }

  ngOnInit(): void {
  }

  shouldCapitalise(): boolean {
    return this.capitalise.contains(true);
  }

}
