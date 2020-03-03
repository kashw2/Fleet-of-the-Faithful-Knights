import {Component, OnInit, Renderer2} from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private notificationService: NotificationService) {
  }

  getGroupName(): string {
    return 'Developer';
  }

  getLoggedInUsername(): string {
    return 'Keanu#1337';
  }

  ngOnInit() {
    this.showLoginToast();
  }

  showLoginToast(): void {
    this.notificationService.showSuccessNotification('Login Successful!');
  }

}
