import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useDoadores } from "../context/DoadorContext";

export function DoadorDetalhe() {
  const { id } = useParams();
  const { doadores } = useDoadores();

  const doador = doadores.find(
    (d) => d.cpf === id
  );

  if (!doador) {
    return (
      <MainLayout>
        <p className="text-gray-500">Doador não encontrado.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-700">
              {doador.nome}
            </h1>
            <p className="text-gray-500">Detalhes do doador</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
              {doador.tipoSanguineo}{doador.fatorRh}
            </span>

            <div className="bg-red-50 border border-red-100 rounded-xl py-2 px-3">
              <p className="text-sm text-gray-500">
                Total de Doações
              </p>

              <p className="text-xl text-right font-bold text-red-700">
                {doador.historicoDoacoes?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">CPF</p>
            <p className="font-medium">{doador.cpf}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Telefone</p>
            <p className="font-medium">{doador.telefone}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{doador.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Peso</p>
            <p className="font-medium">{doador.peso} kg</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl col-span-2">
            <p className="text-sm text-gray-500">
              Data de nascimento
            </p>
            <p className="font-medium">
              {doador.dataNascimento}
            </p>
          </div>

        </div>

        {/* HISTÓRICO */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-red-700 mb-4">
            Histórico de Doações
          </h2>

          {doador.historicoDoacoes?.length ? (
            <div className="bg-gray-50 rounded-xl overflow-hidden">

              {doador.historicoDoacoes.map((doacao, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div>
                    <p className="text-xs text-gray-500">Data</p>
                    <p className="font-medium">
                      {new Date(doacao.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Local</p>
                    <p className="font-medium">{doacao.local}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Volume</p>
                    <p className="font-medium text-red-700">
                      {doacao.volume} ml
                    </p>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
              Nenhuma doação registrada.
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}