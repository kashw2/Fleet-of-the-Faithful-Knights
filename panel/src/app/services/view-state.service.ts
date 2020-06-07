import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {None, Option, Some} from "funfix-core";
import {Vote} from "../../../../core/src/models/vote";

@Injectable({
  providedIn: "root",
})
export class ViewStateService {

  constructor() { }

  pageIndex: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  selectedCandidateExtraInfoViewIndex: BehaviorSubject<Option<number>> = new BehaviorSubject<Option<number>>(Some(1));

  selectedVote: BehaviorSubject<Option<Vote>> = new BehaviorSubject<Option<Vote>>(None);

  votePageType: BehaviorSubject<string> = new BehaviorSubject<string>("All");

  getPageIndex(): number {
    return this.pageIndex
      .getValue();
  }

  getSelectedCandidateExtraInfoViewIndex(): Option<number> {
    return this.selectedCandidateExtraInfoViewIndex
      .getValue();
  }

  getSelectedVote(): Option<Vote> {
    return this.selectedVote
      .getValue();
  }

  getVotePageType(): string {
    return this.votePageType
      .getValue();
  }

  setPageIndex(index: number): void {
    this.pageIndex.next(index);
  }

  setSelectedCandidateExtraInfoViewIndex(index: number): void {
    this.selectedCandidateExtraInfoViewIndex.next(Some(index));
  }

  setSelectedVote(vote: Vote): void {
    this.selectedVote.next(Some(vote));
  }

  setVotePageType(type: string): void {
    this.votePageType.next(type);
  }

}
