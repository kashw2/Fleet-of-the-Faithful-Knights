import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {from, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
import {GroupService} from "../service/group.service";
import {NavigationService} from "../service/navigation.service";
import {FfkApiService} from "../service/ffk-api.service";

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivate {

  constructor(
    private groupService: GroupService,
    private navigationService: NavigationService,
    private ffkApiService: FfkApiService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.groupService.asObs()))
      .pipe(mergeMap(groups => {
        if (groups.isEmpty()) {
          return from(this.ffkApiService.getGroups())
            .pipe(tap(g => this.groupService.setGroups(g)));
        }
        return of(groups);
      }))
      .pipe(map(groups => !groups.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
