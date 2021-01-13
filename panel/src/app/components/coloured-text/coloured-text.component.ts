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

  // @Input() underline: boolean = true;

  getClass(): string {
    const style: string = this.getPosition().concat(' d-inline-flex').concat(' m-0').concat(' p-0');
    if (this.isRainbowText()) {
      return style.concat(' rainbow-text');
    }
    // if (this.isUnderlined()) {
    //   return style.concat(' active-underline');
    // }
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

  getType(): Option<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"  | "p" | "small"> {
    return Option.of(this.type);
  }

  isRainbowText(): boolean {
    return this.hex.contains('#RAIN');
  }

  // isUnderlined(): boolean {
  //   return this.underline;
  // }

  ngOnInit(): void {
  }

  shouldDisplayH1(): boolean {
    return this.getType()
      .contains('h1');
  }

  shouldDisplayH2(): boolean {
    return this.getType()
      .contains('h2');
  }

  shouldDisplayH3(): boolean {
    return this.getType()
      .contains("h3");
  }

  shouldDisplayH4(): boolean {
    return this.getType()
      .contains("h4");
  }

  shouldDisplayH5(): boolean {
    return this.getType()
      .contains("h5");
  }

  shouldDisplayH6(): boolean {
    return this.getType()
      .contains("h6");
  }

  shouldDisplayP(): boolean {
    return this.getType()
      .contains('p');
  }

  shouldDisplaySmall(): boolean {
    return this.getType()
      .contains('small');
  }

}
