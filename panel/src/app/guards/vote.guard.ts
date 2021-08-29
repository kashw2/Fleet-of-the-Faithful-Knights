import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {every, Observable, of, switchMap} from 'rxjs';
import {VoteService} from "../service/vote.service";

@Injectable({
  providedIn: 'root'
})
export class VoteGuard implements CanActivate {

  constructor(private voteService: VoteService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.hasVotes()));
  }

  hasVotes(): Observable<boolean> {
    return of(false)
      .pipe(switchMap(_ => this.voteService.asObs()))
      .pipe(every(v => !v.isEmpty()));
  }
}
