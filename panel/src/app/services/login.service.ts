import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    return false;
  }

  checkIfLoginRequired(): void {
    if (this.isLoggedIn()) {
      return;
    }
    this.login();
  }

  login(): void {
    this.http.get('https://localhost:8080/login')
      .toPromise();
  }

  logout(): void {

  }


}
