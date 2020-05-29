import { Component, OnInit } from "@angular/core";
import {Option} from "funfix-core";
import {List} from "immutable";
import {News} from "../../../../../core/src/models/news";
import {UserStateService} from "../../services/user-state.service";

@Component({
  selector: "app-profile-news-container",
  templateUrl: "./profile-news-container.component.html",
  styleUrls: ["./profile-news-container.component.scss"],
})
export class ProfileNewsContainerComponent implements OnInit {

  constructor(private userStateService: UserStateService) { }

  authorExtractor = (n: News) => n.getUsername();

  canViewDeveloper(): boolean {
    return this.userStateService
      .getUser()
      .exists(u => u.isDeveloper() || u.isGrandMaster() || u.isMasterCommander());
  }

  canViewHeadOffice(): boolean {
    return this.userStateService
      .getUser()
      .exists(u => u.isGrandMaster() || u.isMasterCommander());
  }

  canViewKnights(): boolean {
    return this.userStateService
      .getUser()
      .exists(u => u.isKnightCommander() || u.isKnightLieutenant() || u.isKnight());
  }

  canViewNormal(): boolean {
    return this.userStateService
      .getUser()
      .exists(u => u.isGuest());
  }

  canViewSergeants(): boolean {
    return this.userStateService
      .getUser()
      .exists(u => u.isSergeantFirstClass() || u.isSergeant());
  }

  contentExtractor = (n: News) => n.getContent();

  dateExtractor = (n: News) => n.getDate();

  getNews(): List<News> {
    return this.userStateService
      .getNews()
      .take(3);
  }

  groupExtractor = (n: News) => n.getUserGroup();

  ngOnInit(): void {
  }

  titleExtractor = (n: News) => n.getTitle();

}
