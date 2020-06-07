import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {CookieService} from "ngx-cookie-service";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ProfileNewsContainerComponent} from "./children/profile-news-container/profile-news-container.component";
import {HeaderComponent} from "./components/header/header.component";
import {PostContainerComponent} from "./components/post-container/post-container.component";
import {VoteTableComponent} from "./components/vote-table/vote-table.component";
import {CreateVoteModalComponent} from "./modals/create-vote-modal/create-vote-modal.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {VotesPageComponent} from "./pages/votes-page/votes-page.component";
import {NotificationService} from "./services/notification.service";
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { CandidateExtraInfoContainerComponent } from './children/candidate-extra-info-container/candidate-extra-info-container.component';
import { MessageContainerComponent } from './components/message-container/message-container.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    ProfilePageComponent,
    PostContainerComponent,
    ProfileNewsContainerComponent,
    VotesPageComponent,
    VoteTableComponent,
    CreateVoteModalComponent,
    VotePageComponent,
    CandidateExtraInfoContainerComponent,
    MessageContainerComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [NotificationService, CookieService],
})

export class AppModule {
}
