import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentsModule} from "./components/components.module";
import {HomeComponent} from './pages/home/home.component';
import {VotesComponent} from './pages/votes/votes.component';
import {CreateVoteComponent} from './pages/create-vote/create-vote.component';
import {environment} from "../environments/environment";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {VoteComponent} from './pages/vote/vote.component';
import {MatDividerModule} from "@angular/material/divider";
import {BallotDialogComponent} from './dialogs/ballot-dialog/ballot-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AzureApplicationInsightsService} from "./service/azure-application-insights.service";
import {UsersComponent} from './pages/users/users.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ProfileDialogComponent} from './dialogs/profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VotesComponent,
    CreateVoteComponent,
    VoteComponent,
    BallotDialogComponent,
    UsersComponent,
    ProfileDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  providers: [
    {provide: 'ffkApiServer', useValue: environment.FFK_API_SERVER},
    {provide: 'applicationInsightsKey', useValue: environment.applicationInsightsKey},
    {provide: ErrorHandler, useClass: AzureApplicationInsightsService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
