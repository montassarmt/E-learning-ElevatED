import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { Question } from '../../../GestionTests/Entity/Question';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss'],
})
export class QuizPreviewComponent implements OnInit {
  questions: Question[] = [];
  testId!: number;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getQuestionsByTestId(this.testId).subscribe({
      next: (questions) => {
        this.questions = questions;
      },
      error: (err) => {
        console.error('Error loading questions:', err);
      },
    });
  }
}
