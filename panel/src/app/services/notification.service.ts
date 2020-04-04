import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showFailureNotification(message: string, title: string = "Uh oh!", timeout?: number): void {
    if (timeout) {
      this.toastr.error(message, title, {timeOut: timeout, progressBar: true, enableHtml: true});
      return;
    }
    this.toastr.error(message, title, {timeOut: 2500, progressBar: true, enableHtml: true});
  }

  showInfoNotification(message: string, title: string = "Info", timeout?: number): void {
    if (timeout) {
      this.toastr.info(message, title, {timeOut: timeout, progressBar: true, enableHtml: true});
      return;
    }
    this.toastr.info(message, title, {timeOut: 5000, progressBar: true, enableHtml: true});
  }

  showSuccessNotification(message: string, title: string = "Success!", timeout?: number): void {
    if (timeout) {
      this.toastr.success(message, title, {timeOut: timeout, progressBar: true, enableHtml: true});
      return;
    }
    this.toastr.success(message, title, {timeOut: 1500, progressBar: true, enableHtml: true});
  }

  showWarningNotification(message: string, title: string = "Warning", timeout?: number): void {
    if (timeout) {
      this.toastr.warning(message, title, {timeOut: timeout, progressBar: true, enableHtml: true});
      return;
    }
    this.toastr.warning(message, title, {timeOut: 3000, progressBar: true, enableHtml: true});
  }

}
