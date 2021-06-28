import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  createVote(): void {
    return this.navigate('vote/create');
  }

  home(): void {
    return this.navigate('home');
  }

  navigate(route: string): void {
    if (!this.router.url.includes(route)) {
      console.log('Navigating to', route);
      this.router.navigate([route])
        .then(v => console.log('Navigated to', route))
        .catch(err => console.error('Error navigating to', route, err));
      return;
    }
    console.info(`Navigation request rejected ${this.router.url} = /${route}`);
    return;
  }

  votes(): void {
    return this.navigate('votes');
  }

}
