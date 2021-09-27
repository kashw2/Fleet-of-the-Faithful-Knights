import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FfkApiService} from "../../service/ffk-api.service";
import {filter, from} from "rxjs";
import {map} from "rxjs/operators";
import {UserJsonSerializer} from "@kashw2/lib-ts";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  constructor(private ffkApiService: FfkApiService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  usersSource: MatTableDataSource<object> = new MatTableDataSource<object>();

  getDisplayedColumns(): string[] {
    return ['id', 'username', 'discordId', 'discordDiscriminator', 'group', 'memberSince', 'locale'];
  }

  ngAfterViewInit(): void {
    this.usersSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    from(this.ffkApiService.getUsers())
      .pipe(filter(v => v.isRight()))
      .pipe(map(v => v.get()))
      .pipe(map(v => UserJsonSerializer.instance.toJsonArray(v.toArray())))
      .subscribe(users => {
        this.usersSource = new MatTableDataSource<object>(users);
        this.usersSource.paginator = this.paginator;
      });
  }

}
