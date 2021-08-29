import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Candidate} from '@kashw2/lib-ts';
import {List} from 'immutable';
import {Option} from 'funfix-core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor() {
  }

  private candidates: BehaviorSubject<List<Candidate>> = new BehaviorSubject<List<Candidate>>(List());

  asObs(): Observable<List<Candidate>> {
    return this.candidates;
  }

  clear(): void {
    return this.candidates.next(List());
  }

  getCandidate(index: number): Option<Candidate> {
    return Option.of(this.getCandidates().get(index));
  }

  getCandidates(): List<Candidate> {
    return this.candidates.getValue();
  }

  setCandidates(candidates: List<Candidate>): List<Candidate> {
    if (candidates.isEmpty() || this.getCandidates().equals(candidates)) {
      return this.getCandidates();
    }
    this.candidates.next(candidates);
    return candidates;
  }

}
