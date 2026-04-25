import { login } from "@/services/authService";
import { useState } from "react";

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, handleLogin };
}
