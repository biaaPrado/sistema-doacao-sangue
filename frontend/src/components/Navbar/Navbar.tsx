import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`min-h-screen bg-red-800 text-white shadow-lg rounded-r-lg transition-all duration-300 ${open ? "w-72" : "w-20 overflow-hidden"}`} >
      <div className={`flex items-center p-4 border-b border-red-700 ${ open ? "justify-end" : "justify-center" }`} >
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-lg">
          {open ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i> }
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-4">
        <div>
          {open && (<h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Home </h2> )}
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700" >
            <i className="fa-solid fa-chart-column"></i> { open && "Dashboard"}
          </Link>
        </div>
        
        <div>
          {open && (<h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Doadores </h2> )}

          <div className="flex flex-col gap-1">
            <Link to="/cadastro-doador" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700" >
              <i className="fa-solid fa-user-plus"></i> {open && "Cadastrar Doador"}
            </Link>

            <Link to="/doadores" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700" >
              <i className="fa-solid fa-users"></i> {open && "Lista de Doadores"}
            </Link>
          </div>
        </div>

        <div>
          {open && ( <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Doações </h2> )}

          <div className="flex flex-col gap-1">
            <Link to="/agendar" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-calendar-days"></i> {open && "Agendar Doação"}
            </Link>

            <Link to="/doacoes/nova" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-hand-holding-droplet"></i> {open && "Registrar Doação"}
            </Link>

            <Link to="/agendamentos" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-calendar-check"></i> {open && "Agendamentos"}
            </Link>

            <Link to="/doacoes" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-clock-rotate-left"></i> {open && "Histórico de Doações"}
            </Link>
          </div>
        </div>

        <div>
          {open && ( <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Pedidos </h2> )}

          <div className="flex flex-col gap-1">
            <Link to="/estoque" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-droplet"></i> {open && "Estoque"}
            </Link>

            <Link to="/pedido/novo" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-file-circle-plus"></i> {open && "Registrar Pedido"}
            </Link>

            <Link to="/pedidos" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-clipboard-list"></i> {open && "Histórico de Pedidos"}
            </Link>
          </div>
        </div>

        <div>
          {open && ( <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Hospital </h2> )}

          <div className="flex flex-col gap-1">
            <Link to="/hospital/novo" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-hospital"></i> {open && "Cadastrar Hospital"}
            </Link>

            <Link to="/hospitais" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700">
              <i className="fa-solid fa-notes-medical"></i> {open && "Lista de Hospitais"}
            </Link>
          </div>
        </div>

      </nav>
    </aside>
  );
}