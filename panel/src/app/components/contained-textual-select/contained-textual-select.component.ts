import {Component, Input, OnInit} from '@angular/core';
import {None, Option} from "funfix-core";

@Component({
    selector: 'app-contained-textual-select',
    templateUrl: './contained-textual-select.component.html',
    styleUrls: ['./contained-textual-select.component.scss']
})
export class ContainedTextualSelectComponent implements OnInit {

    constructor() {
    }

    @Input() label: Option<string> = None;

    getLabel(): Option<string> {
      return this.label;
    }

    ngOnInit(): void {
    }

}
