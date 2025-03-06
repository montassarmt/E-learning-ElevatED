import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test } from '../Entity/Test';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`).pipe(
      catchError((error) => {
        console.error('Error fetching tests:', error);
        return of([]);
      })
    );
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests`, test).pipe(
      catchError((error) => {
        console.error('Error saving test:', error);
        throw error;
      })
    );
  }

  updateTest(id: number, test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiUrl}/tests/${id}`, test).pipe(
      catchError((error) => {
        console.error('Error updating test:', error);
        throw error;
      })
    );
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tests/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting test:', error);
        throw error;
      })
    );
  }
}