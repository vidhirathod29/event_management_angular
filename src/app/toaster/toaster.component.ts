import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomToasterService, Toast } from '../service/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [
    CommonModule,
    // ToastrModule.forRoot(), // Comment this out if you're not using ToastrService
  ],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  toast: Toast | null = null;
  progressBarWidth = 100;

  constructor(private toasterService: CustomToasterService) {}

  ngOnInit(): void {
    this.toasterService.toast$.subscribe((toast) => {
      if (toast) {
        this.toast = toast;
        this.startTimer(toast.duration);
      } else {
        this.toast = null;
      }
    });
  }

  startTimer(duration: number) {
    this.progressBarWidth = 100;
    const interval = 10; // Progress bar update interval (ms)
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      this.progressBarWidth -= step;
      if (this.progressBarWidth <= 0) {
        this.toasterService.clearToast();
        clearInterval(timer);
      }
    }, interval);
  }

  closeToast() {
    this.toasterService.clearToast();
  }
}
