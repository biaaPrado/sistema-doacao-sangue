import { createContext, useContext, useState } from "react";
import type { Doador } from "../types/Doador";
import type { Doacao } from "../types/Doacao";
import { mockDoadores } from "../mocks/mockDoadores";

interface DoadorContextType {
  doadores: Doador[];

  addDoador: (d: Doador) => void;
  removerDoador: (cpf: string) => void;
  doadorEmEdicao: Doador | null;
  setDoadorEmEdicao: (d: Doador | null) => void;
  atualizarDoador: (cpf: string, d: Doador) => void;
  registrarDoacao: (cpf: string, doacao: Doacao) => void;
}

const DoadorContext = createContext<DoadorContextType | null>(null);

export function DoadorProvider({children, }: {children: React.ReactNode;}) {
  //const [doadores, setDoadores] = useState<Doador[]>([]);
  const [ doadores, setDoadores ] = useState<Doador[]>(mockDoadores);
  const [doadorEmEdicao, setDoadorEmEdicao] = useState<Doador | null>(null);

  function addDoador(doador: Doador) {
    setDoadores((prev) => [...prev,{...doador, historicoDoacoes: doador.historicoDoacoes ?? [],},]);
  }

  function removerDoador(cpf: string) {
    setDoadores((prev) => prev.filter((d) => d.cpf !== cpf));
  }

  function atualizarDoador(cpf: string, doador: Doador) {
    setDoadores((prev) => prev.map((item) => item.cpf === cpf ? { ...doador, historicoDoacoes:doador.historicoDoacoes ?? [],}: item));
  }

  function registrarDoacao(cpf: string, doacao: Doacao) {
    setDoadores((prev) => prev.map((d) => d.cpf === cpf ? { ...d, historicoDoacoes: [...(d.historicoDoacoes ?? []), doacao,],}: d));
  }

  return (
    <DoadorContext.Provider
      value={{
        doadores,
        addDoador,
        removerDoador,
        atualizarDoador,
        registrarDoacao,
        doadorEmEdicao,
        setDoadorEmEdicao,
      }}
    > {children}
    </DoadorContext.Provider>
  );
}

export function useDoadores() {
  const context = useContext(DoadorContext);

  if (!context) {
    throw new Error("useDoadores precisa estar dentro do DoadorProvider");
  }

  return context;
}