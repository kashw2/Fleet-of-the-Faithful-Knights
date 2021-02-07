import {Injectable} from '@angular/core';
import {Either, Option} from 'funfix-core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   * Toast Service. Sends Toasts/Notifications to the client
   *
   * Any monadic methods should also be pure as part of this service so to see their reuse as part of other functions and methods
   *
   */

  constructor(private toastr: ToastrService) {
  }

  private showError(
    s: string,
    title: string = 'Error',
    duration: number = 3000,
  ): void {
    this.toastr.error(s, title);
  }

  private showInfo(
    s: string,
    title: string = 'Info',
    duration: number = 2500,
  ): void {
    this.toastr.info(s, title);
  }

  private showSuccess(
    s: string,
    title: string = 'Success',
    duration: number = 1500,
  ): void {
    this.toastr.success(s, title);
  }

  showToast(s: string, type: 'Success' | 'Error' | 'Warning' | 'Info' = 'Info', duration: number, title: string = type): void {
    switch (type) {
    case 'Success':
      return this.showSuccess(s, title, duration);
    case 'Error':
      return this.showError(s, title, duration);
    case 'Warning':
      return this.showWarning(s, title, duration);
    case 'Info':
      return this.showInfo(s, title, duration);
    }
  }

  showToastEither(e: Either<string, string>): void {
    return e.isRight() ? this.showSuccess(e.get()) : this.showError(e.value);
  }

  showToastOption(o: Option<string>): void {
    return o.nonEmpty() ? this.showSuccess(o.get()) : this.showError('Error');
  }

  private showWarning(s: string, title: string = 'Warning', duration: number = 2750): void {
    this.toastr.warning(s, title);
  }

}
