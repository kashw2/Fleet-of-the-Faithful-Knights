import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';
import {NotificationService} from './services/notification.service';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginService} from './services/login.service';

const routes: Routes = [
  {path: '**', redirectTo: ''},
  {path: 'home', redirectTo: ''},
];

@NgModule({
  declarations: [
    AppComponent,
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
  providers: [NotificationService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
