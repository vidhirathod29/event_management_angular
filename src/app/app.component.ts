import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './toaster/toaster.component';
import { HorizontalLoaderComponent } from './horizontal-loader/horizontal-loader.component';
import { BaseComponent } from './base-component-button/base-component-button.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule, 
    MatInputModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatIconModule,
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
