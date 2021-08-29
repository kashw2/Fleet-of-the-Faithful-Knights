import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {every, Observable, of, switchMap} from 'rxjs';
import {CandidateService} from "../service/candidate.service";

@Injectable({
  providedIn: 'root'
})
export class CandidateGuard implements CanActivate {

  constructor(private candidateService: CandidateService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.hasCandidates()));
  }

  hasCandidates(): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.candidateService.asObs()))
      .pipe(every(c => !c.isEmpty()));
  }

}
