import type { BolsaSangue } from "../types/BolsaSangue";

export const mockBolsas: BolsaSangue[] = [
  {
    id: "1",
    tipoSanguineo: "A+",
    dataColeta: "2026-06-10",
    dataValidade: "2026-08-10",
    volume: 450,
    disponivel: true,
  },

  {
    id: "2",
    tipoSanguineo: "O-",
    dataColeta: "2026-06-01",
    dataValidade: "2026-07-01",
    volume: 450,
    disponivel: true,
  },

  {
    id: "3",
    tipoSanguineo: "AB+",
    dataColeta: "2026-05-15",
    dataValidade: "2026-06-20",
    volume: 450,
    disponivel: true,
  },

  {
    id: "4",
    tipoSanguineo: "B+",
    dataColeta: "2026-04-01",
    dataValidade: "2026-05-01",
    volume: 450,
    disponivel: false,
  },

  {
    id: "5",
    tipoSanguineo: "A-",
    dataColeta: "2026-06-15",
    dataValidade: "2026-08-15",
    volume: 450,
    disponivel: true,
  },
];