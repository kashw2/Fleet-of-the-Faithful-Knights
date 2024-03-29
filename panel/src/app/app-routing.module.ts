import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {VotesComponent} from "./pages/votes/votes.component";
import {CreateVoteComponent} from "./pages/create-vote/create-vote.component";
import {VoteComponent} from "./pages/vote/vote.component";
import {CandidateGuard} from "./guards/candidate.guard";
import {VoteGuard} from "./guards/vote.guard";
import {GroupGuard} from "./guards/group.guard";
import {UsersComponent} from "./pages/users/users.component";
import {UserGuard} from "./guards/user.guard";

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
      canActivate: [GroupGuard],
    },
    {
      path: 'votes/create',
      component: CreateVoteComponent,
      canActivate: [CandidateGuard, GroupGuard],
    },
    {
      path: 'vote/:id',
      component: VoteComponent,
      canActivate: [VoteGuard],
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [UserGuard],
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
