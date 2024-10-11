import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './toaster/toaster.component';
import { HorizontalLoaderComponent } from './horizontal-loader/horizontal-loader.component';
import { BaseComponent } from './base-component-button/base-component-button.component';

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
    BaseComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_event_management';
}
