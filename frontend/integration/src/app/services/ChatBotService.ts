import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8085/api/chatbot'; // Spring Boot backend URL

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/message`, message);
  }
}
