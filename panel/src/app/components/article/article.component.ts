import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';
import {News, User} from '@ffk/lib-ts';
import * as moment from 'moment';
import {MomentUtils} from '../../../../../libs/util';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor() { }

  @Input() contentExtractor: (news: News) => Option<string>;

  @Input() dateExtractor: (news: News) => Option<moment.Moment>;

  @Input() news: Option<News> = None;

  @Input() titleExtractor: (news: News) => Option<string>;

  @Input() userExtractor: (news: News) => Option<User>;

  getContent(): Option<string> {
    return this.getNews()
      .flatMap(n => this.contentExtractor(n));
  }

  getDate(): Option<string> {
    return MomentUtils.format(this.getNews()
      .flatMap(n => this.dateExtractor(n)), 'DMY')
  }

  getNews(): Option<News> {
    return this.news;
  }

  getProfileHyperlink(): Option<string> {
    return this.getUserId()
      .map(uid => `profile/${uid}`);
  }

  getTitle(): Option<string> {
    return this.getNews()
      .flatMap(n => this.titleExtractor(n));
  }

  getUser(): Option<User> {
    return this.getNews()
      .flatMap(n => this.userExtractor(n));
  }

  getUserGroupColour(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getGroup())
      .flatMap(g => g.getColour());
  }

  getUserId(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getId());
  }

  getUsername(): Option<string> {
    return this.getUser()
      .flatMap(u => u.getUsername());
  }

  ngOnInit(): void {
  }

}
