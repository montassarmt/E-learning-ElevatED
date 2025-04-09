import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partnership } from '../Models/Partnership';

@Injectable({
  providedIn: 'root'
})
export class PartnershipService {

  private apiUrl = 'http://localhost:8088/Partnership/partnerships'; // Adjust with your backend URL
  ; // Base URL for your API

  constructor(private http: HttpClient) { }

  // Create a new partnership
  createPartnership(partnership: Partnership): Observable<Partnership> {
    return this.http.post<Partnership>(`${this.apiUrl}/add`, partnership);
  }

  // Get a partnership by ID
  getPartnershipById(id: number): Observable<Partnership> {
    return this.http.get<Partnership>(`${this.apiUrl}/${id}`);
  }

  // Get all partnerships
  getAllPartnerships(): Observable<Partnership[]> {
    return this.http.get<Partnership[]>(`${this.apiUrl}/all`);
  }

  // Update a partnership
  updatePartnership(id: number, partnership: Partnership): Observable<Partnership> {
    return this.http.put<Partnership>(`${this.apiUrl}/update/${id}`, partnership);
  }

  // Delete a partnership
  deletePartnership(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Delete all partnerships
  deleteAllPartnerships(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteAll`);
  }

  // Apply for a partnership
  applyForPartnership(entrepriseId: number, proposalId: number): Observable<Partnership> {
    const params = new HttpParams()
      .set('entrepriseId', entrepriseId.toString())
      .set('proposalId', proposalId.toString());
    
    return this.http.post<Partnership>(`${this.apiUrl}/applyForPartnership`, params);
  }

  // Accept a partnership
  acceptPartnership(partnershipId: number, entrepriseId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/accept/${partnershipId}/${entrepriseId}`, {});
  }

  // Generate PDF for partnership
  generatePartnershipPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/partnerships/${id}/pdf`, {
      responseType: 'blob'
    });
  }
}
