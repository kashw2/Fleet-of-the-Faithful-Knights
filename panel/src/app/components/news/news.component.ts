import {Component, OnInit} from '@angular/core';
import {News} from "../../../../../core/src/models/news";
import {NewsService} from "../../services/news.service";
import {List} from "immutable";
import {User} from "../../../../../core/src";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: List<News>;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService
      .getNews()
      .subscribe(x => this.news = x);
  }

}
