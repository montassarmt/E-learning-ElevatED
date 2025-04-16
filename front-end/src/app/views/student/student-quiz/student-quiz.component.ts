import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { Test } from '../../../GestionTests/Entity/Test';
import { Question } from '../../../GestionTests/Entity/Question';
import { QuizResult, QuizSubmission } from '../../../GestionTests/Entity/QuizSubmission';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-student-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-quiz.component.html',
  styleUrls: ['./student-quiz.component.scss'],
})
export class StudentQuizComponent implements OnInit, OnDestroy {
  quizzes: Test[] = [];
  selectedQuiz: Test | null = null;
  quizStarted: boolean = false;
  quizCompleted: boolean = false;
  quizResult: QuizResult | null = null;
  currentStep: number = 0;
  selectedAnswers: { [questionId: number]: number } = {};
  timeRemaining: number = 0;
  timerSubscription: Subscription | null = null;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  loadQuizzes(): void {
    this.quizService.getQuizTests().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
      },
      error: (err) => {
        console.error('Error loading quizzes:', err);
      },
    });
  }

  startQuiz(quiz: Test): void {
    this.selectedQuiz = quiz;
    this.quizStarted = true;
    this.currentStep = 0;
    this.selectedAnswers = {};
    this.timeRemaining = quiz.duration * 60; // Convert minutes to seconds
    this.startTimer();
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.submitQuiz();
      }
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  formatTime(seconds: number | undefined): string {
    // Handle undefined, negative, or invalid inputs
    if (seconds == null || seconds < 0 || isNaN(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60; // Fixed typo: Seconds -> seconds
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  selectAnswer(questionId: number, answerId: number): void {
    this.selectedAnswers[questionId] = answerId;
  }

  nextStep(): void {
    if (this.selectedQuiz && this.currentStep < this.selectedQuiz.questions.length - 1) {
      this.currentStep++;
    } else {
      this.submitQuiz();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitQuiz(): void {
    if (!this.selectedQuiz) return;

    const totalDurationSeconds = this.selectedQuiz.duration * 60;
    // Ensure timeTaken is non-negative and within bounds
    const timeTaken = Math.max(0, Math.min(totalDurationSeconds, totalDurationSeconds - this.timeRemaining));

    const submission: QuizSubmission = {
      testId: this.selectedQuiz.id,
      answers: Object.entries(this.selectedAnswers).map(([questionId, answerId]) => ({
        questionId: +questionId,
        answerId: +answerId,
      })),
    };

    this.quizService.submitQuiz(submission, timeTaken).subscribe({
      next: (result) => {
        this.quizResult = result;
        this.quizStarted = false;
        this.quizCompleted = true;
        this.stopTimer();
      },
      error: (err) => {
        console.error('Error submitting quiz:', err);
        alert('Failed to submit quiz. Please try again.');
      },
    });
  }

  backToQuizzes(): void {
    this.quizStarted = false;
    this.quizCompleted = false;
    this.selectedQuiz = null;
    this.quizResult = null;
    this.currentStep = 0;
    this.selectedAnswers = {};
    this.loadQuizzes();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}