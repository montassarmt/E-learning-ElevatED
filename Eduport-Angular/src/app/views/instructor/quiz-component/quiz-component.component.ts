import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from '../../../GestionTests/services/quiz-service.service';
import { Test, TestType } from '../../../GestionTests/Entity/Test';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAccordionModule, NgbPaginationModule],
  templateUrl: './quiz-component.component.html',
  styleUrls: ['./quiz-component.component.scss'],
})
export class QuizComponent implements OnInit {
  @ViewChild('addTestModal') addTestModal!: TemplateRef<any>;
  @ViewChild('modifyTestModal') modifyTestModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: TemplateRef<any>;

  tests: Test[] = [];
  filteredTests: Test[] = [];
  selectedTest: Test | null = null;
  newTest: Test = {
    id: 0,
    title: '',
    duration: 0,
    type: TestType.QUIZ,
    resultat: '',
    questions: [],
  };

  // Search and Sort
  searchQuery: string = '';
  sortBy: string = '';

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  private modalRef!: NgbModalRef;

  constructor(private quizService: QuizService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.quizService.getTests().subscribe((tests) => {
      this.tests = tests;
      this.filteredTests = [...this.tests]; // Initialize filteredTests
    });
  }

  onSearch(): void {
    this.filteredTests = this.tests.filter((test) =>
      test.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.page = 1; // Reset to the first page after search
  }

  onSortChange(): void {
    if (this.sortBy === 'title') {
      this.filteredTests.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'duration') {
      this.filteredTests.sort((a, b) => a.duration - b.duration);
    } else if (this.sortBy === 'type') {
      this.filteredTests.sort((a, b) => a.type.localeCompare(b.type));
    }
  }

  openAddTestModal(): void {
    this.modalService.open(this.addTestModal, { ariaLabelledBy: 'addTestModalLabel' });
  }

  saveTest(): void {
    this.quizService.createTest(this.newTest).subscribe((savedTest) => {
      this.tests.push(savedTest);
      this.filteredTests = [...this.tests]; // Update filteredTests
      this.newTest = { id: 0, title: '', duration: 0, type: TestType.QUIZ, resultat: '', questions: [] };
      this.modalService.dismissAll();
    });
  }

  openModifyTestModal(test: Test): void {
    this.selectedTest = { ...test }; // Create a copy of the selected test
    this.modalRef = this.modalService.open(this.modifyTestModal, { ariaLabelledBy: 'modifyTestModalLabel' });
  }

  modifyTest(): void {
    if (this.selectedTest) {
      this.quizService.updateTest(this.selectedTest.id, this.selectedTest).subscribe({
        next: (updatedTest) => {
          const index = this.tests.findIndex((test) => test.id === updatedTest.id);
          if (index !== -1) {
            this.tests[index] = updatedTest;
            this.filteredTests = [...this.tests]; // Update filteredTests
          }
          this.modalRef.close(); // Close the modal
        },
        error: (error) => {
          console.error('Error updating test:', error);
          alert('Failed to update the test. Please try again.');
        },
      });
    }
  }

  openDeleteConfirmationModal(test: Test): void {
    this.selectedTest = test;
    this.modalRef = this.modalService.open(this.deleteConfirmationModal, { ariaLabelledBy: 'deleteConfirmationModalLabel' });
  }

  deleteTest(): void {
    if (this.selectedTest) {
      this.quizService.deleteTest(this.selectedTest.id).subscribe(() => {
        this.tests = this.tests.filter((test) => test.id !== this.selectedTest!.id);
        this.filteredTests = [...this.tests]; // Update filteredTests
        this.selectedTest = null;
        this.modalRef.close();
      });
    }
  }
  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }
}