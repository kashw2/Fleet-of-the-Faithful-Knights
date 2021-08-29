import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {VotesComponent} from "./pages/votes/votes.component";
import {CreateVoteComponent} from "./pages/create-vote/create-vote.component";
import {VoteComponent} from "./pages/vote/vote.component";
import {CandidateGuard} from "./guards/candidate.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'votes',
      component: VotesComponent,
    },
    {
      path: 'votes/create',
      component: CreateVoteComponent,
      canActivate: [CandidateGuard],
    },
    {
      path: 'vote/:id',
      component: VoteComponent,
    },
    {
      path: '**',
      component: HomeComponent,
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
