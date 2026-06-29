import { MainLayout } from "../layouts/MainLayout";
import { AgendarDoacaoForm } from "../components/Forms/AgendarDoacaoForm";

export function AgendaDoacao() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-red-700 mb-6"> Agendar Doação </h1>
        <AgendarDoacaoForm/>
      </div>
    </MainLayout>
  );
}