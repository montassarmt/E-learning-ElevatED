import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from '../Models/Entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private apiUrl = 'http://localhost:8088/Partnership/entreprises'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all entreprises
  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.apiUrl}/getListEntreprise`);
  }

  // Create a new entreprise
  createEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.apiUrl}/add`, entreprise);
  }

  // Delete an entreprise
  deleteEntreprise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Add entreprise and assign to a user
  addEntrepriseAndAssignToUser(entreprise: Entreprise, idUser: number): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.apiUrl}/AddEntrepriseandAssignToUser/${idUser}`, entreprise);
  }

  // Update an entreprise
  updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.apiUrl}/update/${id}`, entreprise);
  }
  getEntrepriseById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }
}