import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'warning' | 'error' | 'failed';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number; // Duration in milliseconds, 0 = no auto-close
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notifications$: Observable<Notification> = this.notificationSubject.asObservable();

  private closeSubject = new Subject<string>();
  public close$: Observable<string> = this.closeSubject.asObservable();

  private notifications: Notification[] = [];

  /**
   * Show a success notification
   */
  success(message: string, title?: string, duration: number = 5000): void {
    this.show('success', message, title, duration);
  }

  /**
   * Show a warning notification
   */
  warning(message: string, title?: string, duration: number = 5000): void {
    this.show('warning', message, title, duration);
  }

  /**
   * Show an error notification
   */
  error(message: string, title?: string, duration: number = 5000): void {
    this.show('error', message, title, duration);
  }

  /**
   * Show a failed notification
   */
  failed(message: string, title?: string, duration: number = 5000): void {
    this.show('failed', message, title, duration);
  }

  /**
   * Show a notification
   */
  show(type: NotificationType, message: string, title?: string, duration: number = 5000): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      title,
      duration: duration > 0 ? duration : 0
    };

    this.notifications.push(notification);
    this.notificationSubject.next(notification);
  }

  /**
   * Close a notification by ID
   */
  close(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.closeSubject.next(id);
  }

  /**
   * Close all notifications
   */
  closeAll(): void {
    this.notifications.forEach(n => this.closeSubject.next(n.id));
    this.notifications = [];
  }

  /**
   * Generate unique ID for notification
   */
  private generateId(): string {
    return 'notification-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
}

