import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: Client;
  private notificationSubject = new Subject<any>();

  constructor() {
    const socket = new SockJS('http://localhost:8085/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP: ' + str),
    });
  }

  connect(userEmail: string): void {
    this.stompClient.onConnect = () => {
      console.log('✅ Connected to WebSocket');

      this.stompClient.subscribe(`/user/${userEmail}/topic/notifications`, (message: IMessage) => {
        const notif = JSON.parse(message.body);
        this.notificationSubject.next(notif);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('💥 STOMP Error:', frame.headers['message'], frame.body);
    };

    this.stompClient.activate();
  }

  getNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  disconnect(): void {
    this.stompClient.deactivate();
    console.log('🔌 WebSocket connection closed');
  }
}
