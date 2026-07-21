import { useEffect } from "react";

import { useAuth } from "@/app/auth";

export function AuthProvider({ children }) {
  const { restore } = useAuth();

  useEffect(() => {
    restore();
  }, [restore]);

  return children;
}
