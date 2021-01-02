import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';

@Component({
  selector: 'app-coloured-text',
  templateUrl: './coloured-text.component.html',
  styleUrls: ['./coloured-text.component.scss']
})
export class ColouredTextComponent implements OnInit {

  constructor() {}

  @Input() hex: Option<string> = None;

  @Input() type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "td" | "p" | "small" = "p";

  getHex(): Option<string> {
    return this.hex;
  }

  getStyle(): Option<string> {
    if (this.getHex().contains('#rain')) {
      return None;
    }
    return this.getHex()
      .map(v => `color: ${v}`);
  }

  getType(): Option<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "td" | "p" | "small"> {
    return Option.of(this.type);
  }

  isRainbowText(): boolean {
    return this.hex.contains('#rain');
  }

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

  shouldDisplayTd(): boolean {
    return this.getType()
      .contains("td");
  }

}
