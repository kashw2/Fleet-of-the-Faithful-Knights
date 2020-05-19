import {Location} from "@angular/common";
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ModalOptions} from "angular-bootstrap-md";
import {Option} from "funfix-core";
import {List} from "immutable";
import {CookieService} from "ngx-cookie-service";
import {User} from "../../../../../core/src";
import {Candidate, CandidateJsonSerializer} from "../../../../../core/src/models/candidate";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";
import {CreateVoteModalComponent} from "../../modals/create-vote-modal/create-vote-modal.component";
import {FfkApiService} from "../../services/ffk-api.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-vote-page",
  templateUrl: "./votes-page.component.html",
  styleUrls: ["./votes-page.component.scss"],
})
export class VotesPageComponent implements OnInit, AfterViewInit {

  constructor(
    private ffkApi: FfkApiService,
    private router: Router,
    private location: Location,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
  ) {
  }

  candidates: List<Candidate> = List();

  elements: any = [];

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;

  votes: List<Vote> = List();

  getCandidates(): List<Candidate> {
    return this.candidates;
  }

  getLastVotes(amount: number): List<Vote> {
    return this.getVotes()
      .takeLast(amount);
  }

  getSelectedVoteType(): Option<string> {
    return Option.of(this.location.path().split("?type=")[1]);
  }

  getVotes(): List<Vote> {
    return this.votes;
  }

  isActiveVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("Active");
  }

  isAllVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("All");
  }

  isCAAVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("Companion at Arms");
  }

  isKnightVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("Knight");
  }

  isRecentVoting(): boolean {
    return this.getSelectedVoteType()
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
      .contains("Sergeant First Class");
  }

  isSergeantVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("Sergeant");
  }

  isSquireVoting(): boolean {
    return this.getSelectedVoteType()
      .contains("Squire");
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(17);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    if (!this.cookieService.check("token")) {
      this.router.navigate(["/profile"]);
    }
    this.ffkApi.read.getVotesByType(this.getSelectedVoteType().getOrElse("All"))
      .subscribe(votes => {
        this.votes = VoteJsonSerializer.instance.fromObjectToList(votes);
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
    this.ffkApi.read.getCandidates()
      .subscribe(cs => this.candidates = CandidateJsonSerializer.instance.fromObjectToList(cs));
  }

  openCreateVoteModal(candidates: List<Candidate>): void {
    const modalOptions: ModalOptions = {backdrop: true, animated: true, data: {candidates}};
    this.modalService.show(CreateVoteModalComponent, modalOptions);
  }

  shouldTruncateRows(currentIndex: number): boolean {
    return currentIndex + 1 >= this.mdbTablePagination.firstItemIndex
      && currentIndex < this.mdbTablePagination.lastItemIndex;
  }

  // TODO: Put this in a util class or something
  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
