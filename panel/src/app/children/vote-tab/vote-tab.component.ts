import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {List, Set} from "immutable";
import {User} from "../../../../../core/src";
import {Comment} from "../../../../../core/src/models/comment";
import {Vote} from "../../../../../core/src/models/vote";
import {Voter} from "../../../../../core/src/models/voter";

@Component({
  selector: "app-vote-tab",
  templateUrl: "./vote-tab.component.html",
  styleUrls: ["./vote-tab.component.scss"],
})
export class VoteTabComponent implements OnInit {

  constructor() {
  }

  @Input()
  user: Option<User> = None;

  @Input()
  vote: Option<Vote> = None;

  getComments(): List<Comment> {
    return this.getVote()
      .map(v => v.getComments())
      .getOrElse(List());
  }

  getUser(): Option<User> {
    return this.user;
  }

  getVote(): Option<Vote> {
    return this.vote;
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .flatMap(v => v.getId());
  }

  getVoters(): Set<Voter> {
    return this.getVote()
      .map(v => v.getVoters())
      .map(vs => {
        if (this.isKnightVote()) {
          return vs.take(4);
        }
        if (this.isSergeantVote()) {
          return vs.take(5);
        }
        return vs.take(4);
      })
      .getOrElse(Set());
  }

  isKnightVote(): boolean {
    return this.getVote()
      .map(v => v.isKnightVote() || v.isKnightLieutenantVote() || v.isKnightCommanderVote())
      .getOrElse(false);
  }

  isNormalVote(): boolean {
    return !this.isKnightVote() && !this.isSergeantVote();
  }

  isSergeantVote(): boolean {
    return this.getVote()
      .map(v => v.isSergeantVote() || v.isSergeantFirstClassVote())
      .getOrElse(false);
  }

  ngOnInit(): void {
  }

}
