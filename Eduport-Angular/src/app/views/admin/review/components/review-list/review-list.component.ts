import { Component, inject, OnInit } from '@angular/core';
import { NgbModal, NgbPaginationModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { Feedback } from '../../../../../models/feedback'; 
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
  currentPage: number = 0;
  itemsPerPage: number = 10;

  public modalService = inject(NgbModal);
  private feedbackService = inject(FeedbackService);

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    console.log('Loading feedbacks...'); // Debugging
    this.feedbackService.getFeedbacks().subscribe({
      next: (response:any) => {
        console.log('API Response:', response); // Debugging
        this.feedbacks = response
        this.totalFeedbacks = 0
      },
      error: (err) => {
        console.error('Failed to load feedbacks', err); // Debugging
        console.error('Error details:', err.message, err.status, err.url);  // Debugging
        // Optionally, show a user-friendly error message
      },
    });
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
    this.feedbackService.deleteFeedback(feedbackId).subscribe({
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