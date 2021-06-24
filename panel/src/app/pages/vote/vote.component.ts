import {Component, OnInit} from '@angular/core';
import {List} from "immutable";
import {Option, Some} from "funfix-core";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor() {
  }

  getGroupLabels(): List<Option<string>> {
    return List.of(
      Some("Grand Master"),
      Some("Master Commander"),
      Some("Lieutenant Master Commander"),
      Some("Knight Commander"),
      Some("Knight Major"),
      Some("Knight Captain"),
      Some("Knight Lieutenant"),
      Some("Knight"),
      Some("Master Sergeant"),
      Some("First Sergeant"),
      Some("Staff Sergeant"),
      Some("Sergeant"),
    );
  }

  ngOnInit(): void {
  }

}
