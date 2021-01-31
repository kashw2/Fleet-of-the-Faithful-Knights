import {Component, OnInit} from '@angular/core';
import {Candidate, Group, User, Vote} from '@ffk/lib-ts';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import * as moment from 'moment';
import {NavigationService} from '../../../service/navigation.service';
import {UserService} from '../../../service/user.service';
import {VoteService} from '../../../service/vote.service';

@Component({
  selector: 'app-voting-panel-page',
  templateUrl: './voting-panel-page.component.html',
  styleUrls: ['./voting-panel-page.component.scss']
})
export class VotingPanelPageComponent implements OnInit {

  constructor(
    readonly navigationService: NavigationService,
    readonly userService: UserService,
    readonly voteService: VoteService,
  ) {
  }

  getBrandImage(): Option<string> {
    return Some('./assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
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

  getSponsorProfile(sponsorId: Option<string>): Option<string> {
    return sponsorId.map(id => `profile/${id}`);
  }

  ngOnInit(): void {
  }

}
