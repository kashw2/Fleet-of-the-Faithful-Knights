import {Component, Input, OnInit} from '@angular/core';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Set} from 'immutable';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  @Input() hyperlinks: Set<HyperlinkMap> = Set();

  getHyperlinks(): Set<HyperlinkMap> {
    return this.hyperlinks;
  }

  ngOnInit(): void {
  }

}
