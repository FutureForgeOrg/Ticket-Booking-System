import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useGetUserAuth } from "../hooks/useUserAuth";
import { useThemeStore } from "../store/themeStore";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthInitialized = useAuthStore((s) => s.setAuthInitialized);
  const { isLoading, data, isError } = useGetUserAuth();
  const { isDark, setTheme } = useThemeStore();

  useEffect(() => {
    if (data) {
      setUser(data.data);
      console.log("AppInitializer user:", data.data);
    } else if (isError) {
      setUser(null); // not logged in or invalid cookie
    }

    if (!isLoading) {
      setAuthInitialized(true);
    }
  }, [data, isError, setUser, setAuthInitialized, isLoading]);

  useEffect(() => {
    setTheme(isDark);
  }, [isDark, setTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas text-text-primary">
        Checking Authentication Status...
      </div>
    );
  }

  return <>{children}</>;
}
