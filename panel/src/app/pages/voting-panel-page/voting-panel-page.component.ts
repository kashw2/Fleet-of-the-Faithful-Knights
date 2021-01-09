import {Component, OnInit} from '@angular/core';
import {Candidate, Group, User, Vote} from '@ffk/lib-ts';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-voting-panel-page',
  templateUrl: './voting-panel-page.component.html',
  styleUrls: ['./voting-panel-page.component.scss']
})
export class VotingPanelPageComponent implements OnInit {

  constructor() {
  }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home')),
      new HyperlinkMap(Some('Panel'), Some('voting-panel'), Some(true)),
      new HyperlinkMap(Some('Profile'), Some('profile'), None,
        Set.of(
          new HyperlinkMap(Some('Account'), Some('account'), None),
          new HyperlinkMap(Some('Settings'), Some('settings'), None)
        ),
      ),
    );
  }

  getVotes(): Set<Vote> {
    return Set.of(
      new Vote(
        None,
        Some(new User(Some('12345'), Some('Keanu'))),
        Some(new Candidate(Some('123'), Some('Bship'), None, None, Some(new Group(None, Some('Master Commander'), Some('#000000'))))),
        Some(new Group(None, Some('Developer'), Some('#rain'))),
        Set(),
        Some(moment())
      ),
    );
  }

  ngOnInit(): void {
  }

}
