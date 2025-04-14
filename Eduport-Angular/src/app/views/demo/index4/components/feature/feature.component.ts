import { Component, OnInit } from '@angular/core';
import { SubscriptionService, SubscriptionPlan } from '../../../../../UserFrontEnd/service/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'; // Ajouté
import { PaymentFormComponent } from '../../../../../UserFrontEnd/components/payment-form/payment-form.component';

@Component({
  selector: 'index4-feature',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule // Ajouté
  ],
  templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit {
  plans: SubscriptionPlan[] = [];
  loading = true;

  constructor(
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '500px',
      data: { plan }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Subscription successful!', 'Close', { duration: 3000 });
      }
    });
  }
}