export type NotificationType = 'report' | 'message';

export interface Notification {
  type: NotificationType;
  heading: string;
  text: string;
  time: string;
}
