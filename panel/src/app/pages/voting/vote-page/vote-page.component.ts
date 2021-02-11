import {Component, OnInit} from '@angular/core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {None, Option, Some} from 'funfix-core';
import {Ballot, Candidate, Group, Vote} from '@ffk/lib-ts';
import * as moment from 'moment';
import {UserService} from '../../../service/user.service';
import {StarCitizenOrganisation, StarCitizenUser} from '@ffk/lib-external';
import {BehaviorSubject} from 'rxjs';
import {NavigationService} from '../../../service/navigation.service';
import {CandidateService} from '../../../service/candidate.service';
import {VoteService} from '../../../service/vote.service';
import {OptionUtils} from '../../../../../../libs/util';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
})
export class VotePageComponent implements OnInit {

  constructor(
    readonly userService: UserService,
    readonly navigationService: NavigationService,
    private candidateService: CandidateService,
    private voteService: VoteService,
  ) {
  }

  showVoteView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  approve(): void {
    this.getVote()
      .map(v => v.withBallot(new Ballot(None, this.userService.getUser(), None, Some('Y'))))
      .map(v => {console.log(v); return v})
      .map(v => this.voteService.votes.next(this.voteService.getVotes().remove(this.getVote().get()).add(v)));
  }

  deny(): void {
    this.getVote()
      .map(v => v.withBallot(new Ballot(None, this.userService.getUser(), None, Some('N'))))
      .map(v => {console.log(v); return v})
      .map(v => this.voteService.votes.next(this.voteService.getVotes().remove(this.getVote().get()).add(v)));
  }

  getBallots(): Set<Ballot> {
    return this.getVote()
      .map(v => v.getBallots())
      .getOrElse(Set<Ballot>());
  }

  getBrandImage(): Option<string> {
    return Some('./assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
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

  getCandidateDiscordDiscriminator(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordDiscriminator());
  }

  getCandidateDiscordId(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordId());
  }

  getCandidateDiscordUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getCandidateGroupColour(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getGroup())
      .flatMap(g => g.getColour());
  }

  getCandidateGroupLabel(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getGroup())
      .flatMap(g => g.getLabel());
  }

  getCandidateStarCitizenBio(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getStarCitizenUser())
      .flatMap(scu => scu.getBio());
  }

  getCandidateStarCitizenUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getStarCitizenUser())
      .flatMap(scu => scu.getUsername());
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
      new HyperlinkMap(Some('Home'), Some('home'), Some(true)),
      new HyperlinkMap(Some('Panel'), None, None, Set.of(
        new HyperlinkMap(Some('Votes'), Some('voting/votes')),
        new HyperlinkMap(Some('Create'), Some('voting/create'))
      )),
    );
  }

  getStarCitizenText(): Option<string> {
    return Some('Star Citizen');
  }

  getUserProfile(userId: Option<string>): Option<string> {
    return userId.map(id => `profile/${id}`);
  }

  getVote(): Option<Vote> {
    return this.voteService
      .getVotes()
      .map(v => Option.of(v))
      .find(v => OptionUtils.exists2(v, this.voteService.getCurrentVoteId(), (x, vid) => x.getId().contains(vid)));
  }

  getVoteDescription(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getDescription());
  }

  getVoteSponsorUsername(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getSponsorUsername());
  }

  ngOnInit(): void {
  }

  shouldShowVoteView(): boolean {
    return this.showVoteView
      .getValue() === true;
  }

}
