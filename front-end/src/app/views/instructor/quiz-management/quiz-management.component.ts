import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { ExpandedQuestion } from '../../../GestionTests/Entity/Question';
import { Test, TestType } from '../../../GestionTests/Entity/Test';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.scss']
})
export class QuizManagementComponent implements OnInit {
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: TemplateRef<any>;

  questions: ExpandedQuestion[] = [];
  filteredQuestions: ExpandedQuestion[] = [];
  tests: Test[] = [];
  selectedTestId: number | null = null;
  questionToDelete: number | null = null;
  searchQuery: string = '';

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private quizService: QuizService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.quizService.getTests().subscribe(tests => {
      this.tests = tests.filter(test => test.type === TestType.QUIZ);
      if (this.tests.length > 0) {
        this.selectedTestId = this.tests[0].id;
        this.loadQuestions(this.selectedTestId);
      }
    });
  }

  loadQuestions(testId: number): void {
    this.quizService.getQuestionsByTestId(testId).subscribe(questions => {
      this.questions = questions.map(q => ({
        ...q,
        testTitle: this.tests.find(t => t.id === testId)?.title || '',
        expanded: false,
        answers: q.answers || []
      }));
      this.filterQuestions();
      this.page = 1; // Reset to first page when questions change
    });
  }

  onTestChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTestId = parseInt(selectElement.value);
    this.loadQuestions(this.selectedTestId);
  }

  filterQuestions(): void {
    if (!this.searchQuery) {
      this.filteredQuestions = [...this.questions];
    } else {
      this.filteredQuestions = this.questions.filter(q =>
        q.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (q.testTitle && q.testTitle.toLowerCase().includes(this.searchQuery.toLowerCase()))
    )}
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
          if (this.selectedTestId) {
            this.loadQuestions(this.selectedTestId);
          }
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Error deleting question:', err);
        }
      });
    }
  }
}