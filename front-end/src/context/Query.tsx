import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

type QueryContextType = {
  query: string;
  setQuery: (query: string) => void;
};

// Criando o contexto com valores padrão
export const QueryContext = createContext<QueryContextType>({
  query: "",
  setQuery: () => {}
});

// Hook personalizado para usar o contexto
export const useQuery = () => useContext(QueryContext);

export function QueryProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  const value = {
    query,
    setQuery
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}
