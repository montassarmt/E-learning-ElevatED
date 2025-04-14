// subscription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  durationDays: number;
}

export interface UserSubscription {
  id: number;
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  active: boolean;
  autoRenew: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8081/api';
  public static readonly stripePublicKey = 'pk_test_51RC0ytIxjlAz4X2AoC08dzpUzAjPZJ14OLqJcUZW9Dje1n6dWj7cNT0o4nrjioXJMWrw6FQm3jbZa8UMwrLhW9tA00gwiotQCi'; 

  constructor(private http: HttpClient) { }

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/admin/plans`);
  }

  createSubscription(userId: number, planId: number, paymentMethodId: string, autoRenew: boolean = false): Observable<UserSubscription> {
    return this.http.post<UserSubscription>(`${this.apiUrl}/subscriptions`, null, {
      params: { userId, planId, paymentMethodId, autoRenew }
    });
  }

  updateSubscription(subscriptionId: number, newPlanId: number, autoRenew?: boolean): Observable<UserSubscription> {
    const params: { [key: string]: string } = {
      newPlanId: newPlanId.toString()
    };
    
    // Only add autoRenew to params if it was provided
    if (autoRenew !== undefined) {
      params['autoRenew'] = autoRenew.toString();
    }

    return this.http.put<UserSubscription>(
      `${this.apiUrl}/subscriptions/${subscriptionId}`,
      null,
      { params }
    );
}

  cancelSubscription(subscriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subscriptions/${subscriptionId}`);
  }

  updateAutoRenew(subscriptionId: number, autoRenew: boolean): Observable<UserSubscription> {
    return this.http.patch<UserSubscription>(`${this.apiUrl}/subscriptions/${subscriptionId}/auto-renew`, null, {
      params: { autoRenew }
    });
  }

  getUserSubscriptions(userId: number, activeOnly: boolean = false): Observable<UserSubscription[]> {
    return this.http.get<UserSubscription[]>(`${this.apiUrl}/subscriptions/user/${userId}`, {
      params: { activeOnly: activeOnly.toString() }
    });
  }
}