import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private notificationSubscription?: Subscription;
  private closeSubscription?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to new notifications
    this.notificationSubscription = this.notificationService.notifications$.subscribe(
      (notification: Notification) => {
        this.notifications.push(notification);
        
        // Auto-close notification after duration
        if (notification.duration && notification.duration > 0) {
          setTimeout(() => {
            this.close(notification.id);
          }, notification.duration);
        }
      }
    );

    // Subscribe to close events
    this.closeSubscription = this.notificationService.close$.subscribe(
      (id: string) => {
        this.close(id);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  close(id: string): void {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  getNotificationClass(type: string): string {
    return `notification-${type}`;
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      case 'failed':
        return '✕';
      default:
        return 'ℹ';
    }
  }

  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }
}

