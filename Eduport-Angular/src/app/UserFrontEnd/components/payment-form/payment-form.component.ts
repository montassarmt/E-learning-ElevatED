import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { SubscriptionService } from '../../service/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MaterialModule } from '../../../../app/material.module';
import { StripeElementsDirective, StripeCardComponent as StripeCard } from 'ngx-stripe';

interface PaymentDialogData {
  plan: any;
  userId: number;
}

@Component({
  standalone: true,
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    StripeElementsDirective,
    StripeCard
  ]
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  paymentForm: FormGroup;
  loading = false;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData
  ) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      autoRenew: [false]
    });
  }

  ngOnInit(): void {}

  createToken(): void {
    if (!this.card) {
      return;
    }
    
    this.loading = true;
    const name = this.paymentForm.get('name')?.value;
    
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(result => {
        if (result.token) {
          this.createSubscription(result.token.id);
        } else if (result.error) {
          this.snackBar.open(result.error.message || 'Payment error', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
  }

  createSubscription(token: string): void {
    const { userId, plan } = this.data;
    const autoRenew = this.paymentForm.get('autoRenew')?.value;
    
    this.subscriptionService.createSubscription(
      userId,
      plan.id,
      token,
      autoRenew
    ).subscribe({
      next: () => {
        this.snackBar.open('Subscription created successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Payment failed';
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}