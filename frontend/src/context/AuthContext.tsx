import { getMe } from "@/services/authService";
import { MeResponse } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  profile: MeResponse | null;
  loading: boolean;
  logout: () => void;
  loginSuccess: (token: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((profile) => setProfile(profile))
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);
  function logout() {
    localStorage.removeItem("token");
    setProfile(null);
  }

  async function loginSuccess(token: string) {
    try {
      const me = await getMe(token);
      localStorage.setItem("token", token);
      setProfile(me);
    } catch (err) {
      localStorage.removeItem("token");
      throw err;
    }
  }
  return (
    <AuthContext.Provider value={{ profile, loading, logout, loginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
