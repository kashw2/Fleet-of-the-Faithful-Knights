import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {List} from "immutable";
import {None, Option} from "funfix-core";
import {BehaviorSubject, combineAll, combineLatest, zip} from "rxjs";
import {Group, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {NavigationService} from "../../service/navigation.service";
import {GroupService} from "../../service/group.service";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../service/user.service";
import {VoteService} from "../../service/vote.service";
import {map, tap} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss'],
})
export class VotesComponent implements OnInit, AfterViewInit {

  constructor(
    readonly voteService: VoteService,
    private userService: UserService,
    readonly navigationService: NavigationService,
    private groupService: GroupService,
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  voteSource: MatTableDataSource<object> = new MatTableDataSource<object>();

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
    return new MatTableDataSource<object>(this.getFilteredVotes().map(v => VoteJsonSerializer.instance.toJsonImpl(v)).toArray());
  }

  ngAfterViewInit(): void {
    this.voteSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    combineLatest(
      this.selectedGroup,
      this.voteService.asObs()
    )
      .pipe(map(([g, votes]) => votes.filter(v => v.getPromotionGroupName().equals(g))))
      .pipe(map(v => VoteJsonSerializer.instance.toJsonArray(v.toArray())))
      .subscribe(votes => {
        this.voteSource = new MatTableDataSource<object>(votes);
        this.voteSource.paginator = this.paginator;
      });
  }

  setAndNavigateToVote(voteId: number): void {
    this.voteService.setSelectedVote(Option.of(this.voteService.getVotes().get(voteId)));
    this.navigationService.vote(voteId);
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
