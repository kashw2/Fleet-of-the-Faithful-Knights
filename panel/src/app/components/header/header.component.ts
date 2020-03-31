import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {DiscordAccessTokenJsonSerializer} from '../../../../../core/src/misc/discord-api';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080'.concat(`/user/login?code=${this.location.path().split('?code=')[1]}`))
      .subscribe(x => {
        DiscordAccessTokenJsonSerializer.instance.fromJson(x)
          .getAccessToken()
          .map(token => this.cookieService.set('access-token', token));
      });
  }

}
