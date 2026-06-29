export interface PedidoSangue {
  id: string;

  hospitalId: string;

  dataPedido: string;

  tipoSanguineo: string;
  fatorRh: "+" | "-";

  quantidadeBolsas: number;

  prioridade: "Baixa" | "Média" | "Alta" | "Urgente";

  status: "Pendente" | "Concluído" | "Cancelado";

  observacoes: string;
}