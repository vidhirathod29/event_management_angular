import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './toaster/toaster.component';
import { HorizontalLoaderComponent } from './horizontal-loader/horizontal-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterComponent,
    HorizontalLoaderComponent,
  ],
  template: `<router-outlet></router-outlet><app-toaster></app-toaster
    ><app-horizontal-loader></app-horizontal-loader>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_event_management';
}
