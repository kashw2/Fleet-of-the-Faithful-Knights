import {Component, OnInit} from '@angular/core';
import {None, Option, Some} from 'funfix-core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {List, Set} from 'immutable';
import {News} from '@kashw2/lib-ts';
import {CollectionUtils} from '@kashw2/lib-util';
import * as moment from 'moment';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(readonly userService: UserService) {
  }

  contentExtractor = (news: News) => news.getContent();

  dateExtractor = (news: News) => news.getDate();

  getArticles(): List<Option<News>> {
    return CollectionUtils.optionify(List.of(
      new News(
        Some('0'),
        this.userService.getUser(),
        Set(),
        Some('Hello World'),
        Some('This is the first news piece'),
        Some(moment()),
      ),
    )).toList();
  }

  getBrandImage(): Option<string> {
    return Some('./assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home'), Some(true)),
      new HyperlinkMap(Some('Panel'), None, None, Set.of(
        new HyperlinkMap(Some('Votes'), Some('voting/votes')),
        new HyperlinkMap(Some('Create'), Some('voting/create'))
      )),
    );
  }

  ngOnInit(): void {
  }

  titleExtractor = (news: News) => news.getTitle();

  userExtractor = (news: News) => news.getUser();

}
