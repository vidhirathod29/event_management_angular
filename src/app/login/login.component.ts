import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  errorMessage: string = '';
  year: number = new Date().getFullYear();
  loading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly toasterService: CustomToasterService,
    private loaderService: LoaderService
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
        this.toasterService.success('This is a success message!', 5000);
        this.loaderService.hide();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Login failed', error);
        this.errorMessage = 'Invalid login credentials';
      },
      complete: () => {
        this.loaderService.hide();
        this.loading = false;
      },
    });
  }
}
