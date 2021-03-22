import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {None, Option, Some} from 'funfix-core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {CandidateService} from '../../../service/candidate.service';
import {VoteService} from '../../../service/vote.service';
import {Candidate, Group, Vote} from '@kashw2/lib-ts';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {NavigationService} from '../../../service/navigation.service';
import {OptionUtils} from '@kashw2/lib-util';

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
    private navigationService: NavigationService,
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

  getGroups(): Set<Group> {
    return Set.of(
      new Group(Some('0'), Some('Sergeant'), Some('#206694'), Some(1)),
      new Group(Some('1'), Some('Sergeant First Class'), Some('#206694'), Some(2)),
      new Group(Some('3'), Some('Knight'), Some('#e67e22'), Some(3)),
      new Group(Some('4'), Some('Knight Lieutenant'), Some('#ce7100'), Some(4)),
      new Group(Some('5'), Some('Knight Commander'), Some('#ce7100'), Some(5)),
      new Group(Some('6'), Some('Master Commander'), Some('#9b0000'), Some(6)),
      new Group(Some('7'), Some('Grand Master'), Some('#8a0303'), Some(7)),
    );
  }

  getHierarchicallyOrderedGroupNames(): Set<string> {
    return OptionUtils.flattenSet(this.getGroups()
      .sort((current, previous) => current.isHigher(previous) ? 1 : -1)
      .map(v => v.getLabel()));
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
    this.navigationService.goToVote(vote.getId());
  }

}
