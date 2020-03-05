import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {RouterModule, Routes} from "@angular/router";
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {NewsComponent} from './components/news/news.component';
import {NotificationService} from "./services/notification.service";
import {ToastrModule} from "ngx-toastr";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {path: '**', redirectTo: ''},
  {path: 'home', component: ProfilePageComponent},
  {path: 'profile', component: ProfilePageComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    NewsComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
