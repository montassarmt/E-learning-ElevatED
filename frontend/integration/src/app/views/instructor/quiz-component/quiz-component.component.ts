import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from '@/app/GestionTests/services/quiz-service.service';
import { Test, TestType } from '@/app/GestionTests/Entity/Test';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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

  searchQuery: string = '';
  sortBy: string = '';
  page: number = 1;
  pageSize: number = 5;
  private modalRef!: NgbModalRef;

  constructor(
    private quizService: QuizService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTests();
  }

  someAction(): void {
    this.toastr.success('Well done!', 'Success');
    this.toastr.error('Oops! Something went wrong.', 'Error');
  }

  loadTests(): void {
    this.quizService.getTests().subscribe((tests) => {
      this.tests = tests;
      this.filteredTests = [...this.tests];
    });
  }

  onSearch(): void {
    this.filteredTests = this.tests.filter((test) =>
      test.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.page = 1;
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
    this.quizService.createTest(this.newTest).subscribe(
      (savedTest) => {
        this.tests.push(savedTest);
        this.filteredTests = [...this.tests];
        this.newTest = { id: 0, title: '', duration: 0, type: TestType.QUIZ, resultat: '', questions: [] };
        this.modalService.dismissAll();
        this.toastr.success('Test added successfully', 'Success');
      },
      (error) => {
        this.toastr.error('Failed to add the test', 'Error');
      }
    );
  }

  openModifyTestModal(test: Test): void {
    this.selectedTest = { ...test };
    this.modalRef = this.modalService.open(this.modifyTestModal, { ariaLabelledBy: 'modifyTestModalLabel' });
  }

  modifyTest(): void {
    if (this.selectedTest) {
      this.quizService.updateTest(this.selectedTest.id, this.selectedTest).subscribe({
        next: (updatedTest) => {
          const index = this.tests.findIndex((test) => test.id === updatedTest.id);
          if (index !== -1) {
            this.tests[index] = updatedTest;
            this.filteredTests = [...this.tests];
          }
          this.modalRef.close();
          this.toastr.success('Test updated successfully', 'Success');
        },
        error: (error) => {
          console.error('Error updating test:', error);
          this.toastr.error('Failed to update the test', 'Error');
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
      this.quizService.deleteTest(this.selectedTest.id).subscribe(
        () => {
          this.tests = this.tests.filter((test) => test.id !== this.selectedTest!.id);
          this.filteredTests = [...this.tests];
          this.selectedTest = null;
          this.modalRef.close();
          this.toastr.info('Test deleted successfully', 'Info');
        },
        (error) => {
          this.toastr.error('Failed to delete the test', 'Error');
        }
      );
    }
  }

  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }
}
