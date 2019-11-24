import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../../core";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<any> {
    return this.http.post<User>("http://localhost:8080/user", {
      username: "",
      password: "",
      user: {
        username: "",
        rank: {
          id: 11,
          name: "Developer"
        }
      }
    });
  }

}
