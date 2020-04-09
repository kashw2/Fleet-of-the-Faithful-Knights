import {Injectable} from "@angular/core";
import {FfkApiReadService} from "./ffk-api/ffk-api-read.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FfkApiService {

  constructor(private http: HttpClient) { }

  read: FfkApiReadService = new FfkApiReadService(this.http);

}
