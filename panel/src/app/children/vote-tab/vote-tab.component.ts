import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {List, Set} from "immutable";
import {User} from "../../../../../core/src";
import {Comment} from "../../../../../core/src/models/comment";
import {Vote} from "../../../../../core/src/models/vote";

@Component({
  selector: "app-vote-tab",
  templateUrl: "./vote-tab.component.html",
  styleUrls: ["./vote-tab.component.scss"],
})
export class VoteTabComponent implements OnInit {

  constructor() { }

  @Input()
  user: Option<User> = None;

  @Input()
  vote: Option<Vote> = None;

  getComments(): List<Comment> {
    return this.getVote()
        .map(v => v.getComments())
        .getOrElse(List());
  }

  getRequiredVotes(): number {
    if (this.isKnightVote()) {
      return 5;
    }
    if (this.isSergeantVote()) {
      return 4;
    }
    return 4;
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

  getVoters(): Set<User> {
    return this.getVote()
      .map(v => v.getVoters())
      .getOrElse(Set());
  }

  isKnightVote(): boolean {
    return this.getVote()
      .map(v => v.shouldBeInKnightVoting())
      .getOrElse(false);
  }

  isNormalVote(): boolean {
    return !this.isKnightVote() && !this.isSergeantVote();
  }

  isSergeantVote(): boolean {
    return this.getVote()
      .map(v => v.shouldBeInSergeantVoting())
      .getOrElse(false);
  }

  ngOnInit(): void {
  }

}
