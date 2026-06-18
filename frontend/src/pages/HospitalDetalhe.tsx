import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useHospitais } from "../context/HospitalContext";

export function HospitalDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { hospitais } = useHospitais();

  const hospital = hospitais.find((h) => h.id === id);

  if (!hospital) {
    return (
      <MainLayout>
        <p className="text-gray-500"> Hospital não encontrado </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-red-700"> {hospital.nome} </h1>
            <p className="text-gray-500"> Detalhes do hospital</p>
          </div>

          <button
            onClick={() => navigate("/hospitais")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
          > Voltar
          </button>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500"> CNPJ </p>
            <p className="font-medium"> {hospital.cnpj} </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500"> Telefone </p>
            <p className="font-medium"> {hospital.telefone} </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl col-span-2">
            <p className="text-sm text-gray-500"> Email </p>
            <p className="font-medium"> {hospital.email} </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl col-span-2">
            <p className="text-sm text-gray-500"> Endereço </p>
            <p className="font-medium"> {hospital.endereco} </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500"> Cidade </p>
            <p className="font-medium"> {hospital.cidade} </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500"> Estado </p>
            <p className="font-medium"> {hospital.estado} </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}