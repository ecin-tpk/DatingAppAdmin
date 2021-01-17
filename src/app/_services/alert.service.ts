import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Error = {
  type: 'danger' | 'success';
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  // errorOccurred = new Subject<string>();
  errorOccurred = new Subject<Error>();

  // test = this.error.asObservable();

  constructor() {}

  showAlert(type: Error['type'], message: string) {
    const error: Error = {
      type,
      message,
    };
    this.errorOccurred.next(error);
  }
}
