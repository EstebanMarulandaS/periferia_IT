import { createContext } from "react";

type LoginCredentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  token: string | null;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
