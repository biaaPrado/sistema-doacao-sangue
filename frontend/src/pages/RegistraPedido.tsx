import { PedidoForm } from "../components/Forms/PedidoForm";
import { MainLayout } from "../layouts/MainLayout";

export function RegistrarPedido() {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold text-red-700 mb-6"> Registrar Pedido de Sangue </h1>
                <PedidoForm />
            </div>
        </MainLayout>
    );
}