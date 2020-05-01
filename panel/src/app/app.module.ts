import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {CookieService} from "ngx-cookie-service";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {StatusIconComponent} from "./components/status-icon/status-icon.component";
import {CreateVoteModalComponent} from "./modals/create-vote-modal/create-vote-modal.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {SsoPageComponent} from "./pages/sso-page/sso-page.component";
import {VotesPageComponent} from "./pages/votes-page/votes-page.component";
import {NotificationService} from "./services/notification.service";
import {userReducer} from "./store/reducers/user-reducer";

const routes: Routes = [
  {path: "", component: ProfilePageComponent},
  {path: "home", component: ProfilePageComponent},
  {path: "sso", component: SsoPageComponent},
  {path: "profile", component: ProfilePageComponent},
  {path: "votes", component: VotesPageComponent},
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfilePageComponent,
    VotesPageComponent,
    CreateVoteModalComponent,
    SsoPageComponent,
    StatusIconComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  providers: [NotificationService, CookieService],
})
export class AppModule {
}
