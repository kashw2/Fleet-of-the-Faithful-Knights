import {Component, OnInit} from '@angular/core';
import {None, Option, Some} from 'funfix-core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {List, Set} from 'immutable';
import {Group, News, User} from '@ffk/lib-ts';
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
        Some(new User(None, Some('Keanu'), None, None, None, None, Some(new Group(None, Some('Developer'), Some('Rainbow'))))),
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
      new HyperlinkMap(Some('Home'), Some('home'), Some(true)),
        new HyperlinkMap(Some('Profile'), Some('profile'), None,
            Set.of(
                new HyperlinkMap(Some('Account'), Some('account'), None),
                new HyperlinkMap(Some('Settings'), Some('settings'), None)
            ),
        )
    );
  }

  ngOnInit(): void {
  }

  titleExtractor = (news: News) => news.getTitle();

  userExtractor = (news: News) => news.getUser();

}
