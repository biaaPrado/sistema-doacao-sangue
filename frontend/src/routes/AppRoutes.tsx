import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { ListaDoadores } from "../pages/ListaDoadores";
import { CadastroDoador } from "../pages/CadastroDoador";
// import { Doacoes } from "../pages/Doacoes";
import { DoadorDetalhe } from "../pages/DoadorDetalhe";
import { RegistroDoacao } from "../pages/RegistroDoacao";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/doadores" element={<ListaDoadores />} />

        <Route path="/cadastro-doador" element={<CadastroDoador />} />

        {/* <Route path="/doacoes" element={<Doacoes />} /> */}

        <Route path="/doadores/:id" element={<DoadorDetalhe />} />

        <Route path="/doacoes/nova" element={<RegistroDoacao />}
/>
      </Routes>
    </BrowserRouter>
  );
}