import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FfkApiWriteService {

  constructor(
    private http: HttpClient,
  ) {
  }

  private getHostUrl(): string {
    return "http://localhost:8080";
  }

  writeUser(code: string): Observable<object> {
    return this.http.get(this.getHostUrl().concat(`/user/register?code=${code}`));
  }

  writeVote(vote: object): Observable<object> {
    return this.http.post(this.getHostUrl().concat("/vote/write"), {vote});
  }

}
