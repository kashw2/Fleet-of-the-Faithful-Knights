import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {News, NewsJsonSerializer} from "../../../../core/src/models/news";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {List} from "immutable";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {
  }

  getNews(): Observable<List<News>> {
    return this.http.get<List<News>>('http://localhost:8080/news')
      .pipe(map(x => NewsJsonSerializer.instance.fromJsonArray(x)));
  }

}
