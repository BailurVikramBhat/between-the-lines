import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await login({ email, password });
      await loginSuccess(data.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, handleLogin };
}
