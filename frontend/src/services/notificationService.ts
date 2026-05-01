import { ApiError, ApiResponse } from "@/types/auth";
import {
  NotificationResponse,
  UnreadNotificationCountResponse,
} from "@/types/notification";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!BASE_URL) {
  throw new Error("Missing BASE_URL");
}
function authHeaders() {
  return {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}
export async function getAllNotifications(): Promise<NotificationResponse[]> {
  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) {
    let message = "Unable to get notifications. Please try again later.";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
  const body: ApiResponse<NotificationResponse[]> = await res.json();
  return body.data;
}

export async function getUnreadNotificationCount(): Promise<UnreadNotificationCountResponse> {
  const res = await fetch(`${BASE_URL}/notifications/unread-count`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) {
    let message =
      "Unable to get the notification count. Please try again later.";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
  const body: ApiResponse<UnreadNotificationCountResponse> = await res.json();
  return body.data;
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/notifications/${notificationId}/read`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    let message =
      "Unable to mark notification as read. Please try again later.";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
}

export async function deleteNotification(
  notificationId: string,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/notifications/${notificationId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    let message = "Unable to delete notification. Please try again later.";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
}
