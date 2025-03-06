import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8089/api/feedbacks'; // Adjust the API URL

  constructor(private http: HttpClient) {}

  getFeedbacks() {
    const url = `${this.apiUrl}`;
    console.log('Fetching feedbacks from:', url); // Debugging
    return this.http.get(url);
  }
  
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`);
  }
}