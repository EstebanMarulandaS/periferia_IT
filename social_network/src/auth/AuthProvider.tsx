import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { apiAuth } from "../api/api";
import { USE_AUTH_BYPASS } from "../config/env";

type LoginPayload = {
  username: string;
  password: string;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const login = async ({ username, password }: LoginPayload) => {
    const res = await apiAuth.post("/auth/login", {
      username,
      password,
    });

    const { token } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  useEffect(() => {
    if (!token || USE_AUTH_BYPASS) return;

    apiAuth.get("/auth/me").catch(() => {
      logout();
    });
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
