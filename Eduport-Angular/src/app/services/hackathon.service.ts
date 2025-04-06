import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hackathon {
  id?: number;
  nom: string;
  theme: string;
  description: string;
  dateDebut: string;
  dateFin: string;
}

@Injectable({
  providedIn: 'root'
})
export class HackathonService {
  private apiUrl = 'http://localhost:8087/api/hackathons';

  constructor(private http: HttpClient) {}

  getAllHackathons(): Observable<Hackathon[]> {
    return this.http.get<Hackathon[]>(this.apiUrl);
  }

  createHackathon(hackathon: Hackathon): Observable<Hackathon> {
    return this.http.post<Hackathon>(this.apiUrl, hackathon);
  }

  deleteHackathon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateHackathon(id: number, hackathon: Hackathon): Observable<Hackathon> {
    return this.http.put<Hackathon>(`${this.apiUrl}/${id}`, hackathon);
  }

  getHackathonById(id: number): Observable<Hackathon> {
    return this.http.get<Hackathon>(`${this.apiUrl}/${id}`);
  }


  getMyHackathons(email: string) {
    return this.http.get(`/api/participations/my?email=${email}`);
  }


}
