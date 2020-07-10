import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {User} from "../../../../../core/src";
import {List, Set} from "immutable";
import {Enum} from "../../../../../core/src/models/enum";

@Component({
  selector: "app-admin-container",
  templateUrl: "./admin-container.component.html",
  styleUrls: ["./admin-container.component.scss"]
})
export class AdminContainerComponent implements OnInit {

  constructor() { }

  @Input()
  user: Option<User> = None;

  descriptionExtractor = (v: Enum) => v.getValue();

  getUser(): Option<User> {
    return this.user;
  }

  getUserPermissions(): Set<Enum> {
    return this.getUser()
      .map(x => x.getPermissions())
      .getOrElse(Set());
  }

  labelExtractor = (v: Enum) => v.getLabel();

  ngOnInit(): void {
  }

}
