import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface PredictionRequest {
  userId: string;
}

// Ajoutez cette interface dans votre service ou dans un fichier de types
export interface PredictionResponse {
  predicted_satisfaction: number;
  probabilities: {
    [key: string]: number;
  };
  user_id: number;
}
interface ApiError {
  code: string;
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private readonly apiUrl = 'http://localhost:8081/api/predict'; 

  constructor(private http: HttpClient) { }

  predict(userId: string): Observable<PredictionResponse> {
    const request: PredictionRequest = { userId };
    
    return this.http.post<PredictionResponse>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}