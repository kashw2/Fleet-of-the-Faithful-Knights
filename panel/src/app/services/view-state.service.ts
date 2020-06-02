import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ViewStateService {

  constructor() { }

  pageIndex: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  votePageType: BehaviorSubject<string> = new BehaviorSubject<string>("All");

  getPageIndex(): number {
    return this.pageIndex
      .getValue();
  }

  getVotePageType(): string {
    return this.votePageType
      .getValue();
  }

  setPageIndex(index: number): void {
    this.pageIndex.next(index);
  }

  setVotePageType(type: string): void {
    this.votePageType.next(type);
  }

}
