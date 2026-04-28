import { getMe } from "@/services/authService";
import { MeResponse } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  profile: MeResponse | null;
  loading: boolean;
  logout: () => void;
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
  return (
    <AuthContext.Provider value={{ profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
