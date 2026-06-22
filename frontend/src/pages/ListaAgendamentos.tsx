import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useAgendamentos } from "../context/AgendamentoContext";
import { useDoadores } from "../context/DoadorContext";

export function ListaAgendamentos() {
  const {
    agendamentos,
    removerAgendamento,
    atualizarAgendamento,
    setAgendamentoEmEdicao,
  } = useAgendamentos();

  const { doadores } = useDoadores();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function editarAgendamento(id: string) {
    const agendamento = agendamentos.find((a) => a.id === id);

    if (!agendamento) return;

    setAgendamentoEmEdicao(agendamento);
    navigate("/agendar");
  }

  function excluirAgendamento(id: string) {
    removerAgendamento(id);
  }

  function concluirAgendamento(id: string) {
    const agendamento = agendamentos.find((a) => a.id === id);

    if (!agendamento) return;

    atualizarAgendamento(id, {...agendamento, status: "Concluída",});
  }

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const agendamentosFiltrados = agendamentos
    .filter((agendamento) => { const doador = doadores.find((d) => d.id === agendamento.doadorId);
      return doador?.nome.toLowerCase().includes(search.toLowerCase()); })
    .sort((a, b) => { 
      const dataA = new Date(`${a.data}T${a.horario}`);
      const dataB = new Date(`${b.data}T${b.horario}`);
      return dataA.getTime() - dataB.getTime();
    }
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-red-700"> Agendamentos </h1>

          <button
            onClick={() => navigate("/agendar")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg" >
            Novo Agendamento
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg border-gray-300 w-full"
          />
        </div>

        {agendamentosFiltrados.length === 0 ? ( <p className="text-gray-500"> Nenhum agendamento encontrado </p>
        ) : (
          <>
            <div className="grid grid-cols-4 bg-red-700 text-white font-semibold rounded-t-xl">
              <div className="p-3 text-center">Nome</div>
              <div className="p-3 text-center">Data</div>
              <div className="p-3 text-center">Status</div>
              <div className="p-3 text-center">Ações</div>
            </div>

            {agendamentosFiltrados.map((agendamento) => {
              const doador = doadores.find((d) => d.id === agendamento.doadorId);

              return (
                <div key={agendamento.id} className="grid grid-cols-4 border-b border-gray-200 hover:bg-gray-50" >
                  <div className="p-3 text-center"> {doador?.nome ?? "Doador não encontrado"} </div>
                  <div className="p-3 text-center"> {formatarData(agendamento.data)} - {agendamento.horario} </div>
                  <div className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ 
                      agendamento.status === "Concluída" ? "bg-green-100 text-green-700": 
                      agendamento.status === "Cancelada" ? "bg-red-100 text-red-700": 
                      "bg-yellow-100 text-yellow-700" }`}
                    > {agendamento.status}
                    </span>
                  </div>

                  <div className="p-3 flex justify-center gap-2">
                    {agendamento.status !== "Concluída" && (
                      <button
                        onClick={() => concluirAgendamento(agendamento.id) }
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700" >
                        Concluir
                      </button>
                    )}

                    <button
                      onClick={() => editarAgendamento(agendamento.id) }
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600" >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirAgendamento(agendamento.id) }
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700" >
                      Cancelar
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </MainLayout>
  );
}