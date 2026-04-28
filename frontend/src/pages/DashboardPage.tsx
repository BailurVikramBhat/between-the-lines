import ConfirmPasswordDialog from "@/components/static/ConfirmPasswordDialog";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
export default function DashboardPage() {
  const [isTemp, setIsTemp] = useState<boolean>(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.isTempPassword) {
      setIsTemp(true);
    }
  }, [profile]);

  return (
    <>{isTemp ? <ConfirmPasswordDialog open={isTemp} /> : <div>Nice!</div>}</>
  );
}
