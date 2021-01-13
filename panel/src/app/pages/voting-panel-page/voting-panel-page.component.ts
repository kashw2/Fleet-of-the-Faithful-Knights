import {Component, OnInit} from '@angular/core';
import {Candidate, Group, User, Vote} from '@ffk/lib-ts';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import * as moment from 'moment';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-voting-panel-page',
  templateUrl: './voting-panel-page.component.html',
  styleUrls: ['./voting-panel-page.component.scss']
})
export class VotingPanelPageComponent implements OnInit {

  constructor(readonly navigationService: NavigationService) {
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
    );
  }

  getUser(): Option<User> {
    return Option.of(
      new User(
        Some('123'),
        Some('Keanu'),
        Some('en_US'),
        Some('https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png'),
        Some('1h23h21kdwa'),
        Some('#1337'),
        Some(new Group(Some('1'), Some('Developer'), Some('#rain'))),
        Set.of('CREATE_VOTE', 'READ_VOTE', 'DEVELOPER', 'UPDATE_VOTE', 'PASS_VOTE'),

        Some(moment()),
      ),
    );
  }

  getVotes(): Set<Vote> {
    return Set.of(
      new Vote(
        Some('123'),
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
