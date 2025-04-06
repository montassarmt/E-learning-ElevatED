import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

        const credentials = this.loginForm.value;

        this.http.post<any>('http://localhost:8087/api/v1/users/login', credentials)
            .subscribe({
                next: (user) => {
                    // ✅ Enregistrer l'utilisateur complet
                    localStorage.setItem('connectedUser', JSON.stringify(user));

                    // ✅ Sauvegarder uniquement l'email pour les requêtes
                    localStorage.setItem('email', user.email);

                    // ✅ Rediriger vers l'accueil ou autre
                    this.router.navigate(['/index-1']);
                },
                error: () => {
                    alert('Email ou mot de passe incorrect');
                }
            });
    }
}
