import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss']
})
export class CreateVoteComponent implements OnInit {

  constructor(readonly userService: UserService) { }

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

  ngOnInit(): void {
  }

}
