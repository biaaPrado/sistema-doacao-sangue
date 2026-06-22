export interface Agendamento {
  id: string;
  doadorId: string;
  data: string;
  horario: string;
  observacao: string;
  status: "Agendada" | "Concluída" | "Cancelada";
}