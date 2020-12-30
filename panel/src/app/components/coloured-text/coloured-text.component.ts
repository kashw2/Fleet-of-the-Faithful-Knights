import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from 'funfix-core';

@Component({
  selector: 'app-coloured-text',
  templateUrl: './coloured-text.component.html',
  styleUrls: ['./coloured-text.component.scss']
})
export class ColouredTextComponent implements OnInit {

  constructor() { }

  @Input() hex: Option<string | 'Rainbow'> = None;

  @Input() type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" = "p";

  getHex(): Option<string | 'Rainbow'> {
    return this.hex;
  }

  isRainbowText(): boolean {
    return this.getHex()
      .contains('Rainbow');
  }

  getType(): Option<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small"> {
    return Option.of(this.type);
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

}
