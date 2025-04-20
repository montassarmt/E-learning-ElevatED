import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Soumission {
  id: number;
  email: string;
  userId: number;
  reponse: string;
  dateSoumission: string;
  note?: number;
  commentaire?: string;
  enCorrection?: boolean; //
}

@Injectable({ providedIn: 'root' })
export class SoumissionService {
  private baseUrl = 'http://localhost:8085/api/soumissions'; // ✅ backend API URL

  constructor(private http: HttpClient) {}

  submitSolution(userId: number, hackathonId: number, reponse: string) {
    return this.http.post(`${this.baseUrl}/submit?userId=${userId}&hackathonId=${hackathonId}`, reponse, {
      responseType: 'text',
        headers: { 'Content-Type': 'text/plain' } // ✅ essentiel pour le backend
    });
  }
  getSoumissionsByHackathon(hackathonId: number) {
    return this.http.get<Soumission[]>(`${this.baseUrl}/by-hackathon/${hackathonId}`);
  }
  noterSoumission(soumissionId: number, note: number) {
    return this.http.put(`${this.baseUrl}/${soumissionId}/noter?note=${note}`, {});
  }
}
