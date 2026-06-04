import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { useDoadores } from "../context/DoadorContext";

export function HistoricoDoacoes() {
  const { doadores } = useDoadores();

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [filtroLocal, setFiltroLocal] = useState("");

  const doacoes = doadores
    .flatMap((doador) =>
      (doador.historicoDoacoes ?? []).map((doacao) => ({
        ...doacao,
        nomeDoador: doador.nome,
        cpf: doador.cpf,
        tipoSanguineo: `${doador.tipoSanguineo}${doador.fatorRh}`,
      }))
    )
    .filter((doacao) => {
      const nomeOk = doacao.nomeDoador
        .toLowerCase()
        .includes(filtroNome.toLowerCase());

      const tipoOk =
        filtroTipo === "" ||
        doacao.tipoSanguineo === filtroTipo;

      const dataOk =
        filtroData === "" ||
        doacao.data === filtroData;

      const localOk =
        filtroLocal === "" ||
        doacao.local
          .toLowerCase()
          .includes(filtroLocal.toLowerCase());

      return nomeOk && tipoOk && dataOk && localOk;
    })
    .sort(
      (a, b) =>
        new Date(b.data).getTime() -
        new Date(a.data).getTime()
    );

  return (
    <MainLayout>
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-700">
            Histórico de Doações
          </h1>
        </div>

        {/* FILTROS */}
        <div className="grid grid-cols-5 gap-4 mb-4">

          <input
            type="text"
            placeholder="Buscar por doador"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          />

          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          >
            <option value="">Todos os tipos</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          />

          <input
            type="text"
            placeholder="Local da coleta"
            value={filtroLocal}
            onChange={(e) => setFiltroLocal(e.target.value)}
            className="border p-2 rounded-lg border-gray-300"
          />

          <button
            onClick={() => {
              setFiltroNome("");
              setFiltroTipo("");
              setFiltroData("");
              setFiltroLocal("");
            }}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
          >
            Limpar Filtros
          </button>

        </div>

        

        {doacoes.length === 0 ? (
          <p className="text-gray-500">
            Nenhuma doação encontrada.
          </p>
        ) : (
          <div>

            {/* Cabeçalho */}
            <div className="grid grid-cols-5 bg-red-700 text-white font-semibold rounded-t-xl">

              <div className="p-3 text-center">
                Data
              </div>

              <div className="p-3 text-center">
                Doador
              </div>

              <div className="p-3 text-center">
                Tipo Sanguíneo
              </div>

              <div className="p-3 text-center">
                Local
              </div>

              <div className="p-3 text-center">
                Volume
              </div>

            </div>

            {/* Linhas */}
            {doacoes.map((doacao, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50"
              >

                <div className="p-3 text-center">
                  {doacao.data.split("-").reverse().join("/")}
                </div>

                <div className="p-3 text-center">
                  {doacao.nomeDoador}
                </div>

                <div className="p-3 text-center">
                  {doacao.tipoSanguineo}
                </div>

                <div className="p-3 text-center">
                  {doacao.local}
                </div>

                <div className="p-3 text-center">
                  {doacao.volume} ml
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </MainLayout>
  );
}