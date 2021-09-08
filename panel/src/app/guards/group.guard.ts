import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, switchMap, tap} from 'rxjs';
import {GroupService} from "../service/group.service";
import {NavigationService} from "../service/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivate {

  constructor(
    private groupService: GroupService,
    private navigationService: NavigationService,
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(false)
      .pipe(switchMap(_ => this.groupService.asObs()))
      .pipe(map(gs => !gs.isEmpty()))
      .pipe(tap(v => {
        if (!v) {
          this.navigationService.home();
        }
      }));
  }

}
