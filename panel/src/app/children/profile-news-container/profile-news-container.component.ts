import { Component, OnInit } from "@angular/core";
import {Option} from "funfix-core";
import {List} from "immutable";
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../../core/src";
import {News} from "../../../../../core/src/models/news";
import {GroupUtils} from "../../../../../core/src/util/group-utils";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-profile-news-container",
  templateUrl: "./profile-news-container.component.html",
  styleUrls: ["./profile-news-container.component.scss"],
})
export class ProfileNewsContainerComponent implements OnInit {

  constructor(private userStateService: UserStateService) { }

  selectedGroup: BehaviorSubject<string> = new BehaviorSubject<string>("Developer");

  authorExtractor = (n: News) => n.getUsername();

  contentExtractor = (n: News) => n.getContent();

  dateExtractor = (n: News) => n.getDate();

  getNews(): List<News> {
    return this.userStateService
      .getNews()
      .filter(n => GroupUtils.isGroupHigher(n.getUserGroup().getOrElse("Guest"), this.getSelectedGroup()))
      .take(3);
  }

  getSelectedGroup(): string {
    return this.selectedGroup
      .getValue();
  }

  getUser(): Option<User> {
    return this.userStateService
      .getUser();
  }

  getUserGroup(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup());
  }

  groupExtractor = (n: News) => n.getUserGroup();

  isSectionViewable(group: string): boolean {
    return this.getUserGroup()
      .map(g => GroupUtils.isGroupHigher(g, group))
      .getOrElse(false);
  }

  ngOnInit(): void {
  }

  titleExtractor = (n: News) => n.getTitle();

  updateSelectedGroup(selectedGroup: string): void {
    this.selectedGroup.next(selectedGroup);
  }

}
