// signin.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const user = this.loginForm.value;

    this.http.post<any>('http://localhost:8087/api/v1/users/login', user)
        .subscribe({
          next: (response) => {
            localStorage.setItem('connectedUser', JSON.stringify(response));
            this.router.navigate(['/index-1']);
          },
          error: () => {
            alert('Login and / or password is incorrect');
          }
        });
  }
}
