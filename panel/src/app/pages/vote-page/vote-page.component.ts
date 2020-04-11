import {Location} from "@angular/common";
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from "@angular/core";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";
import {FfkApiService} from "../../services/ffk-api.service";

@Component({
  selector: "app-vote-page",
  templateUrl: "./vote-page.component.html",
  styleUrls: ["./vote-page.component.scss"],
})
export class VotePageComponent implements OnInit, AfterViewInit {

  constructor(
    private ffkApi: FfkApiService,
    private location: Location,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  elements: any = [];

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;

  @Input()
  user: User;
  votes: List<Vote> = List();

  getSelectedVoteType(): Option<string> {
    return Option.of(this.location.path().split("?type=")[1]);
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  isActiveVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("active")
      || this.getSelectedVoteType()
        .contains("Active");
  }

  isCAAVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("caa")
      || this.getSelectedVoteType()
        .contains("CAA");
  }

  isKnightVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("knight")
      || this.getSelectedVoteType()
        .contains("Knight");
  }

  isRecentVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("recent")
      || this.getSelectedVoteType()
        .contains("Recent");
  }

  isRecognisedVoteType(): boolean {
    return this.isActiveVoting()
      || this.isRecentVoting()
      || this.isKnightVoting()
      || this.isSergeantFirstClassVoting()
      || this.isSergeantVoting()
      || this.isSquireVoting()
      || this.isCAAVoting();
  }

  isSergeantFirstClassVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("sergeant_first_class")
      || this.getSelectedVoteType()
        .contains("Sergeant_First_Class");
  }

  isSergeantVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("sergeant")
      || this.getSelectedVoteType()
        .contains("Sergeant");
  }

  isSquireVoting(): boolean {
    return this.getSelectedVoteType()
        .contains("squire")
      || this.getSelectedVoteType()
        .contains("Squire");
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(17);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.ffkApi.read.getVotes()
      .subscribe(votes => {
        this.votes = this.votes.concat(VoteJsonSerializer.instance.fromObjectToList(votes));
        for (let i = 1; i <= this.getVotes().size; i++) {
          this.elements.push({
            candidate: "Candidate" + i,
            created_date: "Created Date" + i,
            group: "Group" + i,
            id: i.toString(),
            other: i,
            sponsor: "Sponsor" + i,
            status: "Status" + i,
          });
        }
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
      });
  }

  // TODO: Put this in a util class or something
  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
