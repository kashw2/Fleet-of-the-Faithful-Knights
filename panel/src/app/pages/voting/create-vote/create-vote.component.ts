import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {CandidateService} from '../../../service/candidate.service';
import {VoteService} from '../../../service/vote.service';
import {Candidate, Group, Vote} from '@ffk/lib-ts';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {StarCitizenOrganisation, StarCitizenUser} from '../../../../../../libs/external';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss']
})
export class CreateVoteComponent implements OnInit {

  constructor(
    readonly userService: UserService,
    readonly candidateService: CandidateService,
    private voteService: VoteService,
  ) {
  }

  selectedCandidate: BehaviorSubject<Option<Candidate>> = new BehaviorSubject<Option<Candidate>>(None);

  private generateVoteId(id: Option<string>): Option<string> {
    return id.map(v => +v + 1)
      .map(v => v.toString());
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

  ngOnInit(): void {
  }

  updateCandidate(candidate: Option<Candidate>): void {
    this.selectedCandidate.next(candidate);
  }

  writeVote(
    promotionGroup: string,
    description: string,
    starCitizenUrl: string,
  ): void {
    const vote = new Vote(
      this.voteService.getVotes().map(v => this.generateVoteId(v.getId())).last(None),
      this.userService.getUser(),
      this.selectedCandidate.getValue(),
      Option.of(new Group(None, Some(promotionGroup))),
      Some(description),
      Set(),
      Some(starCitizenUrl),
      Some(moment()),
      Some(moment()),
    );
    this.voteService.votes.next(this.voteService.getVotes().add(vote));
  }

}
