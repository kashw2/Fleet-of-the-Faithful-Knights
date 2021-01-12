import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ArticleComponent } from './components/article/article.component';
import { ColouredTextComponent } from './components/coloured-text/coloured-text.component';
import { VotingPanelPageComponent } from './pages/voting-panel-page/voting-panel-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SafeTdComponent } from './components/safe-td/safe-td.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		HeaderComponent,
		ArticleComponent,
		ColouredTextComponent,
		VotingPanelPageComponent,
		ProfilePageComponent,
		SafeTdComponent,
		VotePageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MDBBootstrapModulesPro.forRoot(),
	],
	providers: [MDBSpinningPreloader],
	bootstrap: [AppComponent]
})
export class AppModule {
}
