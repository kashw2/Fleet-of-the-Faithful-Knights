import {Component, OnInit} from '@angular/core';
import {Either, Left, Option, Right} from "funfix-core";
import {ActivatedRoute} from "@angular/router";
import {FfkApiService} from "../../service/ffk-api.service";
import {distinctUntilChanged, filter, from, map, of, pipe, switchMap, takeUntil, takeWhile, tap, zip} from "rxjs";
import {CrudService} from "../../service/crud.service";
import {UserService} from "../../service/user.service";
import {ToastService} from "../../service/toast.service";
import {List} from "immutable";
import {GroupService} from "../../service/group.service";
import {CandidateService} from "../../service/candidate.service";
import {VoteService} from "../../service/vote.service";
import {Vote} from "@kashw2/lib-ts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private ffkApiService: FfkApiService,
    private toastService: ToastService,
    private crudService: CrudService,
    private userService: UserService,
    private groupService: GroupService,
    private candidateService: CandidateService,
    private voteService: VoteService,
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
        .pipe(switchMap(_ => zip(
          this.ffkApiService.getGroups(),
          this.ffkApiService.getCandidates(),
          this.ffkApiService.getVotes(),
        )))
        .pipe(tap(([groups, candidates, votes]) => {
          this.groupService.setGroups(this.toastService.showAndRecoverList(groups));
          this.candidateService.setCandidates(this.toastService.showAndRecoverList(candidates, `Loaded ${candidates.getOrElse(List()).size} Candidates`));
          this.voteService.setVotes(this.toastService.showAndRecoverList(votes, `Loaded ${votes.getOrElse(List()).size} Votes`));
        }))
        .subscribe();
    } else {
      this.userService.asObs()
        .pipe(switchMap((v) => {
            // If we're logged in and we haven't got data in the respective states
            if (
              v.nonEmpty() &&
              (
                this.groupService.getGroups().isEmpty()
                || this.candidateService.getCandidates().isEmpty()
                || this.voteService.getVotes().isEmpty()
              )
            ) {
              return zip(
                this.ffkApiService.getGroups(),
                this.ffkApiService.getCandidates(),
                this.ffkApiService.getVotes(),
              )
                .pipe(tap(([groups, candidates, votes]) => {
                  this.groupService.setGroups(this.toastService.showAndRecoverList(groups));
                  this.candidateService.setCandidates(this.toastService.showAndRecoverList(candidates, `Loaded ${candidates.getOrElse(List()).size} Candidates`));
                  this.voteService.setVotes(this.toastService.showAndRecoverList(votes, `Loaded ${votes.getOrElse(List()).size} Votes`));
                }));
            }
            return of<Either<string, List<Vote>>>(Right(List()));
          }
        ))
        .subscribe(console.warn);
    }
  }

}
