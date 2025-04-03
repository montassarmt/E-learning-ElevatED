import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SeanceCoaching {
  id?: number;
  nom: string;
  description: string;
  dateDebut: string; // ISO format expected (e.g., 2025-04-05T15:00:00)
  dateFin: string;
  lienMeet?: string;
}

@Injectable({ providedIn: 'root' })
export class CoachingService {
  private apiUrl = 'http://localhost:8087/api/seances';

  constructor(private http: HttpClient) {}

  getAllSeances(): Observable<SeanceCoaching[]> {
    return this.http.get<SeanceCoaching[]>(this.apiUrl);
  }

  createSeance(seance: SeanceCoaching): Observable<SeanceCoaching> {
    return this.http.post<SeanceCoaching>(this.apiUrl, seance);
  }

  getSeanceById(id: number): Observable<SeanceCoaching> {
    return this.http.get<SeanceCoaching>(`${this.apiUrl}/${id}`);
  }

  deleteSeance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
