import {Component, OnInit} from '@angular/core';
import {List} from "immutable";
import {None, Option} from "funfix-core";
import {BehaviorSubject} from "rxjs";
import {Group, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {NavigationService} from "../../service/navigation.service";
import {GroupService} from "../../service/group.service";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../service/user.service";
import {VoteService} from "../../service/vote.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {

  constructor(
    readonly voteService: VoteService,
    private userService: UserService,
    readonly navigationService: NavigationService,
    private groupService: GroupService,
  ) {
  }

  selectedGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  getDisplayedColumns(): string[] {
    return ['id', 'candidate', 'sponsor', 'group'];
  }

  getFilteredVotes(): List<Vote> {
    return this.voteService.getVotes()
      .filter(v => v.getPromotionGroupName().equals(this.getSelectedGroup()));
  }

  getHierarchicalGroupLabels(): List<Option<string>> {
    return this.groupService.getGroups()
      .filterNot(g => g.getLabel().contains('Default'))
      .filter(g => this.getUserGroup().exists(uG => uG.isHigherOrEqual(g)))
      .map(g => g.getLabel())
      .reverse();
  }

  getSelectedGroup(): Option<string> {
    return this.selectedGroup
      .getValue();
  }

  private getUserGroup(): Option<Group> {
    return this.userService
      .getUser()
      .flatMap(u => u.getGroup());
  }

  getVotesForTable(): MatTableDataSource<object> {
    return new MatTableDataSource<object>(this.getFilteredVotes().map(v => VoteJsonSerializer.instance.toJsonImpl(v)).toArray())
  }

  ngOnInit(): void {
  }

  setSelectedGroup(group: Option<string>): Option<string> {
    if (group.isEmpty()) {
      return this.getSelectedGroup();
    }
    if (this.getSelectedGroup().equals(group)) {
      this.selectedGroup.next(None);
      return this.getSelectedGroup();
    }
    console.info(`Setting Group to ${group.get()}`);
    this.selectedGroup.next(group);
    return group;
  }

}
