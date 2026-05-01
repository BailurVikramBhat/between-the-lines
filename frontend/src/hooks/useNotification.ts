import {
  getAllNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
} from "@/services/notificationService";
import { NotificationResponse } from "@/types/notification";
import { useCallback, useEffect, useState } from "react";

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUnreadCount = useCallback(async () => {
    const data = await getUnreadNotificationCount();
    setUnreadCount(data.count);
  }, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllNotifications();
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      setNotifications([]);
      setLoading(false);
      setError(
        err instanceof Error ? err.message : "Unable to load notifications",
      );
    }
    refreshUnreadCount().catch((err: Error) => {
      setError(err.message);
    });
  }, [refreshUnreadCount]);
  const dismissNotification = useCallback(
    async (notificationId: string) => {
      try {
        await markNotificationAsRead(notificationId);
        setNotifications((current) =>
          current.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification,
          ),
        );
        await refreshUnreadCount();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to dismiss notification",
        );
      }
    },
    [refreshUnreadCount],
  );
  useEffect(() => {
    refreshUnreadCount().catch((err: Error) => {
      setError(err.message);
    });
  }, [refreshUnreadCount]);
  return {
    notifications,
    unreadCount,
    loading,
    error,
    loadNotifications,
    refreshUnreadCount,
    dismissNotification,
  };
}
