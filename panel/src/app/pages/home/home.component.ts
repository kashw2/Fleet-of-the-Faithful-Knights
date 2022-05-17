import {Component, OnInit} from '@angular/core';
import {Either, Option, Some} from "funfix-core";
import {ActivatedRoute} from "@angular/router";
import {FfkApiService} from "../../service/ffk-api.service";
import {CrudService} from "../../service/crud.service";
import {UserService} from "../../service/user.service";
import {ToastService} from "../../service/toast.service";
import {GroupService} from "../../service/group.service";
import {CandidateService} from "../../service/candidate.service";
import {VoteService} from "../../service/vote.service";
import {EitherUtils, FutureUtils, OptionUtils} from "@kashw2/lib-util";
import {User, Vote} from "@kashw2/lib-ts";
import {Future, Right} from "funfix";
import {of, switchMap} from "rxjs";
import {List} from "immutable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
      this.ffkApiService.writeUser(this.getDiscordAuthCode().get())
        .map(user => OptionUtils.tap(Some(user), () => this.toastService.show(`Welcome ${user.getUsername().getOrElse('User')}`, "Success")))
        .map(user => this.userService.setUser(user))
        // We're guaranteed to have a User at this point
        .flatMap(user => FutureUtils.fromOption(user.get().getDiscordId(), `${user.get().getUsername().getOrElse('User')} does not have a Discord id`))
        .map(did => this.crudService.crudLocalStorageService.create('discordid', did))
        .flatMap(_ => Future.map3(
          this.ffkApiService.getGroups(),
          this.ffkApiService.getCandidates(),
          this.ffkApiService.getVotes(),
          (groups, candidates, votes) => {
            if (this.groupService.getGroups().isEmpty()) {
              this.groupService.setGroups(groups);
            }
            if (this.candidateService.getCandidates().isEmpty()) {
              this.candidateService.setCandidates(this.toastService.showAndRecoverList(EitherUtils.liftEither(candidates, 'Unable to load Candidates'), `Loaded ${candidates.size} Candidates`));
            }
            if (this.voteService.getVotes().isEmpty()) {
              this.voteService.setVotes(this.toastService.showAndRecoverList(EitherUtils.liftEither(votes, 'Unable to load Votes'), `Loaded ${votes.size} Votes`));
            }
          }
        ))
        .recover((err: string) => this.toastService.show(err, "Error"));
    } else {
      this.userService.asObs()
        .pipe(switchMap((v) => {
            // If we're logged in and we haven't got data in the respective states
            if (
              v.nonEmpty() &&
              (this.groupService.getGroups().isEmpty()
                || this.candidateService.getCandidates().isEmpty()
                || this.voteService.getVotes().isEmpty())
            ) {
              Future.map3(
                this.ffkApiService.getGroups(),
                this.ffkApiService.getCandidates(),
                this.ffkApiService.getVotes(),
                (groups, candidates, votes) => {
                  if (this.groupService.getGroups().isEmpty()) {
                    this.groupService.setGroups(groups);
                  }
                  if (this.candidateService.getCandidates().isEmpty()) {
                    this.candidateService.setCandidates(this.toastService.showAndRecoverList(EitherUtils.liftEither(candidates, 'Unable to load Candidates'), `Loaded ${candidates.size} Candidates`));
                  }
                  if (this.voteService.getVotes().isEmpty()) {
                    this.voteService.setVotes(this.toastService.showAndRecoverList(EitherUtils.liftEither(votes, 'Unable to load Votes'), `Loaded ${votes.size} Votes`));
                  }
                }
              )
                .recover((err: string) => this.toastService.show(err, "Error"));
            }
            return of<Either<string, List<Vote>>>(Right(List()));
          }
        ))
        .subscribe();
    }
  }

}
