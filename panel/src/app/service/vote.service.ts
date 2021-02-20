import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Ballot, Candidate, Group, User, Vote} from '@ffk/lib-ts';
import {Set} from 'immutable';
import {None, Option, Some} from 'funfix-core';
import * as moment from 'moment';
import {UserService} from './user.service';
import {CandidateService} from './candidate.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private userService: UserService, private candidateService: CandidateService) {
  }

  currentVoteId: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  votes: BehaviorSubject<Set<Vote>> = new BehaviorSubject<Set<Vote>>(this.getDefaultVotes());

  getCurrentVoteId(): Option<string> {
    return this.currentVoteId
      .getValue();
  }

  getDefaultVotes(): Set<Vote> {
    return Set.of(
      new Vote(
        Some('1'),
        this.userService.getUser(),
        Some(this.candidateService.getCandidates().first()),
        Some(new Group(Some('2'), Some('Developer'), Some('#RAIN'), Some(10))),
        Some('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ducimus molestiae porro quas. Autem delectus dicta, dolores doloribus et hic in incidunt possimus provident quos similique sunt veniam veritatis voluptatum. Alias aliquid animi corporis deserunt distinctio enim hic ipsa laborum, minus mollitia nulla omnis quas quasi\n' +
          '  quidem, sed sequi similique, suscipit totam vitae voluptate! A aliquid aspernatur blanditiis delectus dolor. Accusantium ad aliquid architecto culpa dolores ea earum eos esse eum facilis harum in inventore ipsa iure laborum\n' +
          '  natus quae quasi, quos recusandae rem rerum unde ut voluptatem! Officia, officiis.'),
        Set.of(
          new Ballot(
            Some('1'),
            this.userService.getUser(),
            Some('Y'),
            Some('I approve of this vote as this dude is a good fit'),
            Some(moment()),
            Some(moment()),
          ),
        ),
        Some('https://robertsspaceindustries.com/citizens/Bship'),
        Some(moment()),
        Some(moment()),
      ),
    );
  }

  getVotes(): Set<Vote> {
    return this.votes
      .getValue();
  }

  setCurrentVoteId(voteId: Option<string>): Option<string> {
    if (voteId.nonEmpty()) {
      console.log('Setting Vote Id:', voteId.get());
      this.currentVoteId.next(voteId);
    }
    return voteId;
  }
}
