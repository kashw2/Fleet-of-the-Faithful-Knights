import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {User} from "../../../../../core/src";

@Injectable({
  providedIn: "root",
})
export class FfkApiWriteService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  token: string = this.cookieService.get("token");

  private getHostUrl(): string {
    return "http://localhost:8080";
  }

  writeComment(comment: object, voteId: number): Observable<object> {
    return this.http.post(this.getHostUrl().concat(`/comment/write/${voteId}`), {comment}, {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  writeUser(code: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/user/register?code=${code}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  writeVote(vote: object): Observable<object> {
    return this.http.post(this.getHostUrl().concat("/vote/write"), {vote}, {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

  writeVoteResponse(voteId: number, userId: number, response: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/vote/response/${voteId}/${userId}/${response}`), {
      headers: {
        "X-Api-Token": this.token,
      },
    });
  }

}
