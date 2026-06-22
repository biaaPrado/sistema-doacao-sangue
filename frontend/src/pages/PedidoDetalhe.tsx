import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { usePedidos } from "../context/PedidoContext";
import { useHospitais } from "../context/HospitalContext";

export function PedidoDetalhe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { pedidos } = usePedidos();
    const { hospitais } = useHospitais();

    const pedido = pedidos.find((p) => p.id === id);

    if (!pedido) {
        return (
            <MainLayout>
                <p className="text-gray-500">Pedido não encontrado</p>
            </MainLayout>
        );
    }

    const hospital = hospitais.find((h) => h.id === pedido.hospitalId);

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-red-700"> Pedido #{pedido.id} </h1>
                        <p className="text-gray-500">Detalhes do pedido de sangue</p>
                    </div>

                    <button
                        onClick={() => navigate("/pedidos")}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg" >
                        Voltar
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Tipo Sanguíneo</p>
                        <p className="font-medium"> {pedido.tipoSanguineo} {pedido.fatorRh} </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Quantidade de Bolsas</p>
                        <p className="font-medium">{pedido.quantidadeBolsas}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Prioridade</p>
                        <p className="font-medium">{pedido.prioridade}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">{pedido.status}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Data da Solicitação</p>
                        <p className="font-medium"> {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")} </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Hospital Solicitante</p>
                        <p className="font-medium"> {hospital?.nome || "Hospital não encontrado"} </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl col-span-2">
                        <p className="text-sm text-gray-500">Observações</p>
                        <p className="font-medium"> {pedido.observacoes || "Nenhuma observação informada"} </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}