import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VotesComponent,
    CreateVoteComponent,
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
    ],
  providers: [
    {provide: 'ffkApiServer', useValue: environment.FFK_API_SERVER},
    {provide: 'ffkDiscordId', useValue: environment.FFK_DISCORD_ID}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
