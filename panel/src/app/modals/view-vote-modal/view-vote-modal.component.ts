import { Component, OnInit } from "@angular/core";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {Option} from "funfix-core";
import {Vote, VoteJsonSerializer} from "../../../../../core/src/models/vote";

@Component({
  selector: "app-view-vote-modal",
  templateUrl: "./view-vote-modal.component.html",
  styleUrls: ["./view-vote-modal.component.scss"],
})
export class ViewVoteModalComponent implements OnInit {

  constructor(
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
  ) { }

  vote: Vote = new Vote();

  getVote(): Vote {
    return this.vote;
  }

  getVoteCandidate(): Option<string> {
    return this.getVote()
      .getCandidate();
  }

  getVoteGroup(): Option<string> {
    return this.getVote()
      .getGroup();
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .getId();
  }

  getVoteNotes(): Option<string> {
    return this.getVote()
      .getNotes();
  }

  getVoteSponsor(): Option<string> {
    return this.getVote()
      .getSponsorUsername();
  }

  ngOnInit(): void {
    this.vote = VoteJsonSerializer.instance.fromJson(VoteJsonSerializer.instance.toJsonImpl(this.modalService.config.data as Vote));
  }

}
