import { Component, inject } from '@angular/core';
import { NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { UserService } from '../../../../../UserFrontEnd/service/user.service';
import { PredictionService } from '../../../../../UserFrontEnd/service/prediction.service';
import { DataSharingService } from '../../../../../UserFrontEnd/service/data-sharing.service';

interface SimpleUser {
  id: number;
  username: string;
  rating: number | null;
  predicted: boolean;
  probabilities?: { [key: string]: number };
  isPredicting: boolean;
}

@Component({
  selector: 'review-list',
  standalone: true,
  imports: [NgbRatingModule, DecimalPipe, NgbPaginationModule],
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent {
  users: SimpleUser[] = [];
  page = 1;
  pageSize = 8;
  collectionSize = 0;
  isLoading = true;
  Math = Math;

  private userService = inject(UserService);
  private predictionService = inject(PredictionService);
  private dataSharing = inject(DataSharingService);

  constructor() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map(user => ({
          id: user.id,
          username: user.username,
          rating: null,
          predicted: false,
          isPredicting: false
        }));
        this.collectionSize = this.users.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    });
  }

  onPredictToggle(user: SimpleUser, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    
    if (isChecked && !user.predicted) {
      user.isPredicting = true;
      this.predictionService.predict(user.id.toString()).subscribe({
        next: (response) => {
          user.rating = response.predicted_satisfaction;
          user.predicted = true;
          user.isPredicting = false;
          this.updateAnalytics();
        },
        error: (err) => {
          console.error('Prediction error:', err);
          user.isPredicting = false;
          input.checked = false;
        }
      });
    } else if (!isChecked) {
      user.rating = null;
      user.predicted = false;
      this.updateAnalytics();
    }
  }

  private updateAnalytics() {
    const predictedUsers = this.users.filter(u => u.predicted);
    this.dataSharing.updatePredictedUsers(predictedUsers);
  }
}