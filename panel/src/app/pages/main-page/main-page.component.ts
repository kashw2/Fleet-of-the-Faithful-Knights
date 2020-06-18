import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Option} from "funfix-core";
import {FfkApiService} from "../../services/ffk-api.service";
import {NotificationService} from "../../services/notification.service";
import {UserStateService} from "../../services/user-state.service";
import {ViewStateService} from "../../services/view-state.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {

  constructor(
    private ffkApiService: FfkApiService,
    private activatedRouteService: ActivatedRoute,
    private userStateService: UserStateService,
    private viewStateService: ViewStateService,
    private notificationService: NotificationService,
  ) {
  }

  getPageIndex(): number {
    return this.viewStateService.getPageIndex();
  }

  async ngOnInit(): Promise<void> {
    if (!this.userStateService.isLoggedIn() && !this.userStateService.isCookieSet()) {
      this.activatedRouteService
        .queryParamMap
        .subscribe(params => {
          const code = Option.of(params.get("code"));
          code.map(c => this.ffkApiService.loginOrRegisterUser(c))
            .map(async x => {
              const awaitedUser = await x;
              this.notificationService.showNotificationBaseOnEitherEffector(awaitedUser, user => `Welcome ${user.getUsername().getOrElse("User")}`);
              this.userStateService.user.next(awaitedUser.toOption());
            });
        });
    }
    if (!this.userStateService.isLoggedIn() && this.userStateService.isCookieSet()) {
      this.ffkApiService.getUserByToken(this.userStateService.getCookieToken())
        .then(userByToken => {
          this.notificationService.showNotificationBaseOnEitherEffector(userByToken, user => `Welcome ${user.getUsername().getOrElse("User")}`);
          this.userStateService.user.next(userByToken.toOption());
        });
    }
    if (this.userStateService.isLoggedIn() || this.userStateService.isCookieSet()) {
        this.populateNews();
        this.populateVotes();
        this.populateCandidates();
    }
  }

  private async populateCandidates(): Promise<void> {
    const candidates = await this.ffkApiService.listCandidates();
    this.notificationService.showNotificationBaseOnEitherEffector(candidates, values => `Loaded ${values.size} Candidates`)
      .map(cs => this.userStateService.candidates.next(cs));
  }

  private async populateNews(): Promise<void> {
    const news = await this.ffkApiService.listNews();
    this.notificationService.showNotificationBaseOnEitherEffector(news, values => `Loaded ${values.size} Articles`)
      .map(articles => this.userStateService.news.next(articles));
  }

  private async populateVotes(): Promise<void> {
    const votes = await this.ffkApiService.listVotes();
    this.notificationService.showNotificationBaseOnEitherEffector(votes, values => `Loaded ${values.size} Votes`)
      .map(vs => this.userStateService.votes.next(vs));
  }

}
