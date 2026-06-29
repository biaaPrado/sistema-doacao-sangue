import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

import { CadastroDoador } from "../pages/CadastroDoador";
import { CadastroHospital } from "../pages/CadastroHospital";

import { RegistrarPedido } from "../pages/RegistraPedido";
import { AgendaDoacao } from "../pages/AgendaDoacao";

import { HistoricoDoacoes } from "../pages/HistoricoDoacoes";
import { RegistroDoacao } from "../pages/RegistroDoacao";
import { Estoque } from "../pages/Estoque";
import { DoadorDetalhe } from "../pages/DoadorDetalhe";
import { HospitalDetalhe } from "../pages/HospitalDetalhe";
import { PedidoDetalhe } from "../pages/PedidoDetalhe";

import { ListaPedidos } from "../pages/ListaPedidos";
import { ListaDoadores } from "../pages/ListaDoadores";
import { ListaHospitais } from "../pages/ListaHospitais";
import { ListaAgendamentos } from "../pages/ListaAgendamentos";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Rotas do Doador */}
        <Route path="/doadores" element={<ListaDoadores />} />

        <Route path="/cadastro-doador" element={<CadastroDoador />} />

        <Route path="/doadores/:id" element={<DoadorDetalhe />} />

        {/* Rotas de Doações  */}
        <Route path="/doacoes" element={<HistoricoDoacoes />} />

        <Route path="/doacoes/nova" element={<RegistroDoacao />} />

        <Route path="/agendar" element={<AgendaDoacao/> } />

        <Route path="/agendamentos" element={<ListaAgendamentos/> } />

        {/* Rotas do Estoque */}
        <Route path="/estoque" element={<Estoque />} />

        {/* Rotas do Hospital */}
        <Route path="/hospital/novo" element={<CadastroHospital />} />

        <Route path="/hospitais" element={<ListaHospitais />} />

        <Route path="/hospitais/:id" element={<HospitalDetalhe />} />

        {/* Rotas de Pedido */}
        <Route path="/pedido/novo" element={<RegistrarPedido/>} />

        <Route path="/pedidos" element={<ListaPedidos/>} />

        <Route path="/pedidos/:id" element={<PedidoDetalhe/> } />

      </Routes>
    </BrowserRouter>
  );
}