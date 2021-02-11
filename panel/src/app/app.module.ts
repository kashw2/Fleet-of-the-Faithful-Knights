import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {VotingPanelPageComponent} from './pages/voting/voting-panel-page/voting-panel-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {VotePageComponent} from './pages/voting/vote-page/vote-page.component';
import {ComponentsModule} from './components/components.module';
import {CreateVoteComponent} from './pages/voting/create-vote/create-vote.component';
import {VoteService} from './service/vote.service';
import {CandidateService} from './service/candidate.service';
import {UserService} from './service/user.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		VotingPanelPageComponent,
		ProfilePageComponent,
		VotePageComponent,
		CreateVoteComponent,
	],
	imports: [
		BrowserModule,
    BrowserAnimationsModule,
		AppRoutingModule,
		MDBBootstrapModulesPro.forRoot(),
    ToastrModule,
    ComponentsModule,
	],
	providers: [MDBSpinningPreloader, CandidateService, UserService, VoteService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
