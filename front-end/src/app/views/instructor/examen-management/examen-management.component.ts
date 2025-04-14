import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { ExpandedQuestion, Question } from '../../../GestionTests/Entity/Question';
import { Test, TestType } from '../../../GestionTests/Entity/Test';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-examen-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, RouterModule],
  templateUrl: './examen-management.component.html',
  styleUrls: ['./examen-management.component.scss']
})
export class ExamenManagementComponent implements OnInit {
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: TemplateRef<any>;
  @ViewChild('changeExamModal') changeExamModal!: TemplateRef<any>;

  questions: ExpandedQuestion[] = [];
  filteredQuestions: ExpandedQuestion[] = [];
  examens: Test[] = [];
  selectedExamenId: number | null = null;
  questionToDelete: number | null = null;
  questionToChangeExam: Question | null = null;
  newExamId: number | null = null;
  searchQuery: string = '';

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private quizService: QuizService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.quizService.getTests().subscribe({
      next: (examens) => {
        this.examens = examens.filter(test => test.type === TestType.EXAMEN);
        if (this.examens.length > 0) {
          this.selectedExamenId = this.examens[0].id;
          this.loadQuestions(this.selectedExamenId);
        }
      },
      error: (err) => console.error('Error loading examens:', err)
    });
  }

  loadQuestions(examenId: number): void {
    this.quizService.getQuestionsByTestId(examenId).subscribe({
      next: (questions) => {
        this.questions = questions.map(q => ({
          ...q,
          testTitle: this.examens.find(e => e.id === examenId)?.title || '',
          expanded: false
        }));
        this.filterQuestions();
        this.page = 1;
      },
      error: (err) => console.error('Error loading questions:', err)
    });
  }

  onExamenChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedExamenId = parseInt(selectElement.value);
    this.loadQuestions(this.selectedExamenId);
  }

  filterQuestions(): void {
    if (!this.searchQuery) {
      this.filteredQuestions = [...this.questions];
    } else {
      this.filteredQuestions = this.questions.filter(q =>
        q.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (q.testTitle && q.testTitle.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }

  toggleExpand(question: ExpandedQuestion): void {
    question.expanded = !question.expanded;
  }

  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }

  deleteQuestion(questionId: number): void {
    this.questionToDelete = questionId;
    this.modalService.open(this.deleteConfirmationModal);
  }

  confirmDelete(): void {
    if (this.questionToDelete) {
      this.quizService.deleteQuestion(this.questionToDelete).subscribe({
        next: () => {
          if (this.selectedExamenId) {
            this.loadQuestions(this.selectedExamenId);
          }
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error deleting question:', err)
      });
    }
  }

  openChangeExamModal(question: Question): void {
    this.questionToChangeExam = question;
    this.newExamId = question.test.id;
    this.modalService.open(this.changeExamModal);
  }

  confirmChangeExam(): void {
    if (this.questionToChangeExam && this.newExamId) {
      const updatedQuestion: Question = {
        ...this.questionToChangeExam,
        test: { id: this.newExamId },
        answers: [] // Maintain empty answers array for EXAMEN
      };

      this.quizService.updateQuestion(this.questionToChangeExam.id, updatedQuestion).subscribe({
        next: () => {
          if (this.selectedExamenId) {
            this.loadQuestions(this.selectedExamenId);
          }
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error changing exam:', err)
      });
    }
  }

  trackById(index: number, item: Test): number {
    return item.id;
  }
}