import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Candidate} from '@kashw2/lib-ts';
import {List} from 'immutable';
import {Option} from 'funfix-core';
import {ToastService} from "./toast.service";
import {FfkApiService} from "./ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private toastService: ToastService,
    private ffkApiService: FfkApiService,
    ) {
    this.ffkApiService.getCandidates()
      .then(g => this.setCandidates(this.toastService.showAndRecoverList(g, `Loaded ${g.getOrElse(List()).size} Candidates`)));
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
    return this.candidates.getValue()
  }

  setCandidates(candidates: List<Candidate>): List<Candidate> {
    if (candidates.isEmpty() || this.getCandidates().equals(candidates)) {
      return this.getCandidates();
    }
    this.candidates.next(candidates);
    return candidates;
  }

}
