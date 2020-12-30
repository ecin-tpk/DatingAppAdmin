import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  errorOccurred = new Subject<string>();

  // test = this.error.asObservable();

  constructor() {}

  showAlert(err: string) {
    this.errorOccurred.next(err);
  }
}
