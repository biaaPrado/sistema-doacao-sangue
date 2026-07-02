// src/pages/ListaDoadores/ListaDoadores.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useDoadores } from "../context/DoadorContext";
import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";
import type { DonorDTO } from "../../../backend/src/domain/dtos/DonorDTO";

export function ListaDoadores() {
  const { doadores, removerDoador, setDoadorEmEdicao } = useDoadores();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");
  const [rh, setRh] = useState("");

  const [modalAberto, setModalAberto] = useState(false); 
  const [idSelecionado, setIdSelecionado] = useState(""); // Alterado de CPF para ID para alinhar com o System

  function editarDoador(doador: DonorDTO) {
    setDoadorEmEdicao(doador);
    navigate("/cadastro-doador");
  }

  function abrirModalExcluir(id: string) {
    setIdSelecionado(id);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    removerDoador(idSelecionado);
    setModalAberto(false);
    setIdSelecionado("");
  }

  function limparFiltros() {
    setSearch("");
    setTipo("");
    setRh("");
  }

  // Filtros corrigidos consumindo a estrutura do DonorDTO e BloodTypeDTO
  const filtrados = doadores.filter((d) => {
    const matchNome = d.name ? d.name.toLowerCase().includes(search.toLowerCase()) : false;
    const matchTipo = tipo ? d.bloodType?.type === tipo : true;
    const matchRh = rh ? d.bloodType?.rhFactor === rh : true;

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
          > 
            Novo Doador
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
          > 
            Limpar filtros
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

            {filtrados.map((d) => (
              <div 
                key={d.id} 
                onClick={() => navigate(`/doadores/${d.id}`)} 
                className="grid grid-cols-5 border-b border-gray-200 cursor-pointer hover:bg-gray-50 items-center"
              >
                {/* Alterado para propriedades em inglês do DTO */}
                <div className="p-3 text-center truncate"> {d.name} </div>
                <div className="p-3 text-center"> {d.cpf} </div>
                <div className="p-3 text-center"> {d.bloodType?.type}{d.bloodType?.rhFactor} </div>
                <div className="p-3 text-center"> {d.weight} kg </div>
                <div className="p-3 flex justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); editarDoador(d); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  > 
                    Editar
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); abrirModalExcluir(d.id); }}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={modalAberto}
        title="Excluir Doador"
        message="Tem certeza que deseja excluir este doador? Esta ação não poderá ser desfeita."
        onConfirm={confirmarExclusao}
        onCancel={() => { setModalAberto(false); setIdSelecionado(""); }}
      />
    </MainLayout>
  );
}