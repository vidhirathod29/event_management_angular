import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warn';
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class CustomToasterService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  constructor() {}

  success(message: string, duration: number = 5000) {
    this.showToast(message, 'success', duration);
  }

  error(message: string, duration: number = 5000) {
    this.showToast(message, 'error', duration);
  }

  warn(message: string, duration: number = 5000) {
    this.showToast(message, 'warn', duration);
  }

  private showToast(
    message: string,
    type: 'success' | 'error' | 'warn',
    duration: number
  ) {
    this.toastSubject.next({ message, type, duration });
  }

  clearToast() {
    this.toastSubject.next(null);
  }
}
