import { getMe } from "@/services/authService";
import { MeResponse } from "@/types/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useMe() {
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((prof) => setProfile(prof))
      .catch((err) => {
        localStorage.removeItem("token");
        setError(err.message);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);
  return { profile, loading, error };
}
