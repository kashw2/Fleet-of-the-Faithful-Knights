import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {VoteComponent} from "./pages/vote/vote.component";
import {CreateVoteComponent} from "./pages/create-vote/create-vote.component";

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
      component: VoteComponent,
    },
    {
      path: 'vote/create',
      component: CreateVoteComponent,
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
