import { updatePassword } from "@/services/authService";
import { useState } from "react";

export function usePassword() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handlePasswordUpdate = async (
    password: string,
    newPassword: string,
  ) => {
    setError(null);
    setLoading(true);
    console.log("Loading is set to true");
    try {
      const data = await updatePassword({ password, newPassword });
      setSuccessMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, successMessage, handlePasswordUpdate };
}
