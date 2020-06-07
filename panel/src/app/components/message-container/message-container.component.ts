import {Component, Input, OnInit} from "@angular/core";
import {List} from "immutable";
import {None, Option} from "funfix-core";

@Component({
  selector: "app-message-container",
  templateUrl: "./message-container.component.html",
  styleUrls: ["./message-container.component.scss"]
})
export class MessageContainerComponent<T> implements OnInit {

  constructor() { }

  author: Option<string> = None;

  @Input()
  authorExtractor: (v: T) => Option<string>;

  date: Option<string> = None;

  @Input()
  dateExtractor: (v: T) => Option<string>;

  @Input()
  input: T;

  message: Option<string> = None;

  @Input()
  messageExtractor: (v: T) => Option<string>;

  getAuthor(): Option<string> {
    return this.author;
  }

  getDate(): Option<string> {
    return this.date;
  }

  getInput(): T {
    return this.input;
  }

  getMessage(): Option<string> {
    return this.message;
  }

  ngOnInit(): void {
    this.message = this.messageExtractor(this.getInput());
    this.author = this.authorExtractor(this.getInput());
    this.date = this.dateExtractor(this.getInput());
  }

}
