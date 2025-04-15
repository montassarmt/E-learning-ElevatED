//import { Component , Input, input } from '@angular/core'
import { ReviewListComponent } from './components/review-list/review-list.component'
import { ReviewAnalyticsComponent } from './components/review-analytics/review-analytics.component'
import { TopRatedCourseComponent } from './components/top-rated-course/top-rated-course.component'
//import { Feedback } from '../../../models/feedback';
import { CommonModule } from '@angular/common';  // Add this import
import { Component, Input } from '@angular/core';
import { NgbActiveModal , NgbModalModule } from '@ng-bootstrap/ng-bootstrap'; // Add this import
import { Feedback } from '@/app/models/feedback';
//import { Feedback } from '../../../models/feedback';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    ReviewListComponent,
    ReviewAnalyticsComponent,
    TopRatedCourseComponent,
    CommonModule
  ],
  templateUrl: './review.component.html',
  styles: ``,
  providers: [NgbActiveModal]
})
export class ReviewComponent {
  @Input() feedback!: Feedback; // Input property to receive feedback data

  constructor(public activeModal: NgbActiveModal) {}

  // Optional: Add methods to interact with the modal
  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
}
