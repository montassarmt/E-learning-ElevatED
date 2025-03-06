import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private temporaryEmail: string | null = null; // Stocker l'email temporairement

  // Méthode pour définir l'email temporaire
  setTemporaryEmail(email: string) {
    this.temporaryEmail = email;
  }

  // Méthode pour récupérer l'email temporaire
  getTemporaryEmail(): string | null {
    return this.temporaryEmail;
  }
  private apiUrl = 'http://localhost:8081/api/auth'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  // Méthode pour la connexion
  login(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, request);
  }

  // Méthode pour l'inscription
  signUp(request: any): Observable<any> {
    console.log('signupRequest', request);
    return this.http.post(`${this.apiUrl}/signup`, request);
  }

  // Méthode pour la réinitialisation du mot de passe
  forgotPassword(email: string): Observable<any> {
    const request = { email }; 
    return this.http.post(`${this.apiUrl}/forgot-password`, request);
  }
  verifyCode(request: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/verify-code`, request);
}
resetPassword(email: string, newPassword: string, confirmPassword: string) {
  const resetPasswordRequest = { email, newPassword, confirmPassword };
  return this.http.post(`${this.apiUrl}/reset-password`, resetPasswordRequest);
}
}