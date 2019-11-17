import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  loggedIn = true;

  isLoggedIn(): boolean {
    return this.loggedIn === true;
  }

  ngOnInit() {
  }

}
