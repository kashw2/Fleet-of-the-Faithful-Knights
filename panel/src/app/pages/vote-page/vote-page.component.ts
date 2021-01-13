import {Component, OnInit} from '@angular/core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {None, Option, Some} from 'funfix-core';
import {Candidate, Group, User, Vote} from '@ffk/lib-ts';
import * as moment from 'moment';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor() {
  }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getCandidateAvatar(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getAvatar());
  }

  getCandidateDiscordId(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordId());
  }

  getCandidateDiscriminator(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordDiscriminator());
  }

  getCandidateUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getChatText(): Option<string> {
    return Some('Chat');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home')),
      new HyperlinkMap(Some('Panel'), Some('voting-panel')),
    );
  }

  getStarCitizenText(): Option<string> {
    return Some('Star Citizen');
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

  getVote(): Option<Vote> {
    return Option.of(
      new Vote(
        Some('1'),
        Some(
          new User(
            Some('123'),
            Some('Keanu'),
            Some('en_AU'),
            Some('https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg'),
            Some('12345'),
            Some('#1234'),
            Some(new Group(Some('1'), Some('Developer'), Some('#rain'))),
            Set.of('CREATE_VOTE', 'READ_VOTE', 'DEVELOPER', 'UPDATE_VOTE', 'PASS_VOTE'),
            Some(moment()),
          ),
        ),
        Some(
          new Candidate(
            Some('123'),
            Some('Bship'),
            Some('123456789'),
            Some('#1337'),
            Some('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
            Some(new Group(Some('1'), Some('Master Commander'), Some('#ff0000'))),
          ),
        ),
        Some(new Group(Some('2'), Some('Developer'), Some('#ff00ff'))),
      ),
    );
  }

  ngOnInit(): void {
  }

}
