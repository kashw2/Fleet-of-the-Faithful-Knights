import {Component, Input, OnInit} from "@angular/core";
import {None, Option} from "funfix-core";
import {User} from "../../../../../core/src";
import {List} from "immutable";
import {Permission} from "../../../../../core/src/models/permission";

@Component({
  selector: "app-admin-container",
  templateUrl: "./admin-container.component.html",
  styleUrls: ["./admin-container.component.scss"]
})
export class AdminContainerComponent implements OnInit {

  constructor() { }

  @Input()
  user: Option<User> = None;

  descriptionExtractor = (v: Permission) => v.getDescription();

  getUser(): Option<User> {
    return this.user;
  }

  getUserPermissions(): List<Permission> {
    return this.getUser()
      .map(x => x.getPermissions())
      .getOrElse(List());
  }

  labelExtractor = (v: Permission) => v.getLabel();

  ngOnInit(): void {
  }

}
