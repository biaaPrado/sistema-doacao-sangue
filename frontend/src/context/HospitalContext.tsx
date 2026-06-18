import { createContext, useContext, useState } from "react";
import type { Hospital } from "../types/Hospital";
import { mockHospitais } from "../mocks/mockHospitais";

interface HospitalContextType {
  hospitais: Hospital[];

  addHospital: (hospital: Hospital) => void;
  removerHospital: (id: string) => void;
  atualizarHospital: (id: string, hospital: Hospital) => void;
  hospitalEmEdicao: Hospital | null;
  setHospitalEmEdicao: ( hospital: Hospital | null ) => void;
}

const HospitalContext =
  createContext<HospitalContextType | null>(null);

export function HospitalProvider({
  children, }: { children: React.ReactNode; }) {
  //const [hospitais, setHospitais] = useState<Hospital[]>([]);
  const [hospitais, setHospitais] = useState<Hospital[]>(mockHospitais);
  const [
    hospitalEmEdicao,
    setHospitalEmEdicao,
  ] = useState<Hospital | null>(null);

  function addHospital(hospital: Hospital) {
    setHospitais((prev) => [...prev,hospital,]);
  }

  function removerHospital(id: string) {
    setHospitais((prev) => prev.filter((h) => h.id !== id));
  }

  function atualizarHospital(id: string, hospital: Hospital) {
    setHospitais((prev) => prev.map((h) => h.id === id ? hospital : h));
  }

  return (
    <HospitalContext.Provider
      value={{
        hospitais,
        addHospital,
        removerHospital,
        atualizarHospital,
        hospitalEmEdicao,
        setHospitalEmEdicao,
      }}
    > {children}
    </HospitalContext.Provider>
  );
}

export function useHospitais() {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospitais deve estar dentro do HospitalProvider");
  }

  return context;
}