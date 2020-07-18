import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from "@angular/core";
import {MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ModalOptions} from "ng-uikit-pro-standard";
import {None, Option, Some} from "funfix-core";
import {List} from "immutable";
import {BehaviorSubject, fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, first} from "rxjs/operators";
import {Vote} from "../../../../../core/src/models/vote";
import {CreateVoteModalComponent} from "../../modals/create-vote-modal/create-vote-modal.component";
import {NotificationService} from "../../services/notification.service";
import {ViewStateService} from "../../services/view-state.service";

@Component({
  selector: "app-vote-table",
  templateUrl: "./vote-table.component.html",
  styleUrls: ["./vote-table.component.scss"],
})
export class VoteTableComponent implements OnInit, AfterViewInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
    private notificationService: NotificationService,
    private viewStateService: ViewStateService,
    private mdbModalService: MDBModalService,
  ) {
  }

  @Input()
  canCreateVote: boolean = false;

  elements: any = [];

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;

  searchText: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  @Input()
  votes: List<Vote> = List();

  filterVotes(filter: string): List<Vote> {
    return this.getVotes()
      .filter(v => {
        return v.getCandidateName().exists(n => n.toLowerCase().includes(filter.toLowerCase()))
          || v.getGroup().exists(g => g.toLowerCase().includes(filter.toLowerCase()))
          || v.getFormattedCreatedDate("DMY").exists(d => d.includes(filter));
      });
  }

  getFilteredVotes(): List<Vote> {
    if (this.getSearchText().nonEmpty()) {
      return this.filterVotes(this.getSearchText().get());
    }
    return this.getVotes();
  }

  getSearchText(): Option<string> {
    return this.searchText
      .getValue();
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  goToVotePage(vote: Vote): void {
    this.viewStateService.setPageIndex(3);
    this.viewStateService.setSelectedVote(vote);
  }

  isUsedForVoteCreation(): boolean {
    return this.canCreateVote;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(17);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.changeDetection.detectChanges();
  }

  ngOnInit(): void {
    for (let i = 0; i <= this.getVotes().size; i++) {
      this.elements.push({
        candidate: "Candidate " + i,
        created_date: "Created Date " + i,
        group: "Group " + i,
        id: i.toString(),
        other: i,
        sponsor: "Sponsor " + i,
        status: "Status " + i,
      });
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
  }

  notifyOfFilterChange(event): void {
    fromEvent(event.target, "keyup")
      .pipe(debounceTime(150))
      .pipe(distinctUntilChanged())
      .pipe(first())
      .subscribe(value => {
        const opt: Option<string> = Option.of(event.target.value);
        if (opt.nonEmpty()) {
          this.notificationService.showInfoNotification(`Applied Filter: ${event.target.value}`, "Info", 1250);
        }
      });
  }

  openVoteModal(): void {
    const options: ModalOptions = {backdrop: true, animated: true};
    this.mdbModalService.show(CreateVoteModalComponent, options);
  }

  shouldTruncateRows(currentIndex: number): boolean {
    return currentIndex >= this.mdbTablePagination.firstItemIndex - 1
      && currentIndex < this.mdbTablePagination.lastItemIndex - 1;
  }

  updateFilter(event): void {
    const value: Option<string> = Option.of(event.target.value);
    if (value.isEmpty()) {
      this.searchText.next(None);
      return;
    }
    this.searchText.next(Some(event.target.value));
  }

}
