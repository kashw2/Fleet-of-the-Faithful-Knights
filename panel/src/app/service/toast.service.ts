import {Injectable} from '@angular/core';
import {Either} from 'funfix-core';
import {ToastrService} from 'ngx-toastr';
import {List} from "immutable";
import {EitherUtils} from "@kashw2/lib-util";
import {Observable, zip} from "rxjs";
import {map} from "rxjs/operators";
import {Future} from "funfix";

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

  constructor(private toastrService: ToastrService) {
  }

  show(
    message: string,
    type: 'Error' | 'Warning' | 'Info' | 'Success',
    title: string = type,
    timeout: number = 1500,
  ): void {
    switch (type) {
      case 'Error':
        return this.showError(message, title, timeout);
      case 'Warning':
        return this.showWarning(message, title, timeout);
      case 'Info':
        return this.showInfo(message, title, timeout);
      case 'Success':
        return this.showSuccess(message, title, timeout);
    }
  }

  showAndRecoverList<A>(
    input: Either<string, List<A>>,
    success: string = '',
    lType: 'Error' | 'Warning' = 'Error',
    rType: 'Success' | 'Info' = 'Info',
    title: string = input.isRight() ? rType : lType,
  ): List<A> {
    if (input.isLeft()) {
      EitherUtils.leftTap(input, v => this.showError(v, title));
      return List<A>();
    }
    if (success.length > 0) {
      this.showSuccess(success, title);
    }
    return input.get();
  }

  showAndRecoverListObservable<A>(
    input: Observable<Either<string, List<A>>>,
    success: string = '',
    lType: 'Error' | 'Warning' = 'Error',
    rType: 'Success' | 'Info' = 'Info',
    title: Observable<string> = input.pipe(map(v => v.isRight() ? rType : lType)),
  ): Observable<List<A>> {
    return zip(input, title)
      .pipe(map(([either, label]) => this.showAndRecoverList<A>(either, label)));
  }

  showEither<A>(
    input: Either<string, A>,
    success: string = '',
  ): void {
    input.fold(
      (left) => this.show(left, 'Error'),
      (right) => {
        if (success.length > 0) {
          return this.show(success, "Success");
        }
        return;
      }
    );
  }

  private showError(message: string, title: string = 'Error!', timeout: number = 2500): void {
    this.toastrService.error(message, title, {
      timeOut: timeout,
      progressBar: true,
      enableHtml: true,
      newestOnTop: true
    });
  }

  private showInfo(message: string, title: string = 'Info', timeout: number = 5000): void {
    this.toastrService.info(message, title, {
      timeOut: timeout,
      progressBar: true,
      enableHtml: true,
      newestOnTop: true,
    });
  }

  /**
   * Allows error display based off of Left unit however is non pure and returns Future<void>
   */
  showSequenceFuture<A>(
    input: Future<Either<string, A>>,
    success: string = '',
    lType: 'Error' | 'Warning' = 'Error',
    rType: 'Success' | 'Info' = 'Info',
    title: Future<string> = input.map(v => v.isRight() ? rType : lType),
  ): Future<void> {
    return input.map(i => {
      if (i.isRight()) {
        this.show(success, rType);
      }
      EitherUtils.leftTap(i, v => this.show(v, lType));
    });
  }

  /**
   * Allows error display based off of Left unit however is non pure and returns Promise<void>
   */
  showSequencePromise<A>(
    input: Promise<Either<string, A>>,
    success: string = '',
    lType: 'Error' | 'Warning' = 'Error',
    rType: 'Success' | 'Info' = 'Info',
    title: Promise<string> = input.then(v => v.isRight() ? rType : lType),
  ): Promise<void> {
    return input.then(i => {
      if (i.isRight()) {
        this.show(success, rType);
      }
      EitherUtils.leftTap(i, v => this.show(v, lType));
    });
  }

  private showSuccess(message: string, title: string = 'Success!', timeout: number = 1750): void {
    this.toastrService.success(message, title, {
      timeOut: timeout,
      progressBar: true,
      enableHtml: true,
      newestOnTop: true,
    });
  }

  private showWarning(message: string, title: string = 'Warning!', timeout: number = 3000): void {
    this.toastrService.warning(message, title, {
      timeOut: timeout,
      progressBar: true,
      enableHtml: true,
      newestOnTop: true,
    });
  }

}
