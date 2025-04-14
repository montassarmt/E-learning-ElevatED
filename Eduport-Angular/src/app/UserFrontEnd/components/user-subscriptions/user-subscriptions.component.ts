import { Component, OnInit } from '@angular/core';
import { SubscriptionService, UserSubscription } from '../../service/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialModule } from '../../../../app/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.scss'],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    RouterModule,
    CurrencyPipe,
    DatePipe
  ]
})
export class UserSubscriptionsComponent implements OnInit {
  subscriptions: UserSubscription[] = [];
  activeOnly = true;
  loading = true;
  userId = 16; // À remplacer par l'ID de l'utilisateur connecté

  constructor(
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.loading = true;
    this.subscriptionService.getUserSubscriptions(this.userId, this.activeOnly).subscribe(
      subscriptions => {
        this.subscriptions = subscriptions;
        this.loading = false;
      },
      error => {
        this.snackBar.open('Erreur lors du chargement des abonnements', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  toggleActiveOnly(): void {
    this.activeOnly = !this.activeOnly;
    this.loadSubscriptions();
  }

  cancelSubscription(subscriptionId: number): void {
    this.subscriptionService.cancelSubscription(subscriptionId).subscribe(
      () => {
        this.snackBar.open('Abonnement annulé avec succès', 'Fermer', { duration: 3000 });
        this.loadSubscriptions();
      },
      error => {
        this.snackBar.open('Erreur lors de l\'annulation', 'Fermer', { duration: 3000 });
      }
    );
  }

  toggleAutoRenew(subscription: UserSubscription): void {
    this.subscriptionService.updateAutoRenew(subscription.id, !subscription.autoRenew).subscribe(
      updatedSubscription => {
        subscription.autoRenew = updatedSubscription.autoRenew;
        this.snackBar.open('Mise à jour réussie', 'Fermer', { duration: 3000 });
      },
      error => {
        this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
      }
    );
  }
}