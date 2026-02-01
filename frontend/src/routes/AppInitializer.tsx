import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useGetUserAuth } from "../hooks/useUserAuth";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  const { isLoading, data, isError } = useGetUserAuth();

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log("AppInitializer user:", data);
    } else if (isError) {
      setUser(null); // not logged in or invalid cookie
    }
  }, [data, isError, setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas text-text-primary">
        Checking Authentication Status...
      </div>
    );
  }

  return <>{children}</>;
}
