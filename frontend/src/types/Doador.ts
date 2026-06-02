import type { Doacao } from "./Doacao";

export interface Doador {
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  peso: number;
  telefone: string;
  email: string;
  tipoSanguineo: string;
  fatorRh: string;

  historicoDoacoes: Doacao[];
}