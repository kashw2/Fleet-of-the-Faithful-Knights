import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List, Set} from "immutable";
import {Ballot, Candidate, Group, User, Vote} from "@kashw2/lib-ts";
import {None, Some} from "funfix-core";
import {CandidateService} from "./candidate.service";
import {UserService} from "./user.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private candidateService: CandidateService,
    private userService: UserService,
    ) {
  }

  private votes: BehaviorSubject<List<Vote>> = new BehaviorSubject(this.getDefaultVotes());

  asObs(): Observable<List<Vote>> {
    return this.votes;
  }

  clear(): void {
    this.votes.next(List());
  }

  private getDefaultVotes(): List<Vote> {
    return List.of(
      new Vote(
        Some('1'),
        this.userService.getUser(),
        Some(this.candidateService.getCandidates().first<Candidate>()),
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

  getVotes(): List<Vote> {
    return this.votes
      .getValue();
  }

  setCandidates(candidates: List<Vote>): List<Vote> {
    if (candidates.isEmpty()) {
      return this.getVotes();
    }
    this.votes.next(candidates);
    return candidates;
  }

}
