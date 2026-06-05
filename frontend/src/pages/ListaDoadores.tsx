import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useDoadores } from "../context/DoadorContext";

export function ListaDoadores() {
  const {
    doadores,
    removerDoador,
    setDoadorEmEdicao,
  } = useDoadores();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [rh, setRh] = useState("");

  function editarDoador(index: number) {
    setDoadorEmEdicao(doadores[index]);

    navigate("/cadastro-doador");
  }

  function excluirDoador(index: number) {
    removerDoador(doadores[index].cpf);
  }

  function limparFiltros() {
    setSearch("");
    setTipo("");
    setRh("");
  }

  const filtrados = doadores.filter((d) => {
    const matchNome = d.nome.toLowerCase().includes(search.toLowerCase());
    const matchTipo = tipo? d.tipoSanguineo === tipo: true;
    const matchRh = rh? d.fatorRh === rh: true;

    return matchNome && matchTipo && matchRh;
  });

  return (
    <MainLayout>
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-red-700"> Lista de Doadores </h1>

          <button
            onClick={() => navigate("/cadastro-doador")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          > Novo Doador
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          >
            <option value=""> Tipo sanguíneo </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>

          <select
            value={rh}
            onChange={(e) => setRh(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          >
            <option value=""> Fator RH </option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>

          <button
            onClick={limparFiltros}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
          > Limpar filtros
          </button>
        </div>

        {filtrados.length === 0 ? (
          <p className="text-gray-500"> Nenhum doador encontrado </p>
        ) : (
          <div>
            <div className="grid grid-cols-5 bg-red-700 text-white font-semibold rounded-t-xl">
              <div className="p-3 text-center"> Nome </div>
              <div className="p-3 text-center"> CPF </div>
              <div className="p-3 text-center"> Tipo Sanguíneo </div>
              <div className="p-3 text-center"> Peso </div>
              <div className="p-3 text-center"> Ações </div>
            </div>

            {filtrados.map((d, index) => (
              <div
                key={d.cpf}
                onClick={() => navigate(`/doadores/${d.cpf}`) }
                className="grid grid-cols-5 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <div className="p-3 text-center"> {d.nome} </div>

                <div className="p-3 text-center"> {d.cpf} </div>

                <div className="p-3 text-center"> {d.tipoSanguineo}{d.fatorRh} </div>

                <div className="p-3 text-center"> {d.peso} kg </div>

                <div className="p-3 flex justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editarDoador(index);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  > Editar
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation();excluirDoador(index);}}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  > Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}