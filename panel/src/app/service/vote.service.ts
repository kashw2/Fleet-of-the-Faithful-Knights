import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List} from "immutable";
import {Vote} from "@kashw2/lib-ts";
import {CandidateService} from "./candidate.service";
import {UserService} from "./user.service";
import {ToastService} from "./toast.service";
import {FfkApiService} from "./ffk-api.service";
import {None, Option} from "funfix-core";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private candidateService: CandidateService,
    private ffkApiService: FfkApiService,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    this.ffkApiService.getVotes()
      .then(v => this.setVotes(this.toastService.showAndRecoverList(v, `Loaded ${v.getOrElse(List()).size} Votes`)));
  }

  private selectedVote: BehaviorSubject<Option<Vote>> = new BehaviorSubject<Option<Vote>>(None);
  private votes: BehaviorSubject<List<Vote>> = new BehaviorSubject(List());

  addVote(vote: Vote): List<Vote> {
    this.votes.next(this.getVotes().insert(this.getVotes().size + 1, vote));
    return this.getVotes();
  }

  asObs(): Observable<List<Vote>> {
    return this.votes;
  }

  clear(): void {
    return this.votes.next(List());
  }

  clearSelectedVote(): void {
    return this.selectedVote.next(None);
  }

  getSelectedVote(): Option<Vote> {
    return this.selectedVote
      .getValue();
  }

  getVotes(): List<Vote> {
    return this.votes.getValue();
  }

  selectedVoteAsObs(): Observable<Option<Vote>> {
    return this.selectedVote;
  }

  setSelectedVote(vote: Option<Vote>): Option<Vote> {
    console.log('Setting Vote');
    this.selectedVote.next(vote);
    return vote;
  }

  setVotes(votes: List<Vote>): List<Vote> {
    if (votes.isEmpty() || this.getVotes().equals(votes)) {
      return this.getVotes();
    }
    this.votes.next(votes);
    return votes;
  }

  writeVote(vote: Vote): Vote {
    this.toastService.showSequencePromise(this.ffkApiService.writeVote(vote), 'Created Vote', 'Error', 'Success')
      .then(v => this.addVote(vote));
    return vote;
  }

}
