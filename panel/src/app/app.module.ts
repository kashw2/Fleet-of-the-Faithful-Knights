import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentsModule} from "./components/components.module";
import {HomeComponent} from './pages/home/home.component';
import { VoteComponent } from './pages/vote/vote.component';
import { ContainedTextualSelectComponent } from './components/contained-textual-select/contained-textual-select.component';
import { CreateVoteComponent } from './pages/create-vote/create-vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    ContainedTextualSelectComponent,
    CreateVoteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastrModule.forRoot(),
    ComponentsModule,
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule {
}
