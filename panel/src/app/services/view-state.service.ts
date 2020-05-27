import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ViewStateService {

  constructor() { }

  pageIndex: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  getPageIndex(): number {
    return this.pageIndex
      .getValue();
  }

  setPageIndex(index: number): void {
    this.pageIndex.next(index);
  }

}
