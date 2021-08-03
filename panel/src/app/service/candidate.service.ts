import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Candidate, Group} from '@kashw2/lib-ts';
import {List, Set} from 'immutable';
import {Either, Option, Right, Some} from 'funfix-core';
import {StarCitizenUser} from '@kashw2/lib-external';
import * as moment from 'moment';
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private toastService: ToastService) {
  }

  private candidates: BehaviorSubject<Either<string, List<Candidate>>> = new BehaviorSubject<Either<string, List<Candidate>>>(this.getDefaultCandidates());

  asObs(): Observable<Either<string, List<Candidate>>> {
    return this.candidates;
  }

  clear(): void {
    return this.candidates.next(Right(List()));
  }

  getCandidate(index: number): Option<Candidate> {
    return Option.of(this.getCandidates().get(index));
  }

  getCandidates(): List<Candidate> {
    return this.candidates.getValue()
      .getOrElse(List());
  }

  getDefaultCandidates(): Either<string, List<Candidate>> {
    return Right(List.of(
      new Candidate(
        Some('1'),
        Some('Bship'),
        Some('280932387716726786'),
        Some('#5578'),
        Some('5c9a69a8ed4d1130447d8bf0a5685461'),
        Some(new Group(Some('1'), Some('Master Commander'), Some('#ff0000'))),
        Some(new StarCitizenUser(
          Some('123456'),
          Some('Bship'),
          Some('Bship'),
          Some('Bship'),
          Some(moment()),
          Some('Colorado'),
          Some('English'),
          Some('faithfulknights.com'),
          Some('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ducimus molestiae porro quas. Autem delectus dicta, dolores doloribus et hic in incidunt possimus provident quos similique sunt veniam veritatis voluptatum. Alias aliquid animi corporis deserunt distinctio enim hic ipsa laborum, minus mollitia nulla omnis quas quasi\n' +
            '  quidem, sed sequi similique, suscipit totam vitae voluptate! A aliquid aspernatur blanditiis delectus dolor. Accusantium ad aliquid architecto culpa dolores ea earum eos esse eum facilis harum in inventore ipsa iure laborum\n' +
            '  natus quae quasi, quos recusandae rem rerum unde ut voluptatem! Officia, officiis.'),
          Set.of(),
        )),
      ),
    ));
  }

  setCandidates(candidates: List<Candidate>): List<Candidate> {
    if (candidates.isEmpty() || this.getCandidates().equals(candidates)) {
      return this.getCandidates();
    }
    this.candidates.next(Right(candidates));
    return candidates;
  }

}
