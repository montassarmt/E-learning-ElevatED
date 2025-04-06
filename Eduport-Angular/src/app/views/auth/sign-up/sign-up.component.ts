import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const user = {
      ...this.registerForm.value,
      status: 'online'
    };

    this.http.post('http://localhost:8087/api/v1/users', user)
        .subscribe({
          next: () => {
            localStorage.setItem('connectedUser', JSON.stringify(user));
            this.router.navigate(['/sign-in']);
          },
          error: (err) => {
            console.error('Registration error:', err);
            alert('Registration failed.');
          }
        });
  }
}
