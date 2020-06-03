import {Component, OnInit} from "@angular/core";
import {Option} from "funfix-core";
import {List} from "immutable";
import {User} from "../../../../../core/src";
import {Candidate} from "../../../../../core/src/models/candidate";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-create-vote-modal",
  templateUrl: "./create-vote-modal.component.html",
  styleUrls: ["./create-vote-modal.component.scss"],
})
export class CreateVoteModalComponent implements OnInit {

  constructor(private userStateService: UserStateService) { }

  canCreateVoteForGroup(group: string): boolean {
    return this.getUserGroup()
      .exists(g => GroupUtils.isGroupHigher(g, group));
  }

  getCandidates(): List<Candidate> {
    return this.userStateService
      .getCandidates();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  ngOnInit(): void {
  }

}
