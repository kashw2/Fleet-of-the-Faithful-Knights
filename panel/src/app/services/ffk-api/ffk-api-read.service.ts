import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../../../../core/src";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class FfkApiReadService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  token: string = this.cookieService.get("token");

  getCandidates(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/candidates"), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  private getHostUrl(): string {
    return "http://localhost:8080";
  }

  getNews(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/news"), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getRecentVotes(amount: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/recent/${amount}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getUserByToken(token: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/user/token/${token}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getVoteById(voteId: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/vote/id/${voteId}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getVoteByStatus(userId: number, status: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/passed/${userId}?passed=${status}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getVotes(): Observable<object> {
    return this.http.get(this.getHostUrl().concat("/votes"), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getVotesByType(type: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/type/${type}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  getVotesByUser(userId: number): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/votes/sponsor/${userId}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

}
