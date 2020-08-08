import {Component, OnInit} from "@angular/core";
import {List} from "immutable";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";
import {Vote} from "@ffk/lib-ts";

@Component({
  selector: "app-votes-page",
  templateUrl: "./votes-page.component.html",
  styleUrls: ["./votes-page.component.scss"],
})
export class VotesPageComponent implements OnInit {

  constructor(
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
  ) { }

  getFilteredVotesByType(): List<Vote> {
    switch (this.getVoteType()) {
      case "All":
        return this.userStateService.getVotes();
      case "Active":
        return this.userStateService.getVotes();
      case "Recent":
        return this.userStateService.getVotes()
          .reverse();
      default:
        return this.userStateService
          .getVotes()
          .filter(v => v.getGroup().contains(this.getVoteType()));
    }
  }

  getVoteType(): string {
    return this.viewStateService
      .getVotePageType();
  }

  ngOnInit(): void {
  }

}
