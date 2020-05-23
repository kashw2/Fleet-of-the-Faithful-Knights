import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {idKey, User} from "../../../../../core/src";
import {Comment, CommentJsonSerializer} from "../../../../../core/src/models/comment";
import {FfkApiService} from "../../services/ffk-api.service";
import {fromEvent} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: "app-user-input",
  templateUrl: "./comment-input.component.html",
  styleUrls: ["./comment-input.component.scss"],
})
export class CommentInputComponent implements OnInit {

  constructor(
    private ffkApi: FfkApiService,
    private notificationService: NotificationService,
  ) {
  }

  content: string;

  @Input()
  user: Option<User> = None;

  @Input()
  voteId: Option<number> = None;

  buildComment(): Comment {
    return new Comment(
      None,
      this.getUser(),
      Option.of(this.content),
      None,
    );
  }

  getUser(): Option<User> {
    return this.user;
  }

  getVoteId(): Option<number> {
    return this.voteId;
  }

  ngOnInit(): void {
  }

  submitComment(): void {
    this.getVoteId()
      .map(vid => {
        this.ffkApi.writeVoteComment(this.buildComment(), vid);
      });
  }

}
