import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showFailureNotification(message: string, title: string = 'Uh oh!'): void {
    this.toastr.error(message, title, {timeOut: 2500, progressBar: true, enableHtml: true});
  }

  showInfoNotification(message: string, title: string = 'Info'): void {
    this.toastr.info(message, title, {timeOut: 5000, progressBar: true, enableHtml: true});
  }

  showSuccessNotification(message: string, title: string = 'Success!'): void {
    this.toastr.success(message, title, {timeOut: 1500, progressBar: true, enableHtml: true});
  }

  showWarningNotification(message: string, title: string = 'Warning'): void {
    this.toastr.warning(message, title, {timeOut: 3000, progressBar: true, enableHtml: true});
  }

}
