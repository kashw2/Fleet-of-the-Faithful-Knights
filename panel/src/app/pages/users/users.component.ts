import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FfkApiService} from "../../service/ffk-api.service";
import {from} from "rxjs";
import {map} from "rxjs/operators";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {MatDialog} from "@angular/material/dialog";
import {ProfileDialogComponent} from "../../dialogs/profile-dialog/profile-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  constructor(
    private ffkApiService: FfkApiService,
    private dialog: MatDialog,
  ) {
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
      .pipe(map(v => UserJsonSerializer.instance.toJsonArray(v.toArray())))
      .subscribe(users => {
        this.usersSource = new MatTableDataSource<object>(users);
        this.usersSource.paginator = this.paginator;
      });
  }

  openProfile(user: User): void {
    this.dialog.open(ProfileDialogComponent,
      {
        height: '70%',
        width: '70%',
        autoFocus: true,
        data: user,
      }
    );
  }

}
