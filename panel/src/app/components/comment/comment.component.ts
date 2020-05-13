import {Component, Input, OnInit} from "@angular/core";
import {List} from "immutable";
import {Comment} from "../../../../../core/src/models/comment";
import {FfkDateFormat, MomentUtils} from "../../../../../core/src/util/moment-utils";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input()
  comments: List<Comment> = List();

  getComments(): List<Comment> {
    return this.comments;
  }

  ngOnInit(): void {
  }

  // TODO: Put this in a util class or something
  toDateFormat(date: string, format: FfkDateFormat): string {
    return MomentUtils.formatString(date, format);
  }

}
