import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidateService} from "../../service/candidate.service";
import {List, Set} from "immutable";
import {OptionUtils} from "@kashw2/lib-util";
import {Candidate, Group, Vote} from "@kashw2/lib-ts";
import {None, Option, Some} from "funfix-core";
import {UserService} from "../../service/user.service";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {VoteService} from "../../service/vote.service";

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateVoteComponent implements OnInit {

  constructor(
    readonly candidateService: CandidateService,
    private voteService: VoteService,
    private userService: UserService
  ) {
  }

  selectedCandidate: BehaviorSubject<Option<Candidate>> = new BehaviorSubject<Option<Candidate>>(None);
  selectedGroup: BehaviorSubject<Option<Group>> = new BehaviorSubject<Option<Group>>(None);

  createVote(description: string, startcitizenUrl: string): Option<Vote> {
    const vote = new Vote(
      Option.of(this.voteService.getVotes().size + 1).map(v => v.toString()),
      this.userService.getUser(),
      this.getSelectedCandidate(),
      this.getSelectedGroup(),
      Option.of(description),
      Set(),
      Option.of(startcitizenUrl),
      Some(moment()),
      Some(moment()),
    )
    this.voteService.setVotes(this.voteService.getVotes().push(vote));
    return Option.of(vote);
  }

  getAvailableGroupLabels(): List<string> {
    return OptionUtils.flattenList(this.getGroups()
      .filter(g => this.getUserGroup().exists(uG => g.isLower(uG)))
      .map(g => g.getLabel()));
  }

  getCandidateNames(): List<string> {
    return OptionUtils.flattenList(this.candidateService
      .getCandidates()
      .map(c => c.getDiscordUsername()))
  }

  getCandidateProfileImage(): Option<string> {
    return this.getSelectedCandidate()
      .flatMap(c => c.getAvatar())
  }

  getGroup(index: number): Option<Group> {
    return Option.of(this.getGroups().get(index));
  }

  getGroups(): List<Group> {
    return List.of(
      new Group(
        Some('12'),
        Some('Developer'),
        Some('#000000'),
        Some(12)
      ),
      new Group(
        Some('11'),
        Some('Grand Master'),
        Some('#000000'),
        Some(11)
      ),
      new Group(
        Some('10'),
        Some('Master Commander'),
        Some('#000000'),
        Some(10)
      ),
      new Group(
        Some('9'),
        Some('Lieutenant Master Commander'),
        Some('#000000'),
        Some(9)
      ),
      new Group(
        Some('8'),
        Some('Knight Commander'),
        Some('#000000'),
        Some(8)
      ),
      new Group(
        Some('7'),
        Some('Knight Major'),
        Some('#000000'),
        Some(7)
      ),
      new Group(
        Some('6'),
        Some('Knight Captain'),
        Some('#000000'),
        Some(6)
      ),
      new Group(
        Some('5'),
        Some('Knight Lieutenant'),
        Some('#000000'),
        Some(5)
      ),
      new Group(
        Some('4'),
        Some('Knight'),
        Some('#000000'),
        Some(4)
      ),
      new Group(
        Some('3'),
        Some('Master Sergeant'),
        Some('#000000'),
        Some(3)
      ),
      new Group(
        Some('2'),
        Some('First Sergeant'),
        Some('#000000'),
        Some(2)
      ),
      new Group(
        Some('1'),
        Some('Staff Sergeant'),
        Some('#000000'),
        Some(1)
      ),
      new Group(
        Some('0'),
        Some('Sergeant'),
        Some('#000000'),
        Some(0)
      )
    )
  }

  getSelectableCandidateNames(): List<string> {
    return this.getCandidateNames()
      .filter(n => !this.getUserName().contains(n));
  }

  private getSelectedCandidate(): Option<Candidate> {
    return this.selectedCandidate
      .getValue();
  }

  private getSelectedGroup(): Option<Group> {
    return this.selectedGroup
      .getValue();
  }

  getUserGroup(): Option<Group> {
    return this.userService
      .getUser()
      .flatMap(u => u.getGroup());
  }

  private getUserName(): Option<string> {
    return this.userService
      .getUser()
      .flatMap(u => u.getUsername());
  }

  ngOnInit(): void {
  }

  setSelectedCandidate(candidate: Option<Candidate>): Option<Candidate> {
    this.selectedCandidate.next(candidate);
    return candidate;
  }

  setSelectedGroup(group: Option<Group>): Option<Group> {
    this.selectedGroup.next(group);
    return group;
  }

}
