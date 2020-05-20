import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {FfkApiReadService} from "./ffk-api/ffk-api-read.service";
import {FfkApiWriteService} from "./ffk-api/ffk-api-write.service";

@Injectable({
  providedIn: "root",
})
export class FfkApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.read = new FfkApiReadService(this.http, this.cookieService);
    this.write = new FfkApiWriteService(this.http, this.cookieService);
  }

  read: FfkApiReadService;
  write: FfkApiWriteService;

}
