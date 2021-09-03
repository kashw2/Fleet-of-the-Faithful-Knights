import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {every, Observable, of, switchMap, tap} from 'rxjs';
import {VoteService} from "../service/vote.service";
import {NavigationService} from "../service/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class VoteGuard implements CanActivate {

  constructor(
    private voteService: VoteService,
    private navigationService: NavigationService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.hasVotes()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

  hasVotes(): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.voteService.asObs()))
      .pipe(every(v => !v.isEmpty()));
  }
}
