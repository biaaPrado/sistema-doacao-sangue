import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { ListaDoadores } from "../pages/ListaDoadores";
import { CadastroDoador } from "../pages/CadastroDoador";
import { HistoricoDoacoes } from "../pages/HistoricoDoacoes";
import { DoadorDetalhe } from "../pages/DoadorDetalhe";
import { RegistroDoacao } from "../pages/RegistroDoacao";
import { Estoque } from "../pages/Estoque";
import { CadastroHospital } from "../pages/CadastroHospital";
import { ListaHospitais } from "../pages/ListaHospitais";
import { HospitalDetalhe } from "../pages/HospitalDetalhe";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        /* Rotas do Doador*/ 
        <Route path="/doadores" element={<ListaDoadores />} />

        <Route path="/cadastro-doador" element={<CadastroDoador />} />

        <Route path="/doadores/:id" element={<DoadorDetalhe />} />

        /* Rotas de Doações*/ 
        <Route path="/doacoes" element={<HistoricoDoacoes />} />

        <Route path="/doacoes/nova" element={<RegistroDoacao />} />

        /* Rotas do Estoque*/ 
        <Route path="/estoque" element={<Estoque />} />

        /* Rotas do Hospital*/ 
        <Route path="/hospital/novo" element={<CadastroHospital />} />

        <Route path="/hospitais" element={<ListaHospitais />} />

        <Route path="/hospitais/:id" element={<HospitalDetalhe />} />
      </Routes>
    </BrowserRouter>
  );
}