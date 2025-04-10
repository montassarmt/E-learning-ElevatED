import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { Test } from '../../../GestionTests/Entity/Test';
import { Question } from '../../../GestionTests/Entity/Question';

@Component({
  selector: 'app-add-question-to-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-question-to-quiz.component.html',
  styleUrls: ['./add-question-to-quiz.component.scss'],
})
export class AddQuestionToQuizComponent implements OnInit {
  quizzes: Test[] = [];
  questionForm!: FormGroup;

  constructor(private quizService: QuizService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadQuizzes();
    this.initForm();
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      quizSelect: ['', Validators.required],
      questionText: ['', Validators.required],
      answers: this.fb.array([this.createAnswerGroup(), this.createAnswerGroup(), this.createAnswerGroup(), this.createAnswerGroup()]),
      correctAnswerIndex: [null, Validators.required],
    });
  }

  createAnswerGroup(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  setCorrectAnswer(index: number): void {
    this.questionForm.patchValue({ correctAnswerIndex: index });
  }

  loadQuizzes(): void {
    this.quizService.getTests().subscribe((quizzes) => {
      this.quizzes = quizzes.filter((q) => q.type === 'QUIZ');
    });
  }

  saveQuestion(): void {
    if (this.questionForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }
  
    const formValue = this.questionForm.value;
    const correctIndex = formValue.correctAnswerIndex;
  
    // Construction correcte de l'objet Question
    const newQuestion: Question = {
      id: 0,
      text: formValue.questionText,
      test: { id: +formValue.quizSelect },  // convert to number
      answers: formValue.answers.map((answer: any, index: number) => ({
        text: answer.text,
        isCorrect: index === correctIndex,
      })),
    };
  
    console.log('Sending question:', newQuestion);
  
    this.quizService.createQuestion(newQuestion).subscribe({
      next: (savedQuestion) => {
        console.log('Question saved:', savedQuestion);
        alert('Question saved successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error saving question:', error);
        alert('Failed to save the question. Please try again.');
      },
    });
  }
  
  
  
  
  

  resetForm(): void {
    this.questionForm.reset();
    this.initForm();
  }

  trackById(index: number, item: Test): number {
    return item.id;
  }
}
