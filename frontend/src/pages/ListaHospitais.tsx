import { MainLayout } from "../layouts/MainLayout";
import { useHospitais } from "../context/HospitalContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ListaHospitais() {
  const {
    hospitais,
    removerHospital,
    setHospitalEmEdicao,
  } = useHospitais();

  const navigate = useNavigate();
  const [nomeFiltro, setNomeFiltro] = useState(""); 
  const [cidadeFiltro, setCidadeFiltro] = useState("");

  function editarHospital(hospital: any) {
    setHospitalEmEdicao(hospital);

    navigate("/hospital/novo");
  }

  const hospitaisFiltrados = hospitais.filter((hospital) =>
    hospital.nome.toLowerCase().includes(nomeFiltro.toLowerCase()) &&
    hospital.cidade.toLowerCase().includes(cidadeFiltro.toLowerCase())
);

  return (
    <MainLayout>
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-red-700"> Hospitais </h1>

          <button
            onClick={() => navigate("/hospital/novo")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          > Novo Hospital
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
            <input
                type="text"
                placeholder="Buscar por nome..."
                value={nomeFiltro}
                onChange={(e) => setNomeFiltro(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
            />

            <input
                type="text"
                placeholder="Buscar por cidade..."
                value={cidadeFiltro}
                onChange={(e) => setCidadeFiltro(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
            />

            <button
                onClick={() => { setNomeFiltro(""); setCidadeFiltro("");}}
                className="bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
            > Limpar Filtros
            </button>

        </div>

        {hospitaisFiltrados.length === 0 ? ( <p className="text-gray-500"> Nenhum hospital encontrado </p>) : (
          <div className="space-y-4">
            {hospitaisFiltrados.map((hospital) => (
              <div key={hospital.id}
                onClick={() => navigate(`/hospitais/${hospital.id}`)}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg"> {hospital.nome} </h2>
                    <p className="text-gray-500"> {hospital.cidade}, {hospital.estado} - {hospital.telefone} </p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        editarHospital(hospital);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                    > Editar
                    </button>

                    <button onClick={(e) => {
                        e.stopPropagation();
                        if ( window.confirm(`Deseja excluir o hospital ${hospital.nome}?`)) {
                          removerHospital(hospital.id);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                    > Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}