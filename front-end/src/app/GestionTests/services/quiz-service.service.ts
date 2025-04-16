import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Test } from '../Entity/Test';
import { Question } from '../Entity/Question';
import { QuizResult, QuizSubmission } from '../Entity/QuizSubmission';
import { Answer } from '../Entity/Answer';
import { User, Role } from '../../GestionTests/Entity/User';


@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:8089/api';

  constructor(private http: HttpClient) {}

   // Add tutorId parameter to createTest
   createTest(test: Test, tutorId: number): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests?tutorId=${tutorId}`, test).pipe(
      catchError((error) => {
        console.error('Error saving test:', error);
        throw error;
      })
    );
  }
  

  getTutors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/role/TUTOR`).pipe(
      map((tutors: any[]) => tutors.map(tutor => ({
        id: tutor.id,
        username: tutor.username,
        email: tutor.email,
        role: tutor.role as Role,
        status: tutor.status || 'ACTIVE' // Default value if status is missing
      } as User))), // Explicitly type the mapped object
      catchError((error) => {
        console.error('Error fetching tutors:', error);
        return of([]);
      })
    );
  }


  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`).pipe(
      catchError((error) => {
        console.error('Error fetching tests:', error);
        return of([]);
      })
    );
  }

  // createTest(test: Test): Observable<Test> {
  //   return this.http.post<Test>(`${this.apiUrl}/tests`, test).pipe(
  //     catchError((error) => {
  //       console.error('Error saving test:', error);
  //       throw error;
  //     })
  //   );
  // }

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

  

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, question).pipe(
      catchError((error) => {
        console.error('Error saving question:', error);
        throw error;
      })
    );
  }
  
  getQuestionsByTestId(testId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions/test/${testId}`).pipe(
      catchError((error) => {
        console.error('Error fetching questions:', error);
        return of([]);
      })
    );
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}`, question).pipe(
      catchError((error) => {
        console.error('Error updating question:', error);
        throw error;
      })
    );
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questions/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting question:', error);
        throw error;
      })
    );
  }
  getQuizTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests/type/quiz`).pipe(
      catchError((error) => {
        console.error('Error fetching quiz tests:', error);
        return of([]);
      })
    );
  }
  
  submitQuiz(submission: QuizSubmission, timeTaken: number): Observable<QuizResult> {
    // Convert timeTaken to milliseconds if your backend expects it
    const timeTakenMs = timeTaken * 1000;
    
    return this.http.post<QuizResult>(
      `${this.apiUrl}/quiz/submit?timeTaken=${timeTakenMs}`,
      submission
    ).pipe(
      catchError((error) => {
        console.error('Error submitting quiz:', error);
        throw error;
      })
    );
  }
  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/answers/question/${questionId}`).pipe(
      catchError((error) => {
        console.error('Error fetching answers:', error);
        return of([]);
      })
    );
  }
  
  
}