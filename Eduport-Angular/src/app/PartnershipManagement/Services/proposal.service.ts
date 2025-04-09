import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../Models/Proposal';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private apiUrl = 'http://localhost:8088/Partnership/proposals'; // Adjust with your backend URL

  constructor(private http: HttpClient) {}

  // Get all proposals
  getAllProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.apiUrl}/all`);
  }

  // Get proposal by ID
  getProposalById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.apiUrl}/${id}`);
  }

  // Create a new proposal
  createProposal(proposal: Proposal): Observable<Proposal> {
    return this.http.post<Proposal>(`${this.apiUrl}/add`, proposal);
  }

  // Update an existing proposal
  updateProposal(id: number, proposal: Proposal): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.apiUrl}/update/${id}`, proposal);
  }

  // Delete a proposal
  deleteProposal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }}
