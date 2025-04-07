import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hackathon} from "@/app/services/hackathon.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl = 'http://localhost:8087/api/participations';
  constructor(private http: HttpClient) {}
  register(email: string, hackathonId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/register?email=${email}&hackathonId=${hackathonId}`, {});
  }

  unregister(email: string, hackathonId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/unregister?email=${email}&hackathonId=${hackathonId}`);
  }

  getMyHackathons(email: string): Observable<Hackathon[]> {
    return this.http.get<Hackathon[]>(`${this.baseUrl}/my?email=${email}`);
  }

}
