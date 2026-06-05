import { createContext, useContext, useState } from "react";
import type { BolsaSangue } from "../types/BolsaSangue";

interface EstoqueContextType {
  bolsas: BolsaSangue[];

  adicionarBolsa: (bolsa: BolsaSangue) => void;
  removerBolsa: (id: string) => void;
}

const EstoqueContext = createContext<EstoqueContextType | null>(null);

export function EstoqueProvider({children,}: {children: React.ReactNode;}) {
  const [bolsas, setBolsas] = useState<BolsaSangue[]>([]);

  function adicionarBolsa(bolsa: BolsaSangue) {
    setBolsas((prev) => [...prev, bolsa]);
  }

  function removerBolsa(id: string) {
    setBolsas((prev) => prev.filter((bolsa) => bolsa.id !== id));
  }

  return (
    <EstoqueContext.Provider value={{ bolsas, adicionarBolsa, removerBolsa,}} >
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  const context = useContext(EstoqueContext);
  
  if (!context) {
    throw new Error("useEstoque precisa estar dentro do EstoqueProvider");
  }

  return context;
}