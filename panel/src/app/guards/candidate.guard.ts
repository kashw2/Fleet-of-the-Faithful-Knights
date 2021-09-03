import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {every, Observable, of, switchMap, tap} from 'rxjs';
import {CandidateService} from "../service/candidate.service";
import {NavigationService} from "../service/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateGuard implements CanActivate {

  constructor(
    private candidateService: CandidateService,
    private navigationService: NavigationService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.hasCandidates()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

  hasCandidates(): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.candidateService.asObs()))
      .pipe(every(c => !c.isEmpty()));
  }

}
