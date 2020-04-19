import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";

@Component({
  selector: "app-status-icon",
  templateUrl: "./status-icon.component.html",
  styleUrls: ["./status-icon.component.scss"],
})
export class StatusIconComponent implements OnInit {

  constructor() {
  }

  @Input()
  hyperLinkUrl: Option<string> = None;

  @Input()
  status: boolean = false;

  getHyperLink(): Option<string> {
    return this.hyperLinkUrl;
  }

  hasPassed(): boolean {
    return this.status;
  }

  ngOnInit(): void {
  }

}
