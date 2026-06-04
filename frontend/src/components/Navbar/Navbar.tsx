import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <aside className="w-72 min-h-screen bg-red-800 rounded-r-lg text-white shadow-lg">
      <nav className="p-4">

        {/* DOADORES */}
        <div className="mb-4">
          <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Doadores </h2>

          <div className="ml-4 flex flex-col gap-1">
            <Link to="/cadastro-doador" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Cadastrar Doador
            </Link>

            <Link to="/doadores" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Lista Doadores
            </Link>
          </div>
        </div>

        {/* DOAÇÕES */}
        <div className="mb-4">
          <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Doações </h2>

          <div className="ml-4 flex flex-col gap-1">
            <Link to="/doacoes/nova" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Registrar Doação
            </Link>

            <Link to="/doacoes" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Histórico de Doações
            </Link>

            <Link to="/agendar-doacao" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Agendar Doação
            </Link>
          </div>
        </div>

        {/* PEDIDOS */}
        <div className="mb-4">
          <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Pedidos </h2>

          <div className="ml-4 flex flex-col gap-1">
            <Link to="/estoque" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Estoque
            </Link>

            <Link to="/pedidos/novo" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Registrar Pedido
            </Link>

            <Link to="/pedidos" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Histórico de Pedido
            </Link>
          </div>
        </div>

        {/* HOSPITAL */}
        <div className="">
          <h2 className="font-bold text-lg py-2 border-b border-red-700 mb-1"> Hospital </h2>

          <div className="ml-4 flex flex-col gap-1">
            <Link to="/hospital/cadastro" className="px-3 py-2 rounded-lg hover:bg-red-700">
              Cadastrar Hospital
            </Link>

            <Link to="/hospital" className="px-3 py-2 rounded-lg hover:bg-red-700" >
              Lista Hospitais
            </Link>
          </div>
        </div>

      </nav>
    </aside>
  );
}