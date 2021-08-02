import {Component, OnInit} from '@angular/core';
import {Option} from "funfix-core";
import {ActivatedRoute} from "@angular/router";
import {FfkApiService} from "../../service/ffk-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private ffkApiService: FfkApiService,
    ) { }

  getDiscordAuthCode(): Option<string> {
    return Option.of(this.activatedRoute.snapshot.queryParamMap.get('code'));
  }

  ngOnInit(): void {
    if (this.getDiscordAuthCode().nonEmpty()) {
      this.ffkApiService.writeUser(this.getDiscordAuthCode().get());
    }
  }

}
