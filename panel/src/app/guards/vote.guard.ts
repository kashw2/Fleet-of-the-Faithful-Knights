import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {every, filter, from, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
import {VoteService} from "../service/vote.service";
import {NavigationService} from "../service/navigation.service";
import {FfkApiService} from "../service/ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class VoteGuard implements CanActivate {

  constructor(
    private voteService: VoteService,
    private navigationService: NavigationService,
    private ffkApiService: FfkApiService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.voteService.asObs()))
      .pipe(mergeMap(votes => {
        return from(this.ffkApiService.getVotes())
          .pipe(filter(v => v.isRight()))
          .pipe(map(v => v.get()))
          .pipe(map(v => v.isEmpty() ? votes.concat(v) : v))
          .pipe(tap(v => this.voteService.setVotes(v)));
      }))
      .pipe(map(votes => !votes.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
