import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FfkApiReadService {

  constructor(private http: HttpClient) {
  }

  private getHostUrl(): string {
    return "http://localhost:8080";
  }

  getNews(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/news"));
  }

  getRecentVotes(amount: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/recent/${amount}`));
  }

  getUserByToken(token: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/user/token/${token}`));
  }

  getVoteById(voteId: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/vote/id/${voteId}`));
  }

  getVoteByStatus(userId: number, status: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/passed/${userId}?passed=${status}`));
  }

  getVotes(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/votes"));
  }

  getVotesByType(type: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/type/${type}`));
  }

  getVotesByUser(userId: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/user/${userId}`));
  }

}
