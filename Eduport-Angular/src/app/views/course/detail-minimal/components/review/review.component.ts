import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../../../../../models/feedback'; 
import { FeedbackService } from '../../../../../services/feedbackservice';

import { NgbRatingModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'minimal-review',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule , ReactiveFormsModule,CommonModule],
  templateUrl: './review.component.html',
  styles: ``
})
export class ReviewComponent {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      comments: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedbackType: ['TEXT', Validators.required],
      audioFilePath: [''], // Optionnel
      userId: [null, Validators.required] // ID de l'utilisateur
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedback: Feedback = this.feedbackForm.value;
      this.feedbackService.createFeedback(feedback).subscribe({
        next: (response) => {
          console.log('Feedback created:', response);
          // Réinitialiser le formulaire ou rediriger
        },
        error: (error) => {
          console.error('Error creating feedback:', error);
        }
      });
    }
  }
}