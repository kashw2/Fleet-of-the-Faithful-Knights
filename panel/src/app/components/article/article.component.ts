import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';
import {News} from '@ffk/lib-ts';
import * as moment from 'moment';

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

  @Input() usernameExtractor: (news: News) => Option<string>;

  getContent(): Option<string> {
    return this.getNews()
      .flatMap(n => this.contentExtractor(n));
  }

  getDate(): Option<string> {
    return this.getNews()
      .flatMap(n => this.dateExtractor(n))
      .map(v => v.format('d/m/y'));
  }

  getNews(): Option<News> {
    return this.news;
  }

  getTitle(): Option<string> {
    return this.getNews()
      .flatMap(n => this.titleExtractor(n));
  }

  getUsername(): Option<string> {
    return this.getNews()
      .flatMap(n => this.usernameExtractor(n));
  }

  ngOnInit(): void {
  }

}
