import { MainLayout } from "../layouts/MainLayout";
import { DoadorForm } from "../components/forms/DoadorForm";

export function CadastroDoador() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-red-700 mb-6">
          Cadastro de Doador
        </h1>

        <DoadorForm />
      </div>
    </MainLayout>
  );
}