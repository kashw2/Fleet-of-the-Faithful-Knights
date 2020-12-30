import {Component, OnInit} from '@angular/core';
import {None, Option, Some} from 'funfix-core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {List, Set} from 'immutable';
import {News, User} from '@ffk/lib-ts';
import {CollectionUtils} from '@ffk/lib-util';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() {
  }

  contentExtractor = (news: News) => news.getContent();

  dateExtractor = (news: News) => news.getDate();

  getArticles(): List<Option<News>> {
    return CollectionUtils.optionify(List.of(
      new News(
        Some('0'),
        Some(new User(None, Some('Keanu'))),
        Set(),
        Some('Hello World'),
        Some('This is the first news piece'),
        Some(moment()),
      ),
    )).toList();
  }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('home'), Some('home'), Some(true))
    );
  }

  ngOnInit(): void {
  }

  titleExtractor = (news: News) => news.getTitle();

  usernameExtractor = (news: News) => news.getUser().flatMap(u => u.getUsername());

}
