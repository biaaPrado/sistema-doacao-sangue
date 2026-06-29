export interface Doacao {
  id: string;
  doadorId: string;
  data: string;
  volume: number;
  observacao: string;
  voluntaria: boolean;
  receptor?: string;
}