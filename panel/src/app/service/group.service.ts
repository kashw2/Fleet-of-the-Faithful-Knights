import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List} from "immutable";
import {Group} from "@kashw2/lib-ts";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() {
  }

  private groups: BehaviorSubject<List<Group>> = new BehaviorSubject<List<Group>>(List());

  asObs(): Observable<List<Group>> {
    return this.groups;
  }

  clear(): void {
    return this.groups.next(List());
  }

  getGroups(): List<Group> {
    return this.groups.getValue();
  }

  setGroups(groups: List<Group>): List<Group> {
    if (groups.isEmpty() || this.getGroups().equals(groups)) {
      console.warn(`Groups equal or empty: ${groups.size}`);
      return this.getGroups();
    }
    console.log(`Setting ${groups.size} Groups`);
    this.groups.next(groups);
    return groups;
  }

}
