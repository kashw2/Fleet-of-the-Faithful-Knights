import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {VotingPanelPageComponent} from './pages/voting-panel-page/voting-panel-page.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomePageComponent
	},
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'voting-panel',
    component: VotingPanelPageComponent,
  },
	{
		path: '**',
		component: HomePageComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
