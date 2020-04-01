import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

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
  ) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080'.concat(`/user/register?code=${this.location.path().split('?code=')[1]}`))
      .subscribe(async x => {
        console.log(x);
      });
  }

}
