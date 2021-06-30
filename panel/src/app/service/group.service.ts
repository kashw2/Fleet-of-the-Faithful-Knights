import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List} from "immutable";
import {Group} from "@kashw2/lib-ts";
import {ToastService} from "./toast.service";
import {FfkApiService} from "./ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private ffkApiService: FfkApiService,
    private toastService: ToastService,
  ) {
    this.ffkApiService.getGroups()
      .then(g => this.setGroups(this.toastService.showAndRecoverList(g, 'Loaded Groups')));
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
      return this.getGroups();
    }
    this.groups.next(groups);
    return groups;
  }

}
