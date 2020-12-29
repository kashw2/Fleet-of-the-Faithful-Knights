import { Component, OnInit } from '@angular/core';
import {Option, Some} from 'funfix-core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Set} from 'immutable';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('home'), Some('home'), Some(true))
    )
  }

  ngOnInit(): void {
  }

}
