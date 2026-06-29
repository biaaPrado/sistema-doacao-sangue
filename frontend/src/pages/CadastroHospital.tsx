import { MainLayout } from "../layouts/MainLayout";
import { HospitalForm } from "../components/Forms/HospitalForm";

export function CadastroHospital() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-red-700 mb-6"> Cadastro de Hospital </h1>
        <HospitalForm />
      </div>
    </MainLayout>
  );
}