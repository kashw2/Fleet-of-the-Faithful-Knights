import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {List} from "immutable";
import {None, Option, Some} from "funfix-core";
import {VoteService} from "../../service/vote.service";
import {BehaviorSubject} from "rxjs";
import {Group, Vote} from "@kashw2/lib-ts";
import {UserService} from "../../service/user.service";
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteComponent implements OnInit {

  constructor(
    readonly voteService: VoteService,
    private userService: UserService,
    readonly navigationService: NavigationService,
  ) {
  }

  selectedGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  getFilteredVotes(): List<Vote> {
    return this.voteService.getVotes()
      .filter(v => v.getPromotionGroupName().equals(this.getSelectedGroup()));
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

  getHierarchicalGroupLabels(): List<Option<string>> {
    return this.getGroups()
      .filter(g => this.getUserGroup().exists(uG => uG.isHigherOrEqual(g)))
      .map(g => g.getLabel());
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
