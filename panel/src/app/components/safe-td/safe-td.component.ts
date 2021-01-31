import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-safe-td',
  templateUrl: './safe-td.component.html',
  styleUrls: ['./safe-td.component.scss']
})
export class SafeTdComponent implements OnInit {

  constructor(readonly navigationService: NavigationService) {
  }

  @Input() colour: Option<string> = None;

  @Input() content: Option<string> = None;

  @Input() hyperlink: Option<string> = None

  @Input() small: boolean = true;

  getColour(): Option<string> {
    return this.colour;
  }

  getContent(): Option<string> {
    return this.content;
  }

  getHyperlink(): Option<string> {
    return this.hyperlink;
  }

  ngOnInit(): void {
  }

  shouldBeSmall(): boolean {
    return this.small;
  }

}
