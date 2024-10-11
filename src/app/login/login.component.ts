import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomToasterService } from '../service/toaster.service';
import { LoaderService } from '../service/loader.service';
import { label, title, validation } from '../helper/messages';
import { BaseComponent } from '../base-component-button/base-component-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, BaseComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  errorMessage: string = '';
  year: number = new Date().getFullYear();
  loading = false;

  welcomeBack = title.WELCOME_BACK;
  signIn = label.SIGN_IN;
  password = label.PASSWORD;
  email = label.EMAIL;
  emailValidation = validation.EMAIL_VALID;
  emailRequired = validation.EMAIL_REQUIRED;
  passwordRequired = validation.PASSWORD_REQUIRED;
  passwordMinLength = validation.PASSWORD_MIN_6;
  forgotPassword = label.FORGOT_PASSWORD;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly toasterService: CustomToasterService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const { email, password } = this.loginForm.value;
    this.loaderService.show();
    this.loginService.login(email, password).subscribe({
      next: (response) => {
        const token = response.data;
        sessionStorage.setItem('jwtToken', token);
        if (token) {
          const decoded = jwtDecode<any>(token);
          sessionStorage.setItem('id', decoded.id);
        }
        this.toasterService.success(response.message, 5000);
        this.loaderService.hide();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Login failed', error);
        this.toasterService.error(error.message, 5000);
      },
      complete: () => {
        this.loaderService.hide();
        this.loading = false;
      },
    });
  }
}
