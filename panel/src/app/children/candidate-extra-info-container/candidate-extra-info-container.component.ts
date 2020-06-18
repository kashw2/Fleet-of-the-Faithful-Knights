import {Component, OnInit} from "@angular/core";
import {ViewStateService} from "../../services/view-state.service";
import {None, Option, Some} from "funfix-core";
import {Vote} from "../../../../../core/src/models/vote";
import {UserStateService} from "../../services/user-state.service";
import {List} from "immutable";
import {Comment} from "../../../../../core/src/models/comment";
import {MomentUtils} from "../../../../../core/src/util/moment-utils";
import {BehaviorSubject} from "rxjs";
import {FfkApiService} from "../../services/ffk-api.service";
import {DiscordApi, EitherUtils, User} from "../../../../../core/src";
import {NotificationService} from "../../services/notification.service";
import {Candidate} from "../../../../../core/src/models/candidate";
import {DiscordApiService} from "../../services/discord-api.service";
import {DiscordMessage} from "../../../../../core/src/models/discord/discord-message";

@Component({
  selector: "app-candidate-extra-info-container",
  templateUrl: "./candidate-extra-info-container.component.html",
  styleUrls: ["./candidate-extra-info-container.component.scss"]
})
export class CandidateExtraInfoContainerComponent implements OnInit {

  constructor(
    private viewStateService: ViewStateService,
    private userStateService: UserStateService,
    private notificationService: NotificationService,
    private ffkApi: FfkApiService,
    private discordApi: DiscordApiService,
  ) {
  }

  comment: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  authorExtractor = (c: Comment) => c.getUsername();

  dateExtractor = (c: Comment) => c.getCreatedDate().map(d => MomentUtils.formatString(d, "DMYHM"));

  discordMessageAuthorExtractor = (m: DiscordMessage) => m.getAuthor();

  discordMessageDateExtractor = (m: DiscordMessage) => m.getTimestamp();

  discordMessageExtractor = (m: DiscordMessage) => m.getContent();

  getCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getCandidateExtraInfoViewIndex(): Option<number> {
    return this.viewStateService
      .getSelectedCandidateExtraInfoViewIndex();
  }

  getCandidateUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getComment(): Option<string> {
    return this.comment
      .getValue();
  }

  getDiscordMessages(): List<DiscordMessage> {
    return this.userStateService.getDiscordMessages();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserDiscordDiscriminator(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getDiscriminator());
  }

  getUserDiscordId(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getDiscordId());
  }

  getVote(): Option<Vote> {
    return this.viewStateService
      .getSelectedVote();
  }

  getVoteComments(): List<Comment> {
    return this.getVote()
      .map(v => v.getComments())
      .getOrElse(List());
  }

  getVoteId(): Option<number> {
    return this.getVote()
      .flatMap(v => v.getId());
  }

  isCommentSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(1);
  }

  isDiscordSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(2);
  }

  isStarCitizenSelected(): boolean {
    return this.getCandidateExtraInfoViewIndex()
      .contains(3);
  }

  messageExtractor = (c: Comment) => c.getContent();

  ngOnInit(): void {
    // this.processDiscordMessages();
  }

  async processDiscordMessages(): Promise<void> {
    const channels = await this.discordApi.listGuildChannels()
    EitherUtils.toList(channels)
      .map(channel => {
        return Option.map3(
          channel.getId(),
          this.getUserDiscordId(),
          this.getUserDiscordDiscriminator(),
          async (cid, udid, ud) => {
            const userMessages = await this.discordApi.listChannelMessageByDiscordUser(cid, udid, ud);
            this.userStateService.discordMessages.next(userMessages.getOrElse(List()));
            this.notificationService.showNotificationBasedOnEither(userMessages, "Loaded Discord Messages");
          });
      })
  }

  setCandidateExtraInfoViewIndex(index: number): void {
    this.viewStateService.setSelectedCandidateExtraInfoViewIndex(index);
  }

  updateComment(event): void {
    this.comment.next(Some(event.target.value));
  }

  writeComment(): void {
    Option.map4(
      this.getComment(),
      this.getUser(),
      this.getVoteId(),
      this.getCandidateUsername(),
      async (comment, user, vid, candidate) => {
        const vote = await this.ffkApi.writeComment( vid, Comment.forCommentWriting(comment, user));
        this.notificationService.showNotificationBaseOnEitherEffector(vote, () => `Successfully Commented On ${candidate}'s Vote`);
      });
  }

}
