import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Requests } from "../api";
import { User } from "../types";

type AccountStructure = { username: string; password: string };

type TAuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  register: ({ username, password }: AccountStructure) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) setUser(JSON.parse(maybeUser));
  }, [setUser]);

  const register = ({ username, password }: AccountStructure) => {
    return Requests.registerFetch({ username, password }).then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return setUser(user);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
