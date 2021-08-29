import {Component, OnInit} from '@angular/core';
import {Option} from "funfix-core";
import {ActivatedRoute} from "@angular/router";
import {FfkApiService} from "../../service/ffk-api.service";
import {filter, from, map, switchMap, tap} from "rxjs";
import {CrudService} from "../../service/crud.service";
import {UserService} from "../../service/user.service";
import {ToastService} from "../../service/toast.service";
import {List} from "immutable";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private ffkApiService: FfkApiService,
    private crudService: CrudService,
    private userService: UserService,
    private groupService: GroupService,
    private toastService: ToastService,
  ) {
  }

  getDiscordAuthCode(): Option<string> {
    return Option.of(this.activatedRoute.snapshot.queryParamMap.get('code'));
  }

  ngOnInit(): void {
    if (this.getDiscordAuthCode().nonEmpty()) {
      // Write User
      from(this.ffkApiService.writeUser(this.getDiscordAuthCode().get()))
        .pipe(tap(v => this.toastService.showEither(v, "Successfully Logged In")))
        .pipe(tap(v => this.userService.setUser(v.toOption())))
        .pipe(map(v => v.toOption().flatMap(u => u.getDiscordId())))
        .pipe(filter(v => v.nonEmpty()))
        .pipe(map(v => v.get()))
        .pipe(tap(did => this.crudService.crudLocalStorageService.create('discordid', did)))
        // Get Groups
        .pipe(switchMap(_ => from(this.ffkApiService.getGroups())))
        .pipe(tap(gs => this.groupService.setGroups(this.toastService.showAndRecoverList(gs))))
        .subscribe();
    } else {
      if (this.userService.isLoggedIn()) {
        from(this.ffkApiService.getGroups())
          .pipe(tap(gs => this.groupService.setGroups(this.toastService.showAndRecoverList(gs))))
          .subscribe();
      }
    }
  }

}
