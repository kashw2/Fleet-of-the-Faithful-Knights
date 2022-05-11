import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {from, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
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
        if (votes.isEmpty()) {
          return from(this.ffkApiService.getVotes())
            .pipe(tap(v => this.voteService.setVotes(v)));
        }
        return of(votes);
      }))
      .pipe(map(votes => !votes.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
