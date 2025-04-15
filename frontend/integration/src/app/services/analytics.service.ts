import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:8085/api/feedbacks';
  constructor(private http: HttpClient) { }

  getAnalytics(){
    const url = `${this.apiUrl}/analytics`;
    console.log('Fetching feedbacks from:', url);
    return this.http.get(url);
  }
}
