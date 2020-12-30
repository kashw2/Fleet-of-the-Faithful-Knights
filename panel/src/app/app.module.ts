import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ArticleComponent } from './components/article/article.component';
import { ColouredTextComponent } from './components/coloured-text/coloured-text.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		HeaderComponent,
		ArticleComponent,
		ColouredTextComponent
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
