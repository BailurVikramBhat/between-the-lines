import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, loading, error } = useMe();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <h1>Welcome: {profile?.fullName}</h1>
      <p>Email: {profile?.email}</p>
    </>
  );
}
