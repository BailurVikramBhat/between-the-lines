export interface NotificationResponse {
  id: string;
  categoryLabel: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionUrl: string;
  read: boolean;
  createdAt: string;
}
export interface UnreadNotificationCountResponse {
  count: number;
}
