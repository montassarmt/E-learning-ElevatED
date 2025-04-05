import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  email: string = '';
  message: string | null = null; 
  isError: boolean = false; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onResetPassword() {
    this.message = null; // Réinitialiser le message
    this.isError = false; // Réinitialiser l'état d'erreur

    if (!this.email) {
      this.message = 'Veuillez entrer une adresse email valide.';
      this.isError = true;
      return;
    }

    
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        const verificationCode = response.verificationCode; // Récupérer le code de vérification

        // Stocker le code de vérification pour la comparaison ultérieure
        localStorage.setItem('verificationCode', verificationCode);
        this.authService.setTemporaryEmail(this.email);

        // Afficher un message de succès
        this.message = response.message || 'Un code de vérification a été envoyé à votre adresse email.';
        this.isError = false;

        // Rediriger l'utilisateur vers la page de vérification du code
        setTimeout(() => {
          this.router.navigate(['/verify-code']);
        }, 3000); // Redirection après 3 secondes
      },
      (error) => {
        console.error('Erreur :', error);
        this.message = error.error?.message || 'Une erreur s\'est produite lors de l\'envoi de l\'email.';
        this.isError = true;
      }
    );
  }
}