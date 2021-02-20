import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {VoteService} from '../service/vote.service';
import {every, tap} from 'rxjs/operators';
import {Option} from 'funfix-core';
import {NavigationService} from '../service/navigation.service';

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
  ): Observable<boolean> {
    return of(false)
      .pipe(every(_ => this.hasCurrentVote()))
      .pipe(tap(v => Option.of(v).contains(true) ? this.void() : this.navigationService.goToVotingPanel()));
  }

  private hasCurrentVote(): boolean {
    return this.voteService.getCurrentVoteId()
      .nonEmpty();
  }

  private void(): void {
    return;
  }

}
