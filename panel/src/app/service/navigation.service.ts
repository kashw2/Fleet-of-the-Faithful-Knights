import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Option} from 'funfix-core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
  }

  goToHome(): void {
    this.navigate('home');
  }

  goToProfile(id: Option<string>): void {
    if (id.nonEmpty()) {
      this.navigate(`profile/${id.get()}`);
      return;
    }
    this.navigate('home');
  }

  goToVote(id: Option<string>): void {
    if (id.nonEmpty()) {
      this.navigate(`voting/vote/${id.get()}`);
      return;
    }
    this.navigate('home');
  }

  goToVotingPanel(): void {
    this.navigate('voting/votes');
  }

  navigate(route: string): void {
    console.log(`Navigating to ${route}`);
    this.router.navigate([route]);
  }

}
