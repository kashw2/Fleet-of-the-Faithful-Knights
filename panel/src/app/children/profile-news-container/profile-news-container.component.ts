import { Component, OnInit } from "@angular/core";
import {None, Option, Some} from "funfix-core";
import {List} from "immutable";
import {BehaviorSubject} from "rxjs";
import {UserStateService} from "../../services/user-state.service";
import {GroupUtils, News, User} from "@ffk/lib-ts";

@Component({
  selector: "app-profile-news-container",
  templateUrl: "./profile-news-container.component.html",
  styleUrls: ["./profile-news-container.component.scss"],
})
export class ProfileNewsContainerComponent implements OnInit {

  constructor(private userStateService: UserStateService) { }

  selectedGroup: BehaviorSubject<Option<string>> = new BehaviorSubject<Option<string>>(None);

  authorExtractor = (n: News) => n.getUsername();

  contentExtractor = (n: News) => n.getContent();

  dateExtractor = (n: News) => n.getDate();

  getNews(): List<News> {
    return this.userStateService
      .getNews()
      .filter(n => GroupUtils.isGroupHigher(n.getUserGroup().getOrElse("Guest"), this.getSelectedGroup().getOrElse("Guest")))
      .take(3);
  }

  getNewsFilteredBySelectedGroup(): List<News> {
    return this.getNews()
      .filter(n => n.getUserGroup().contains(this.getSelectedGroup().getOrElse("Guest")));
  }

  getSelectedGroup(): Option<string> {
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
    this.selectedGroup.next(Some(selectedGroup));
  }

}
