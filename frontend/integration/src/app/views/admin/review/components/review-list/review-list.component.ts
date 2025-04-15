import { Component, inject, OnInit  } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal, NgbPaginationModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { Feedback,PaginatedResponse } from '../../../../../models/feedback'; 
import { FeedbackService } from '../../../../../services/feedbackservice';

@Component({
  selector: 'review-list',
  standalone: true,
  imports: [
    NgbRatingModule,
    DecimalPipe,
    NgbPaginationModule,
    NgbTooltipModule,
  ],
  templateUrl: './review-list.component.html',
  styles: ``,
})
export class ReviewListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  totalFeedbacks: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSize = 10;
  isLoading = false;
  feedbackData?: PaginatedResponse<Feedback>;

  public modalService = inject(NgbModal);
  private feedbackService = inject(FeedbackService);
  private destroy$ = new Subject<void>();


  ngOnInit() {
    this.loadFeedbacks();
  }

  /*loadFeedbacks() {
    console.log('Loading feedbacks...'); // Debugging
    this.feedbackService.getFeedbacks(this.currentPage  , this.pageSize).subscribe({
      next: (response:any) => {
        console.log('API Response:', response); // Debugging
        this.feedbacks = response.content;
        this.totalFeedbacks = response.totalElements;
        //this.totalFeedbacks = 0
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load feedbacks', err); // Debugging
        console.error('Error details:', err.message, err.status, err.url);  // Debugging
        // Optionally, show a user-friendly error message
      },
    });
  }*/
    loadFeedbacks() {
      this.isLoading = true;
      this.feedbackService.getFeedbacks().subscribe({
        next: (feedbacks) => {
          this.feedbacks = feedbacks;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading feedbacks', err);
          this.isLoading = false;
        }
      });
    }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getSafeAudioUrl(path: string): string {
    if (!path) return '';
    // Handle Windows paths if needed
    const cleanPath = path.replace(/\\/g, '/');
    return `${this.getSafeAudioUrl}/audio?path=${encodeURIComponent(cleanPath)}`;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadFeedbacks();
  }

  /*openModal(feedback: Feedback) {
    const modalRef = this.modalService.open(ReviewComponent, { centered: true });
    modalRef.componentInstance.feedback = feedback;
  }*/

  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.feedbacks = this.feedbacks.filter(f => f.feedbackId !== feedbackId);
        this.totalFeedbacks--;
      },
      error: (err) => console.error('Failed to delete feedback', err),
    });
  }

  // Method to refresh feedback list after adding a new feedback
  refreshFeedbacks() {
    this.loadFeedbacks();
  }
}