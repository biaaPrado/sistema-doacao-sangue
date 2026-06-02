export interface Doacao {
  data: string;
  local: string;
  volume?: number;
  observacao: string;
  voluntaria: boolean;
  receptor: string;
}