import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private predictedUsersSource = new BehaviorSubject<any[]>([]);
  predictedUsers$ = this.predictedUsersSource.asObservable();

  updatePredictedUsers(users: any[]) {
    this.predictedUsersSource.next(users);
  }
}