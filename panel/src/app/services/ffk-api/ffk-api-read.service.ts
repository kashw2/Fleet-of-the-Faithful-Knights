import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FfkApiReadService {

  constructor(private http: HttpClient) {
  }

  getHostUrl(): string {
    return "http://localhost:8080";
  }

  getUserByToken(token: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/user/token/${token}`));
  }

  getVoteByStatus(userId: number, status: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/passed/${userId}?passed=${status}`));
  }

  getVotes(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/votes"));
  }

  getVotesByUser(userId: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/user/${userId}`));
  }

}
