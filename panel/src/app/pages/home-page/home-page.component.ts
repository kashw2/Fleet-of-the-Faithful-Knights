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
        Some(new User(Some('123'), Some('Keanu'), None, None, None, None, Some(new Group(None, Some('Developer'), Some('#rain'))))),
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
      new HyperlinkMap(Some('Panel'), Some('voting-panel')),
    );
  }

  getUser(): Option<User> {
    return Option.of(
      new User(
        Some('123'),
        Some('Keanu'),
        Some('en_US'),
        Some('https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png'),
        Some('1h23h21kdwa'),
        Some('#1337'),
        Some(new Group(Some('1'), Some('Developer'), Some('#rain'))),
        Set(),
        Some(moment()),
      ),
    );
  }

  ngOnInit(): void {
  }

  titleExtractor = (news: News) => news.getTitle();

  userExtractor = (news: News) => news.getUser();

}
