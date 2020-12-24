import {Component, OnInit} from '@angular/core';
import {User} from '@ffk/lib-ts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
    new User();
  }

  ngOnInit(): void {
  }

}
