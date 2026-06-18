import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { DoadorProvider } from "./context/DoadorContext";
import { EstoqueProvider } from "./context/EstoqueContext";
import { HospitalProvider } from "./context/HospitalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EstoqueProvider>
      <HospitalProvider>
        <DoadorProvider>
          <App />
        </DoadorProvider>
      </HospitalProvider>
    </EstoqueProvider>
  </StrictMode>
);