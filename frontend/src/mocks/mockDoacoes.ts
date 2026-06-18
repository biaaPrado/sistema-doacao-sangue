import type { Doacao } from "../types/Doacao";

export const mockDoacoes: Doacao[] = [
  {
    data: "2026-06-10",
    local: "Hemocentro São José",
    volume: 450,
    observacao: "Doação sem intercorrências",
    voluntaria: true,
    receptor: "",
  },

  {
    data: "2026-04-15",
    local: "Santa Casa de Taubaté",
    volume: 450,
    observacao: "Paciente em cirurgia",
    voluntaria: false,
    receptor: "Carlos Mendes",
  },

  {
    data: "2026-02-20",
    local: "Hospital Regional",
    volume: 450,
    observacao: "",
    voluntaria: true,
    receptor: "",
  },
];