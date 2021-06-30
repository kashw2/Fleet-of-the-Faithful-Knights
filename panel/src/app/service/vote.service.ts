import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {List} from "immutable";
import {Vote} from "@kashw2/lib-ts";
import {Either, Right} from "funfix-core";
import {CandidateService} from "./candidate.service";
import {UserService} from "./user.service";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private candidateService: CandidateService,
    private userService: UserService,
    private toastService: ToastService,
  ) {
  }

  private votes: BehaviorSubject<Either<string, List<Vote>>> = new BehaviorSubject(Right(List()));

  asObs(): Observable<Either<string, List<Vote>>> {
    return this.votes;
  }

  clear(): void {
    return this.votes.next(Right(List()));
  }

  getVotes(): List<Vote> {
    return this.votes.getValue()
      .getOrElse(List());
  }

  setVotes(votes: List<Vote>): List<Vote> {
    if (votes.isEmpty() || this.getVotes().equals(votes)) {
      return this.getVotes();
    }
    this.votes.next(Right(votes));
    return votes;
  }

}
