import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"]
})
export class CheckboxComponent<T> implements OnInit {

  constructor() { }

  @Input()
  descriptionExtractor: (v: T) => Option<string>;

  @Input()
  input: T;

  @Input()
  labelExtractor: (v: T) => Option<string>;

  getDescription(): Option<string> {
    return this.descriptionExtractor(this.getInput());
  }

  getInput(): T {
    return this.input;
  }

  getLabel(): Option<string> {
    return this.labelExtractor(this.getInput());
  }

  ngOnInit(): void {
  }

}
