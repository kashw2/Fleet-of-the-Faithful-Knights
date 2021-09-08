import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {every, filter, from, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
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
        return from(this.ffkApiService.getCandidates())
          .pipe(filter(v => v.isRight()))
          .pipe(map(v => v.get()))
          .pipe(map(c => c.isEmpty() ? candidates.concat(c) : c))
          .pipe(tap(c => this.candidateService.setCandidates(c)));
      }))
      .pipe(map(candidates => !candidates.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
