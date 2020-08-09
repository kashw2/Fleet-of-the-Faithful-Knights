import {Component, Input, OnInit, Output} from "@angular/core";
import {None, Option} from "funfix-core";
import { MomentUtils } from "@ffk/lib-ts";

@Component({
  selector: "app-post-container",
  templateUrl: "./post-container.component.html",
  styleUrls: ["./post-container.component.scss"],
})
export class PostContainerComponent<T> implements OnInit {

  constructor() {
  }

  author: Option<string> = None;

  @Input()
  authorExtractor: (v: T) => Option<string>;

  content: Option<string> = None;

  @Input()
  contentExtractor: (v: T) => Option<string>;

  date: Option<string> = None;

  @Input()
  dateExtractor: (v: T) => Option<string>;

  group: Option<string> = None;

  @Input()
  groupExtractor: (v: T) => Option<string>;

  @Input()
  input: T;

  title: Option<string> = None;

  @Input()
  titleExtractor: (v: T) => Option<string>;

  getAuthor(): Option<string> {
    return this.author;
  }

  getContent(): Option<string> {
    return this.content;
  }

  getDate(): Option<string> {
    return this.date;
  }

  getGroup(): Option<string> {
    return this.group;
  }

  private getInput(): T {
    return this.input;
  }

  getTitle(): Option<string> {
    return this.title;
  }

  ngOnInit(): void {
    if (this.titleExtractor(this.getInput()).nonEmpty()) {
      this.title = this.titleExtractor(this.getInput());
    }
    if (this.contentExtractor(this.getInput()).nonEmpty()) {
      this.content = this.contentExtractor(this.getInput());
    }
    if (this.dateExtractor(this.getInput()).nonEmpty()) {
      this.date = this.dateExtractor(this.getInput())
        .map(d => MomentUtils.formatString(d, "DMY"));
    }
    if (this.groupExtractor(this.getInput()).nonEmpty()) {
      this.group = this.groupExtractor(this.getInput());
    }
    if (this.authorExtractor(this.getInput()).nonEmpty()) {
      this.author = this.authorExtractor(this.getInput());
    }
  }

}
