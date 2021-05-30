import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';

@NgModule({
  imports: [RouterModule.forRoot([
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
      path: '**',
      component: HomePageComponent,
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
