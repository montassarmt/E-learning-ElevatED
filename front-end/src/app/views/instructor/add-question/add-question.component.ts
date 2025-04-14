import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { Question } from '../../../GestionTests/Entity/Question';
import { Test } from '../../../GestionTests/Entity/Test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  examens: Test[] = [];
  selectedExamen: Test | null = null;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    this.questionForm = this.fb.group({
      examenSelect: ['', Validators.required],
      questionText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.quizService.getTests().subscribe({
      next: (tests) => {
        this.examens = tests.filter(test => test.type === 'EXAMEN');
      },
      error: (err) => {
        console.error('Error loading examens:', err);
      }
    });
  }

  onExamenSelect(): void {
    const examenId = this.questionForm.get('examenSelect')?.value;
    this.selectedExamen = this.examens.find(e => e.id === examenId) || null;
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const newQuestion: Question = {
        id: 0,
        text: this.questionForm.value.questionText,
        test: { id: this.questionForm.value.examenSelect },
        answers: [] // No answers for EXAMEN
      };

      this.quizService.createQuestion(newQuestion).subscribe({
        next: (question) => {
          alert('Question added successfully!');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating question:', err);
          alert('Error creating question');
        }
      });
    }
  }

  resetForm(): void {
    this.questionForm.reset();
    this.selectedExamen = null;
  }

  trackById(index: number, item: Test): number {
    return item.id;
  }
}