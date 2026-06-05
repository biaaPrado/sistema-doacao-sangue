import { MainLayout } from "../layouts/MainLayout";
import { DoacaoForm } from "../components/Forms/DoacaoForm";

export function RegistroDoacao() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-red-700 mb-6">
          Registro de Doação
        </h1>
        <DoacaoForm />
      </div>
    </MainLayout>
  );
}