import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { User } from "../api-client/auth";

type UserContextType = {
  user: User | null;
  background: string;
  themeColor: string;
  setUser: (user: User | null) => void;
  setBackground: (background: string) => void;
  setThemeColor: (themeColor: string) => void;
};

// Criando o contexto com valores padrão
export const UserContext = createContext<UserContextType>({
  user: null,
  background: "",
  themeColor: "",
  setUser: () => {},
  setBackground: () => {},
  setThemeColor: () => {}
});

// Hook personalizado para usar o contexto
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [background, setBackground] = useState("");
  const [themeColor, setThemeColor] = useState("#41469a");

  const value = {
    user,
    background,
    themeColor,
    setUser,
    setBackground,
    setThemeColor
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
