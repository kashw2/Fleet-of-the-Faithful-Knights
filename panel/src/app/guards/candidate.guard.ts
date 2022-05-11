import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {from, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
import {CandidateService} from "../service/candidate.service";
import {NavigationService} from "../service/navigation.service";
import {FfkApiService} from "../service/ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateGuard implements CanActivate {

  constructor(
    private candidateService: CandidateService,
    private navigationService: NavigationService,
    private ffkApiService: FfkApiService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.candidateService.asObs()))
      .pipe(mergeMap(candidates => {
        if (candidates.isEmpty()) {
          return from(this.ffkApiService.getCandidates())
            .pipe(tap(c => this.candidateService.setCandidates(c)));
        }
        return of(candidates);
      }))
      .pipe(map(candidates => !candidates.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
