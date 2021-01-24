import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-coloured-text',
  templateUrl: './coloured-text.component.html',
  styleUrls: ['./coloured-text.component.scss']
})
export class ColouredTextComponent implements OnInit {

  constructor(readonly navigationService: NavigationService) {}

  @Input() content: Option<string> = None;

  @Input() hex: Option<string> = None;

  @Input() hyperlink: Option<string> = None;

  @Input() position: "Start" | "Center" | "End" = "Center";

  @Input() type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"  | "p" | "small" = "p";

  getClass(): string {
    const style: string = this.getPosition().concat(' d-inline-flex').concat(' m-0').concat(' p-0').concat(' ' + this.getType());
    if (this.isRainbowText()) {
      return style.concat(' rainbow-text');
    }
    return style;
  }

  getContent(): Option<string> {
    return this.content;
  }

  getHex(): Option<string> {
    return this.hex;
  }

  getHyperlink(): Option<string> {
    return this.hyperlink;
  }

  getPosition(): string {
    switch (this.position) {
    case 'Start':
      return 'justify-content-start';
    default:
    case 'Center':
      return 'justify-content-center';
    case 'End':
      return 'justify-content-end';
    }
  }

  getStyle(): Option<string> {
    if (this.getHex().contains('#RAIN')) {
      return None;
    }
    return this.getHex()
      .map(v => `color: ${v}`);
  }

  getType(): "h1" | "h2" | "h3" | "h4" | "h5" | "h6"  | "p" | "small" {
    return this.type;
  }

  isRainbowText(): boolean {
    return this.hex.contains('#RAIN');
  }

  ngOnInit(): void {
  }

}
