import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './horizontal-loader.component.html',
  styleUrl: './horizontal-loader.component.css'
})
export class HorizontalLoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
