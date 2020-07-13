import {Injectable} from "@angular/core";
import {Either, None, Option, Some} from "funfix-core";
import {List, Set} from "immutable";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.preventDuplicates = true;
  }

  showFailureNotification(message: string, title: string = "Uh oh!", timeout: number = 2500): void {
    this.toastr.error(message, title, {timeOut: timeout, progressBar: true, enableHtml: true, newestOnTop: true});
  }

  showFailureNotificationAndRecoverList<T>(e: Either<string, List<T>>, title: string = "Uh oh!", timeout?: number): List<T> {
    if (e.isLeft()) {
      this.showFailureNotification(e.value, title, timeout);
      return List();
    }
    return e.get();
  }

  showFailureNotificationAndRecoverSet<T>(e: Either<string, Set<T>>, title: string = "Uh oh!", timeout?: number): Set<T> {
    if (e.isLeft()) {
      this.showFailureNotification(e.value, title, timeout);
      return Set();
    }
    return e.get();
  }

  showInfoNotification(message: string, title: string = "Info", timeout: number = 5000): void {
    this.toastr.info(message, title, {timeOut: timeout, progressBar: true, enableHtml: true, newestOnTop: true});
  }

  showNotificationBasedOnEither<T>(e: Either<string, T>, successMessage: string, timeout?: number): Option<T> {
    if (e.isLeft()) {
      this.showFailureNotification(e.value, "Uh oh!", timeout);
      return None;
    }
    this.showSuccessNotification(successMessage, "Success", timeout);
    return Some(e.get());
  }

  // TODO: Merge this with showNotificationBasedOnEither()
  showNotificationBasedOnEitherEffector<T>(e: Either<string, T>, f: (value: T) => string, timeout?: number): Option<T> {
    if (e.isLeft()) {
      this.showFailureNotification(e.value);
      return None;
    }
    return this.showNotificationBasedOnEither(e, f(e.get()), timeout);
  }

  showSuccessNotification(message: string, title: string = "Success!", timeout: number = 1500): void {
    this.toastr.success(message, title, {timeOut: timeout, progressBar: true, enableHtml: true, newestOnTop: true});
  }

  showWarningNotification(message: string, title: string = "Warning", timeout: number = 3000): void {
    this.toastr.warning(message, title, {timeOut: timeout, progressBar: true, enableHtml: true, newestOnTop: true});
  }

}
