import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

import { DoadorProvider } from "./context/DoadorContext";
import { EstoqueProvider } from "./context/EstoqueContext";
import { HospitalProvider } from "./context/HospitalContext";
import { PedidoProvider } from "./context/PedidoContext";
import { AgendamentoProvider } from "./context/AgendamentoContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EstoqueProvider>
      <HospitalProvider>
        <DoadorProvider>
          <PedidoProvider>
            <AgendamentoProvider>
              <App />
            </AgendamentoProvider>
          </PedidoProvider>
        </DoadorProvider>
      </HospitalProvider>
    </EstoqueProvider>
  </StrictMode>
);