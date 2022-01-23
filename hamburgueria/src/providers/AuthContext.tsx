import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

import { api } from "../services/api";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  email: string;
  id: string;
  name: string;
}
interface AuthState {
  accessToken: string;
  user: User;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Kenzieshop:accessToken");
    const user = localStorage.getItem("@Kenzieshop:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@Kenzieshop:accessToken", accessToken);
    localStorage.setItem("@Kenzieshop:user", JSON.stringify(user));
    toast.success("Login efetuado com sucesso!");
    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Kenzieshop:accessToken");
    localStorage.removeItem("@Kenzieshop:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
