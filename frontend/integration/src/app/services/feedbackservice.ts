import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Feedback } from '@/app/models/feedback'

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8085/api/feedbacks';
  private feedbackChangedSource = new Subject<void>();
  feedbackChanged$ = this.feedbackChangedSource.asObservable();

  constructor(private http: HttpClient) {}

  /*getFeedbacks(page: number = 0, size: number = 10): Observable<PaginatedResponse<Feedback>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    console.log(`Fetching feedbacks - Page: ${page}, Size: ${size}`);

    return this.http.get<PaginatedResponse<Feedback>>(this.apiUrl, { params }).pipe(
      tap(response => console.log('Successfully fetched feedbacks', response)),
      catchError(error => {
        console.error('Error fetching feedbacks:', error);
        return throwError(error);
      })
    );
  }*/
    getFeedbacks(): Observable<Feedback[]> {
      return this.http.get<Feedback[]>(this.apiUrl);
    }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    console.log('Creating text feedback:', feedback);
    return this.http.post<Feedback>(this.apiUrl, feedback).pipe(
      tap((response) => {
        console.log('Feedback created successfully:', response);
        this.notifyFeedbackChanged();
      }),
      catchError(this.handleError)
    );
  }

  createFeedbackWithAudio(audioBlob: Blob, feedbackData: any): Observable<Feedback> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.mp3');
    formData.append('feedback', JSON.stringify(feedbackData));

    return this.http.post<Feedback>(`${this.apiUrl}/with-audio`, formData).pipe(
      tap(response => {
        console.log('Audio feedback created:', response);
        this.notifyFeedbackChanged();
      }),
      catchError(error => {
        console.error('Error creating audio feedback:', error);
        return throwError(error);
      })
    );
  }

  deleteFeedback(feedbackId: number): Observable<void> {
    console.log('Deleting feedback ID:', feedbackId);
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`).pipe(
      tap(() => {
        console.log('Feedback deleted successfully');
        this.notifyFeedbackChanged();
      }),
      catchError(this.handleError)
    );
  }

  private notifyFeedbackChanged() {
    console.log('Notifying subscribers of feedback changes');
    this.feedbackChangedSource.next();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);

    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      // Add specific error messages based on status code
      if (error.status === 404) {
        errorMessage = 'Resource not found';
      } else if (error.status === 400) {
        errorMessage = 'Bad request: ' + (error.error.message || 'Invalid data');
      } else if (error.status === 500) {
        errorMessage = 'Internal server error';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
