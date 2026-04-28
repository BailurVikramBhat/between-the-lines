import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <>
      <h1>Welcome: {profile?.fullName}</h1>
      <p>Email: {profile?.email}</p>
    </>
  );
}
