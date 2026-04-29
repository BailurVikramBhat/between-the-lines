import {
  ApiError,
  LoginRequest,
  LoginResponse,
  MeResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from "@/types/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL");
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    let message = "Login Failed!";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export async function getMe(token: string): Promise<MeResponse> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!res.ok) {
    let message = "Authentication Failed!";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
  const body = await res.json();
  return body.data;
}

export async function updatePassword(
  credentials: UpdatePasswordRequest,
): Promise<UpdatePasswordResponse> {
  const res = await fetch(`${BASE_URL}/auth/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    let message = "Password update Failed!";
    try {
      const error: ApiError = await res.json();
      if (error && typeof error.message === "string") {
        message = error.message;
      }
    } catch {}
    throw new Error(message);
  }
  const body = await res.json();
  return body.data;
}
