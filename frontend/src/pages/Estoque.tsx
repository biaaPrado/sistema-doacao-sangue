import { MainLayout } from "../layouts/MainLayout";
import { useEstoque } from "../context/EstoqueContext";

export function Estoque() {
  const { bolsas } = useEstoque();

  const estoquePorTipo = bolsas.reduce(
    (acc, bolsa) => { 
      acc[bolsa.tipoSanguineo] = (acc[bolsa.tipoSanguineo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>
  );

  const validadePorTipo = bolsas.reduce(
    (acc, bolsa) => {
      if ( !acc[bolsa.tipoSanguineo] || new Date(bolsa.dataValidade) < new Date(acc[bolsa.tipoSanguineo])) {
        acc[bolsa.tipoSanguineo] = bolsa.dataValidade;
      }
      return acc;
    }, {} as Record<string, string>
  );

  return (
    <MainLayout>
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-700"> Estoque de Sangue </h1>
        </div>

        {Object.keys(estoquePorTipo).length === 0 ? ( <p className="text-gray-500"> Nenhuma bolsa cadastrada </p> ) : (
        <>
          <div>
            <div className="grid grid-cols-4 bg-red-700 text-white font-semibold rounded-t-xl">
              <div className="p-3 text-center"> Tipo Sanguíneo </div>
              <div className="p-3 text-center"> Quantidade </div>
              <div className="p-3 text-center"> Próxima Validade </div>
              <div className="p-3 text-center"> Status </div>
            </div>

            {Object.entries(estoquePorTipo).map(([tipo, quantidade]) => (
              <div key={tipo} className="grid grid-cols-4 border-b border-gray-200 hover:bg-gray-50" >
                <div className="p-3 text-center"> {tipo} </div>
                <div className="p-3 text-center"> {quantidade} </div>
                <div className="p-3 text-center"> {validadePorTipo[tipo]?.split("-").reverse().join("/")} </div>

                <div className="p-3 text-center">
                  {quantidade <= 3 ? ( <span className="text-red-600 font-bold"> Estoque Baixo </span>) : 
                  ( <span className="text-green-600 font-medium"> Normal </span> )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-red-700 mb-4"> Bolsas Cadastradas </h2>

            <div className="grid grid-cols-5 bg-red-700 text-white font-semibold rounded-t-xl">
              <div className="p-3 text-center"> Tipo </div>
              <div className="p-3 text-center"> Coleta </div>
              <div className="p-3 text-center"> Validade </div>
              <div className="p-3 text-center"> Volume </div>
              <div className="p-3 text-center"> Status </div>
            </div>

            {bolsas.sort((a, b) => new Date(b.dataValidade).getTime() - new Date(a.dataValidade).getTime()).map((bolsa) => { 
              const diasRestantes = Math.ceil((new Date( bolsa.dataValidade ).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const vencida = diasRestantes < 0;
              const venceEmBreve = diasRestantes <= 7 && !vencida;

              return (
                <div key={bolsa.id} className={`grid grid-cols-5 border-gray-200 hover:bg-gray-50
                  ${vencida ? "opacity-60" : ""} ${venceEmBreve ? "font-medium" : ""} `}>
                  <div className="p-3 text-center"> {bolsa.tipoSanguineo} </div>
                  <div className="p-3 text-center"> {bolsa.dataColeta.split("-").reverse().join("/")} </div>
                  <div className="p-3 text-center"> {bolsa.dataValidade.split("-").reverse().join("/")} </div>
                  <div className="p-3 text-center"> {bolsa.volume} ml </div>

                  <div className="p-3 text-center">
                    {vencida ? ( <span className="text-red-600 font-bold"> Vencida </span>) : 
                    venceEmBreve ? ( <span className="text-yellow-600 font-bold"> Vence em {diasRestantes} dias </span>) : 
                    ( <span className="text-green-600 font-medium"> Disponível </span> )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
        )}
      </div>
    </MainLayout>
  );
}