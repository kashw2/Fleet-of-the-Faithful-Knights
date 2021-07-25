import {Component, OnInit} from '@angular/core';
import {CandidateService} from "../../service/candidate.service";
import {List, Set} from "immutable";
import {OptionUtils} from "@kashw2/lib-util";
import {Candidate, Group, Vote} from "@kashw2/lib-ts";
import {None, Option, Some} from "funfix-core";
import {UserService} from "../../service/user.service";
import {BehaviorSubject} from "rxjs";
import * as moment from "moment";
import {VoteService} from "../../service/vote.service";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss'],
})
export class CreateVoteComponent implements OnInit {

  constructor(
    readonly candidateService: CandidateService,
    private voteService: VoteService,
    private userService: UserService,
    readonly groupService: GroupService,
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
    );
    return Option.of(this.voteService.writeVote(vote));
  }

  getAvailableGroupLabels(): List<string> {
    return OptionUtils.flattenList(this.getAvailableGroups()
      .map(g => g.getLabel()));
  }

  getAvailableGroups(): List<Group> {
    return this.groupService.getGroups()
      .filterNot(g => g.getLabel().contains('Default'))
      .filter(g => this.getUserGroup().exists(uG => g.isLower(uG)));
  }

  getCandidateNames(): List<string> {
    return OptionUtils.flattenList(this.candidateService
      .getCandidates()
      .map(c => c.getDiscordUsername()));
  }

  getCandidateProfileImage(): Option<string> {
    return this.getSelectedCandidate()
      .flatMap(c => c.getAvatar());
  }

  getGroup(index: number): Option<Group> {
    return Option.of(this.getAvailableGroups().get(index));
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
