import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Doadores } from "../pages/Doadores";
import { CadastroDoador } from "../pages/CadastroDoador";
import { Doacoes } from "../pages/Doacoes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
          path="/doadores"
          element={<Doadores />}
        />

        <Route
          path="/cadastro-doador"
          element={<CadastroDoador />}
        />

        <Route
          path="/doacoes"
          element={<Doacoes />}
        />
      </Routes>
    </BrowserRouter>
  );
}