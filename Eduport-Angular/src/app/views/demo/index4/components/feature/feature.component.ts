import { Component, OnInit } from '@angular/core';
import { SubscriptionService, SubscriptionPlan } from '../../../../../UserFrontEnd/service/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { PaymentFormComponent } from '../../../../../UserFrontEnd/components/payment-form/payment-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../UserFrontEnd/service/auth.service';

@Component({
  selector: 'index4-feature',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {
  plans: SubscriptionPlan[] = [];
  loading = true;

  constructor(
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.subscriptionService.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading plans', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openPaymentDialog(plan: SubscriptionPlan): void {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please log in to subscribe to a plan', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      this.snackBar.open('User ID not found', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '500px',
      data: { 
        plan,
        userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Subscription successful!', 'Close', { duration: 3000 });
      }
    });
  }
}