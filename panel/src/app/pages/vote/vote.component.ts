import {Component, OnInit} from '@angular/core';
import {List} from "immutable";
import {None, Option, Some} from "funfix-core";
import {VoteService} from "../../service/vote.service";
import {BehaviorSubject} from "rxjs";
import {Group, Vote} from "@kashw2/lib-ts";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(
    readonly voteService: VoteService,
    private userService: UserService,
  ) {
  }

  selectedGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  getFilteredVotes(): List<Vote> {
    return this.voteService.getVotes()
      .filter(v => v.getPromotionGroupName().equals(this.getSelectedGroup()));
  }

  getGroupLabels(): List<Option<string>> {
    return List.of(
      Some("Grand Master"),
      Some("Master Commander"),
      Some("Lieutenant Master Commander"),
      Some("Knight Commander"),
      Some("Knight Major"),
      Some("Knight Captain"),
      Some("Knight Lieutenant"),
      Some("Knight"),
      Some("Master Sergeant"),
      Some("First Sergeant"),
      Some("Staff Sergeant"),
      Some("Sergeant"),
    );
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
