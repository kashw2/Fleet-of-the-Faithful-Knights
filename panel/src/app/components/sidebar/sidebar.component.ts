import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(readonly navigationService: NavigationService) { }

  ngOnInit(): void {
  }

}
