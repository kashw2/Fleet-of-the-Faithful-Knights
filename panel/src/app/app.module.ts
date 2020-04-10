import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {CookieService} from "ngx-cookie-service";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProfilePageComponent} from "./pages/login.page/profile-page.component";
import {NotificationService} from "./services/notification.service";

const routes: Routes = [
  {path: "", component: ProfilePageComponent},
  {path: "home", redirectTo: ""},
  {path: "login", component: ProfilePageComponent},
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilePageComponent,
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
  providers: [NotificationService, CookieService],
})
export class AppModule {
}
