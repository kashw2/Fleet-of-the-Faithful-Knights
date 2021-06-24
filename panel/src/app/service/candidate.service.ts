import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Candidate, Group} from '@kashw2/lib-ts';
import {List, Set} from 'immutable';
import {None, Option, Some} from 'funfix-core';
import {StarCitizenOrganisation, StarCitizenUser} from '@kashw2/lib-external';
import * as moment from 'moment';
import {OptionUtils} from '@kashw2/lib-util';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor() {
  }

  private candidates: BehaviorSubject<List<Candidate>> = new BehaviorSubject<List<Candidate>>(List<Candidate>());

  asObs(): Observable<List<Candidate>> {
    return this.candidates;
  }

  clear(): void {
    return this.candidates.next(List());
  }

  getCandidates(): List<Candidate> {
    return List.of(
      new Candidate(
        Some('59722485-a88d-45be-b26c-89f5ce51675b'),
        Some('Bship'),
        Some('280932387716726786'),
        Some('#5578'),
        Some('https://dto9r5vaiz7bu.cloudfront.net/bj7w80a5h2mic/source.png'),
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
          Set.of(
            new StarCitizenOrganisation(
              Some('FFK'),
              Some('Fleet of the Faithful Knights'),
              Some(true),
              Some('Master Commander'),
              Some(6),
              Some('Organization'),
              Some('English'),
              Some('Social'),
              Some(true),
              Some('Security'),
              Some(false),
              Some('Regular'),
              Some(false),
            ),
          ),
        )),
      )
    );
  }

  setCandidates(candidates: List<Candidate>): List<Candidate> {
    if (candidates.isEmpty()) {
      return this.getCandidates();
    }
    this.candidates.next(candidates);
    return candidates;
  }
}
