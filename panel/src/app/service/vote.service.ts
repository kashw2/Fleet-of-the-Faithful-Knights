import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Candidate, Group, User, Vote} from '@ffk/lib-ts';
import {Set} from 'immutable';
import {None, Some} from 'funfix-core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  votes: BehaviorSubject<Set<Vote>> = new BehaviorSubject<Set<Vote>>(Set.of(
    new Vote(
      Some('123'),
      Some(new User(Some('12345'), Some('Keanu'))),
      Some(new Candidate(Some('123'), Some('Bship'), None, None, None, Some(new Group(None, Some('Master Commander'), Some('#000000'))))),
      Some(new Group(None, Some('Developer'), Some('#RAIN'))),
      Some('Vote description'),
      Set(),
      Some('https://robertsspaceindustries.com/citizens/Bship'),
      Some(moment()),
      Some(moment()),
    ),
  ));

  getVotes(): Set<Vote> {
    return this.votes
      .getValue();
  }

  constructor() {
  }
}
